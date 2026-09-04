import { access, readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const output = path.join(root, "dist");
const requiredFiles = [
  "index.html",
  "projects/index.html",
  "services/index.html",
  "contacts/index.html",
  "website-building/index.html",
  "social-media-management/index.html",
  "sound-licences/index.html",
  "home.css",
  "home.js",
  "team/julia.jpg",
  "team/lasse.jpg",
  "team/oliver.jpg",
  "favicon.svg",
  "robots.txt",
  "CNAME",
  ".nojekyll",
];

for (const file of requiredFiles) {
  await access(path.join(output, file));
}

const forbiddenText = [
  "/archive/",
  "/spacefield/",
  "/spacefieldmedia2/",
  "Cuberto",
  "Replit",
];
const textFiles = [];

async function collectTextFiles(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      await collectTextFiles(entryPath);
    } else if (/\.(?:html|css|js|txt)$/.test(entry.name)) {
      textFiles.push(entryPath);
    }
  }
}

await collectTextFiles(output);

for (const file of textFiles) {
  const content = await readFile(file, "utf8");
  for (const forbidden of forbiddenText) {
    if (content.includes(forbidden)) {
      throw new Error(
        `${path.relative(root, file)} contains forbidden text: ${forbidden}`,
      );
    }
  }
}

const homepage = await readFile(path.join(output, "index.html"), "utf8");
for (const route of ["projects", "services", "contacts"]) {
  if (homepage.includes(`href="/${route}/"`)) {
    throw new Error(`dist/index.html still links to removed route: /${route}/`);
  }

  const redirect = await readFile(path.join(output, route, "index.html"), "utf8");
  if (!redirect.includes('window.location.replace("/")')) {
    throw new Error(`dist/${route}/index.html does not redirect to the homepage`);
  }
}

console.log(
  `Validated ${requiredFiles.length} required files and ${textFiles.length} text files.`,
);
