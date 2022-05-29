import axios from 'axios';

export const register = async (username, email, password) => {
  const bodyFormData = new FormData();
  bodyFormData.append('username', username);
  bodyFormData.append('email', email);
  bodyFormData.append('password', password);
  const res = await axios.post('/register', bodyFormData, { withCredentials: true });
  // eslint-disable-next-line
  console.log(res);
  return res.status === 200;
};

export const loginService = async (username, password) => {
  const bodyFormData = new FormData();
  bodyFormData.append('username', username);
  bodyFormData.append('password', password);
  const res = await axios.post('/login', bodyFormData, { withCredentials: true });
  return res.status === 200;
};

export default {
  register,
  loginService,
};
