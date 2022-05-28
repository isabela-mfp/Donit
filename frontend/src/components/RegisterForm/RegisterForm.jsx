import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  InputLabel, Input, InputAdornment, FormControl, Button, IconButton, makeStyles, CardActions,
} from '@material-ui/core';
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
    paddingBottom: '50px',
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
          <FormControl margin="normal">
            <InputLabel htmlFor="name">Name</InputLabel>
            <Input
              name="name"
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
        <div>
          <FormControl>
            <InputLabel htmlFor="standard-adornment-password">Password Confirmation</InputLabel>
            <Input
              id="inputPasswordConfirmation"
              type={hidePassword ? 'password' : 'text'}
              name="passwordConfirmation"
              onChange={updatePasswordConfirmation}
              value={passwordConfirmationState}
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
      </form>
    </div>
  );
}

RegisterForm.propTypes = {};

RegisterForm.defaultProps = {};

export default RegisterForm;
