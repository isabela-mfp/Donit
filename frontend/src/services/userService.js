export const register = (email, password) => {
  console.log(email, password);
  return new Promise((resolve) => {
    setTimeout(resolve, 2000);
  });
};

export default {
  register,
};
