import * as React from 'react';
import PropTypes from 'prop-types';

import { loginService } from '../services/userService';

const authContext = React.createContext();

function useAuth() {
  const [authed, setAuthed] = React.useState({});

  return {
    authed,
    async login(username, password) {
      const loginSuccess = await loginService(username, password);
      const user = {
        username, password,
      };
      return new Promise((res, rej) => {
        if (loginSuccess) {
          setAuthed(user);
          res(user);
        } else {
          setAuthed(null);
          rej();
        }
      });
    },
    logout() {
      return new Promise((res) => {
        setAuthed(null);
        res();
      });
    },
  };
}

export function AuthProvider({ children }) {
  const auth = useAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export default function AuthConsumer() {
  return React.useContext(authContext);
}

AuthProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

AuthProvider.defaultProps = {};
