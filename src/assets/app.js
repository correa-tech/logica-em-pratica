"use strict";
const $ = (id) => document.getElementById(id);
const esc = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (char) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        char
      ],
  );
const state = {
  index: 0,
  stage: 0,
  line: 0,
  symbol: "{ }",
  completed: new Set(),
  quizzes: {},
  lab: {},
};
const titles = ["Entender", "Explorar", "Praticar"];
const symbols = {
  "{ }":
    "Chaves: delimitam um bloco de instruções, como o de main, if ou else. Cada abertura tem um fechamento. Na inicialização de um vetor, também podem agrupar valores.",
  "( )":
    'Parênteses: envolvem a condição de if e while, os argumentos de uma chamada como printf("Oi") e os parâmetros de uma função. Também agrupam expressões em contas.',
  ";": 'Ponto e vírgula: encerra instruções como int idade = 21; e printf("Oi");. Não é colocado automaticamente em toda linha. Também separa as três partes do for.',
  '" "':
    'Aspas duplas: delimitam um texto, como "Ola". As aspas fazem parte do código; normalmente não aparecem na saída.',
  "' '":
    "Aspas simples: delimitam uma constante de caractere, como 'A'. Para os exemplos de char desta trilha, use um caractere entre aspas simples.",
  "=": "Um igual: atribui um valor. Em idade = 21, o valor 21 é guardado em idade.",
  "==": "Dois iguais: comparam valores. idade == 21 pergunta se idade vale 21; não altera idade.",
  "\\n":
    "Barra invertida e n: dentro de um texto, representam uma nova linha na saída.",
  "&": "Em &idade, obtém o endereço da variável. scanf usa esse endereço para guardar a entrada. && é outro operador: o E lógico.",
  "[ ]":
    "Colchetes: declaram o tamanho de um vetor ou acessam um elemento pelo índice, como notas[0].",
  "//": "Duas barras: iniciam um comentário que vai até o fim da linha. Comentários explicam o código para quem lê e não são executados.",
};
const current = () => lessons[state.index];
const qstate = () =>
  (state.quizzes[current().id] ||= {
    index: 0,
    selected: null,
    checked: false,
    hint: false,
    done: false,
  });
function resetLab() {
  state.lab = {
    step: 0,
    note: 7,
    input: "21",
    output: "",
    status: "",
    journey: 0,
  };
}
function openLesson(index) {
  if (!Number.isInteger(index) || index < 0 || index >= lessons.length)
    throw new Error("Aula inválida.");
  state.index = index;
  state.stage = 0;
  state.line = current().focus;
  resetLab();
  render();
  if (typeof syncLessonRoute === "function") syncLessonRoute();
}
function goStage(stage) {
  if (!Number.isInteger(stage) || stage < 0 || stage > 2)
    throw new Error("Etapa inválida.");
  state.stage = stage;
  render();
}
function render() {
  renderSidebar();
  renderHeader();
  renderContent();
  $("lessonNav").innerHTML =
    `<button class="text-button" id="prevLesson" ${state.index === 0 ? "disabled" : ""}>← Aula anterior</button><button class="text-button" id="nextLesson">${state.index === lessons.length - 1 ? "Voltar ao início" : "Próxima aula →"}</button>`;
  $("prevLesson").onclick = () => openLesson(state.index - 1);
  $("nextLesson").onclick = () =>
    openLesson((state.index + 1) % lessons.length);
}
function renderSidebar() {
  let item = current();
  $("levels").innerHTML = ["Básico", "Intermediário", "Avançado"]
    .map(
      (level) =>
        `<button class="level ${item.level === level ? "active" : ""}" data-level="${level}" aria-pressed="${item.level === level}">${level}</button>`,
    )
    .join("");
  $("levelHelp").textContent = {
    Básico: "Primeiros cliques e degrau 1: dados, contas, entrada e saída.",
    Intermediário: "Degraus 2 e 3: decisões e repetições.",
    Avançado:
      "Degraus 4 e 5: vetores, matrizes e funções. Ao final, temas complementares.",
  }[item.level];
  $("lessonList").innerHTML = lessons
    .map((lesson, index) => ({ lesson, index }))
    .filter((x) => x.lesson.level === item.level)
    .map(
      (x, i) =>
        `<button class="lesson-link ${x.index === state.index ? "active" : ""}" data-lesson="${x.index}" ${x.index === state.index ? 'aria-current="page"' : ""}><span class="number">${state.completed.has(x.lesson.id) ? "✓" : String(i + 1).padStart(2, "0")}</span><span><strong>${esc(x.lesson.title)}</strong><small>${x.lesson.time}${state.completed.has(x.lesson.id) ? " · concluída" : ""}</small></span></button>`,
    )
    .join("");
  document
    .querySelectorAll("[data-level]")
    .forEach(
      (b) =>
        (b.onclick = () =>
          openLesson(lessons.findIndex((x) => x.level === b.dataset.level))),
    );
  document
    .querySelectorAll("[data-lesson]")
    .forEach((b) => (b.onclick = () => openLesson(Number(b.dataset.lesson))));
  $("progressText").textContent =
    `${state.completed.size} de ${lessons.length} aulas concluídas`;
  $("progress").max = lessons.length;
  $("progress").value = state.completed.size;
}
function renderHeader() {
  const l = current();
  $("lessonHeading").innerHTML =
    `<div class="lesson-meta"><span class="pill">${l.level}</span><span>${l.time} · no seu ritmo</span><span>${esc(degrauNames[l.degrau])}</span></div><h2 id="lessonTitle">${esc(l.title)}</h2><p class="goal">${esc(l.goal)}</p>`;
  $("stages").innerHTML = titles
    .map(
      (t, i) =>
        `<button class="stage ${state.stage === i ? "active" : ""}" data-stage="${i}" ${state.stage === i ? 'aria-current="step"' : ""}>${i + 1}. ${t}</button>`,
    )
    .join("");
  document
    .querySelectorAll("[data-stage]")
    .forEach((b) => (b.onclick = () => goStage(Number(b.dataset.stage))));
}
function renderContent() {
  if (state.stage === 0) renderLearn();
  else if (state.stage === 1) renderExplore();
  else renderPractice();
  const content = $("content");
  content.classList.remove("reveal-stagger");
  void content.offsetWidth;
  content.classList.add("reveal-stagger");
}
function renderLearn() {
  const l = current();
  $("content").innerHTML =
    `<p class="lead">${esc(l.intro)}</p>${l.paragraphs.map(([h, p]) => `<section class="learn-block"><h3>${esc(h)}</h3><p>${esc(p)}</p></section>`).join("")}<div class="callout"><strong>Guarde esta ideia:</strong> ${esc(l.tip)}</div><button class="action" id="toExplore">Explorar o exemplo →</button>`;
  $("toExplore").onclick = () => goStage(1);
}
function lineDescription(index) {
  const l = current(),
    line = l.code.split("\n")[index].trim();
  if (l.lab === "condition" && index === 3)
    return `Guarda ${state.lab.note} em nota. Use o campo abaixo para comparar caminhos diferentes.`;
  if (l.notes && l.notes[index]) return l.notes[index];
  if (line === "#include <stdio.h>")
    return "Inclui as declarações do cabeçalho stdio.h, necessárias para usar funções de entrada e saída como printf e scanf. Esta linha não mostra nada e não recebe ;.";
  if (line === "")
    return "Linha em branco: ajuda a separar partes do código visualmente. Não executa uma ação.";
  if (line === "int main(void) {")
    return "main é o ponto de partida deste programa. int indica o tipo do valor devolvido; void informa que esta forma de main não recebe parâmetros. A { abre o bloco de main.";
  if (line === "return 0;")
    return "Encerra esta chamada de função e devolve 0. Em main, 0 indica término com sucesso. O ; encerra a instrução.";
  if (index === l.code.split("\n").length - 1 && line === "}")
    return "Esta } fecha o bloco de main, aberto na linha int main(void) {. Ela não precisa de ; depois.";
  return "Esta linha faz parte do exemplo. Observe a explicação da aula e os limites do bloco em que ela aparece.";
}
function displayedCode() {
  return current().lab === "condition"
    ? current().code.replace("int nota = 7;", `int nota = ${state.lab.note};`)
    : current().code;
}
function renderCode() {
  const l = current();
  $("codeLines").innerHTML = displayedCode()
    .split("\n")
    .map(
      (line, i) =>
        `<button class="code-line ${state.line === i ? "selected" : ""} ${l.lab === "condition" && i >= 4 && i <= 5 ? "path-yes" : ""} ${l.lab === "condition" && i >= 6 && i <= 8 ? "path-no" : ""} ${l.lab === "condition" && i === 9 ? "path-after" : ""}" data-line="${i}" aria-pressed="${state.line === i}" aria-label="Linha ${i + 1}: ${esc(line || "linha em branco")}"><span class="line-no" aria-hidden="true">${i + 1}</span><span>${esc(line || " ")}</span></button>`,
    )
    .join("");
  $("lineNote").innerHTML =
    `<strong>Linha ${state.line + 1}, sem mistério</strong>${esc(lineDescription(state.line))}`;
  document.querySelectorAll("[data-line]").forEach(
    (b) =>
      (b.onclick = () => {
        state.line = Number(b.dataset.line);
        renderCode();
      }),
  );
}
function renderExplore() {
  const l = current();
  $("content").innerHTML =
    `<p>Toque ou clique em uma linha para entender o que ela faz. O número à esquerda só ajuda a localizar a linha; não faz parte do código.</p><div class="code-box"><div class="code-toolbar"><span>exemplo.c · programa completo</span><button id="copyCode">Copiar código</button></div><div class="code-scroll" id="codeLines"></div></div>${l.lab === "condition" ? '<div class="legend"><span>Bloco do if</span><span>Bloco do else</span><span>Depois da decisão</span></div>' : ""}<div class="line-note" id="lineNote" role="status"></div><div id="lab"></div><details class="symbol-guide"><summary>Não entendi um símbolo</summary><div class="symbols">${Object.keys(
      symbols,
    )
      .map(
        (s) =>
          `<button class="symbol" data-symbol="${esc(s)}" aria-pressed="${s === state.symbol}">${esc(s)}</button>`,
      )
      .join(
        "",
      )}</div><div class="symbol-description" id="symbolDescription" role="status">${esc(symbols[state.symbol])}</div></details><div class="actions"><button class="secondary" id="backLearn">← Reler a explicação</button><button class="action" id="toPractice">Agora, praticar →</button><button class="secondary" id="tryCode">Editar e executar este C</button></div>`;
  renderCode();
  renderLab();
  $("copyCode").onclick = async () => {
    try {
      await navigator.clipboard.writeText(displayedCode());
      $("copyCode").textContent = "Código copiado";
    } catch {
      $("copyCode").textContent = "Não foi possível copiar";
    }
  };
  document.querySelectorAll("[data-symbol]").forEach(
    (b) =>
      (b.onclick = () => {
        state.symbol = b.dataset.symbol;
        document
          .querySelectorAll("[data-symbol]")
          .forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
        $("symbolDescription").textContent = symbols[state.symbol];
      }),
  );
  $("backLearn").onclick = () => goStage(0);
  $("toPractice").onclick = () => goStage(2);
  $("tryCode").onclick = () => openFreeLab(displayedCode());
}
function renderLab() {
  const l = current();
  if (l.lab === "journey") {
    const steps = ["Salvar aula.c", "Compilar", "Executar", "Recomeçar"];
    $("lab").innerHTML =
      `<section class="lab"><h3>Do código ao resultado</h3><p>O exemplo acima já está escrito. Use os botões para conhecer as próximas etapas.</p><div class="muted">Simulação guiada: representa as etapas, sem criar arquivos no seu computador.</div><div class="actions"><button class="action" id="journeyNext">${steps[state.lab.journey]}</button></div><div class="lab-status" id="journeyStatus" role="status">${["1 de 4 · Escrever: as instruções estão no exemplo.c acima.", "2 de 4 · Salvar: nesta simulação, o código foi guardado como aula.c. A extensão .c identifica o código em C.", "3 de 4 · Compilar: neste exemplo correto, o compilador poderia preparar um programa executável. Erros de escrita podem impedir essa etapa.", "4 de 4 · Executar: o programa chama printf e mostra a mensagem abaixo."][state.lab.journey]}</div><pre class="terminal" aria-label="Saída simulada">${state.lab.journey === 3 ? "Ola, turma!" : "A saída vai aparecer depois de Executar."}</pre></section>`;
    $("journeyNext").onclick = () => {
      state.lab.journey = (state.lab.journey + 1) % 4;
      renderLab();
    };
    return;
  }
  if (l.lab === "condition") {
    $("lab").innerHTML =
      `<section class="lab"><h3>Qual caminho será executado?</h3><p>Mude a nota e avance uma etapa por vez. A linha em destaque acompanha a simulação do exemplo.</p><label for="grade">Nota inteira, de 0 a 10</label><input id="grade" type="number" min="0" max="10" step="1" value="${state.lab.note}" inputmode="numeric"><div class="actions"><button class="action" id="stepCondition">${state.lab.step === 5 ? "Executar de novo" : "Avançar uma etapa"}</button><button class="secondary" id="resetCondition">Reiniciar</button></div><div class="lab-status" id="labStatus" role="status">${esc(state.lab.status || "Comece pela variável: toque em Avançar uma etapa.")}</div><pre class="terminal" id="labOutput" aria-label="Saída simulada">${esc(state.lab.output || "Nenhuma mensagem mostrada ainda.")}</pre></section>`;
    $("grade").oninput = () => {
      const value = $("grade").value;
      if (
        value.trim() === "" ||
        !Number.isInteger(Number(value)) ||
        Number(value) < 0 ||
        Number(value) > 10
      ) {
        $("labStatus").textContent = "Use um número inteiro de 0 a 10.";
        $("stepCondition").disabled = true;
        return;
      }
      state.lab.note = Number(value);
      state.lab.step = 0;
      state.lab.output = "";
      state.lab.status = "Nota alterada. A simulação recomeça pelo início.";
      state.line = 3;
      renderCode();
      $("labStatus").textContent = state.lab.status;
      $("labOutput").textContent = "Nenhuma mensagem mostrada ainda.";
      $("stepCondition").disabled = false;
      $("stepCondition").textContent = "Avançar uma etapa";
    };
    $("stepCondition").onclick = () => stepCondition();
    $("resetCondition").onclick = () => {
      state.lab.step = 0;
      state.lab.output = "";
      state.lab.status = "Simulação reiniciada.";
      state.line = 3;
      renderCode();
      renderLab();
    };
    return;
  }
  if (l.lab === "input") {
    $("lab").innerHTML =
      `<section class="lab"><h3>Experimente uma entrada</h3><p>Digite 21 para testar um inteiro, ou abc para observar uma falha de leitura.</p><label for="entry">Entrada para scanf</label><input id="entry" type="text" value="${esc(state.lab.input)}" maxlength="30"><div class="actions"><button class="action" id="readInput">Simular leitura</button></div><div class="lab-status" id="labStatus" role="status"></div><pre class="terminal" id="labOutput" aria-label="Saída simulada">Aguardando entrada.</pre><p class="muted">Esta simulação aceita números inteiros de −1000 a 1000 para praticar. Não é um compilador de C.</p></section>`;
    $("readInput").onclick = () => {
      state.lab.input = $("entry").value;
      let match = state.lab.input.match(/^\s*[+-]?\d+/),
        n = match ? Number(match[0]) : null;
      if (n !== null && (n < -1000 || n > 1000)) {
        $("labStatus").textContent =
          "Para esta simulação, use um inteiro de −1000 a 1000.";
        $("labOutput").textContent = "Leitura não simulada.";
        return;
      }
      $("labOutput").textContent = match
        ? `Digite sua idade:\nVoce digitou: ${n}\n`
        : "Digite sua idade:\nEntrada invalida\n";
      $("labStatus").textContent = match
        ? "scanf converte um inteiro e retorna 1. O programa segue até mostrar idade. Se houver texto após o número, essa leitura com %d pode deixar esse restante na entrada."
        : "scanf não encontra um inteiro no começo da entrada e não retorna 1. O bloco de erro mostra a mensagem e return 1 encerra o programa.";
      state.line = match ? 9 : 6;
      renderCode();
    };
    return;
  }
  $("lab").innerHTML =
    `<section class="lab"><h3>Veja a saída</h3><p>Antes de revelar, tente prever o resultado lendo as linhas do exemplo.</p><div class="muted">Demonstração da saída deste exemplo fixo. Não executa código livre.</div><div class="actions"><button class="action" id="revealOutput">${state.lab.output ? "Ocultar saída" : "Revelar saída do exemplo"}</button></div><pre class="terminal" id="labOutput" aria-label="Saída esperada">${esc(state.lab.output || "O resultado fica aqui.")}</pre></section>`;
  $("revealOutput").onclick = () => {
    state.lab.output = state.lab.output ? "" : l.output;
    renderLab();
  };
}
function stepCondition() {
  if (state.lab.step >= 5) {
    state.lab.step = 0;
    state.lab.output = "";
  }
  const good = state.lab.note >= 6;
  state.lab.step++;
  const step = state.lab.step;
  state.line = [3, 4, good ? 5 : 7, 9, 10][step - 1];
  state.lab.status = [
    `1 de 5 · A variável nota recebe ${state.lab.note}.`,
    `2 de 5 · ${state.lab.note} >= 6 é ${good ? "verdadeiro" : "falso"}. O caminho escolhido é o ${good ? "if" : "else"}.`,
    `3 de 5 · Executa printf dentro das chaves do ${good ? "if" : "else"}. O outro bloco é pulado.`,
    '4 de 5 · Depois da chave que fecha else, printf("Fim\\n"); executa nos dois caminhos.',
    "5 de 5 · return 0 encerra main com sucesso.",
  ][step - 1];
  if (step === 3) state.lab.output = good ? "Aprovado\n" : "Revisar\n";
  if (step === 4) state.lab.output += "Fim\n";
  renderCode();
  renderLab();
}
function renderPractice() {
  const l = current(),
    qs = qstate();
  if (qs.done) {
    $("content").innerHTML =
      `<div class="success-mark" aria-hidden="true">✓</div><h3>Você concluiu esta aula.</h3><p>Você acertou os dois exercícios. Pode rever as linhas do exemplo ou seguir no seu ritmo.</p><div class="actions"><button class="secondary" id="retryLesson">Refazer exercícios</button><button class="action" id="continueLesson">${state.index === lessons.length - 1 ? "Voltar à primeira aula" : "Seguir para a próxima aula →"}</button></div>`;
    $("retryLesson").onclick = () => {
      state.quizzes[l.id] = {
        index: 0,
        selected: null,
        checked: false,
        hint: false,
        done: false,
      };
      renderPractice();
    };
    $("continueLesson").onclick = () =>
      openLesson((state.index + 1) % lessons.length);
    return;
  }
  const q = l.questions[qs.index];
  $("content").innerHTML =
    `<div class="question-count">EXERCÍCIO ${qs.index + 1} DE ${l.questions.length}</div><h3>${esc(q.question)}</h3><p>Escolha uma resposta. Depois clique em Conferir para entender o raciocínio.</p><div class="options" role="group" aria-label="Alternativas">${q.options.map((o, i) => `<button class="option ${qs.selected === i ? "selected" : ""} ${qs.checked && qs.selected === i ? (i === q.answer ? "correct" : "wrong") : ""}" data-choice="${i}" aria-pressed="${qs.selected === i}" ${qs.checked ? "disabled" : ""}><span class="option-letter" aria-hidden="true">${String.fromCharCode(65 + i)}</span><span>${esc(o)}</span></button>`).join("")}</div><div class="actions"><button class="action" id="checkAnswer" ${qs.selected === null || qs.checked ? "disabled" : ""}>Conferir resposta</button><button class="text-button" id="showHint">${qs.hint ? "Ocultar dica" : "Preciso de uma dica"}</button></div>${qs.hint ? `<div class="hint">${esc(q.hint)}</div>` : ""}<div id="feedback" role="status">${qs.checked ? `<div class="feedback ${qs.selected === q.answer ? "good" : "bad"}"><strong>${qs.selected === q.answer ? "Isso! Veja por quê:" : "Vamos olhar essa resposta com calma."}</strong><p>${esc(q.explanations[qs.selected])}</p></div><button class="${qs.selected === q.answer ? "action" : "secondary"}" id="afterAnswer">${qs.selected === q.answer ? (qs.index + 1 === l.questions.length ? "Concluir aula" : "Próximo exercício →") : "Tentar novamente"}</button>` : ""}</div><div class="actions"><button class="text-button" id="reviewExample">← Voltar ao exemplo explicado</button></div>`;
  document.querySelectorAll("[data-choice]").forEach(
    (b) =>
      (b.onclick = () => {
        qs.selected = Number(b.dataset.choice);
        renderPractice();
        const focused = document.querySelector(
          `[data-choice="${qs.selected}"]`,
        );
        focused?.focus({ preventScroll: true });
      }),
  );
  $("checkAnswer").onclick = () => {
    if (qs.selected === null) return;
    qs.checked = true;
    renderPractice();
  };
  $("showHint").onclick = () => {
    qs.hint = !qs.hint;
    renderPractice();
  };
  $("reviewExample").onclick = () => goStage(1);
  if ($("afterAnswer"))
    $("afterAnswer").onclick = () => {
      if (qs.selected !== q.answer) {
        qs.selected = null;
        qs.checked = false;
      } else if (qs.index + 1 < l.questions.length) {
        qs.index++;
        qs.selected = null;
        qs.checked = false;
        qs.hint = false;
      } else {
        qs.done = true;
        state.completed.add(l.id);
        renderSidebar();
      }
      renderPractice();
    };
}
openLesson(0);
document.querySelector(".brand").onclick = (e) => {
  e.preventDefault();
  openLesson(0);
};
