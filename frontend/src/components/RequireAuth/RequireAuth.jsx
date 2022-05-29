import React from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

function RequireAuth({ children }) {
  const algo = useAuth();
  const { authed } = algo;
  return authed !== null ? children : <Navigate to="/" replace />;
}

RequireAuth.propTypes = {
  children: PropTypes.element.isRequired,
};

RequireAuth.defaultProps = {};

export default RequireAuth;
