import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  InputLabel, Input, InputAdornment, FormControl, Button, IconButton, makeStyles, CardActions,
} from '@material-ui/core';
import { Visibility, VisibilityOff, Mail } from '@material-ui/icons';
import { isValidEmail } from '../../utils/validators';
import useAuth from '../../hooks/useAuth';

const useStyles = makeStyles(() => ({
  flexCenter: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    paddingBottom: '5px',
  },
}));

function LoginForm() {
  const classes = useStyles();
  const [hidePassword, setHidePassword] = useState(true);
  const [emailState, setEmail] = useState('');
  const [passwordState, setPassword] = useState('');
  const { login, user } = useAuth();
  const navigate = useNavigate();

  if (user) {
    navigate('/panel');
  }

  const showPassword = () => {
    setHidePassword(!hidePassword);
  };

  const isValid = () => isValidEmail(emailState);

  const submitLogin = async (ev) => {
    ev.preventDefault();
    const email = ev.target.email.value;
    const password = ev.target.password.value;
    const userLogin = await login(email, password);
    if (userLogin) {
      navigate('/panel');
    }
  };

  const updatePassword = (ev) => {
    setPassword(ev.target.value);
  };

  const updateEmail = (ev) => {
    setEmail(ev.target.value);
  };

  const goToRegister = () => navigate('/register');

  return (
    <div data-testid="LoginForm" className={classes.flexCenter}>
      <form
        onSubmit={submitLogin}
      >
        <div>
          <FormControl margin="normal">
            <InputLabel htmlFor="email">E-mail</InputLabel>
            <Input
              name="email"
              type="email"
              autoComplete="email"
              value={emailState}
              onChange={updateEmail}
              endAdornment={(
                <InputAdornment position="end">
                  <IconButton>
                    <Mail />
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
                    {hidePassword ? <Visibility /> : <VisibilityOff />}
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
            onClick={goToRegister}
          >
            Register
          </Button>
          <Button
            disabled={!isValid()}
            fullWidth
            variant="outlined"
            type="submit"
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
