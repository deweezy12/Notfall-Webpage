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
  "assets/index-BumH1Iou.js",
  "assets/index-kANS6a2Z.css",
  "home.css",
  "home.js",
  "projects/ari-social.mp4",
  "projects/website-annka.mp4",
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

console.log(
  `Validated ${requiredFiles.length} required files and ${textFiles.length} text files.`,
);
