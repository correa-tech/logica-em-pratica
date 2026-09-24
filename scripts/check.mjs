import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { dirname, resolve, extname } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";
import assert from "node:assert/strict";
import { build, routes } from "./build.mjs";
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
build();
for (const name of readdirSync(resolve(root, "src/assets"))) {
  if (extname(name) === ".js")
    execFileSync(process.execPath, [
      "--check",
      resolve(root, "src/assets", name),
    ]);
}
for (const route of routes) {
  const file = resolve(root, "dist", route.path, "index.html");
  const html = readFileSync(file, "utf8");
  assert(!html.includes("{{"), `Marcador não preenchido em ${route.path}`);
  assert(html.includes(`data-initial-view="${route.view}"`));
  for (const match of html.matchAll(/(?:src|href)="([^"#]+)"/g)) {
    const href = match[1];
    if (/^(?:https?:|data:|mailto:)/.test(href)) continue;
    const target = resolve(dirname(file), href);
    assert(existsSync(target), `Referência ausente: ${file} → ${href}`);
  }
}
assert(existsSync(resolve(root, "dist/assets/c-worker.js")));
assert(existsSync(resolve(root, "dist/assets/vendor/PICOC-LICENSE.txt")));
console.log(
  "Verificado: quatro páginas, links locais, JavaScript e arquivos do laboratório.",
);
