import { createReadStream, existsSync } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, join, normalize, resolve } from "node:path";

const root = resolve(".");
const port = Number.parseInt(process.env.PORT || "4173", 10);

const types = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
};

function resolveRequestPath(url) {
  const pathname = new URL(url, "http://localhost").pathname;
  const decoded = decodeURIComponent(pathname);
  const target = normalize(join(root, decoded));

  if (!target.startsWith(root)) {
    return null;
  }

  if (existsSync(target)) {
    return target;
  }

  return join(root, "index.html");
}

const server = createServer(async (request, response) => {
  const filePath = resolveRequestPath(request.url || "/");

  if (!filePath) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  try {
    const fileStat = await stat(filePath);
    const finalPath = fileStat.isDirectory() ? join(filePath, "index.html") : filePath;
    response.writeHead(200, {
      "Content-Type": types[extname(finalPath)] || "application/octet-stream",
    });
    createReadStream(finalPath).pipe(response);
  } catch {
    response.writeHead(404);
    response.end("Not found");
  }
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Cabinet Industry Network preview: http://127.0.0.1:${port}`);
});
