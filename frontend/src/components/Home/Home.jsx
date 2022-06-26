import React from 'react';
import {
  Card, CardContent,
} from '@mui/material';
import {
  Routes,
  Route,
} from 'react-router-dom';
import icon from '../../icon.png';

import RegisterForm from '../RegisterForm/RegisterForm';
import LoginForm from '../LoginForm/LoginForm';
import './Home.css';

function Home() {
  return (
    <Card className="App-body">
      <div className="full-width row wrap justify-center items-center content-center">
        {/* <q-icon class="logo__icon" name="img:icon.png" size="8em" /> */}
        <div>
          <img src={icon} className="App-logo" alt="logo" />
        </div>
        <p>
          <span className="logo">Donit</span>
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
