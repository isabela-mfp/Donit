import {
  Card, CardContent, makeStyles,
} from '@material-ui/core';
import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import icon from './icon.png';

import RegisterForm from './components/RegisterForm/RegisterForm';
import LoginForm from './components/LoginForm/LoginForm';

const useStyles = makeStyles(() => ({
  logo: {
    fontSize: '1.7em',
    fontWeight: 600,
  },
}));

function App() {
  const classes = useStyles();
  return (
    <Router>
      <div className="App">
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
              <Route path="/login" element={<LoginForm />} />
            </Routes>
          </CardContent>
        </Card>
      </div>
    </Router>
  );
}

export default App;
