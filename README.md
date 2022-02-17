# project-task-list[PT-BR]

O projeto em questão é um treinamento em condições semelhantes a um processo seletivo elaborado pela Trybe com o objetivo de ajudar os alunos a evoluir na jornada de desenvolvedor.

O Desafio em questão tinha as seguintes premissas:
Contexto:
+ A empresa Ebytr(Trybe ao contrário) está passando por problemas de produtividade/controle porque as pessoas colaboradoras vêm tendo dificuldade na organização de suas tarefas individuais. Por esse motivo, a diretora de produto Carolina Bigonha decidiu implantar uma nova forma de organizar as tarefas.
Você foi a pessoa contratada para desenvolver um sistema capaz de auxiliar as pessoas colaboradoras a se organizar e ter mais produtividade.
Na Ebytr o time de desenvolvimento utiliza a Stack MERN para criar suas aplicações. Foi combinado com a Ebytr que você utilizará essa mesma Stack para resolver o problema de organização e produtividade da empresa.

Abaixo estão (i) os requisitos técnicos, (ii) as funcionalidades, (iii) critérios de avaliação do desafio e (iv) algumas dicas importantes.
+ Requisitos técnicos:
Front-End em React;
Back-End em NodeJS, com MongoDB;
Arquitetura em camadas;
Funcionalidades:
Visualizar a lista de tarefas;
Esta lista deve ser ordenável por ordem alfabética, data de criação ou por status;
Inserir uma nova tarefa na lista;
Remover uma tarefa da lista;
Atualizar uma tarefa da lista;
A tarefa deve possuir um status editável: pendente, em andamento ou pronto;
Critérios de avaliação
Nosso time irá avaliar a sua entrega olhando, principalmente, para os itens abaixo:
Atendimento aos requisitos técnicos e funcionais;
Seu projeto deve rodar sem erros;
Entendimento dos conceitos das camadas adotadas;
Código e componentes reutilizados;
Habilidade em escrever testes (mínimo 30% de cobertura);
Boa legibilidade do código;
Separação do front e backend;
Mensagens de commits bem descritas e commits com um escopo nítido;
Referências de códigos de terceiros;
Instruções nítidas no README do projeto para setup e execução da aplicação e dos testes.
Dicas importantes!
Ter uma boa cobertura de testes Front e Back;
Aplicar boas práticas de escrita de código;
Documentação do projeto (README), que inclua:
Passo a passo para instalar e executar o projeto. Incluindo instruções especiais para instalar dependências e/ou bancos de dados, se houver;
Endereço da aplicação no Heroku, se houver (ou outro serviço de deployment);
Ter um linter configurado;
O projeto deverá ser entregue via repositório pessoal no GitHub (utilize boas práticas de criação/nomeação de branches, além de mensagens de commits bem descritas e commits com um escopo nítido).

A equipe do grupo 3 após ponderar sobre os temas apresentados no Hackathon optou em propor soluções para as dores do Ensino de Programação, principalmente no que tange a dificuldade de novos alunos sem back-ground em tecnologia em aprender e se manter no curso.

<img src="https://github.com/GMODias/frontend-legados-hackathon-project/blob/main/Captura_de_tela_de_2021-12-14_01-48-40-ANIMATION.gif" alt="frontend-legados-hackathon" />

## Avaliação Inicial do Problema

Ao analisarmos o problema em questão, discutiu-se principalmente os seguintes pontos:
+ Didática: Cada pessoa é um individuo, e cada um aprende de uma maneira e em um tempo diferente.
+ "Calor humano": Para pessoas recém chegadas muitas vezes a necessidade de um approach mais perto de alguém com mais conhecimento e disponibilidade de ensinar, ainda mais quando os primeiros passos são instalar e aprender Linux, Bash, utilizar IDE's e o GIT.

## Soluções apresentadas

+ Para o ponto de didática foram pensadas as 2 soluções abaixo:
  - Criar no ambiente de ensino mais de uma forma do material didático ser apresentado. A ideia aqui foi manter a forma atual, mas também possibilitar uma "trilha" de aprendizado para os alunos, onde os mesmo seguiriam com um "assistente virtual", quase como a Cortana, Siri, etc, que indicaria os caminhos / ações para o aluno ir progredindo na matéria, quase que executando um passo a passo ao vivo como muitos tutoriais, mas que só evolui após o usuário executar o passo. A ideia é inclusive criar novas trilhas se mostrem viáveis com o tempo.
  - Criar fora do Slack, um painel simplificado onde descrições e links de materiais didáticos sejam apresentados e exista a possibilidade do usuários marcarem se o material é bom mas avançado ou se é bom e para iniciante ("noob"), gerando um ranking com histórico de material que ajude tanto estudantes iniciantes como avançados, e possuindo o feed-back principal dos estudantes. Essa solução tem o objetivo de simplificar o slack e de mitigar a separação de canais de turma como registro de informações.
 
 + Para o ponto "calor humano", analisou-se que existem muitos alunos bons na Trybe, ainda mais com o número crescente de seus estudantes, sendo imaginado uma forma de tentar juntar os alunos que tem duvidas com os alunos que querem ajudar / mentorear outros, independente da turma que eles sejam. Existem muitos alunos que ajudam os outros e essa ajuda não aparece e alunos que tem duvidas e muitas vezes não tentam saná-las com outras pessoas, por isso foi esboçado um sistema com calendário onde os alunos marcam os horários onde têm duvidas de uma matéria especifica, outros alunos marcam horários que podem ensinar matérias que "dominam", e assim é feito um match entre eles, quase que um Tinder misturado com Calendly (agradecimentos ao Gustavo Nunes pela comparação). Foram pensadas muitas regras de negócio como avaliação dos alunos e mentores após uma meeting (soft-skills, hard-skill, se a duvida foi sanada, estrelas semelhante ao uber, etc), a opção de um aluno e /ou mentor poder tirar duvidas ou ensinar com acessibilidade (línguá de sinais), emissão de certificados de acordo com o tempo de mentoria valorizando e dando visibilidade aos estudantes que ajudam os outros (mitigando um pouco o é preciso ser visto para ser lembrado), etc. 
PS.: é importante reforçar que a regra de negócio necessita ser muito bem alinhada e a equipe acredita que os alunos com maiores pontuações devem ser direcionados para solucionar problemas de estudantes iniciantes, principalmente por conta do cuidado que se deve ter.

## O que foi possível implementar das ideias?

Não estava muito claro para a equipe o que devia ser o produto final a ser apresentado. Inicialmente pensamos muito em todo o potencial e o que queríamos chegar com o produto, tentando estruturar um back-end "parrudo" e com as regras de negócios boas, mas de implementação muito complicada, principalmente com o tempo que tínhamos.

No último dia de projeto do Hackathon, os monitores (Gustavo e Liipe) indicaram o melhor caminho a seguir como entrega e sendo assim focamos no Front-End da aplicação, e com o tempo restante infelizmente não foi possível elaborar os testes.

Foi utilizado o React com Redux e Hooks para o desenvolvimento do Front-End e no Back-End (repositório https://github.com/0xguidev/legados-backend) foi utilizado o NodeJs com o Express para pontos de login e cadastro de usuários.

## E agora? Para onde vamos? (dormir daqui a pouco pois já é 2hrs da matina...)

A experiencia foi muito produtiva, e a equipe pensa em a partir de agora utilizar o tempo livre para evoluir no desenvolvimento da aplicação, sendo estes os primeiros a utilizarem-na, não só para tirar duvidas, mas para marcar horário para beber, codar, evoluir a ideia e quem sabe um dia ter um produto 100% funcional no mercado com o nosso nome e nossa cara.


Para você que chegou até aqui, muito Obrigado pela atenção!!! 
Equipe L(e||a)gados - Grupo 3 - Alex Smith, Guilherme de Paula , Guilherme Dias e Marlon Ramos.

PS.: Para as futuras implementações já estão sendo pensados inúmeros Easter-Eggs!!!
