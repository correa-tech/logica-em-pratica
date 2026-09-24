"use strict";
const assetBase = new URL(".", document.currentScript.src);
const siteBase = new URL("../", assetBase);
const pageRoutes = {
  home: "",
  lessons: "aulas/",
  exercises: "exercicios/",
  lab: "laboratorio/",
};
let restoringRoute = false;
const practice = {
  view: "lessons",
  selected: null,
  filter: 0,
  drafts: new Map(),
  inputs: new Map(),
  results: new Map(),
  active: null,
  request: 0,
  hint: false,
  solution: false,
  passed: new Set(),
};
const freeStart = program('    printf("Ola, turma!\\n");');
const editorKey = () =>
  practice.selected ? "exercise:" + practice.selected : "free";
const activeExercise = () => exercises.find((x) => x.id === practice.selected);
function rememberEditor() {
  if ($("cCode") && !$("editorView").hidden) {
    practice.drafts.set(editorKey(), $("cCode").value);
    practice.inputs.set(editorKey(), $("cInput").value);
  }
}
function setAppView(view, save = true) {
  if (!["home", "lessons", "exercises", "lab"].includes(view)) return;
  if (save) rememberEditor();
  cancelExecution(false);
  practice.view = view;
  $("homeView").hidden = view !== "home";
  $("learnView").hidden = view !== "lessons";
  $("exerciseView").hidden = view !== "exercises";
  $("editorView").hidden = view !== "lab";
  document.querySelectorAll("[data-view]").forEach((b) => {
    b.setAttribute("aria-current", b.dataset.view === view ? "page" : "false");
  });
  if (view === "exercises") renderExerciseList();
  if (view === "lab") renderEditor();
  const activeView = $(
    { home: "homeView", lessons: "learnView", exercises: "exerciseView", lab: "editorView" }[
      view
    ],
  );
  activeView.classList.remove("view-enter");
  void activeView.offsetWidth;
  activeView.classList.add("view-enter");
  document.title = {
    home: "Lógica em Prática · Aprenda C do zero",
    lessons: "Aulas de C · Lógica em Prática",
    exercises: "Exercícios de C · Lógica em Prática",
    lab: "Laboratório C · Lógica em Prática",
  }[view];
  syncRoute();
}
function renderExerciseList() {
  $("exerciseView").innerHTML =
    `<div class="section-heading"><div><span class="eyebrow">Escreva a sua solução</span><h2>Exercícios da trilha</h2><p>Do primeiro printf às funções. Cada desafio tem uma dica, entrada de exemplo e testes para comparar a saída.</p></div><span class="counter">${practice.passed.size}/${exercises.length} com testes aprovados nesta visita</span></div><div class="exercise-filters" role="group" aria-label="Escolher degrau"><button data-filter="0" aria-pressed="${practice.filter === 0}">Todos</button>${[1, 2, 3, 4, 5].map((n) => `<button data-filter="${n}" aria-pressed="${practice.filter === n}">Degrau ${n}</button>`).join("")}</div><div class="exercise-grid">${exercises
      .filter((x) => !practice.filter || x.step === practice.filter)
      .map(
        (x) =>
          `<article class="exercise-card"><div class="exercise-meta">${esc(degrauNames[x.step])}${practice.passed.has(x.id) ? " · ✓ Testes aprovados" : ""}</div><h3>${esc(x.title)}</h3><p>${esc(x.statement)}</p><button class="action" data-exercise="${x.id}">Resolver em C →</button></article>`,
      )
      .join(
        "",
      )}</div><p class="muted">Enunciados próprios, organizados pelos temas do glossário da disciplina. Os testes verificam a saída; revise também o raciocínio e a estrutura solicitada.</p>`;
  document.querySelectorAll("[data-filter]").forEach(
    (b) =>
      (b.onclick = () => {
        practice.filter = Number(b.dataset.filter);
        renderExerciseList();
      }),
  );
  document
    .querySelectorAll("[data-exercise]")
    .forEach((b) => (b.onclick = () => openExercise(b.dataset.exercise)));
}
function openExercise(id) {
  rememberEditor();
  practice.selected = id;
  practice.hint = false;
  practice.solution = false;
  setAppView("lab", false);
}
function openFreeLab(code) {
  rememberEditor();
  practice.selected = null;
  if (code !== undefined) {
    practice.drafts.set("free", code);
    practice.inputs.set("free", "");
    practice.results.delete("free");
  }
  practice.hint = false;
  practice.solution = false;
  setAppView("lab", false);
}
function renderEditor() {
  const ex = activeExercise(),
    key = editorKey(),
    code = practice.drafts.get(key) ?? ex?.starter ?? freeStart,
    input = practice.inputs.get(key) ?? ex?.input ?? "";
  $("editorView").innerHTML =
    `<div class="section-heading"><div><span class="eyebrow">Laboratório C</span><h2>${ex ? esc(ex.title) : "Escreva, execute e veja o resultado."}</h2><p>${ex ? esc(degrauNames[ex.step]) : "Experimente seus próprios programas ou carregue um exemplo das aulas."}</p></div><button class="secondary" id="editorBack">${ex ? "← Todos os exercícios" : "Ver exercícios →"}</button></div><div class="coding-layout"><aside class="coding-instructions">${ex ? `<h3>O que fazer</h3><p>${esc(ex.statement)}</p><h4>Entrada de exemplo</h4><pre class="sample">${esc(ex.input || "(sem entrada)")}</pre><h4>Saída esperada</h4><pre class="sample">${esc(ex.output)}</pre><div class="callout compact">Mostre somente o resultado pedido. Textos extras, como “Digite um número”, mudam a saída comparada.</div><button class="text-button" id="exerciseHint">${practice.hint ? "Ocultar dica" : "Preciso de uma dica"}</button><div id="exerciseHintText" ${practice.hint ? "" : "hidden"} class="hint">${esc(ex.hint)}</div><button class="text-button" id="reviewLesson">Rever a aula deste tema →</button><details id="solutionDetails" ${practice.solution ? "open" : ""}><summary>Ver uma solução explicada</summary><pre class="solution-code">${esc(ex.solution)}</pre><p>${esc(ex.reason)}</p><button class="secondary" id="loadSolution">Usar esta solução no editor</button></details>` : `<h3>Como usar</h3><ol><li>Escreva ou altere o código.</li><li>Se usar scanf, preencha a entrada antes de executar.</li><li>Toque em Executar C e leia a saída.</li></ol><label for="sampleSelect">Exemplos das aulas</label><select id="sampleSelect">${lessons.map((l, i) => `<option value="${i}">${esc(l.title)}</option>`).join("")}</select><button class="secondary" id="loadSample">Carregar exemplo</button><p class="muted">Carregar um exemplo substitui o código do laboratório livre. Os exercícios mantêm seus próprios rascunhos nesta visita.</p>`}<details class="runtime-help"><summary>Sobre a execução</summary><p>Seu código roda aqui no navegador com PicoC, um interpretador para um subconjunto de C. Há suporte aos exemplos e exercícios desta trilha, incluindo printf e scanf com o formato escrito diretamente entre aspas.</p><p>O material da disciplina usa C99. Este ambiente não implementa todo o padrão nem substitui o compilador do Dev-C++. Um programa válido em C99 pode usar recursos que este interpretador não oferece.</p><p>Execuções param após 3 segundos. A entrada é preenchida antes de executar; não é um console que espera digitação durante o programa. Códigos e resultados ficam apenas nesta visita.</p><a href="https://github.com/KritR/picoc-js" target="_blank" rel="noopener noreferrer">PicoC · código e licença</a></details></aside><div class="coding-workspace"><div class="editor-card"><div class="editor-toolbar"><label for="cCode">Seu programa · arquivo .c</label><span id="editorPosition">Linha 1</span></div><textarea id="cCode" aria-describedby="codeHelp" spellcheck="false" autocapitalize="off" autocomplete="off" autocorrect="off" wrap="off"></textarea><p id="codeHelp" class="muted editor-help">Clique na área e digite. Enter cria uma linha; use espaços para recuar. Tab permite ir ao próximo controle.</p><div class="input-area"><label for="cInput">Entrada do programa (para scanf)</label><textarea id="cInput" rows="3" spellcheck="false" placeholder="Exemplo: 4 6"></textarea><p class="muted">Escreva os valores na ordem em que scanf vai ler. Separe com espaços ou linhas.</p></div><div class="run-actions"><button class="action" id="runCode">▶ Executar C</button>${ex ? '<button class="secondary" id="testCode">Verificar testes</button>' : ""}<button class="stop-button" id="stopCode" hidden>Parar execução</button><span id="runStatus" role="status">Pronto para executar.</span></div></div><section class="result-card" aria-labelledby="resultTitle"><div class="result-heading"><h3 id="resultTitle">Saída e feedback</h3><span id="resultBadge">Aguardando</span></div><div id="resultBody"><p class="muted">A saída do seu código e as explicações aparecerão aqui.</p></div></section></div></div>`;
  $("cCode").value = code;
  $("cInput").value = input;
  $("cCode").oninput = () => {
    practice.drafts.set(key, $("cCode").value);
    updatePosition();
  };
  $("cCode").onclick = updatePosition;
  $("cCode").onkeyup = updatePosition;
  $("cInput").oninput = () => practice.inputs.set(key, $("cInput").value);
  $("runCode").onclick = () => executeEditor(false);
  if ($("testCode")) $("testCode").onclick = () => executeEditor(true);
  $("stopCode").onclick = () => cancelExecution(true);
  $("editorBack").onclick = () => setAppView("exercises");
  if (ex) {
    $("exerciseHint").onclick = () => {
      practice.hint = !practice.hint;
      $("exerciseHintText").hidden = !practice.hint;
      $("exerciseHint").textContent = practice.hint
        ? "Ocultar dica"
        : "Preciso de uma dica";
    };
    $("reviewLesson").onclick = () => {
      setAppView("lessons");
      openLesson(lessons.findIndex((l) => l.id === ex.lessonId));
    };
    $("solutionDetails").ontoggle = () => {
      practice.solution = $("solutionDetails").open;
    };
    $("loadSolution").onclick = () => {
      $("cCode").value = ex.solution;
      practice.drafts.set(key, ex.solution);
      updatePosition();
    };
  } else
    $("loadSample").onclick = () => {
      const l = lessons[Number($("sampleSelect").value)];
      $("cCode").value = l.code;
      $("cInput").value = l.id === "entrada" ? "21" : "";
      rememberEditor();
      updatePosition();
    };
  const previous = practice.results.get(key);
  if (previous) showResult(previous);
}
function updatePosition() {
  const editor = $("cCode");
  if (!editor) return;
  $("editorPosition").textContent =
    "Linha " + editor.value.slice(0, editor.selectionStart).split("\n").length;
}
function cancelExecution(visible) {
  practice.request++;
  if (practice.active) {
    practice.active.cancel();
    practice.active = null;
  }
  setRunning(false);
  if (visible && $("runStatus")) {
    $("runStatus").textContent = "Execução interrompida por você.";
  }
}
function setRunning(running) {
  for (const id of ["runCode", "testCode", "loadSample", "loadSolution"])
    if ($(id)) $(id).disabled = running;
  if ($("stopCode")) $("stopCode").hidden = !running;
  for (const id of ["cCode", "cInput"]) if ($(id)) $(id).readOnly = running;
}
function executeC(code, input) {
  let worker, timer, finish;
  const promise = new Promise((resolve) => {
    let done = false;
    finish = (result) => {
      if (done) return;
      done = true;
      clearTimeout(timer);
      worker?.terminate();
      resolve(result);
    };
    try {
      worker = new Worker(new URL("c-worker.js", assetBase));
      timer = setTimeout(
        () =>
          finish({
            kind: "load-error",
            message:
              "O ambiente demorou para carregar. Tente executar novamente.",
          }),
        15000,
      );
      worker.onmessage = (e) => {
        if (e.data.type === "ready") {
          clearTimeout(timer);
          timer = setTimeout(
            () =>
              finish({
                kind: "timeout",
                message:
                  "A execução passou de 3 segundos. Confira a condição de parada e se a variável do laço é atualizada.",
              }),
            3000,
          );
          worker.postMessage({ code, input });
        } else if (e.data.type === "result") finish(e.data);
      };
      worker.onerror = () =>
        finish({
          kind: "load-error",
          message:
            "Não foi possível iniciar o interpretador. Recarregue a página e tente novamente.",
        });
    } catch {
      finish({
        kind: "load-error",
        message: "Este navegador não conseguiu iniciar a execução de C.",
      });
    }
  });
  const active = { promise, cancel: () => finish({ kind: "cancelled" }) };
  practice.active = active;
  return promise;
}
const normalizeOutput = (s) =>
  String(s ?? "")
    .replace(/\r\n/g, "\n")
    .trim()
    .split("\n")
    .map((line) => line.trimEnd())
    .join("\n");
function explainResult(r) {
  const raw =
    (r.stdout || "") + "\n" + (r.stderr || "") + "\n" + (r.error || "");
  const line = raw.match(/file\.c:(\d+):(\d+)/);
  const where = line
    ? `Confira a linha ${line[1]}, perto da coluna ${line[2]}. `
    : "";
  if (r.kind === "timeout" || r.kind === "load-error" || r.kind === "limit")
    return r.message;
  if (r.kind === "output-limit")
    return "O programa produziu saída demais e foi interrompido. Confira se o laço termina e se precisa imprimir em todas as voltas.";
  if (/';' expected/.test(raw))
    return (
      where +
      "Parece faltar um ponto e vírgula. Ele encerra instruções como printf(...);. Confira também a linha anterior."
    );
  if (/undefined|not defined|undeclared/.test(raw))
    return (
      where +
      "Há um nome que o interpretador não reconheceu. Confira a declaração e as letras maiúsculas e minúsculas."
    );
  if (/expected|parse error|invalid expression/.test(raw))
    return (
      where +
      "Há uma escrita que o interpretador não conseguiu entender. Confira chaves, parênteses, aspas e a instrução imediatamente anterior."
    );
  if (r.kind === "runtime" || r.error)
    return (
      where +
      "A execução falhou. Confira os limites dos vetores, ponteiros e operações do programa. Alguns recursos de C99 não são suportados aqui."
    );
  if (r.exitCode !== 0)
    return (
      where +
      `O programa terminou com código ${r.exitCode}. Veja os detalhes abaixo. Isso também pode acontecer quando seu próprio código retorna um valor diferente de zero, por exemplo após uma entrada inválida.`
    );
  return "Execução concluída. Confira se a saída corresponde ao que você esperava; executar sem erro não garante que a lógica esteja correta.";
}
async function executeEditor(check) {
  rememberEditor();
  const ex = activeExercise(),
    code = $("cCode").value,
    input = $("cInput").value,
    key = editorKey();
  if (!code.trim()) {
    $("runStatus").textContent = "Escreva um programa em C antes de executar.";
    return;
  }
  cancelExecution(false);
  const request = practice.request;
  setRunning(true);
  let result;
  if (check && ex) {
    const cases = [];
    for (let i = 0; i < ex.tests.length; i++) {
      $("runStatus").textContent =
        `Verificando teste ${i + 1} de ${ex.tests.length}…`;
      const t = ex.tests[i],
        r = await executeC(code, t.input);
      if (request !== practice.request) return;
      const ok =
        r.kind === "complete" &&
        r.exitCode === 0 &&
        !r.error &&
        normalizeOutput(r.stdout) === normalizeOutput(t.output);
      cases.push({ ...t, result: r, ok });
      if (r.kind !== "complete" || r.exitCode !== 0 || r.error) break;
    }
    const all = cases.length === ex.tests.length && cases.every((c) => c.ok);
    result = { type: "tests", cases, total: ex.tests.length, all };
    if (all) practice.passed.add(ex.id);
    else practice.passed.delete(ex.id);
  } else {
    $("runStatus").textContent = "Executando seu programa…";
    const r = await executeC(code, input);
    if (request !== practice.request) return;
    result = { type: "run", result: r };
  }
  practice.active = null;
  practice.results.set(key, result);
  setRunning(false);
  $("runStatus").textContent = "Finalizado.";
  showResult(result);
}
function showResult(data) {
  if (data.type === "run") {
    const r = data.result,
      ok = r.kind === "complete" && r.exitCode === 0 && !r.error;
    $("resultBadge").textContent = ok ? "Concluído" : "Revisar";
    $("resultBody").innerHTML =
      `<div class="feedback ${ok ? "good" : "bad"}">${esc(explainResult(r))}</div><h4>Saída do programa</h4><pre class="terminal">${esc(r.stdout || "(nenhuma saída)")}</pre>${r.stderr || r.error ? `<details open><summary>Detalhes do interpretador</summary><pre class="terminal">${esc(r.stderr || r.error)}</pre></details>` : ""}`;
  } else {
    $("resultBadge").textContent =
      `${data.cases.filter((c) => c.ok).length}/${data.total} testes`;
    $("resultBody").innerHTML =
      `<div class="feedback ${data.all ? "good" : "bad"}"><strong>${data.all ? "Sua saída passou em todos os testes deste exercício." : "Ainda há algo para ajustar."}</strong><p>${data.all ? "Revise também se você usou a estrutura pedida no enunciado. Esses testes verificam o resultado, não provam que toda solução possível está correta." : "Compare a entrada, a saída esperada e a sua saída. Confira os limites das condições e os valores iniciais."}</p></div>${data.cases.map((c, i) => `<details class="test-case" ${c.ok ? "" : "open"}><summary>${c.ok ? "✓" : "↻"} Teste ${i + 1} · ${c.ok ? "Passou" : "Revisar"}</summary><div class="test-comparison"><div><h4>Entrada</h4><pre class="sample">${esc(c.input || "(sem entrada)")}</pre></div><div><h4>Esperado</h4><pre class="sample">${esc(c.output)}</pre></div><div><h4>Seu resultado</h4><pre class="sample">${esc(c.result.stdout || "(nenhuma saída)")}</pre></div></div>${c.result.kind !== "complete" || c.result.exitCode !== 0 || c.result.error ? `<p>${esc(explainResult(c.result))}</p>` : ""}</details>`).join("")}${data.cases.length < data.total ? '<p class="muted">Os demais testes não foram executados porque o programa foi interrompido ou terminou com erro.</p>' : ""}`;
  }
}
function syncRoute() {
  if (restoringRoute) return;
  const url = new URL(pageRoutes[practice.view], siteBase);
  if (practice.view === "lab" && practice.selected)
    url.searchParams.set("exercicio", practice.selected);
  if (practice.view === "lessons" && state.index > 0)
    url.searchParams.set("aula", current().id);
  if (window.location.href !== url.href) window.history.pushState({}, "", url);
}
function syncLessonRoute() {
  if (practice.view === "lessons") syncRoute();
}
function restoreRoute() {
  rememberEditor();
  restoringRoute = true;
  const url = new URL(window.location.href);
  const relative = url.pathname.startsWith(siteBase.pathname)
    ? url.pathname.slice(siteBase.pathname.length)
    : "";
  const path = relative.replace(/index\.html$/, "").replace(/\/$/, "");
  const view =
    Object.keys(pageRoutes).find(
      (v) => pageRoutes[v].replace(/\/$/, "") === path,
    ) || "home";
  const exerciseId = url.searchParams.get("exercicio");
  practice.selected =
    view === "lab" && exercises.some((e) => e.id === exerciseId)
      ? exerciseId
      : null;
  setAppView(view, false);
  if (view === "lessons") {
    const lessonId = url.searchParams.get("aula");
    const index = lessons.findIndex((l) => l.id === lessonId);
    openLesson(index >= 0 ? index : 0);
  }
  restoringRoute = false;
}
document.querySelectorAll("[data-view]").forEach(
  (link) =>
    (link.onclick = (event) => {
      if (
        event &&
        (event.button > 0 ||
          event.ctrlKey ||
          event.metaKey ||
          event.shiftKey ||
          event.altKey)
      )
        return;
      event?.preventDefault();
      if (link.dataset.view === "lab") openFreeLab();
      else setAppView(link.dataset.view);
    }),
);
document.querySelector(".brand").onclick = (event) => {
  if (
    event &&
    (event.button > 0 ||
      event.ctrlKey ||
      event.metaKey ||
      event.shiftKey ||
      event.altKey)
  )
    return;
  event?.preventDefault();
  setAppView("home");
};
window.addEventListener("popstate", restoreRoute);
restoreRoute();
