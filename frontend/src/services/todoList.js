import moment from 'moment';
import database from '../data/todolist';

const getParsedDb = () => JSON.parse(localStorage.getItem('database'));

if (!getParsedDb()) {
  localStorage.setItem('database', JSON.stringify(database));
}
const saveDb = (db) => localStorage.setItem('database', JSON.stringify(db));

const getDateFromString = (dateString) => (dateString ? moment(dateString).toDate() : null);

export const getAllTodoLists = () => {
  const db = getParsedDb();
  return new Promise((resolve) => {
    resolve(db.todoLists?.map((el) => ({ ...el, items: null })));
  });
};

export const getTodoListItems = (id) => {
  const { todoLists } = getParsedDb();
  return new Promise((resolve) => {
    const todoList = todoLists.filter((el) => el.id === id)[0];
    const { items } = todoList || { items: [] };
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

export const createTodoList = (name, description) => {
  const db = getParsedDb();
  db.todoLists.push({
    id: db.todoLists.length + 1,
    name,
    description,
    items: [],
  });
  saveDb(db);
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
  createTodoList,
  getTodoListItems,
  deleteTodoListItem,
  updateTodoListItem,
  createTodoItem,
};
