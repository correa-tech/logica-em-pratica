import {
  cpSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
export const routes = [
  {
    path: "",
    view: "home",
    title: "Lógica em Prática · Aprenda C do zero",
    description:
      "Um projeto de apoio entre colegas para aprender lógica e programação em C, com aulas, exercícios e laboratório.",
  },
  {
    path: "aulas",
    view: "lessons",
    title: "Aulas de C · Lógica em Prática",
    description:
      "Aulas de programação em C explicadas linha por linha, desde os primeiros passos.",
  },
  {
    path: "exercicios",
    view: "exercises",
    title: "Exercícios de C · Lógica em Prática",
    description:
      "Pratique C com desafios por degrau, dicas e testes para conferir a sua saída.",
  },
  {
    path: "laboratorio",
    view: "lab",
    title: "Laboratório C · Lógica em Prática",
    description:
      "Escreva programas em C, forneça entradas e veja a saída pelo navegador.",
  },
];
export function build() {
  const output = resolve(projectRoot, "dist");
  rmSync(output, { recursive: true, force: true });
  mkdirSync(output, { recursive: true });
  cpSync(resolve(projectRoot, "src/assets"), resolve(output, "assets"), {
    recursive: true,
  });
  const template = readFileSync(
    resolve(projectRoot, "src/layout.html"),
    "utf8",
  );
  for (const route of routes) {
    const base = route.path ? "../" : "./";
    let html = template
      .replaceAll("{{BASE}}", base)
      .replaceAll("{{TITLE}}", route.title)
      .replaceAll("{{DESCRIPTION}}", route.description)
      .replaceAll("{{VIEW}}", route.view);
    html = html.replace(
      new RegExp(`(data-initial="${route.view}")\\s+hidden`),
      "$1",
    );
    const directory = resolve(output, route.path);
    mkdirSync(directory, { recursive: true });
    writeFileSync(resolve(directory, "index.html"), html);
  }
  writeFileSync(resolve(output, ".nojekyll"), "");
  console.log("Páginas geradas: /, /aulas/, /exercicios/ e /laboratorio/.");
}
if (
  process.argv[1] &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url)
)
  build();
