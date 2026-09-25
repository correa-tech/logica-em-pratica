import { existsSync, readdirSync } from "node:fs";
import { dirname, resolve, extname } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
for (const directory of ["src/content", "src/services"]) {
  for (const name of readdirSync(resolve(root, directory))) {
    if (extname(name) === ".js") execFileSync(process.execPath, ["--check", resolve(root, directory, name)]);
  }
}
const required = ["dist/index.html", "dist/c-worker.js", "dist/prepare-c.js", "dist/vendor/PICOC-LICENSE.txt", "dist/materiais/glossario-fundamentos-programacao.pdf"];
for (const file of required) if (!existsSync(resolve(root, file))) throw new Error(`Arquivo publicado ausente: ${file}`);
console.log("Verificado: bundle React, JavaScript e arquivos do laboratório.");
