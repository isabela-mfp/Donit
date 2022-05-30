# Donit

## Integrantes:

* Breno de Castro Pimenta **2017114809**
* Isabela Marina Ferreira Pires **2017014634**
* Lecio Alves **2016065120**
* Rafael Gonçalves **2017014685**

## Descrição:
O Donit é um sistema de gerenciamento de lista de tarefas. Essas listas podem atender a diversos usos, de lista de compras à afazeres.
O sistema é utilizado por usuários cadastrados, onde cada lista pertence a um usuário e cada lista é composta por diversas tarefas.

## Tecnologias:
O sistema foi construído sobre o [Framework Django](https://www.djangoproject.com/) para o Backend, [ReactJS](https://pt-br.reactjs.org/) para o FrontEnd 
e o banco de dados [SQLite](https://www.sqlite.org/index.html).
Os testes do BackEnd utilizaram-se do ambiente de testes do Django, que além de fornercer uma classe base, também realiza a gestão para o banco de dados 
udado nos testes.
  
* **Backend**:
  Foram construídas três entidades principais para o sistema, sendo elas: Usuário, Lista e Tarefa.
  Para a construção do usuário foi utilizado a entidade nativa que o Django fornece, o que já traz diversos benefícios de validação.
  As outras duas entidades foram criadas a partir da classe Model do django, onde cada tarefa é relacionada a uma lista e cada lista é relacionada a um Usuário.
  Existem duas rotas principais de acesso à aplicação, a rota para login e registro, e outra rota para a gestão das listas.
  
* **FrontEnd**:
  Para a construção do frontend foi utilizado a biblioteca React.js. Foram desenvolvidos 3 páginas principais, de login, registro e gerenciamento de listas de tarefas.   Para a construção dos componentes também foram utilizados alguns módulos da biblioteca material-ui para React. Nos formulários, como de registro e criação de tarefas, validações foram adicionadas para garantir integridade no formato e tipo dos dados.
  Para a comunicação com o backend foram realizadas requisições HTTP através da biblioteca axios, que também ajuda lidar com cookies de sessão, como os fornecidos pelo Django. Os testes automatizados foram desenvolvidos utilizando jest e são compostos por uma mistura de testes realmente unitários e de componentes.





