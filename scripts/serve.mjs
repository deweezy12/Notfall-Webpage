import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const directory = path.resolve(root, process.argv[2] ?? "site");
const port = Number(process.env.PORT ?? 5173);

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error(`Invalid PORT: ${process.env.PORT}`);
}

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".mp4": "video/mp4",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
};

createServer(async (request, response) => {
  try {
    const url = new URL(request.url ?? "/", "http://localhost");
    const relativePath = decodeURIComponent(url.pathname).replace(/^\/+/, "");
    let file = path.resolve(directory, relativePath);

    if (file !== directory && !file.startsWith(`${directory}${path.sep}`)) {
      response.writeHead(403).end("Forbidden");
      return;
    }

    let fileStats = await stat(file);
    if (fileStats.isDirectory()) {
      file = path.join(file, "index.html");
      fileStats = await stat(file);
    }

    const contentType =
      contentTypes[path.extname(file)] ?? "application/octet-stream";
    const range = request.headers.range?.match(/bytes=(\d*)-(\d*)/);

    if (range) {
      const start = range[1] ? Number(range[1]) : 0;
      const end = range[2]
        ? Math.min(Number(range[2]), fileStats.size - 1)
        : fileStats.size - 1;

      if (start > end || start >= fileStats.size) {
        response.writeHead(416, {
          "Content-Range": `bytes */${fileStats.size}`,
        }).end();
        return;
      }

      response.writeHead(206, {
        "Accept-Ranges": "bytes",
        "Content-Length": end - start + 1,
        "Content-Range": `bytes ${start}-${end}/${fileStats.size}`,
        "Content-Type": contentType,
      });
      createReadStream(file, { start, end }).pipe(response);
      return;
    }

    response.writeHead(200, {
      "Accept-Ranges": "bytes",
      "Content-Length": fileStats.size,
      "Content-Type": contentType,
    });
    createReadStream(file).pipe(response);
  } catch {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Not found");
  }
}).listen(port, "0.0.0.0", () => {
  console.log(
    `Serving ${path.relative(root, directory)}/ at http://localhost:${port}`,
  );
});
