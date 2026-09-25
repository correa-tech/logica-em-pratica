picoc-js 1.0.12, from https://www.npmjs.com/package/picoc-js
Source: https://github.com/KritR/picoc-js
MIT license in PICOC-LICENSE.txt.
Local change: expose the existing Emscripten module factory as createModule to configure stdin/stdout/stderr and completion in an isolated worker. No changes to the embedded WASM.

Integration note: prepare-c.js adapts literal scanf floating conversions to PicoC internal double storage (float is represented as double). Dynamic scanf formats are rejected with a visible explanation. This is a C subset interpreter, not an ISO C99 compiler.
