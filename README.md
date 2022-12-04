# Processo Seletivo Portlouis

## ⚙️ Como Utilizar

1- Abra o terminal, clone o projeto e entre em sua pasta:
- `git@github.com:Adadezer/PSPortLouis.git`
- `cd PSPortLouis`

2- Crie e preencha as variáveis de ambiente:
- Crie na pasta raiz um arquivo chamado `.env`. O teste entrará na página do github, e fará login na conta usando essas informações, preencha esse arquivo corretamente com `email`, `senha`, e `nome do perfil`.

Na pasta raiz do projeto existe um arquivo chamado `.env.example` que tem um exemplo de como preencher essas variáveis, após o preenchimento você poderá renomear esse arquivo de exemplo para `.env`, ou criar um novo. 

3- Rode os testes e aguarde sua conclusão:
- `npm run test`
A aplicação abrirá uma janela no navegador e começará a preencher os dados e navegar pela página.

## 📌 Considerações
- Os testes foram configurados para rodar no navegador `Google Chrome`. 
Antes de rodar os testes, certifique que ele está instalado no computador, e o está usando como navegador padrão.

- Ao finalizar os testes, propositalmente 2 deles apresentarão erros, certificando de que a autenticação e o carregamento da página estão funcionando corretamente.