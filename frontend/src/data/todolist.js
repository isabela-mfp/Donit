const todoList1 = [
  {
    id: 1,
    name: 'testando',
    conclusionDate: null,
    dueDate: new Date('2022-05-05'),
    desc: 'e lá vamos nós então meu caro e lá vamos nós então meu caro e lá vamos nós então meu caro e lá vamos nós então meu caroe lá vamos nós então meu caro',
  },
];

const database = {
  todoLists: [
    {
      id: 1,
      name: 'Todo List primeira',
      desc: 'Todo List primeira',
      items: todoList1,
    },
  ],
};

export default database;
