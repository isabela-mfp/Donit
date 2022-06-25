import axios from 'axios';

export const getAllTodoLists = async () => {
  const res = await axios.get('/app/list', { withCredentials: true });
  return res.data.map((el) => ({
    id: el.pk,
    desc: el.fields.description,
    name: el.fields.name,
  }));
};

export const getTodoListItems = async (id) => {
  const res = await axios.get(`app/list/${id}/`, { withCredentials: true });
  const list = res.data.map((el) => ({
    id: el.pk,
    desc: el.fields.description,
    name: el.fields.name,
  }))[0];
  const tasks = await axios.get(`app/task/${id}/`, { withCredentials: true });
  list.items = tasks.data.map((el) => ({
    id: el.pk,
    conclusionDate: el.fields.conclusion,
    creation: el.fields.creation,
    description: el.fields.description,
    dueDate: el.fields.dueDate,
    name: el.fields.name,
    priority: el.fields.priority,
    status: el.fields.status,
  }));
  return list;
};

export const createTodoList = async (name, description, type) => {
  const bodyFormData = new FormData();
  bodyFormData.append('name', name);
  bodyFormData.append('description', description);
  bodyFormData.append('type', type);
  const res = await axios.post('/app/list', bodyFormData, { withCredentials: true });
  return res.status === 200;
};

export const updateTodoListItem = async (todoListId, itemId) => {
  const res = await axios.put(`app/task/${itemId}/`, null, { withCredentials: true });
  return res.status === 200;
};

export const deleteTodoListItem = async (todoListId, itemId) => {
  const res = await axios.delete(`/app/task/${itemId}/`, { withCredentials: true });
  return res.status === 200;
};

export const createTodoItem = async (todoListId, todoItem) => {
  const bodyFormData = new FormData();
  bodyFormData.append('name', todoItem.name);
  bodyFormData.append('description', todoItem.desc);
  bodyFormData.append('status', 'T');
  bodyFormData.append('priority', 1);
  bodyFormData.append('dueDate', todoItem?.dueDate);
  // bodyFormData.append('creation', (new Date()).toISOString().split('T')[0]);
  const res = await axios.post(`/app/task/${todoListId}/`, bodyFormData, { withCredentials: true });
  return res.status === 200;
};

export const deleteTodoList = async (todoListId) => {
  const res = await axios.delete(`/app/list/${todoListId}/`, { withCredentials: true });
  return res.status === 200;
};

export default {
  getAllTodoLists,
  createTodoList,
  getTodoListItems,
  deleteTodoListItem,
  updateTodoListItem,
  createTodoItem,
  deleteTodoList,
};
