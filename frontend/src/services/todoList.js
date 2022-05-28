import moment from 'moment';
// import database from '../data/todolist';

// localStorage.setItem('database', JSON.stringify(database));

const getParsedDb = () => JSON.parse(localStorage.getItem('database'));
const saveDb = (db) => localStorage.setItem('database', JSON.stringify(db));

export const getAllTodoLists = () => {
  const db = getParsedDb();
  return new Promise((resolve) => {
    resolve(db.map((el) => el.id));
  });
};

const getDateFromString = (dateString) => (dateString ? moment(dateString).toDate() : null);

export const getTodoList = (id) => {
  const { todoLists } = getParsedDb();
  return new Promise((resolve) => {
    const todoList = todoLists.filter((el) => el.id === id)[0];
    const { items } = todoList;
    const mappedItems = items.map((el) => ({
      ...el,
      dueDate: getDateFromString(el.dueDate),
      conclusionDate: getDateFromString(el.conclusionDate),
    }));
    resolve({
      ...todoList,
      items: mappedItems,
    });
  });
};

export const updateTodoListItem = (todoListId, itemId) => {
  const db = getParsedDb();
  const { items } = db.todoLists.filter((el) => el.id === todoListId)[0];
  const todoItem = items.filter((el) => el.id === itemId)[0];
  todoItem.conclusionDate = todoItem.conclusionDate ? null : new Date();
  saveDb(db);
};

export const deleteTodoListItem = (todoListId, itemId) => {
  const db = getParsedDb();
  const { items } = db.todoLists.filter((el) => el.id === todoListId)[0];
  const todoItem = items.filter((el) => el.id === itemId)[0];
  items.splice(items.indexOf(todoItem));
  saveDb(db);
};

export const createTodoItem = (todoListId, todoItem) => {
  const db = getParsedDb();
  const { items } = db.todoLists.filter((el) => el.id === todoListId)[0];
  items.push({
    ...todoItem,
    id: items.length + 1,
  });
  saveDb(db);
};

export default {
  getAllTodoLists,
  getTodoListItems: getTodoList,
  deleteTodoListItem,
  updateTodoListItem,
  createTodoItem,
};
