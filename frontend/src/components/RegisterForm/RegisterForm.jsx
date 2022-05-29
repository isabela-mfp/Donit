import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  InputLabel, Input, InputAdornment, FormControl, Button, IconButton, makeStyles, CardActions,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { Visibility, VisibilityOff, Mail } from '@material-ui/icons';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { isPasswordValid, isValidEmail } from '../../utils/validators';
import { register } from '../../services/userService';

// import PropTypes from 'prop-types';

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

function RegisterForm() {
  const classes = useStyles();
  const [hidePassword, setHidePassword] = useState(true);
  const [emailState, setEmail] = useState('');
  const [passwordState, setPassword] = useState('');
  const [passwordConfirmationState, setPasswordConfirmation] = useState('');
  const navigate = useNavigate();

  const showPassword = () => {
    setHidePassword(!hidePassword);
  };

  const isValid = () => isPasswordValid(passwordState)
    && passwordState === passwordConfirmationState && isValidEmail(emailState);

  const goToLogin = () => {
    navigate('/');
  };

  const submitRegistration = async (ev) => {
    ev.preventDefault();
    if (!isValid()) {
      return;
    }
    const name = ev.target.name.value;
    const email = ev.target.email.value;
    const password = ev.target.password.value;
    const result = await register(name, email, password);
    if (result) {
      goToLogin();
    }
  };

  const updatePassword = (ev) => {
    setPassword(ev.target.value);
  };

  const updatePasswordConfirmation = (ev) => {
    setPasswordConfirmation(ev.target.value);
  };

  const updateEmail = (ev) => {
    setEmail(ev.target.value);
  };

  return (
    <div data-testid="RegisterForm" className={classes.flexCenter}>
      <form
        onSubmit={submitRegistration}
      >
        <div>
          <FormControl margin="normal" fullWidth>
            <InputLabel htmlFor="name">Name</InputLabel>
            <Input
              name="name"
              fullWidth
              endAdornment={(
                <InputAdornment position="end">
                  <IconButton>
                    <AccountCircleIcon />
                  </IconButton>
                </InputAdornment>
              )}
            />
          </FormControl>
        </div>
        <div>
          <FormControl margin="normal" fullWidth>
            <InputLabel htmlFor="email">E-mail</InputLabel>
            <Input
              name="email"
              type="email"
              autoComplete="email"
              value={emailState}
              onChange={updateEmail}
              fullWidth
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
          <FormControl fullWidth>
            <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
            <Input
              id="inputPassword"
              type={hidePassword ? 'password' : 'text'}
              name="password"
              onChange={updatePassword}
              value={passwordState}
              fullWidth
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
        <div>
          <FormControl fullWidth>
            <InputLabel htmlFor="standard-adornment-password">Password Confirmation</InputLabel>
            <Input
              id="inputPasswordConfirmation"
              type={hidePassword ? 'password' : 'text'}
              name="passwordConfirmation"
              onChange={updatePasswordConfirmation}
              value={passwordConfirmationState}
              fullWidth
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
            onClick={goToLogin}
          >
            Return
          </Button>
          <Button
            disabled={!isValid()}
            fullWidth
            variant="outlined"
            type="submit"
          >
            Register
          </Button>
        </CardActions>
        <Alert variant="outlined" severity="info">
          Password must have at least 8 characters,
          <br />
          {' '}
          1 uppercase and lowercase letters and 1 symbol.
        </Alert>
      </form>
    </div>
  );
}

RegisterForm.propTypes = {};

RegisterForm.defaultProps = {};

export default RegisterForm;
