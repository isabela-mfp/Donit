const getParsedDb = () => JSON.parse(localStorage.getItem('database'));
const saveDb = (db) => localStorage.setItem('database', JSON.stringify(db));

export const register = (name, email, password) => {
  const db = getParsedDb();
  if (!db.users) {
    db.users = [];
  }
  const { users } = db;
  users.push({
    id: users.length + 1,
    name,
    email,
    password,
  });
  saveDb(db);
  return new Promise((resolve) => {
    setTimeout(() => resolve(true), 2000);
  });
};

export const loginService = (email, password) => {
  const { users } = getParsedDb();
  const user = users?.filter((el) => el.email === email && el.password === password)[0];
  return new Promise((resolve) => {
    setTimeout(() => resolve(user), 2000);
  });
};

export default {
  register,
  loginService,
};
