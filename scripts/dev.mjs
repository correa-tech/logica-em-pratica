import { createServer } from "node:http";
import { createReadStream, existsSync, statSync, watch } from "node:fs";
import { resolve, dirname, extname, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { build } from "./build.mjs";
const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const output = resolve(projectRoot, "dist");
const port = Number(process.env.PORT || 3000);
build();
let rebuilding;
watch(resolve(projectRoot, "src"), { recursive: true }, () => {
  clearTimeout(rebuilding);
  rebuilding = setTimeout(() => {
    try {
      build();
    } catch (error) {
      console.error(error.message);
    }
  }, 150);
});
const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".svg": "image/svg+xml",
  ".json": "application/json",
  ".wasm": "application/wasm",
  ".pdf": "application/pdf",
  ".txt": "text/plain; charset=utf-8",
};
createServer((request, response) => {
  if (!["GET", "HEAD"].includes(request.method)) {
    response.writeHead(405);
    response.end();
    return;
  }
  let pathname;
  try {
    pathname = decodeURIComponent(
      new URL(request.url, "http://localhost").pathname,
    );
  } catch {
    response.writeHead(400);
    response.end("Endereço inválido.");
    return;
  }
  let file = resolve(output, "." + pathname);
  if (file !== output && !file.startsWith(output + sep)) {
    response.writeHead(403);
    response.end();
    return;
  }
  if (existsSync(file) && statSync(file).isDirectory()) {
    if (!pathname.endsWith("/")) {
      response.writeHead(308, {
        Location:
          pathname + "/" + new URL(request.url, "http://localhost").search,
      });
      response.end();
      return;
    }
    file = resolve(file, "index.html");
  }
  if (!existsSync(file) || !statSync(file).isFile()) {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Página não encontrada.");
    return;
  }
  response.writeHead(200, {
    "Content-Type": types[extname(file)] || "application/octet-stream",
    "Cache-Control": "no-store",
  });
  if (request.method === "HEAD") response.end();
  else createReadStream(file).pipe(response);
}).listen(port, "127.0.0.1", () =>
  console.log(
    `Abra http://localhost:${port}/ — salve os arquivos em src e atualize a página. Ctrl+C encerra.`,
  ),
);
