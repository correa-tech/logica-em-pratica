"use strict";
// One short-lived worker per execution. The C interpreter and its virtual files live here.
importScripts("vendor/picoc-1.0.12.js");
importScripts("prepare-c.js");
postMessage({ type: "ready" });
onmessage = (event) => {
  const { code, input } = event.data || {};
  if (
    typeof code !== "string" ||
    typeof input !== "string" ||
    code.length > 20000 ||
    input.length > 4000
  ) {
    postMessage({
      type: "result",
      kind: "limit",
      message: "Use até 20 mil caracteres de código e 4 mil de entrada.",
    });
    return;
  }
  const prepared = prepareC(code);
  if (prepared.error) {
    postMessage({ type: "result", kind: "limit", message: prepared.error });
    return;
  }
  const bytes = new TextEncoder().encode(
    input + (input.endsWith("\n") ? "" : "\n"),
  );
  let cursor = 0,
    stdout = [],
    stderr = [],
    exitCode = 0,
    runtimeError = "",
    limited = false,
    done = false;
  const capture = (target) => (byte) => {
    if (stdout.length + stderr.length >= 20000) {
      limited = true;
      throw new Error("OUTPUT_LIMIT");
    }
    target.push(byte);
  };
  const finish = (failure = "") => {
    if (done) return;
    done = true;
    postMessage({
      type: "result",
      kind: limited ? "output-limit" : failure ? "runtime" : "complete",
      stdout: new TextDecoder().decode(new Uint8Array(stdout)),
      stderr: new TextDecoder().decode(new Uint8Array(stderr)),
      exitCode,
      error: failure || runtimeError,
      inputRead: cursor,
    });
  };
  try {
    const runtime = picocjs.createModule({
      stdin: () => (cursor < bytes.length ? bytes[cursor++] : null),
      stdout: capture(stdout),
      stderr: capture(stderr),
      printErr: (text) => {
        runtimeError = String(text).slice(0, 3000);
      },
      quit: (status, error) => {
        exitCode = status;
        throw error;
      },
      onAbort: () => {
        runtimeError = "A execução foi interrompida pelo interpretador.";
      },
    });
    runtime.then(() => {
      try {
        runtime.runc(prepared.code, () => {});
        finish();
      } catch (error) {
        finish(String((error && error.message) || error).slice(0, 3000));
      }
    });
  } catch (error) {
    finish(String((error && error.message) || error).slice(0, 3000));
  }
};
