# Donit

## Integrantes:

* Breno de Castro Pimenta **2017114809**
* Isabela Marina Ferreira Pires **2017014634**
* Lecio Alves **2016065120**
* Rafael Gonçalves <TODO>

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
  
* **FrontEnd**
  <TODO>





