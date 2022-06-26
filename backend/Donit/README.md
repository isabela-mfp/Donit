# Donit
Trabalho Prático da disciplina de Teste de Software

### Usage/Routes:
* **List**:
    * `GET` a list by id: `app/list/<list id>`
    * `GET` lists by user: `app/list/`
    * `POST` create list: `app/list`
    * `DELETE` a list by id: `app/list/<list id>/`

* **Task**:
    * `GET` tasks by list: `app/task/<list id>`
    * `POST` create task: `app/task/<list id>/`
    * `DELETE` a task by id:`app/task/<task id>/`

* **User**:
    * `POST` -> `/login`
    * `POST` -> `/register`
    * `POST` -> `/logout`

### Stack
* Framework: Django
* Database: MySQL

### Dependencies:
* Pytho 3.8.2
* Venv (sudo apt install python3.8-venv)
* pip (sudo apt install python3-pip)

### Initial setup:
* Virtual Enviroment:
    1. Create enviroment:    `python3 -m venv ./venv`
    2. Activate enviroment:  `source venv/bin/activate`
    3. Install requirements: `pip install -r requirements.txt`
* Migrations:
    1. `python3 manage.py makemigrations app`
    2. `python3 manage.py migrate app`


### Execute:
1. Activate enviroment:  `source venv/bin/activate`
2. Execute: `python3 manage.py runserver`
3. Exit: `deactivate`
