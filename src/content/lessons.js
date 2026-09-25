const program = (body) =>
  "#include <stdio.h>\n\nint main(void) {\n" + body + "\n    return 0;\n}";
const quiz = (question, options, answer, explanations, hint) => ({
  question,
  options,
  answer,
  explanations,
  hint,
});
const lessons = [
  {
    id: "primeiros-passos",
    level: "Básico",
    title: "Antes de escrever código",
    time: "6 min",
    goal: "Reconhecer onde escrever, o que salvar e onde ver o resultado.",
    intro:
      "Você pode começar sem nunca ter programado. Clique ou toque nos botões desta aula. Não precisa instalar nada para acompanhar os exemplos aqui.",
    paragraphs: [
      [
        "O que é um programa?",
        "É um conjunto de instruções que o computador segue. C é uma das linguagens usadas para escrever essas instruções.",
      ],
      [
        "Onde se escreve?",
        "Em um editor: uma área onde você digita texto. Um arquivo é um conteúdo salvo com um nome. O arquivo de um programa em C costuma terminar em .c, como aula.c.",
      ],
      [
        "Digitar não é executar",
        "Primeiro você escreve e salva. Depois um compilador verifica o código e o transforma em um programa. Executar é colocar esse programa para funcionar. A saída é o resultado que ele mostra.",
      ],
    ],
    code: program('    printf("Ola, turma!\\n");'),
    output: "Ola, turma!\n",
    focus: 3,
    notes: {
      3: "Esta instrução pede para mostrar Ola, turma! na saída. Você vai aprender cada símbolo nas próximas aulas.",
    },
    lab: "journey",
    tip: "No computador: clique na área de texto para digitar. Enter cria uma linha; Backspace apaga antes do cursor. Ctrl + S geralmente salva o arquivo no editor. Aqui, os botões conduzem a prática.",
    questions: [
      quiz(
        "Onde você escreve o código?",
        [
          "No editor de texto ou de código",
          "Na saída do programa",
          "No nome da pasta",
        ],
        0,
        [
          "Isso: o editor recebe as instruções que você digita.",
          "A saída mostra resultados. O código é escrito no editor.",
          "A pasta organiza arquivos. Você escreve dentro de um arquivo aberto no editor.",
        ],
        "Pense na área em que você consegue digitar.",
      ),
      quiz(
        "Qual ordem representa o caminho até ver o resultado?",
        [
          "Executar → escrever → salvar",
          "Escrever e salvar → compilar → executar",
          "Salvar → desligar o computador",
        ],
        1,
        [
          "Primeiro precisamos ter as instruções para só depois executar.",
          "Exato. Compilar prepara o programa; executar faz as instruções acontecerem.",
          "Salvar guarda o texto, mas ainda precisamos compilar e executar.",
        ],
        "O computador precisa receber as instruções antes de segui-las.",
      ),
    ],
  },
  {
    id: "sequencia",
    level: "Básico",
    title: "Uma instrução de cada vez",
    time: "5 min",
    goal: "Perceber que a ordem das instruções muda o resultado.",
    intro:
      "Pense em uma receita: primeiro colocar água no copo, depois beber. Na programação, a sequência também importa.",
    paragraphs: [
      [
        "Algoritmo, sem mistério",
        "Algoritmo é uma sequência de passos para realizar uma tarefa. Antes de escrever em C, você pode explicar esses passos com suas palavras.",
      ],
      [
        "A ordem neste exemplo",
        "O programa começa em main. Dentro dela, as chamadas de printf abaixo são executadas de cima para baixo. Cada uma mostra um texto.",
      ],
    ],
    code: program('    printf("Primeiro\\n");\n    printf("Depois\\n");'),
    output: "Primeiro\nDepois\n",
    focus: 3,
    notes: {
      3: "Mostra Primeiro e muda para a próxima linha da saída.",
      4: "Depois da instrução anterior, mostra Depois e muda de linha.",
    },
    tip: "Ler o código de cima para baixo ajuda neste exemplo. Mais adiante, condições, repetições e funções vão mudar o caminho.",
    questions: [
      quiz(
        "Qual texto aparece primeiro?",
        ["Depois", "Primeiro", "Os dois ao mesmo tempo"],
        1,
        [
          "Depois está na segunda chamada de printf.",
          "Isso. A primeira instrução dentro de main mostra Primeiro.",
          "As chamadas deste exemplo são executadas em sequência.",
        ],
        "Veja a primeira linha com printf.",
      ),
      quiz(
        "Se trocarmos as duas linhas de printf de lugar, o que muda?",
        [
          "A ordem dos textos na saída",
          "A linguagem deixa de ser C",
          "Nada muda",
        ],
        0,
        [
          "Certo. O primeiro printf passa a mostrar Depois.",
          "Trocar a ordem não muda a linguagem; muda a sequência das ações.",
          "A ordem das instruções determina a ordem dos textos neste caso.",
        ],
        "A execução segue a ordem dessas instruções.",
      ),
    ],
  },
  {
    id: "primeiro-programa",
    level: "Básico",
    title: "Seu primeiro programa em C",
    time: "8 min",
    goal: "Ler um programa completo e entender a função de cada linha.",
    intro:
      "Este é um programa completo em C. Você pode tocar em cada linha para descobrir o que ela faz. Não precisa decorar tudo agora.",
    paragraphs: [
      [
        "main é o ponto de partida",
        "Em um programa comum em C, main é a função por onde a execução começa. Uma função é um conjunto de instruções com um nome.",
      ],
      [
        "Texto na saída",
        "printf é uma função que mostra dados. O texto fica entre aspas duplas. A sequência \\n dentro do texto pede uma nova linha na saída.",
      ],
    ],
    code: program('    printf("Ola, turma!\\n");'),
    output: "Ola, turma!\n",
    focus: 0,
    tip: "C diferencia letras maiúsculas e minúsculas. Escreva printf, não Printf. Por enquanto, use a estrutura do exemplo como modelo.",
    questions: [
      quiz(
        "Qual linha mostra a mensagem?",
        ["#include <stdio.h>", 'printf("Ola, turma!\\n");', "return 0;"],
        1,
        [
          "Essa linha disponibiliza declarações para usar funções como printf.",
          "Isso. printf mostra o texto entre aspas; \\n muda de linha.",
          "return 0 encerra main indicando sucesso; não mostra uma mensagem.",
        ],
        "Procure a função que apresenta texto na saída.",
      ),
      quiz(
        "Para que serve \\n dentro da mensagem?",
        [
          "Para mostrar as letras n e barra",
          "Para mudar de linha na saída",
          "Para fechar main",
        ],
        1,
        [
          "Dentro desse texto, a barra invertida e o n formam uma sequência especial.",
          "Certo. A próxima impressão começa na linha seguinte.",
          "Quem fecha o bloco de main é a chave }.",
        ],
        "Observe onde termina a primeira linha da saída.",
      ),
    ],
  },
  {
    id: "simbolos",
    level: "Básico",
    title: "Chaves, parênteses e ponto e vírgula",
    time: "9 min",
    goal: "Distinguir símbolos que parecem pequenos, mas organizam o programa.",
    intro:
      "As chaves não estão ali de enfeite. Elas delimitam um bloco: um grupo de instruções. A chave { abre esse grupo e a chave } o fecha.",
    paragraphs: [
      [
        "Cada símbolo tem um trabalho",
        "Parênteses ( ) cercam informações de uma chamada de função, como em printf(...). O ponto e vírgula ; encerra instruções como printf(...); e return 0;.",
      ],
      [
        "Um par precisa do outro",
        "Toda chave de abertura do nosso código tem uma chave de fechamento. As instruções entre elas pertencem ao bloco. Recuar as linhas com espaços ajuda a enxergar isso; são as chaves que delimitam o bloco.",
      ],
      [
        "Aspas são para texto",
        'Em printf("Oi");, as aspas duplas dizem que Oi é texto. Os parênteses pertencem à chamada da função. O ; encerra a instrução.',
      ],
    ],
    code: program('    printf("Oi\\n");'),
    output: "Oi\n",
    focus: 2,
    tip: "Não coloque ; automaticamente no fim de toda linha. Neste exemplo, #include e a abertura e o fechamento de main não recebem ;.",
    questions: [
      quiz(
        "Qual par marca o começo e o fim de um bloco?",
        ["( )", "{ }", '" "'],
        1,
        [
          "Parênteses têm outros usos, como envolver os argumentos de printf.",
          "Isso. { abre o bloco e } fecha. As instruções dentro ficam agrupadas.",
          "Aspas duplas delimitam texto.",
        ],
        "O bloco de main começa após main(void).",
      ),
      quiz(
        'O que falta em printf("Oi") para encerrar essa instrução?',
        [
          "Uma chave { antes do texto",
          "Um ponto e vírgula ; ao final",
          "Mais uma palavra printf",
        ],
        1,
        [
          "A chamada já está dentro do bloco. Falta encerrar a instrução.",
          'Certo: printf("Oi");. O ; encerra essa instrução.',
          "Repetir o nome não encerra a instrução.",
        ],
        "Compare com a linha completa do exemplo.",
      ),
    ],
  },
  {
    id: "variaveis",
    level: "Básico",
    title: "Variáveis e tipos de dados",
    time: "9 min",
    goal: "Guardar números e caracteres usando tipos adequados.",
    intro:
      "Uma variável é um espaço de memória com um nome. Pense em uma caixa com etiqueta: o nome identifica a caixa e o valor é seu conteúdo.",
    paragraphs: [
      [
        "Dizer o tipo vem primeiro",
        "int guarda inteiros, como 20. double guarda números com parte decimal, como 7.5. char guarda um caractere, como 'A'. Em C, escrevemos o tipo antes do nome.",
      ],
      [
        "O sinal = guarda um valor",
        "int idade = 20; cria idade e guarda 20. Em idade = idade + 1;, primeiro calculamos o lado direito com o valor antigo, depois guardamos o novo valor.",
      ],
      [
        "Como mostrar o valor",
        "Em printf, %d é um marcador para um int. %.1f mostra um número de ponto flutuante com uma casa decimal; %c mostra um caractere. Os valores vêm depois do texto, separados por vírgulas.",
      ],
    ],
    code: program(
      '    int idade = 20;\n    double nota = 7.5;\n    char turma = \'A\';\n    idade = idade + 1;\n    printf("Idade: %d\\n", idade);\n    printf("Nota: %.1f\\n", nota);\n    printf("Turma: %c\\n", turma);',
    ),
    output: "Idade: 21\nNota: 7.5\nTurma: A\n",
    focus: 3,
    notes: {
      3: "int é o tipo inteiro; idade é o nome; = guarda 20; ; encerra a declaração.",
      4: "double aceita parte decimal. No código C, use ponto em 7.5.",
      5: "char guarda um caractere. As aspas simples envolvem A.",
      6: "Lê idade (20), soma 1 e guarda 21 em idade.",
      7: "%d será substituído pelo valor inteiro de idade: 21.",
      8: "%.1f mostra nota com uma casa decimal: 7.5.",
      9: "%c será substituído pelo caractere A.",
    },
    tip: "Não use uma variável local antes de atribuir um valor a ela. Nomes como idade e nota deixam a intenção mais clara.",
    questions: [
      quiz(
        "Depois de idade = idade + 1;, qual é o valor de idade?",
        ["20", "21", "1"],
        1,
        [
          "20 era o valor anterior. A atribuição guarda o resultado da soma.",
          "Certo: 20 + 1 dá 21, e esse resultado é guardado em idade.",
          "O 1 é somado ao valor anterior; ele não substitui idade sozinho.",
        ],
        "Calcule o lado direito usando idade = 20.",
      ),
      quiz(
        "Qual declaração guarda a nota 7.5 sem descartar a parte decimal?",
        ["int nota = 7.5;", "double nota = 7.5;", "char nota = '7';"],
        1,
        [
          "A conversão para int descarta a parte fracionária neste caso; ficaria 7.",
          "Isso. double representa números com parte decimal.",
          "Esse char guarda o caractere 7, não o número 7.5.",
        ],
        "Qual tipo desta aula foi usado para números com parte decimal?",
      ),
    ],
  },
  {
    id: "operadores",
    level: "Básico",
    title: "Contas e comparações",
    time: "8 min",
    goal: "Separar uma conta, uma atribuição e uma comparação.",
    intro:
      "O computador pode calcular e também comparar valores. Mas guardar um valor e fazer uma pergunta são operações diferentes.",
    paragraphs: [
      [
        "Contas em C",
        "+ soma, - subtrai, * multiplica e / divide. Entre inteiros, / descarta a parte fracionária: 5 / 2 resulta em 2. O operador % calcula o resto: 5 % 2 resulta em 1.",
      ],
      [
        "Perguntas em C",
        "== pergunta se é igual; != pergunta se é diferente; > significa maior; < significa menor; >= e <= incluem a igualdade. Uma comparação produz 1 para verdadeiro e 0 para falso.",
      ],
      [
        "Um = ou dois?",
        "= faz atribuição: nota = 6 guarda 6. == faz comparação: nota == 6 pergunta se nota vale 6. Esse detalhe é uma fonte comum de erros.",
      ],
    ],
    code: program(
      '    int nota = 6;\n    printf("Soma: %d\\n", 2 + 3);\n    printf("Passou: %d\\n", nota >= 6);\n    printf("Igual a 7: %d\\n", nota == 7);',
    ),
    output: "Soma: 5\nPassou: 1\nIgual a 7: 0\n",
    focus: 5,
    notes: {
      3: "Guarda o inteiro 6 na variável nota.",
      4: "Calcula 2 + 3 e mostra 5.",
      5: "6 >= 6 é verdadeiro. A comparação produz 1.",
      6: "6 == 7 é falso. A comparação produz 0.",
    },
    tip: "Em uma condição, prefira perguntar em voz alta: “nota é maior ou igual a 6?”. Depois traduza a pergunta para nota >= 6.",
    questions: [
      quiz(
        "Qual expressão pergunta se idade vale 18?",
        ["idade = 18", "idade == 18", "idade + 18"],
        1,
        [
          "Um = atribui 18 a idade. Não é a comparação desejada.",
          "Isso. Dois sinais de igual fazem a comparação.",
          "Essa expressão soma 18 ao valor de idade.",
        ],
        "Comparar usa dois sinais de igual.",
      ),
      quiz(
        "Quanto é 5 / 2 quando os dois valores são inteiros em C?",
        ["2.5", "2", "3"],
        1,
        [
          "Entre inteiros, essa divisão não mantém a parte fracionária.",
          "Certo: a parte fracionária é descartada, ficando 2.",
          "A divisão inteira não arredonda para o inteiro mais próximo.",
        ],
        "A parte depois da vírgula é descartada.",
      ),
    ],
  },
  {
    id: "entrada",
    level: "Básico",
    title: "Receber um número com scanf",
    time: "10 min",
    goal: "Diferenciar o que a pessoa digita do que o programa mostra.",
    intro:
      "printf envia informação para a saída. scanf lê informação da entrada, normalmente digitada no teclado.",
    paragraphs: [
      [
        "Ler e guardar",
        'scanf("%d", &idade) tenta ler um inteiro e guardar na variável idade. %d indica o formato esperado. &idade fornece o endereço da variável: onde o número será guardado.',
      ],
      [
        "E se alguém digitar texto?",
        "O retorno de scanf informa quantas conversões deram certo. Neste exemplo, esperamos 1. Quando o retorno é diferente de 1, mostramos uma mensagem e encerramos. O if será explicado na próxima aula.",
      ],
      [
        "Um passo no computador",
        "Ao executar um programa que aguarda entrada no console, clique nessa área, digite o número e pressione Enter. A simulação abaixo usa um campo e um botão para representar essa entrada.",
      ],
    ],
    code: program(
      '    int idade;\n    printf("Digite sua idade:\\n");\n    if (scanf("%d", &idade) != 1) {\n        printf("Entrada invalida\\n");\n        return 1;\n    }\n    printf("Voce digitou: %d\\n", idade);',
    ),
    output: "Digite sua idade:\nVoce digitou: 21\n",
    focus: 5,
    notes: {
      3: "Declara idade sem valor inicial. Só a usamos depois de confirmar uma leitura válida.",
      4: "Mostra a pergunta. Ainda não lê o teclado.",
      5: "Tenta ler um int no endereço de idade. Se não conseguir uma conversão, entra neste bloco.",
      6: "Mostra uma mensagem quando a leitura falha.",
      7: "Encerra main com código 1, indicando falha neste programa.",
      8: "Fecha o bloco que trata a falha.",
      9: "Chega aqui quando a leitura funcionou; mostra o número guardado.",
    },
    lab: "input",
    tip: "O & em &idade não é enfeite. scanf precisa saber onde guardar o número. Para um double, scanf usa %lf; para este int, usa %d.",
    questions: [
      quiz(
        "Qual chamada lê um inteiro e o guarda em idade?",
        ['printf("%d", idade);', 'scanf("%d", &idade);', 'printf("idade");'],
        1,
        [
          "printf mostra o valor; não lê um número do teclado.",
          "Certo. %d pede um inteiro e &idade informa onde guardá-lo.",
          "Isso só mostra a palavra idade.",
        ],
        "Ler usa scanf; guardar precisa do endereço.",
      ),
      quiz(
        "O que significa &idade neste exemplo?",
        [
          "O endereço da variável idade",
          'O texto "idade"',
          "O valor da idade mais 1",
        ],
        0,
        [
          "Isso. scanf usa esse endereço para escrever na variável.",
          "Texto seria escrito entre aspas duplas.",
          "& não faz essa soma; ele obtém o endereço aqui.",
        ],
        "Pense em indicar onde a informação deve ser guardada.",
      ),
    ],
  },
  {
    id: "if-else",
    level: "Básico",
    title: "if e else: por dentro das chaves",
    time: "12 min",
    goal: "Entender a condição e enxergar quais instruções pertencem a cada bloco.",
    intro:
      "if significa “se”. else significa “senão”. O programa avalia uma condição e escolhe qual bloco executar.",
    paragraphs: [
      [
        "Leia em português",
        "“Se a nota for maior ou igual a 6, mostre Aprovado. Senão, mostre Revisar.” Em C, a pergunta fica entre parênteses: if (nota >= 6).",
      ],
      [
        "As chaves mostram o que pertence a cada caminho",
        "A { depois do if abre o bloco do caminho verdadeiro. A } antes de else fecha esse bloco. A { depois de else abre o outro bloco; a próxima } o fecha. O bloco de main envolve tudo isso e tem seu próprio par.",
      ],
      [
        "O que vem depois dos dois caminhos?",
        "A mensagem Fim está depois da chave que fecha else. Por isso, aparece tanto com aprovação quanto com revisão. O recuo ajuda a ler; as chaves definem o agrupamento.",
      ],
    ],
    code: program(
      '    int nota = 7;\n    if (nota >= 6) {\n        printf("Aprovado\\n");\n    } else {\n        printf("Revisar\\n");\n    }\n    printf("Fim\\n");',
    ),
    output: "Aprovado\nFim\n",
    focus: 4,
    notes: {
      3: "Guarda 7 em nota. Na simulação, você pode trocar esse valor.",
      4: "(nota >= 6) é a condição. Esta { abre o bloco do if: o caminho verdadeiro.",
      5: "Está dentro das chaves do if. Só executa se nota >= 6 for verdadeiro.",
      6: "A primeira } fecha o if. else apresenta o caminho falso. A nova { abre o bloco do else.",
      7: "Está dentro das chaves do else. Só executa se nota >= 6 for falso.",
      8: "Esta } fecha o bloco do else. O bloco de main continua aberto.",
      9: "Está fora dos dois blocos de decisão, mas dentro de main. Executa nos dois caminhos.",
    },
    lab: "condition",
    tip: "Use chaves nos dois caminhos enquanto aprende, mesmo com uma instrução. Não coloque ; logo após if (nota >= 6): esse ; seria uma instrução vazia e mudaria o significado.",
    questions: [
      quiz(
        "Com nota = 5, qual é a saída completa?",
        ["Aprovado, depois Fim", "Revisar, depois Fim", "Só Revisar"],
        1,
        [
          "5 >= 6 é falso. O bloco do if é pulado.",
          "Isso. O else mostra Revisar. Depois, fora do else, o programa mostra Fim.",
          "Fim está fora do else, então também será mostrado.",
        ],
        "Siga o caminho falso e veja o que há depois da chave que fecha else.",
      ),
      quiz(
        "Qual é o papel da } imediatamente antes de else?",
        [
          "Encerrar todo o programa",
          "Fechar o bloco do if",
          "Fechar o texto do printf",
        ],
        1,
        [
          "O bloco de main ainda está aberto; essa chave encerra um bloco interno.",
          "Certo. Ela encerra as instruções que pertencem ao if. O else abre outro bloco.",
          "Quem delimita o texto são as aspas duplas.",
        ],
        "Descubra qual foi a chave de abertura desse bloco.",
      ),
    ],
  },
  {
    id: "logicos",
    level: "Intermediário",
    title: "Combinar condições",
    time: "8 min",
    goal: "Usar &&, || e ! em decisões.",
    intro:
      "Às vezes uma pergunta só não basta. Você pode combinar condições para descrever uma regra.",
    paragraphs: [
      [
        "E, OU e NÃO",
        "&& significa E: as duas condições precisam ser verdadeiras. || significa OU: basta uma verdadeira. ! significa NÃO: inverte verdadeiro e falso.",
      ],
      [
        "Como C interpreta",
        "Em condições, zero é falso e qualquer valor diferente de zero é verdadeiro. Aqui usamos comparações, que produzem 0 ou 1.",
      ],
    ],
    code: program(
      '    int idade = 19;\n    int temIngresso = 1;\n    if (idade >= 18 && temIngresso == 1) {\n        printf("Entrada liberada\\n");\n    } else {\n        printf("Entrada negada\\n");\n    }',
    ),
    output: "Entrada liberada\n",
    focus: 5,
    notes: {
      3: "Guarda 19 em idade.",
      4: "Neste exemplo, 1 representa que a pessoa tem ingresso.",
      5: "As duas comparações são verdadeiras, então o && também é verdadeiro.",
      6: "Executa no caminho verdadeiro.",
      7: "Fecha o if e abre o else.",
      8: "Executaria se ao menos uma das comparações fosse falsa.",
      9: "Fecha o else.",
    },
    tip: "& e && são operadores diferentes. Para combinar duas condições com E, use &&.",
    questions: [
      quiz(
        "Com idade 19 e temIngresso 0, a entrada é liberada?",
        [
          "Sim, basta a idade",
          "Não, as duas condições são necessárias",
          "Sim, 0 significa verdadeiro",
        ],
        1,
        [
          "&& exige idade suficiente e ingresso.",
          "Certo. A comparação temIngresso == 1 é falsa, então o resultado do && é falso.",
          "Em C, 0 é interpretado como falso em condições.",
        ],
        "O operador usado é E.",
      ),
      quiz(
        "Qual operador representa OU lógico?",
        ["&&", "||", "!"],
        1,
        [
          "&& é E lógico.",
          "Isso. || exige ao menos uma condição verdadeira.",
          "! inverte um valor lógico.",
        ],
        "É escrito com duas barras verticais.",
      ),
    ],
  },
  {
    id: "while",
    level: "Intermediário",
    title: "Repetir com while",
    time: "9 min",
    goal: "Acompanhar a condição e a atualização de um laço.",
    intro:
      "while significa “enquanto”. O bloco se repete enquanto a condição for verdadeira.",
    paragraphs: [
      [
        "Uma volta por vez",
        "Antes de cada volta, a condição é avaliada. Se for falsa logo na primeira avaliação, o bloco não executa nenhuma vez.",
      ],
      [
        "O que faz parar?",
        "No exemplo, contador aumenta a cada volta. Quando chega a 4, contador <= 3 fica falso e a repetição termina.",
      ],
    ],
    code: program(
      '    int contador = 1;\n    while (contador <= 3) {\n        printf("%d\\n", contador);\n        contador = contador + 1;\n    }',
    ),
    output: "1\n2\n3\n",
    focus: 4,
    notes: {
      3: "Começa com contador valendo 1.",
      4: "Antes de cada volta, compara contador com 3.",
      5: "Mostra o contador da volta atual.",
      6: "Atualiza o contador: 1 vira 2, 2 vira 3, 3 vira 4.",
      7: "Fecha o bloco repetido. A execução volta para avaliar o while.",
    },
    tip: "Se você retirar a atualização deste exemplo, contador continuará em 1 e a repetição não terminará sozinha.",
    questions: [
      quiz(
        "Quantas vezes o printf executa?",
        ["2", "3", "4"],
        1,
        [
          "A condição inclui o 3: <= significa menor ou igual.",
          "Certo. Executa com contador 1, 2 e 3. Com 4, para.",
          "A comparação com 4 acontece, mas o bloco não executa nessa avaliação.",
        ],
        "Liste os valores que satisfazem contador <= 3.",
      ),
      quiz(
        "Se contador começar em 4, quantas voltas acontecem?",
        ["0", "1", "4"],
        0,
        [
          "Isso. A condição é falsa antes de entrar no bloco.",
          "while verifica a condição antes da primeira volta.",
          "O valor inicial não é o número de voltas.",
        ],
        "A primeira comparação seria 4 <= 3.",
      ),
    ],
  },
  {
    id: "for",
    level: "Intermediário",
    title: "Repetir com for",
    time: "9 min",
    goal: "Identificar início, condição e atualização em um for.",
    intro:
      "for reúne três partes da repetição em uma linha: o início, a condição e a atualização.",
    paragraphs: [
      [
        "Três partes, separadas por ;",
        "Em for (int i = 1; i <= 3; i++), a primeira parte cria i com valor 1. A segunda decide se haverá uma volta. A terceira aumenta i depois do bloco.",
      ],
      [
        "A ordem real",
        "Inicializar uma vez → testar → executar o bloco → atualizar → testar novamente. i++ aumenta i em uma unidade neste uso.",
      ],
    ],
    code: program(
      '    for (int i = 1; i <= 3; i++) {\n        printf("%d\\n", i);\n    }',
    ),
    output: "1\n2\n3\n",
    focus: 3,
    notes: {
      3: "int i = 1 acontece uma vez. i <= 3 é testado antes de cada volta. i++ acontece depois de cada volta.",
      4: "Mostra 1, depois 2, depois 3.",
      5: "Fecha o bloco. Em seguida, i++ atualiza i e a condição é testada de novo.",
    },
    tip: "Não coloque ; depois dos parênteses do for deste exemplo. A chave { abre o bloco que queremos repetir.",
    questions: [
      quiz(
        "Quando i++ acontece neste for?",
        [
          "Antes de criar i",
          "Depois de cada execução do bloco",
          "Só ao terminar o programa",
        ],
        1,
        [
          "A variável precisa existir antes de ser atualizada.",
          "Isso. Depois do bloco, i aumenta e a condição é testada novamente.",
          "A atualização faz parte de cada volta.",
        ],
        "Pense na sequência: testar, executar, atualizar.",
      ),
      quiz(
        "Se a condição virar i < 3, quais valores aparecem?",
        ["1 e 2", "1, 2 e 3", "0, 1 e 2"],
        0,
        [
          "Certo. 3 < 3 é falso, então 3 não é mostrado.",
          "< não inclui a igualdade.",
          "O início continua sendo i = 1.",
        ],
        "O valor inicial não mudou; apenas a condição mudou.",
      ),
    ],
  },
  {
    id: "funcoes",
    level: "Intermediário",
    title: "Criar funções",
    time: "10 min",
    goal: "Distinguir parâmetro, chamada e retorno.",
    intro:
      "Uma função agrupa instruções para reutilizar uma tarefa. Ela pode receber valores e devolver um resultado.",
    paragraphs: [
      [
        "Entrada da função",
        "Em int dobro(int numero), numero é um parâmetro: o nome usado para receber um inteiro. O primeiro int diz que a função devolve um inteiro.",
      ],
      [
        "Chamar e retornar",
        "dobro(4) chama a função com o valor 4. return numero * 2; devolve 8. A execução continua em main, onde esse resultado é guardado.",
      ],
    ],
    code: '#include <stdio.h>\n\nint dobro(int numero) {\n    return numero * 2;\n}\n\nint main(void) {\n    int resultado = dobro(4);\n    printf("%d\\n", resultado);\n    return 0;\n}',
    output: "8\n",
    focus: 2,
    notes: {
      2: "Define dobro: recebe um int em numero e devolve um int. A chave abre seu bloco.",
      3: "Multiplica o valor recebido por 2 e o devolve a quem chamou.",
      4: "Fecha o bloco de dobro.",
      7: "Chama dobro com 4 e guarda o retorno 8 em resultado.",
      8: "Mostra o resultado guardado: 8.",
    },
    tip: "Devolver um valor com return e mostrar algo com printf são ações diferentes. Uma função pode devolver um número sem mostrar nada.",
    questions: [
      quiz(
        "O que dobro(7) devolve?",
        ["7", "14", "49"],
        1,
        [
          "O valor recebido é multiplicado por 2.",
          "Isso. numero recebe 7, e 7 * 2 é 14.",
          "A função multiplica por 2, não por numero.",
        ],
        "Substitua numero por 7 na expressão de retorno.",
      ),
      quiz(
        "Qual instrução entrega o resultado da função ao código que a chamou?",
        ["printf", "return", "int"],
        1,
        [
          "printf mostra dados na saída.",
          "Certo. return devolve o resultado e encerra aquela chamada.",
          "int indica o tipo neste exemplo.",
        ],
        "O resultado precisa voltar para quem chamou.",
      ),
    ],
  },
  {
    id: "vetores",
    level: "Avançado",
    title: "Vetores e índices",
    time: "9 min",
    goal: "Acessar elementos sem ultrapassar os limites do vetor.",
    intro:
      "Um vetor guarda vários valores do mesmo tipo em sequência. Cada elemento tem um índice para identificá-lo.",
    paragraphs: [
      [
        "A contagem começa em zero",
        "int notas[3] declara espaço para três inteiros. Os índices válidos são 0, 1 e 2. notas[1] acessa o segundo elemento.",
      ],
      [
        "Colchetes e chaves",
        "Os colchetes [ ] indicam tamanho ou acesso ao vetor. Em = {7, 5, 9}, as chaves agrupam os valores iniciais; aqui elas não são um bloco de instruções.",
      ],
    ],
    code: program(
      '    int notas[3] = {7, 5, 9};\n    printf("%d\\n", notas[1]);',
    ),
    output: "5\n",
    focus: 3,
    notes: {
      3: "Cria um vetor com três int: índice 0 vale 7, índice 1 vale 5, índice 2 vale 9.",
      4: "Acessa o índice 1, que é o segundo elemento: 5.",
    },
    tip: "Não acesse notas[3] neste vetor. C não verifica automaticamente esse limite, e acessar fora dele causa comportamento indefinido.",
    questions: [
      quiz(
        "Qual é o valor de notas[1]?",
        ["7", "5", "9"],
        1,
        [
          "7 está no índice 0.",
          "Isso. O índice 1 identifica o segundo elemento: 5.",
          "9 está no índice 2.",
        ],
        "Conte a partir de zero.",
      ),
      quiz(
        "Qual é o último índice válido de notas[3]?",
        ["3", "2", "1"],
        1,
        [
          "3 é a quantidade de elementos, não o último índice.",
          "Certo. Com três elementos, os índices são 0, 1 e 2.",
          "1 é válido, mas ainda existe o índice 2.",
        ],
        "O último índice é a quantidade menos um.",
      ),
    ],
  },
  {
    id: "busca",
    level: "Avançado",
    title: "Buscar em um vetor",
    time: "10 min",
    goal: "Acompanhar comparações até encontrar um valor.",
    intro:
      "A busca linear examina os elementos em ordem até achar o valor procurado ou chegar ao fim.",
    paragraphs: [
      [
        "Uma comparação por vez",
        "Usamos for para percorrer os índices. A cada volta, comparamos lista[i] com o alvo. break interrompe o laço quando encontramos.",
      ],
      [
        "Se o valor não existir",
        "A busca percorre todos os elementos. Neste exemplo, encontrado começa em 0 e só muda para 1 quando há uma correspondência.",
      ],
    ],
    code: program(
      '    int lista[4] = {4, 9, 2, 7};\n    int encontrado = 0;\n    for (int i = 0; i < 4; i++) {\n        if (lista[i] == 2) {\n            encontrado = 1;\n            break;\n        }\n    }\n    printf("Encontrado: %d\\n", encontrado);',
    ),
    output: "Encontrado: 1\n",
    focus: 5,
    notes: {
      3: "Cria a lista com índices 0 a 3.",
      4: "0 representa que ainda não encontramos.",
      5: "Percorre apenas os índices válidos: de 0 até 3.",
      6: "Compara o item da posição atual com 2.",
      7: "Marca que o alvo foi encontrado.",
      8: "Sai do laço mais interno, que é este for.",
      9: "Fecha o if.",
      10: "Fecha o for.",
      11: "Mostra 1 porque o valor 2 foi encontrado.",
    },
    tip: "Na lista do exemplo, são três comparações: com 4, com 9 e com 2. A busca para antes de comparar com 7.",
    questions: [
      quiz(
        "Quantos itens são comparados antes de encontrar 2?",
        ["2", "3", "4"],
        1,
        [
          "O valor procurado é 2, mas ele está no terceiro item.",
          "Isso. Comparamos 4, depois 9, depois 2.",
          "break evita examinar o último item depois de encontrar o alvo.",
        ],
        "Percorra os itens e conte cada comparação.",
      ),
      quiz(
        "Se procurarmos 8 nessa lista, qual será o valor final de encontrado?",
        ["0", "1", "8"],
        0,
        [
          "Certo. Como não existe 8, encontrado nunca recebe 1.",
          "Só atribuímos 1 ao encontrar o alvo.",
          "encontrado funciona como sinalizador, não guarda o alvo.",
        ],
        "Veja o valor inicial e quando ele muda.",
      ),
    ],
  },
  {
    id: "textos",
    level: "Avançado",
    title: "Textos em C",
    time: "10 min",
    goal: "Entender uma string como uma sequência de caracteres.",
    intro:
      "Em C, um texto pode ser guardado em um vetor de char. Essa sequência, terminada pelo caractere nulo, é chamada de string.",
    paragraphs: [
      [
        "O marcador de fim",
        'char nome[] = "Ana"; cria um vetor com A, n, a e \\0. Esse último caractere marca o fim do texto. Não confunda \\0 com \\n: um termina a string e o outro representa uma nova linha.',
      ],
      [
        "Mostrar o texto todo",
        "printf usa %s para mostrar a string até o marcador de fim. %c mostra um único caractere.",
      ],
    ],
    code: program(
      '    char nome[] = "Ana";\n    printf("%s\\n", nome);\n    printf("%c\\n", nome[0]);',
    ),
    output: "Ana\nA\n",
    focus: 3,
    notes: {
      3: "O compilador reserva quatro char: A, n, a e o terminador nulo.",
      4: "%s mostra a string inteira: Ana.",
      5: "%c mostra o caractere no índice 0: A.",
    },
    tip: 'O espaço para uma string precisa incluir o terminador. "Ana" ocupa quatro char, embora tenha três letras.',
    questions: [
      quiz(
        'Quantos elementos tem o vetor criado por char nome[] = "Ana";?',
        ["3", "4", "5"],
        1,
        [
          "Além das três letras, há o terminador nulo.",
          "Certo: A, n, a e \\0.",
          "Existe um terminador, não dois.",
        ],
        "Conte também o caractere que marca o fim.",
      ),
      quiz(
        "Qual marcador do printf mostra uma string?",
        ["%d", "%s", "%c"],
        1,
        [
          "%d mostra um int.",
          "Isso. %s mostra a sequência de caracteres até o terminador.",
          "%c mostra apenas um caractere.",
        ],
        "Pense no s de string.",
      ),
    ],
  },
  {
    id: "ponteiros",
    level: "Avançado",
    title: "Primeiro contato com ponteiros",
    time: "12 min",
    goal: "Separar um valor de seu endereço na memória.",
    intro:
      "Um ponteiro guarda um endereço. Pense em uma casa: o conteúdo da casa e o endereço que permite encontrá-la são coisas diferentes.",
    paragraphs: [
      [
        "& obtém um endereço",
        "Se idade é uma variável, &idade é seu endereço. Em int *p = &idade;, p guarda o endereço de uma variável int.",
      ],
      [
        "* acessa o valor apontado",
        "Depois dessa declaração, *p permite acessar idade por meio do endereço. Fazer *p = 22; altera o conteúdo da variável idade. Na declaração, * indica o tipo ponteiro; na expressão, acessa o objeto apontado.",
      ],
    ],
    code: program(
      '    int idade = 21;\n    int *p = &idade;\n    *p = 22;\n    printf("%d\\n", idade);',
    ),
    output: "22\n",
    focus: 4,
    notes: {
      3: "Guarda 21 em idade.",
      4: "Declara p como ponteiro para int e guarda nele o endereço de idade.",
      5: "Acessa a variável apontada por p (idade) e guarda 22 nela.",
      6: "Mostra 22, pois idade foi alterada por meio do ponteiro.",
    },
    tip: "Só acesse *p quando p apontar para um objeto válido. Um endereço não inicializado não é um lugar seguro para ler ou escrever.",
    questions: [
      quiz(
        "Qual valor de idade aparece na saída?",
        ["21", "22", "O endereço de p"],
        1,
        [
          "idade foi alterada pela atribuição por meio de *p.",
          "Isso. p aponta para idade, então *p = 22 muda idade.",
          "O printf usa idade com %d, portanto mostra seu valor inteiro.",
        ],
        "p aponta para a própria variável idade.",
      ),
      quiz(
        "O que &idade fornece?",
        ["O endereço de idade", "O dobro de idade", "Uma cópia do texto idade"],
        0,
        [
          "Certo. É esse endereço que o ponteiro armazena.",
          "& não multiplica neste contexto.",
          "Não há texto entre aspas nessa expressão.",
        ],
        "Endereço e conteúdo são diferentes.",
      ),
    ],
  },
  {
    id: "recursao",
    level: "Avançado",
    title: "Recursão e caso base",
    time: "12 min",
    goal: "Acompanhar chamadas que reduzem um problema até parar.",
    intro:
      "Uma função recursiva chama a si mesma. Cada chamada deve se aproximar de um caso que pode ser resolvido diretamente.",
    paragraphs: [
      [
        "O caso base",
        "Para somar de 1 até n, usamos somaAte(n). Com n igual a 0, devolvemos 0 sem chamar de novo. Esse é o caso base. O exemplo considera apenas inteiros não negativos pequenos.",
      ],
      [
        "A volta dos resultados",
        "somaAte(3) espera 3 + somaAte(2). Essa chamada espera 2 + somaAte(1), que espera 1 + somaAte(0). Depois os resultados voltam: 0, 1, 3 e 6.",
      ],
    ],
    code: '#include <stdio.h>\n\nint somaAte(int n) {\n    if (n == 0) {\n        return 0;\n    }\n    return n + somaAte(n - 1);\n}\n\nint main(void) {\n    printf("%d\\n", somaAte(3));\n    return 0;\n}',
    output: "6\n",
    focus: 3,
    notes: {
      2: "Define uma função que recebe e devolve int.",
      3: "Pergunta se chegou ao caso base.",
      4: "Para n = 0, retorna 0 sem outra chamada.",
      5: "Fecha o bloco do caso base.",
      6: "Para n positivo, chama a função com n - 1 e soma n ao resultado.",
      7: "Fecha a função somaAte.",
      10: "Chama somaAte com 3 e mostra o retorno: 6.",
    },
    tip: "Sem um caso base alcançável, as chamadas podem continuar até esgotar recursos. Esta função não deve receber valores negativos.",
    questions: [
      quiz(
        "Qual condição identifica o caso base?",
        ["n == 0", "n - 1", "n + somaAte(n - 1)"],
        0,
        [
          "Isso. Quando n é 0, o resultado é retornado sem outra chamada.",
          "n - 1 reduz a entrada, mas não é o teste de parada.",
          "Essa expressão é o passo recursivo.",
        ],
        "Procure o caminho que retorna sem chamar a função.",
      ),
      quiz(
        "Qual é o resultado de somaAte(3)?",
        ["3", "6", "0"],
        1,
        [
          "É preciso somar também 2 e 1.",
          "Certo: 3 + 2 + 1 + 0 = 6.",
          "0 é só o resultado do caso base; os valores anteriores ainda são somados.",
        ],
        "Escreva as somas até chegar a zero.",
      ),
    ],
  },
];

export { lessons, program, quiz };
