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
  "wanzleben/index.html",
  "home.css",
  "home.js",
  "hero-background.avif",
  "website-building-hero.avif",
  "website-building-business.avif",
  "website-building-custom.avif",
  "website-building-footer.avif",
  "website-building/page.js",
  "assets/wanzleben-DxA7B9Ty.js",
  "assets/mount-Dd9V1izd.css",
  "assets/site-ZOAJY8o9.js",
  "images/rohr/notdienst1.png",
  "images/rohr/notdienst2.png",
  "images/rohr/notdienst3.png",
  "images/rohr/notdienst4.png",
  "images/rohr/notdienst5.png",
  "images/rohr/notdienst6.png",
  "images/rohr/notdienst7.png",
  "fonts/Area-Normal-Regular.otf",
  "projects/website-background.jpg",
  "projects/annka-falk-website.png",
  "projects/technical-portfolio.mp4",
  "projects/social-background.jpg",
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
