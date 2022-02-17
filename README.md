# project-task-list[PT-BR]

O projeto em questão é um treinamento em condições semelhantes a um processo seletivo elaborado pela Trybe com o objetivo de ajudar os alunos a evoluir na jornada de desenvolvedor.

O Desafio em questão tinha as seguintes premissas:
#### Contexto:
+ A empresa Ebytr(Trybe ao contrário) está passando por problemas de produtividade/controle porque as pessoas colaboradoras vêm tendo dificuldade na organização de suas tarefas individuais. Por esse motivo, a diretora de produto Carolina Bigonha decidiu implantar uma nova forma de organizar as tarefas.
Você foi a pessoa contratada para desenvolver um sistema capaz de auxiliar as pessoas colaboradoras a se organizar e ter mais produtividade.
Na Ebytr o time de desenvolvimento utiliza a Stack MERN para criar suas aplicações. Foi combinado com a Ebytr que você utilizará essa mesma Stack para resolver o problema de organização e produtividade da empresa.

#### Requisitos técnicos:
+ Front-End em React;
+ Back-End em NodeJS, com MongoDB;
+ Arquitetura em camadas;
+ Funcionalidades:
+ Visualizar a lista de tarefas;
+ Esta lista deve ser ordenável por ordem alfabética, data de criação ou por status;
+ Inserir uma nova tarefa na lista;
+ Remover uma tarefa da lista;
+ Atualizar uma tarefa da lista;
+ A tarefa deve possuir um status editável: pendente, em andamento ou pronto;

#### Critérios de avaliação
+ Atendimento aos requisitos técnicos e funcionais;
+ Projeto deve rodar sem erros;
+ Entendimento dos conceitos das camadas adotadas;
+ Código e componentes reutilizados;
+ Habilidade em escrever testes (mínimo 30% de cobertura);
+ Boa legibilidade do código;
+ Separação do front e backend;
+ Mensagens de commits bem descritas e commits com um escopo nítido;
+ Referências de códigos de terceiros;
+ Instruções nítidas no README do projeto para setup e execução da aplicação e dos testes.

## Avaliação Inicial do Problema

Após uma avaliação inicial pensei em desenhar um sistema robusto cheio de funcionalidades diferentes(login, equipes de trabalho diversas cada uma com seu administrador, visualizações diferentes: Lista, Kanban e até Scrum, darkmode, etc.), mas após repensar focando em metodologias ágeis decidi focar no básico, até porque não tinha muito tempo para executar a tarefa. Essas funcionalidades serão melhor desenhadas e tentarei implementar no futuro.

## Soluções apresentadas

Seguindo o requisitado pela Trybe, implementei uma aplicação Full-Stack, ainda sem deploy, seguindo a MERN stack (mongoDB, express, react e note).


O *Back-end* foi implementado a partir do exemplo apresentado pelo Paulo Ricardo Zambelli (Zambs) existente no repositório https://github.com/pauloricardoz/desafio-auto-trybe-back. Basicamente utilizei o código base dele e adaptei para a necessidade do projeto em questão, aproveitando inclusive a base de testes. 

O Covarage de test do Back-End está conforme abaixo, tendo espaço para aumentar o percentual. 
![image](https://user-images.githubusercontent.com/82231635/154468819-2348a366-e2ef-44e9-a48f-d4aadc49c1f2.png)

O taskController já possui 100% de cobertura, mas devido a uma alteração realizado no getAll(tasks) para que o mesmo ordenasse o resultado de listar as tasks para ser utilizado no front-end, esse % foi reduzido e com erro. - é necessário atualizar o código(com o tempo restante, priorizei nesse momento o README).


O *Front-end* foi implementado com quase tudo que já aprendi na Trybe. Um coisa nova que utilizei nesse projeto foi utilizar o duplo-clique para habilitar a edição apertar Enter para finaliza-lo, com o ojetivo de tornar a interface mais intuitiva para o usuário. 
O código foi baseado no que eu encontrei na página: https://flaviocopes.com/react-edit-doubleclick/.

Para o Front-end, ainda é necessário desenvolver os testes, melhoria futura prevista para antes de implementação de qualquer outra melhoria (exceto pela necessidade de estiliza-lo => número 2 na lista de prioridades).


## Gostaria de ver o código rodando na minha Máquina!

Pre-requisitos para rodar o projeto:
+ mongoDB
+ NPM

Para  testar em seu computador basta clonar o repositório através do seguinte código em seu terminal do Ubuntu:
`git clone git@github.com:GMODias/project-task-list.git`

Instalar as dependências tanto para a pasta client(Front-End) e server(Back-End):

  #### Back-End
   A partir da raiz do projeto:
  `cd server`
  `npm install`
  `npm start`
   A aplicação está configurada para rodar na porta local 3001. Caso deseje utilizar outra porta utilize o arquivo .env.example para trocar para a porta desejada. Após a alteração renomeie o arquivo para .env
  
  #### Front-End
  A partir da raiz do projeto:
  `cd client`
  `npm install`

  No processo de instalação do Lint da Trybe pode ser que exista algum erro em relação ao babel, pois a versão 1.2.3 utiliza uma referência que pelo que    foi informado pelo NPM, deixou de ser utilizada. Por isso é bem provavel que após a instalação do NPM seja necessário realizar as seguintes modificações:
`Entrar no arquivo client/node_modules/eslint-config-trybe-frontend/config.json e altera-lo conforme abaixo:`
![image](https://user-images.githubusercontent.com/82231635/154471933-b0bf5fb9-6646-4124-978d-4f68d2485108.png)
`Conforme na linha 24.`

  `Entrar no arquivo client/node_modules/eslint-config-trybe-frontend/package.json e altera-lo conforme abaixo:`
  ![image](https://user-images.githubusercontent.com/82231635/154472060-e3cff3e3-9838-4f9f-94e6-4c20e8f1637d.png)
  `Conforme na linha 14.`

  Essas propostas de alteração foram retiradas do StackOverFlow:
  https://stackoverflow.com/questions/69554485/eslint-error-must-use-import-to-load-es-module
  E em conjunto com as propostas do link Abaixo:
  https://stackoverflow.com/questions/68677437/eslint-parsing-error-this-experimental-syntax-requires-enabling-one-of-the-fol

  O eslint-trybe-front-end, voltou a funcionar.

  Após esses ajustes caso for necessário, é rodar o código abaixo:
  `npm start`

  A porta defaut do react é a 3000, mas pode ser alterada, conforme sugestões do StackOverFlow:
  https://stackoverflow.com/questions/40714583/how-to-specify-a-port-to-run-a-create-react-app-based-project


## E agora? Para onde vai esse projeto?

A experiencia dessa simulação proposta pela Trybe foi de grande crescimento pessoal e profissional.

Conforme mencionado anteriormente os proximos passos são realizar uma estilização aceitável para o projeto e seguir elaborando os testes que ainda necessitam de implementação.

Para você que chegou até aqui, muito Obrigado pela atenção!!! 
Se tiver algum comentário ou sugestões fique livre para entrar em contato comigo através do Linkedin https://www.linkedin.com/in/guilherme-morais-dias/
