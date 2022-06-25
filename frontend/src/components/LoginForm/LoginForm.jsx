import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  InputLabel, Input, InputAdornment, FormControl, Button, IconButton, CardActions,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import PersonIcon from '@mui/icons-material/Person';
import useAuth from '../../hooks/useAuth';
import './LoginForm.css';

function LoginForm() {
  const [hidePassword, setHidePassword] = useState(true);
  const [usernameState, setUsername] = useState('');
  const [passwordState, setPassword] = useState('');
  const { login, user } = useAuth();
  const navigate = useNavigate();

  if (user) {
    navigate('/panel');
  }

  const showPassword = () => {
    setHidePassword(!hidePassword);
  };

  const submitLogin = async (ev) => {
    ev.preventDefault();
    const username = ev.target.username.value;
    const password = ev.target.password.value;
    const userLogin = await login(username, password);
    if (userLogin) {
      navigate('/panel');
    }
  };

  const updatePassword = (ev) => {
    setPassword(ev.target.value);
  };

  const updateUsername = (ev) => {
    setUsername(ev.target.value);
  };

  const goToRegister = () => navigate('/register');

  return (
    <div data-testid="LoginForm" className="flexCenter">
      <form
        onSubmit={submitLogin}
      >
        <div>
          <FormControl margin="normal">
            <InputLabel htmlFor="username">Username</InputLabel>
            <Input
              name="username"
              value={usernameState}
              onChange={updateUsername}
              endAdornment={(
                <InputAdornment position="end">
                  <IconButton>
                    <PersonIcon />
                  </IconButton>
                </InputAdornment>
              )}
            />
          </FormControl>
        </div>
        <div>
          <FormControl>
            <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
            <Input
              id="inputPassword"
              type={hidePassword ? 'password' : 'text'}
              name="password"
              onChange={updatePassword}
              value={passwordState}
              endAdornment={(
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={showPassword}
                  >
                    {hidePassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              )}
            />
          </FormControl>
        </div>
        <CardActions>
          <Button
            fullWidth
            variant="outlined"
            id="register__btn"
            onClick={goToRegister}
          >
            Register
          </Button>
          <Button
            fullWidth
            variant="outlined"
            type="submit"
            id="login__btn"
          >
            Login
          </Button>
        </CardActions>
      </form>
    </div>
  );
}

LoginForm.propTypes = {};

LoginForm.defaultProps = {};

export default LoginForm;
