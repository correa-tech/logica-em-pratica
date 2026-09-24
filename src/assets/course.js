// Organização e exercícios próprios, orientados pelos tópicos do glossário da disciplina.
const extraLessons = [
  {
    id: "else-if",
    level: "Intermediário",
    title: "Mais caminhos com else if",
    time: "8 min",
    goal: "Escolher entre três resultados sem executar todos os caminhos.",
    intro:
      "Quando há mais de duas possibilidades, else if acrescenta uma nova pergunta. As condições são avaliadas na ordem em que aparecem.",
    paragraphs: [
      [
        "Uma decisão em sequência",
        "Primeiro verificamos se a nota é pelo menos 7. Só se isso for falso verificamos se é pelo menos 5. O else final cobre o que sobrou.",
      ],
      [
        "Um bloco escolhido",
        "Nessa cadeia, quando uma condição é verdadeira, seu bloco executa e os outros caminhos são pulados. Com nota 8, o resultado é Aprovado, embora 8 também seja maior que 5.",
      ],
    ],
    code: program(
      '    float nota = 5.5f;\n    if (nota >= 7) {\n        printf("Aprovado\\n");\n    } else if (nota >= 5) {\n        printf("Recuperacao\\n");\n    } else {\n        printf("Reprovado\\n");\n    }',
    ),
    output: "Recuperacao\n",
    focus: 6,
    notes: {
      3: "float guarda um número com parte decimal. O f em 5.5f indica uma constante do tipo float.",
      4: "Se nota for pelo menos 7, entra neste bloco.",
      5: "É executado apenas pelo primeiro caminho.",
      6: "Fecha o if e testa outra condição somente quando a primeira foi falsa.",
      7: "Com 5.5, este é o caminho escolhido.",
      8: "Fecha o else if e abre o último caminho.",
      9: "Só executa se as duas condições anteriores forem falsas.",
      10: "Fecha o último bloco da decisão.",
    },
    tip: "A ordem importa. Se testar nota >= 5 antes de nota >= 7, uma nota 8 já entrará no primeiro caminho.",
    questions: [
      quiz(
        "Com nota 8, qual mensagem aparece?",
        ["Aprovado", "Aprovado e Recuperacao", "Reprovado"],
        0,
        [
          "Isso. A primeira condição já é verdadeira; os demais caminhos são pulados.",
          "Em uma cadeia if / else if / else, escolhemos apenas um caminho.",
          "8 satisfaz a primeira condição.",
        ],
        "Comece avaliando o primeiro if.",
      ),
      quiz(
        "Quando o último else executa?",
        [
          "Sempre",
          "Quando nenhuma condição anterior é verdadeira",
          "Só quando nota é 5",
        ],
        1,
        [
          "O else é um caminho alternativo, não uma instrução obrigatória.",
          "Certo. Aqui isso acontece para notas menores que 5.",
          "Com nota 5, o else if é verdadeiro.",
        ],
        "Veja quais notas não passam em nenhuma pergunta.",
      ),
    ],
  },
  {
    id: "switch",
    level: "Intermediário",
    title: "Menus com switch e case",
    time: "9 min",
    goal: "Selecionar uma ação a partir de um valor inteiro.",
    intro:
      "switch facilita escolher entre valores específicos. Cada case identifica uma opção; default trata os valores que não têm um case correspondente.",
    paragraphs: [
      [
        "O papel de break",
        "Após executar um case, break encerra o switch. Sem ele, a execução pode continuar nas instruções dos cases seguintes.",
      ],
      [
        "Os símbolos do menu",
        "Os parênteses guardam o valor que será examinado. As chaves envolvem o switch inteiro. Cada case tem dois-pontos : antes das instruções.",
      ],
    ],
    code: program(
      '    int opcao = 2;\n    switch (opcao) {\n        case 1:\n            printf("Cadastrar\\n");\n            break;\n        case 2:\n            printf("Consultar\\n");\n            break;\n        default:\n            printf("Opcao invalida\\n");\n    }',
    ),
    output: "Consultar\n",
    focus: 8,
    notes: {
      3: "Define a opção do menu como 2.",
      4: "Compara opcao com os valores de cada case.",
      5: "Ponto de entrada quando opcao vale 1.",
      6: "Ação da opção 1.",
      7: "Sai do switch, evitando continuar no próximo case.",
      8: "Ponto de entrada quando opcao vale 2.",
      9: "Ação da opção 2: é a saída deste exemplo.",
      10: "Encerra o switch.",
      11: "Usado quando nenhum case corresponde.",
      12: "Mensagem para as demais opções.",
      13: "Fecha o bloco de switch.",
    },
    tip: "switch trabalha com valores de tipos inteiros, incluindo char. Não use faixas como case nota >= 7; para faixas, prefira if e else if.",
    questions: [
      quiz(
        "O que break faz neste exemplo?",
        ["Sai do switch", "Fecha o programa inteiro", "Repete o case"],
        0,
        [
          "Isso. A execução continua após o bloco do switch.",
          "break sai da estrutura, não da função main.",
          "break interrompe; não repete.",
        ],
        "Observe onde a execução deve continuar após o case.",
      ),
      quiz(
        "Com opcao = 9, qual caminho é usado?",
        ["case 1", "case 2", "default"],
        2,
        [
          "9 não corresponde ao valor 1.",
          "9 não corresponde ao valor 2.",
          "Certo. Nenhum case corresponde a 9.",
        ],
        "Procure o caminho para as opções não listadas.",
      ),
    ],
  },
  {
    id: "do-while",
    level: "Intermediário",
    title: "Executar antes de testar: do while",
    time: "8 min",
    goal: "Entender por que do while executa pelo menos uma vez.",
    intro:
      "No do while, o bloco acontece antes da primeira verificação. Isso é útil quando precisamos fazer uma ação ao menos uma vez.",
    paragraphs: [
      [
        "Primeiro faz, depois pergunta",
        "Mesmo começando com contador igual a 4, este exemplo mostra 4. Só depois testa contador <= 3 e termina.",
      ],
      [
        "O ; no final",
        "A estrutura é do { instruções } while (condição);. Diferentemente da abertura do while comum, o fechamento do do while inclui um ponto e vírgula.",
      ],
    ],
    code: program(
      '    int contador = 4;\n    do {\n        printf("%d\\n", contador);\n        contador++;\n    } while (contador <= 3);',
    ),
    output: "4\n",
    focus: 7,
    notes: {
      3: "Começa em 4, que já é maior que 3.",
      4: "Inicia o bloco, sem testar uma condição antes.",
      5: "Mostra 4 na primeira execução.",
      6: "Aumenta contador para 5.",
      7: "Testa 5 <= 3, que é falso, e termina. O ; encerra a estrutura.",
    },
    tip: "O while comum pode executar zero vezes; do while executa pelo menos uma. Escolha conforme a necessidade do problema.",
    questions: [
      quiz(
        "Quantas vezes o bloco executa neste exemplo?",
        ["0", "1", "4"],
        1,
        [
          "No do while, a primeira execução vem antes do teste.",
          "Isso. Mostra 4 uma vez, atualiza para 5 e encontra uma condição falsa.",
          "4 é o valor inicial, não a quantidade de repetições.",
        ],
        "Localize o teste: ele está depois do bloco.",
      ),
      quiz(
        "O que deve aparecer após while (contador <= 3) ao fechar este do while?",
        ["Um ;", "Outro do", "Um case"],
        0,
        [
          "Certo. Essa forma de repetição termina com ;.",
          "Não iniciamos outro do para fechar este.",
          "case pertence à seleção com switch.",
        ],
        "Confira a última linha da repetição.",
      ),
    ],
  },
  {
    id: "matrizes",
    level: "Avançado",
    title: "Matrizes: linhas e colunas",
    time: "10 min",
    goal: "Acessar e percorrer uma tabela de valores do mesmo tipo.",
    intro:
      "Uma matriz permite organizar valores em linhas e colunas. Em C, um vetor de vetores pode representar essa tabela.",
    paragraphs: [
      [
        "Dois índices",
        "int tabela[2][2] reserva duas linhas de dois inteiros. tabela[1][0] identifica a segunda linha e a primeira coluna, pois os índices começam em zero.",
      ],
      [
        "Dois laços",
        "O for externo percorre as linhas. Para cada linha, o for interno visita as colunas. A soma recebe cada valor uma única vez.",
      ],
    ],
    code: program(
      '    int tabela[2][2] = {{1, 2}, {3, 4}};\n    int soma = 0;\n    for (int linha = 0; linha < 2; linha++) {\n        for (int coluna = 0; coluna < 2; coluna++) {\n            soma += tabela[linha][coluna];\n        }\n    }\n    printf("%d\\n", soma);',
    ),
    output: "10\n",
    focus: 3,
    notes: {
      3: "Primeira linha: 1 e 2. Segunda linha: 3 e 4. Todos são int.",
      4: "Começa o acumulador em zero.",
      5: "Escolhe a linha: 0 e depois 1.",
      6: "Para cada linha, percorre as colunas 0 e 1.",
      7: "+= soma o elemento atual ao valor já acumulado.",
      8: "Fecha o laço das colunas.",
      9: "Fecha o laço das linhas.",
      10: "Mostra a soma 1 + 2 + 3 + 4 = 10.",
    },
    tip: "Em tabela[2][2], os índices de linha e de coluna válidos são 0 e 1. O número entre colchetes na declaração é a quantidade, não o último índice.",
    questions: [
      quiz(
        "Qual é o valor de tabela[1][0]?",
        ["1", "2", "3"],
        2,
        [
          "1 está na primeira linha e primeira coluna: [0][0].",
          "2 está em [0][1].",
          "Certo: segunda linha, primeira coluna.",
        ],
        "O primeiro índice seleciona a linha.",
      ),
      quiz(
        "Quantas vezes soma += tabela[linha][coluna] executa?",
        ["2", "4", "8"],
        1,
        [
          "Há duas colunas em cada uma das duas linhas.",
          "Isso: 2 linhas vezes 2 colunas resulta em 4 elementos.",
          "Cada posição é visitada uma vez, não duas.",
        ],
        "Conte as combinações de linha e coluna.",
      ),
    ],
  },
  {
    id: "prototipos",
    level: "Avançado",
    title: "Protótipos, void e argumentos",
    time: "10 min",
    goal: "Anunciar uma função e diferenciar o parâmetro do argumento.",
    intro:
      "Um protótipo informa ao compilador que uma função existe antes de sua definição aparecer. Ele apresenta o nome e os tipos usados.",
    paragraphs: [
      [
        "Anunciar e definir",
        "int dobro(int numero); é um protótipo: termina em ; e não tem um corpo. Mais abaixo, a definição inclui as chaves com as instruções.",
      ],
      [
        "Parâmetro e argumento",
        "numero é o parâmetro declarado na função. Na chamada dobro(6), 6 é o argumento enviado. Uma função void não devolve um valor. Em main(void), void indica que esta forma de main não recebe parâmetros.",
      ],
    ],
    code: '#include <stdio.h>\n\nint dobro(int numero);\n\nint main(void) {\n    printf("%d\\n", dobro(6));\n    return 0;\n}\n\nint dobro(int numero) {\n    return numero * 2;\n}',
    output: "12\n",
    focus: 2,
    notes: {
      2: "Protótipo: anuncia que dobro recebe um int e devolve um int. O ; encerra esse anúncio.",
      4: "Define main sem parâmetros. Ela devolve int.",
      5: "6 é o argumento. O retorno de dobro(6), 12, é mostrado.",
      6: "Encerra main com sucesso.",
      7: "Fecha main.",
      9: "Definição da função anunciada antes: agora existe um corpo entre chaves.",
      10: "numero recebe 6, e a função retorna 12.",
      11: "Fecha a definição de dobro.",
    },
    tip: "Protótipo, definição e chamada precisam concordar nos tipos e na quantidade de parâmetros. return; pode encerrar uma função void sem devolver um valor.",
    questions: [
      quiz(
        "Na chamada dobro(6), como chamamos o 6?",
        ["Parâmetro", "Argumento", "Protótipo"],
        1,
        [
          "Parâmetro é o nome e tipo declarado para receber a entrada: int numero.",
          "Isso. O argumento é o valor enviado na chamada.",
          "Protótipo é o anúncio da função.",
        ],
        "A pergunta trata do valor enviado, não do nome que o recebe.",
      ),
      quiz(
        "O que void antes do nome de uma função indica?",
        [
          "Que ela não devolve um valor",
          "Que ela não pode executar",
          "Que ela sempre devolve zero",
        ],
        0,
        [
          "Certo. Ela pode realizar ações, mas não retorna um valor para usar em uma expressão.",
          "Uma função void pode executar normalmente.",
          "Devolver zero é retornar um int; void é não devolver um valor.",
        ],
        "Não confunda ausência de retorno com retorno igual a zero.",
      ),
    ],
  },
];
lessons.push(...extraLessons);
const courseOrder = [
  "primeiros-passos",
  "sequencia",
  "primeiro-programa",
  "simbolos",
  "variaveis",
  "operadores",
  "entrada",
  "if-else",
  "else-if",
  "logicos",
  "switch",
  "while",
  "for",
  "do-while",
  "vetores",
  "matrizes",
  "funcoes",
  "prototipos",
  "busca",
  "textos",
  "ponteiros",
  "recursao",
];
lessons.sort((a, b) => courseOrder.indexOf(a.id) - courseOrder.indexOf(b.id));
for (const l of lessons) {
  l.degrau = ["primeiros-passos", "sequencia"].includes(l.id)
    ? 0
    : [
          "primeiro-programa",
          "simbolos",
          "variaveis",
          "operadores",
          "entrada",
        ].includes(l.id)
      ? 1
      : ["if-else", "else-if", "logicos", "switch"].includes(l.id)
        ? 2
        : ["while", "for", "do-while"].includes(l.id)
          ? 3
          : ["vetores", "matrizes"].includes(l.id)
            ? 4
            : ["funcoes", "prototipos"].includes(l.id)
              ? 5
              : 6;
  if (l.degrau === 2) l.level = "Intermediário";
  if (l.degrau === 5) l.level = "Avançado";
}
lessons
  .find((l) => l.id === "primeiros-passos")
  .paragraphs.push([
    "Na sua disciplina",
    "O material usa C99 e o Embarcadero Dev-C++ 6.3. No Dev-C++, você escreve em um arquivo .c, salva, compila e executa. Aqui no site, o Laboratório C permite praticar pelo navegador.",
  ]);
lessons
  .find((l) => l.id === "variaveis")
  .paragraphs.push([
    "O float usado nas aulas",
    'float também guarda números com parte decimal: float preco = 2.5f;. Para mostrar com duas casas, use printf("%.2f", preco);. Para ler um float, use scanf("%f", &preco);. double usa %lf no scanf.',
  ]);
lessons
  .find((l) => l.id === "entrada")
  .paragraphs.push([
    "%i e %d",
    "No printf, %i e %d mostram inteiros em decimal. No scanf, %d lê decimal; %i reconhece também prefixos de octal e hexadecimal. Para nossas entradas decimais, os exercícios usam %d.",
  ]);
const degrauNames = [
  "Antes de programar",
  "Degrau 1 · Dados e operações",
  "Degrau 2 · Decisões",
  "Degrau 3 · Repetições",
  "Degrau 4 · Vetores e matrizes",
  "Degrau 5 · Funções",
  "Conteúdo complementar",
];
const exercise = (
  id,
  step,
  title,
  statement,
  lessonId,
  input,
  output,
  hint,
  solution,
  reason,
  tests,
) => ({
  id,
  step,
  title,
  statement,
  lessonId,
  input,
  output,
  hint,
  solution,
  reason,
  tests,
  starter: program(
    "    // Escreva sua solucao aqui.\n    // Use o enunciado e a dica como apoio.",
  ),
});
const exercises = [
  exercise(
    "ola",
    1,
    "Sua primeira saída",
    "Mostre a frase Ola, turma! em uma linha. Não é necessário ler nenhum dado.",
    "primeiro-programa",
    "",
    "Ola, turma!",
    "Use printf com o texto entre aspas duplas e \\n para terminar a linha.",
    program('    printf("Ola, turma!\\n");'),
    "printf escreve a frase na saída. O ; encerra a instrução.",
    [{ input: "", output: "Ola, turma!" }],
  ),
  exercise(
    "soma",
    1,
    "Somar dois inteiros",
    "Leia dois inteiros e mostre a soma. Os números da entrada podem estar separados por espaço ou por uma nova linha.",
    "entrada",
    "4 6",
    "10",
    'Declare dois int. Leia com scanf("%d %d", &a, &b); e some a + b.',
    program(
      '    int a, b;\n    if (scanf("%d %d", &a, &b) != 2) {\n        return 1;\n    }\n    printf("%d\\n", a + b);',
    ),
    "scanf deve conseguir ler dois valores. Depois, printf mostra o resultado da soma.",
    [
      { input: "4 6", output: "10" },
      { input: "-3 8", output: "5" },
      { input: "0 0", output: "0" },
    ],
  ),
  exercise(
    "media",
    1,
    "Média de duas notas",
    "Leia duas notas reais e mostre a média com duas casas decimais. Use ponto para a parte decimal na entrada.",
    "variaveis",
    "7.5 8.5",
    "8.00",
    'Use float a, b; e scanf("%f %f", &a, &b). A média é (a + b) / 2.0f.',
    program(
      '    float a, b;\n    if (scanf("%f %f", &a, &b) != 2) {\n        return 1;\n    }\n    printf("%.2f\\n", (a + b) / 2.0f);',
    ),
    "Os parênteses somam as notas antes da divisão. %.2f mostra duas casas decimais.",
    [
      { input: "7.5 8.5", output: "8.00" },
      { input: "3 4", output: "3.50" },
      { input: "0 10", output: "5.00" },
    ],
  ),
  exercise(
    "par",
    2,
    "Par ou ímpar?",
    "Leia um inteiro. Mostre PAR se o resto da divisão por 2 for zero; nos demais casos, mostre IMPAR.",
    "if-else",
    "7",
    "IMPAR",
    "O operador % calcula o resto. A pergunta é numero % 2 == 0.",
    program(
      '    int numero;\n    if (scanf("%d", &numero) != 1) { return 1; }\n    if (numero % 2 == 0) {\n        printf("PAR\\n");\n    } else {\n        printf("IMPAR\\n");\n    }',
    ),
    "Inteiros pares têm resto zero ao dividir por 2. O if escolhe um dos dois textos.",
    [
      { input: "7", output: "IMPAR" },
      { input: "8", output: "PAR" },
      { input: "0", output: "PAR" },
      { input: "-3", output: "IMPAR" },
    ],
  ),
  exercise(
    "faixas",
    2,
    "Três caminhos para a nota",
    "Leia uma nota real de 0 a 10. Mostre APROVADO para nota >= 7, RECUPERACAO para nota >= 5 e menor que 7, ou REPROVADO para nota < 5.",
    "else-if",
    "6.5",
    "RECUPERACAO",
    "Teste a maior faixa primeiro: if (nota >= 7), depois else if (nota >= 5).",
    program(
      '    float nota;\n    if (scanf("%f", &nota) != 1) { return 1; }\n    if (nota >= 7) {\n        printf("APROVADO\\n");\n    } else if (nota >= 5) {\n        printf("RECUPERACAO\\n");\n    } else {\n        printf("REPROVADO\\n");\n    }',
    ),
    "A ordem evita que uma nota alta entre na faixa de recuperação. Testar os limites 5 e 7 ajuda a encontrar erros.",
    [
      { input: "6.5", output: "RECUPERACAO" },
      { input: "7", output: "APROVADO" },
      { input: "5", output: "RECUPERACAO" },
      { input: "4.9", output: "REPROVADO" },
    ],
  ),
  exercise(
    "menu",
    2,
    "Um menu com três opções",
    "Leia uma opção inteira. Use switch: 1 mostra CADASTRAR, 2 mostra CONSULTAR e qualquer outro valor mostra INVALIDA.",
    "switch",
    "2",
    "CONSULTAR",
    "Use case 1:, case 2: e default:. Lembre-se do break após os cases.",
    program(
      '    int opcao;\n    if (scanf("%d", &opcao) != 1) { return 1; }\n    switch (opcao) {\n        case 1: printf("CADASTRAR\\n"); break;\n        case 2: printf("CONSULTAR\\n"); break;\n        default: printf("INVALIDA\\n");\n    }',
    ),
    "break impede que a execução de um case continue no seguinte. default cobre as opções restantes.",
    [
      { input: "2", output: "CONSULTAR" },
      { input: "1", output: "CADASTRAR" },
      { input: "9", output: "INVALIDA" },
    ],
  ),
  exercise(
    "contagem",
    3,
    "Contar até N",
    "Leia um inteiro N entre 1 e 10. Mostre os números de 1 até N, um por linha.",
    "for",
    "3",
    "1\n2\n3",
    "O contador começa em 1 e continua enquanto i <= n.",
    program(
      '    int n;\n    if (scanf("%d", &n) != 1) { return 1; }\n    for (int i = 1; i <= n; i++) {\n        printf("%d\\n", i);\n    }',
    ),
    "<= inclui o último número. i++ atualiza o contador depois de cada volta.",
    [
      { input: "3", output: "1\n2\n3" },
      { input: "1", output: "1" },
      { input: "5", output: "1\n2\n3\n4\n5" },
    ],
  ),
  exercise(
    "acumular",
    3,
    "Somar de 1 até N",
    "Leia N entre 1 e 100. Use uma repetição para somar os inteiros de 1 até N e mostre o total.",
    "while",
    "4",
    "10",
    "Crie soma = 0 e i = 1. A cada volta, faça soma += i; e aumente i.",
    program(
      '    int n;\n    if (scanf("%d", &n) != 1) { return 1; }\n    int soma = 0;\n    int i = 1;\n    while (i <= n) {\n        soma += i;\n        i++;\n    }\n    printf("%d\\n", soma);',
    ),
    "soma guarda o total acumulado. Atualizar i é essencial para o laço terminar.",
    [
      { input: "4", output: "10" },
      { input: "1", output: "1" },
      { input: "10", output: "55" },
    ],
  ),
  exercise(
    "sentinela",
    3,
    "Repetir até receber zero",
    "Leia inteiros até aparecer 0. Mostre a quantidade de valores diferentes de zero recebidos. Use do while. A entrada sempre termina em 0.",
    "do-while",
    "8 4 0",
    "2",
    "Leia dentro do do. Aumente a quantidade apenas se o valor não for zero. Teste valor != 0 no final.",
    program(
      '    int valor;\n    int quantidade = 0;\n    do {\n        if (scanf("%d", &valor) != 1) { return 1; }\n        if (valor != 0) { quantidade++; }\n    } while (valor != 0);\n    printf("%d\\n", quantidade);',
    ),
    "A leitura acontece ao menos uma vez. O zero termina a repetição, mas não entra na contagem.",
    [
      { input: "8 4 0", output: "2" },
      { input: "0", output: "0" },
      { input: "-2 1 7 0", output: "3" },
    ],
  ),
  exercise(
    "maior",
    4,
    "Maior valor de um vetor",
    "Leia três inteiros para um vetor e mostre o maior deles. Os valores também podem ser negativos.",
    "vetores",
    "4 9 2",
    "9",
    "Comece maior com o primeiro elemento do vetor, e não com zero.",
    program(
      '    int valores[3];\n    for (int i = 0; i < 3; i++) {\n        if (scanf("%d", &valores[i]) != 1) { return 1; }\n    }\n    int maior = valores[0];\n    for (int i = 1; i < 3; i++) {\n        if (valores[i] > maior) { maior = valores[i]; }\n    }\n    printf("%d\\n", maior);',
    ),
    "Inicializar com o primeiro valor também funciona quando todos são negativos. Os índices válidos vão de 0 a 2.",
    [
      { input: "4 9 2", output: "9" },
      { input: "-7 -2 -5", output: "-2" },
      { input: "3 3 3", output: "3" },
    ],
  ),
  exercise(
    "matriz",
    4,
    "Somar uma matriz 2 × 2",
    "Leia quatro inteiros: primeiro os dois da primeira linha, depois os dois da segunda. Guarde em uma matriz 2 × 2 e mostre a soma dos elementos.",
    "matrizes",
    "1 2\n3 4",
    "10",
    "Use um for para as linhas e outro para as colunas. Ambos percorrem os índices 0 e 1.",
    program(
      '    int matriz[2][2];\n    int soma = 0;\n    for (int l = 0; l < 2; l++) {\n        for (int c = 0; c < 2; c++) {\n            if (scanf("%d", &matriz[l][c]) != 1) { return 1; }\n            soma += matriz[l][c];\n        }\n    }\n    printf("%d\\n", soma);',
    ),
    "Cada combinação de linha e coluna representa uma posição. Somamos o valor logo após uma leitura válida.",
    [
      { input: "1 2\n3 4", output: "10" },
      { input: "-1 1\n-2 2", output: "0" },
      { input: "5 5\n5 5", output: "20" },
    ],
  ),
  exercise(
    "dobro",
    5,
    "Criar e chamar uma função",
    "Crie uma função int dobro(int n) que devolva n * 2. Em main, leia um inteiro e mostre o valor retornado por dobro.",
    "funcoes",
    "6",
    "12",
    "Defina dobro antes de main ou use um protótipo. return devolve o resultado; printf mostra esse resultado.",
    '#include <stdio.h>\n\nint dobro(int n) {\n    return n * 2;\n}\n\nint main(void) {\n    int valor;\n    if (scanf("%d", &valor) != 1) { return 1; }\n    printf("%d\\n", dobro(valor));\n    return 0;\n}',
    "O valor lido é o argumento da chamada. Dentro da função, o parâmetro n recebe esse valor.",
    [
      { input: "6", output: "12" },
      { input: "-3", output: "-6" },
      { input: "0", output: "0" },
    ],
  ),
];
