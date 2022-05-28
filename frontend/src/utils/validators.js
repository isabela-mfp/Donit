// '2022-05-26' 'YYYY-mm-dd'
// import moment from 'moment';
const moment = require('moment');

export const dateFormat = 'YYYY-MM-DD';

export const isDateInPast = (dateString) => {
  const date = typeof dateString === 'string' ? moment(dateString, dateFormat) : dateString;
  const isPast = moment().diff(date, 'days') > 0;
  return isPast;
};

export const isPasswordValid = (password) => {
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return password.match(re) != null;
};

export const isValidEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return email.match(re) != null;
};

export default {
  dateFormat,
  isDateInPast,
  isPasswordValid,
  isValidEmail,
};
