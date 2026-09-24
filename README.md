# Lógica em Prática

Projeto de apoio para aprender lógica e programação em C, com explicações em português, exercícios e execução no navegador.

## Começar no seu computador

Você precisa de **Node.js 22 ou mais recente** com npm. Não há dependências npm para instalar neste projeto.

1. Extraia o ZIP e abra a pasta `logica-em-pratica` no seu editor.
2. Abra um terminal nessa pasta.
3. Execute:

```bash
npm run dev
```

Abra `http://localhost:3000/`. Edite os arquivos dentro de `src`, salve e atualize o navegador. O servidor regenera as páginas quando você salva; o navegador não recarrega sozinho. Para encerrar, use Ctrl+C.

No Fedora, você pode abrir essa pasta no terminal e no editor que já utiliza. Confira a versão instalada com `node --version` e `npm --version`.

**Abra pelo servidor local, não dando dois cliques no HTML.** O laboratório utiliza Web Workers, que precisam de uma origem HTTP ou HTTPS.

## Páginas

| Endereço        | Conteúdo                                    |
| --------------- | ------------------------------------------- |
| `/`             | Apresentação do projeto e acesso às áreas   |
| `/aulas/`       | 22 aulas, exemplos por linha e 44 perguntas |
| `/exercicios/`  | 12 desafios para escrever código            |
| `/laboratorio/` | Editor C, entrada, saída, erros e testes    |

As páginas têm arquivos HTML próprios. É possível abrir diretamente seus endereços e atualizá-las. A navegação entre áreas mantém o mesmo documento quando possível, preservando os rascunhos em memória durante a visita. Recarregar ou fechar a página reinicia esses dados.

Você também pode compartilhar uma aula ou exercício específico:

- `/aulas/?aula=if-else`
- `/laboratorio/?exercicio=soma`

## Onde editar

| Arquivo ou pasta          | O que você muda                                           |
| ------------------------- | --------------------------------------------------------- |
| `src/layout.html`         | Apresentação, cabeçalho, menu, estrutura e rodapé         |
| `src/assets/styles.css`   | Cores, fontes, espaçamentos e adaptação ao celular        |
| `src/assets/lessons.js`   | Aulas originais, exemplos e perguntas                     |
| `src/assets/course.js`    | Ordem dos degraus, aulas adicionais e desafios com testes |
| `src/assets/app.js`       | Interações das aulas e perguntas                          |
| `src/assets/practice.js`  | Editor, exercícios, feedback, navegação e endereços       |
| `src/assets/c-worker.js`  | Execução isolada de C e limites de tempo/saída            |
| `src/assets/prepare-c.js` | Compatibilidade dos formatos de scanf com o interpretador |
| `src/assets/vendor/`      | Interpretador PicoC e sua licença                         |
| `scripts/build.mjs`       | Geração das quatro páginas e seus títulos                 |
| `scripts/dev.mjs`         | Servidor local de desenvolvimento                         |
| `vercel.json`             | Configuração de publicação na Vercel                      |

A pasta `dist` é gerada: **edite `src`, não `dist`**. O próximo build substitui o conteúdo de `dist`.

## Conferir antes de publicar

```bash
npm run check
```

Esse comando gera as páginas e verifica sintaxe JavaScript e referências locais. Ele não substitui testar o site no navegador.

Confira no navegador:

1. Abra cada uma das quatro páginas diretamente e atualize.
2. Abra uma aula e clique nas linhas do exemplo.
3. No exercício “Somar dois inteiros”, execute uma solução com entrada `4 6`; a saída deve ser `10`.
4. Use “Verificar testes” e confira os casos apresentados.
5. Altere uma condição, remova um `;` e observe as mensagens.
6. Troque de área e volte: o rascunho deve permanecer na mesma visita.
7. Experimente também no celular.

## GitHub e Vercel

O guia passo a passo está em [PUBLICAR.md](PUBLICAR.md).

Configuração já preparada:

- Framework Preset: **Other**
- Build Command: **npm run build**
- Output Directory: **dist**
- Root Directory: a pasta que contém `package.json`
- Variáveis de ambiente: nenhuma necessária nesta versão

O campo `private: true` no `package.json` evita publicação acidental como pacote npm. Ele **não** torna o site privado.

## Como o laboratório funciona

O código C é executado no navegador, em um Web Worker, com PicoC compilado para WebAssembly. Não há API paga, chave secreta, servidor de compilação nem dependência de ChatGPT para o funcionamento desta versão.

PicoC implementa um subconjunto de C, não todo o padrão C99. As aulas seguem C99, mas certos programas válidos no Dev-C++ podem não funcionar neste laboratório. Use o ambiente da disciplina para esses casos.

- Entrada preenchida antes da execução, não um console interativo durante o programa.
- Limite de 3 segundos por execução e limite de saída para impedir travamentos comuns.
- Limites de 20 mil caracteres de código e 4 mil de entrada.
- Para `scanf`, use o formato diretamente entre aspas.
- Sem login, banco de dados ou histórico permanente de alunos.
- Os testes comparam a saída; não verificam se o aluno usou exatamente a estrutura pedida.

O adaptador de `scanf` é necessário porque PicoC representa `float` internamente como `double`. Ele adapta formatos literais para a representação do interpretador, preservando o código C escrito no editor. Veja `src/assets/vendor/README.txt`.

## Conteúdo e terceiros

As explicações e os enunciados são próprios, organizados pelos temas da disciplina. O glossário do professor Manfred Heil Junior está incluído em `src/assets/materiais/glossario-fundamentos-programacao.pdf`, com autorização do autor confirmada por Guilherme. O documento original e seus créditos foram preservados. A página inicial oferece links para abrir e baixar o PDF, além do contato de Guilherme para feedback pelo WhatsApp.

O interpretador `picoc-js` 1.0.12 está incluído para o laboratório funcionar sem carregar scripts de um CDN. Preserve `src/assets/vendor/PICOC-LICENSE.txt` e as atribuições ao distribuí-lo.

Este pacote contém o código desta versão do site. Ele não contém o histórico Git da hospedagem anterior, credenciais ou vínculo com aquela hospedagem.
