import React, { useState } from 'react';
import {
  InputLabel, Input, InputAdornment, FormControl, Button, IconButton, makeStyles,
} from '@material-ui/core';
import { Visibility, VisibilityOff, Mail } from '@material-ui/icons';
import { isPasswordValid, isValidEmail } from '../../utils/validators';

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

  const showPassword = () => {
    setHidePassword(!hidePassword);
  };

  const submitRegistration = (ev) => {
    ev.preventDefault();
    const email = ev.target.email.value;
    const password = ev.target.password.value;
    const passwordConfirmation = ev.target.passwordConfirmation.value;
    console.log(email, password, passwordConfirmation);
  };

  const isValid = () => isPasswordValid(passwordState)
    && passwordState === passwordConfirmationState && isValidEmail(emailState);

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
        onSubmit={console.log}
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
        <div>
          <Button
            disabled={!isValid()}
            fullWidth
            variant="outlined"
            type="submit"
            onClick={submitRegistration}
          >
            Register
          </Button>
        </div>
      </form>
    </div>
  );
}

RegisterForm.propTypes = {};

RegisterForm.defaultProps = {};

export default RegisterForm;
