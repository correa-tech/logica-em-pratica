export function createCExecution(code, input) {
  let worker;
  let timer;
  let finished = false;
  let resolveResult;
  const promise = new Promise((resolve) => {
    resolveResult = resolve;
  });
  const finish = (value) => {
    if (finished) return;
    finished = true;
    clearTimeout(timer);
    worker?.terminate();
    resolveResult(value);
  };
  const stop = () => finish({ kind: "stopped", error: "A execução foi interrompida." });
  try {
    worker = new Worker(`${import.meta.env.BASE_URL}c-worker.js`);
    timer = setTimeout(() => finish({ kind: "timeout", error: "O ambiente demorou para carregar. Tente executar novamente." }), 15000);
    worker.onmessage = ({ data }) => {
      if (data.type === "ready") {
        clearTimeout(timer);
        timer = setTimeout(() => finish({ kind: "timeout", error: "A execução passou de 3 segundos." }), 3000);
        worker.postMessage({ code, input });
      } else if (data.type === "result") {
        finish(data);
      }
    };
    worker.onerror = () => finish({ kind: "load-error", error: "Não foi possível iniciar o interpretador. Confira se o servidor está ativo e tente novamente." });
  } catch {
    finish({ kind: "load-error", error: "Este navegador não conseguiu iniciar a execução de C." });
  }
  return { promise, stop };
}

export const normalizeOutput = (value) => String(value || "").replace(/\r\n/g, "\n").trim();
