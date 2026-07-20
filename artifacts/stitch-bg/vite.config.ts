import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { cp, mkdir, readFile, readdir, writeFile } from "node:fs/promises";

const rawPort = process.env.PORT ?? "5173";
const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

const basePath = process.env.BASE_PATH ?? "/";

const originalSpacefieldPath = "/spacefield/";
const spacefieldMedia2Path = "/spacefieldmedia2/";

function replaceOnce(source: string, search: string, replacement: string) {
  const occurrences = source.split(search).length - 1;

  if (occurrences !== 1) {
    throw new Error(
      `Expected one occurrence while creating Spacefield Media 2, found ${occurrences}: ${search}`,
    );
  }

  return source.replace(search, replacement);
}

/**
 * The original Spacefield site is a pre-built static app. Keep it untouched and
 * create a rewritten, self-contained deployment copy only in the build output.
 */
function createSpacefieldMedia2() {
  return {
    name: "create-spacefield-media2",
    async closeBundle() {
      const projectRoot = path.resolve(import.meta.dirname);
      const outputDirectory = path.resolve(projectRoot, "dist", "spacefieldmedia2");
      const originalStaticDirectory = path.resolve(
        projectRoot,
        "public",
        "spacefield",
      );
      const originalHomepage = path.resolve(projectRoot, "spacefield", "index.html");

      await mkdir(outputDirectory, { recursive: true });
      await cp(originalStaticDirectory, outputDirectory, { recursive: true });

      const rewritePaths = (content: string) =>
        content.replaceAll(originalSpacefieldPath, spacefieldMedia2Path);

      await writeFile(
        path.join(outputDirectory, "index.html"),
        rewritePaths(await readFile(originalHomepage, "utf8")),
      );

      for (const directory of ["company", "contacts", "projects", "services"]) {
        const pagePath = path.join(outputDirectory, directory, "index.html");
        await writeFile(pagePath, rewritePaths(await readFile(pagePath, "utf8")));
      }

      const assetsDirectory = path.join(outputDirectory, "assets");
      const scriptName = (await readdir(assetsDirectory)).find(
        (fileName) => /^index-.*\.js$/.test(fileName),
      );

      if (!scriptName) {
        throw new Error("Could not find the Spacefield JavaScript bundle.");
      }

      const scriptPath = path.join(assetsDirectory, scriptName);
      let script = rewritePaths(await readFile(scriptPath, "utf8"));

      script = replaceOnce(
        script,
        'const n=[{href:"/services",label:"Services"},{href:"/projects",label:"Projects"},{href:"/company",label:"Company"},{href:"/contacts",label:"Contacts"}]',
        'const n=[{href:"/company",label:"Unternehmen"},{href:"/projects",label:"Projekte"},{href:"/services",label:"Leistungen"},{href:"/contacts",label:"Über uns"}]',
      );
      script = replaceOnce(
        script,
        'className:"hidden md:flex gap-8"',
        'className:"flex flex-wrap justify-end gap-4 md:gap-8"',
      );
      script = replaceOnce(
        script,
        ',j.jsx("div",{className:"md:hidden",children:j.jsx(xa,{href:"/contacts",className:"text-sm font-medium uppercase tracking-widest",children:"Menu"})})',
        "",
      );
      script = replaceOnce(
        script,
        'j.jsx(xa,{href:"/",className:"font-display font-bold text-2xl tracking-tighter",children:"Spacefield Media"}),',
        "",
      );
      script = replaceOnce(script, 'text:"Digital design &"', 'text:"Willkommen bei"');
      script = replaceOnce(
        script,
        'text:"development agency"',
        'text:"Spacefield Media"',
      );
      script = replaceOnce(
        script,
        'className:"text-lg md:text-xl text-foreground max-w-3xl mx-auto font-light leading-relaxed mt-12",children:"We help companies build scalable digital products with thoughtful design systems and carefully crafted development."',
        'className:"text-lg md:text-xl text-foreground max-w-3xl mx-auto font-light leading-relaxed mt-12",children:"Wir helfen dir mit deinem Unternehmen die Brücke zur digitalen Welt zu schlagen, ohne dabei eure Vision aus den Augen zu verlieren."',
      );
      script = replaceOnce(script, 'j.jsx(w2,{}),j.jsx(M2,{})', 'j.jsx(w2,{})');
      await writeFile(scriptPath, script);

      const tweaksPath = path.join(outputDirectory, "spacefield-tweaks.css");
      await writeFile(
        tweaksPath,
        `${await readFile(tweaksPath, "utf8")}

/* Spacefield Media 2 has no left-side wordmark. */
#root > div > nav {
  justify-content: flex-end;
}

#root > div > nav > div a > span {
  display: none;
}

#root > div > nav > div {
  animation: spacefield-menu-rise 0.85s cubic-bezier(0.22, 1, 0.36, 1) 0.2s both;
}
`,
      );
    },
  };
}

export default defineConfig({
  base: basePath,
  plugins: [react(), createSpacefieldMedia2()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
    },
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist"),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: path.resolve(import.meta.dirname, "index.html"),
        schluessel: path.resolve(import.meta.dirname, "schluessel/index.html"),
        rohr: path.resolve(import.meta.dirname, "rohr/index.html"),
        elektrik: path.resolve(import.meta.dirname, "elektrik/index.html"),
        heizung: path.resolve(import.meta.dirname, "heizung/index.html"),
        nagelstudio: path.resolve(
          import.meta.dirname,
          "nagelstudio/index.html",
        ),
        physiotherapie: path.resolve(
          import.meta.dirname,
          "physiotherapie/index.html",
        ),
        soundfield: path.resolve(import.meta.dirname, "soundfield/index.html"),
        spacefield: path.resolve(import.meta.dirname, "spacefield/index.html"),
        spacefieldMedia: path.resolve(
          import.meta.dirname,
          "spacefield-media/index.html",
        ),
        spacefieldMediaYellow: path.resolve(
          import.meta.dirname,
          "spacefield-media-yellow/index.html",
        ),
        wanzleben: path.resolve(import.meta.dirname, "wanzleben/index.html"),
        annkafalk: path.resolve(import.meta.dirname, "annkafalk/index.html"),
        impressum: path.resolve(import.meta.dirname, "impressum/index.html"),
        datenschutz: path.resolve(
          import.meta.dirname,
          "datenschutz/index.html",
        ),
      },
    },
  },
  server: {
    port,
    host: "0.0.0.0",
  },
  preview: {
    port,
    host: "0.0.0.0",
  },
});
