import React from 'react';
import {
  Card, CardContent, makeStyles,
} from '@material-ui/core';
import {
  Routes,
  Route,
} from 'react-router-dom';
import icon from '../../icon.png';

import RegisterForm from '../RegisterForm/RegisterForm';
import LoginForm from '../LoginForm/LoginForm';

const useStyles = makeStyles(() => ({
  logo: {
    fontSize: '1.7em',
    fontWeight: 600,
  },
}));

function Home() {
  const classes = useStyles();

  return (
    <Card className="App-body">
      <div className="full-width row wrap justify-center items-center content-center">
        {/* <q-icon class="logo__icon" name="img:icon.png" size="8em" /> */}
        <div>
          <img src={icon} className="App-logo" alt="logo" />
        </div>
        <p>
          <span className={classes.logo}>Donit</span>
          <br />
          Um novo jeito de se organizar
        </p>
      </div>
      <CardContent>
        <Routes>
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/" element={<LoginForm />} />
        </Routes>
      </CardContent>
    </Card>
  );
}

Home.propTypes = {};

Home.defaultProps = {};

export default Home;
