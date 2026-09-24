"use strict";
// PicoC stores both float and double in its internal double type, but delegates
// scanf to native libc, whose %f writes 32 bits. Adapt ONLY scanf format literals
// to the interpreter's storage representation. The student's editor remains C99.
// Reject dynamic formats rather than silently producing an incorrect value.
function prepareC(source) {
  const tokens = [];
  let i = 0;
  while (i < source.length) {
    let start = i,
      c = source[i];
    if (/\s/.test(c)) {
      i++;
      continue;
    }
    if (source.startsWith("//", i)) {
      i = source.indexOf("\n", i);
      if (i < 0) break;
      continue;
    }
    if (source.startsWith("/*", i)) {
      const end = source.indexOf("*/", i + 2);
      i = end < 0 ? source.length : end + 2;
      continue;
    }
    if (c === '"' || c === "'") {
      i++;
      while (i < source.length) {
        if (source[i] === "\\") {
          i += 2;
          continue;
        }
        if (source[i++] === c) break;
      }
      tokens.push({
        kind: c === '"' ? "string" : "char",
        start,
        end: i,
        text: source.slice(start, i),
      });
      continue;
    }
    if (/[a-zA-Z_]/.test(c)) {
      i++;
      while (i < source.length && /[a-zA-Z_0-9]/.test(source[i])) i++;
      tokens.push({
        kind: "word",
        start,
        end: i,
        text: source.slice(start, i),
      });
      continue;
    }
    tokens.push({ kind: "symbol", start, end: ++i, text: c });
  }
  const patches = [];
  for (let t = 0; t < tokens.length; t++) {
    if (
      tokens[t].kind !== "word" ||
      tokens[t].text !== "scanf" ||
      tokens[t + 1]?.text !== "("
    )
      continue;
    let a = t + 2;
    if (tokens[a]?.kind !== "string")
      return {
        error:
          'Neste laboratório, o formato de scanf precisa estar escrito diretamente entre aspas, como scanf("%f", &nota). Formatos guardados em variáveis não são suportados aqui.',
      };
    let b = a,
      raw = "";
    while (tokens[b]?.kind === "string") {
      raw += tokens[b].text.slice(1, -1);
      b++;
    }
    if (/\\(?:[0-7]|x)/.test(raw))
      return {
        error:
          'Este laboratório não aceita códigos octais ou hexadecimais dentro do formato de scanf. Escreva os marcadores diretamente, como "%d" ou "%f".',
      };
    const adapted = raw.replace(
      /%%|%(\*?)(\d*)([hlL]?)([aAeEfFgG])/g,
      (match, suppress, width, length, conversion) => {
        if (match === "%%" || length) return match;
        return "%" + suppress + width + "l" + conversion;
      },
    );
    if (adapted !== raw) {
      const old = source.slice(tokens[a].start, tokens[b - 1].end);
      const lines = (old.match(/\n/g) || []).length;
      patches.push({
        start: tokens[a].start,
        end: tokens[b - 1].end,
        text: '"' + adapted + '"' + "\n".repeat(lines),
      });
    }
    t = b - 1;
  }
  for (const patch of patches.reverse())
    source =
      source.slice(0, patch.start) + patch.text + source.slice(patch.end);
  return { code: source };
}
