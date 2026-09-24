# Publicar com GitHub, Vercel e seu domínio

O fluxo será: **editar no computador → enviar ao GitHub → Vercel publicar → domínio abrir o site**.

## 1. Criar o repositório no GitHub

Crie um repositório vazio, por exemplo `logica-em-pratica`. Você pode começar sem README no GitHub, porque o projeto já tem um.

Na pasta extraída, onde está `package.json`:

```bash
git init
git add .
git commit -m "Inicia Logica em Pratica"
git branch -M main
```

Adicione como `origin` a URL do repositório que **você acabou de criar**. Copie a URL fornecida pelo GitHub, sem usar uma URL de exemplo:

```bash
git remote add origin URL_DO_SEU_REPOSITORIO
git push -u origin main
```

O GitHub poderá pedir autenticação pela ferramenta de credenciais do seu computador. Não coloque tokens nos arquivos do projeto.

A `.gitignore` já exclui arquivos gerados, dependências, configurações locais da Vercel e arquivos `.env`.

## 2. Importar na Vercel

1. Entre na sua conta Vercel e escolha criar/importar um projeto.
2. Conecte sua conta GitHub e selecione o repositório.
3. Use a raiz que contém `package.json`.
4. Confira as configurações abaixo e publique.

| Opção                 | Valor                |
| --------------------- | -------------------- |
| Framework Preset      | Other                |
| Build Command         | `npm run build`      |
| Output Directory      | `dist`               |
| Variáveis de ambiente | Nenhuma nesta versão |

O arquivo `vercel.json` já declara o comando de build, a saída e os endereços com barra final. A Vercel fornecerá um endereço de publicação; teste esse endereço antes de apontar o domínio.

## 3. Conectar o domínio da Name.com

Você pode manter o domínio registrado na Name.com e hospedar o site na Vercel.

1. No projeto Vercel, abra **Settings → Domains** e adicione seu domínio.
2. Adicione também a versão com `www`, se quiser usá-la, e escolha o endereço principal.
3. A Vercel mostrará os registros DNS necessários. **Copie os valores exibidos para o seu projeto.** Não use um IP ou CNAME encontrado num tutorial antigo.
4. Se a Name.com estiver gerenciando o DNS do domínio, acesse **My Domains → seu domínio → Manage DNS Records**.
5. Crie ou ajuste apenas os registros do site conforme a Vercel orientar: normalmente A para o domínio principal e CNAME para um subdomínio como `www`.
6. Se houver uma verificação TXT, adicione exatamente o registro informado.
7. Volte à Vercel e confira quando o domínio estiver validado e o HTTPS ativo. A propagação pode levar algum tempo.

Se os nameservers apontarem para outro provedor, os registros precisam ser editados naquele provedor, mesmo que o domínio tenha sido comprado na Name.com. Não é necessário transferir o domínio. Preserve registros existentes de e-mail e de outros serviços.

## 4. Continuar desenvolvendo

Depois de editar e testar:

```bash
npm run check
git add .
git commit -m "Descreve a alteracao feita"
git push
```

Com a integração configurada, alterações na branch de produção disparam uma nova publicação na Vercel. Para mudanças maiores, use uma branch e revise a prévia antes de incorporar em `main`.

## Referências oficiais consultadas

- [Vercel: configuração de build](https://vercel.com/docs/builds/configure-a-build)
- [Vercel: integração com Git](https://vercel.com/docs/git)
- [Vercel: adicionar um domínio](https://vercel.com/docs/domains/working-with-domains/add-a-domain)
- [Name.com: gerenciar DNS](https://www.name.com/support/articles/206127137-adding-dns-records-and-templates)
