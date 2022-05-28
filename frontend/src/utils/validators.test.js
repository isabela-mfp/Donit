import '@testing-library/jest-dom/extend-expect';
import moment from 'moment';
import {
  dateFormat, isDateInPast, isPasswordValid, isValidEmail,
} from './validators';

describe('Validators test', () => {
  describe('Date is in past validator', () => {
    test('it should return false for today', () => {
      const dateString = moment().format(dateFormat);

      const result = isDateInPast(dateString);

      expect(result).toBeFalsy();
    });

    test('it should return false for date in the future', () => {
      const dateString = moment().add(10, 'days').format(dateFormat);

      const result = isDateInPast(dateString);

      expect(result).toBeFalsy();
    });

    test('it should return true for day before today', () => {
      const dateString = moment().subtract(1, 'days').format(dateFormat);

      const result = isDateInPast(dateString);

      expect(result).toBeTruthy();
    });
  });

  describe('Password rules validator', () => {
    test('it should return false for passwords with less than 8 characters', () => {
      const password = '1234567';

      const result = isPasswordValid(password);

      expect(result).toBeFalsy();
    });

    test('it should return false for passwords with no uppercase letter', () => {
      const password = 'abcedario123456789$%';

      const result = isPasswordValid(password);

      expect(result).toBeFalsy();
    });

    test('it should return false for passwords with no lowercase letter', () => {
      const password = 'ABCEDARIO123456789$%';

      const result = isPasswordValid(password);

      expect(result).toBeFalsy();
    });

    test('it should return false for passwords with no symbol', () => {
      const password = 'AbCedArIo987456321';

      const result = isPasswordValid(password);

      expect(result).toBeFalsy();
    });

    test('it should return false for passwords with no number', () => {
      const password = 'AbCedArIoo(*(¨*&%';

      const result = isPasswordValid(password);

      expect(result).toBeFalsy();
    });

    test('it should return true for passwords with uppercase and lowercase letters, more than 8 characters, numbers and symbol', () => {
      const password = 'AbCedArIo987456321*';

      const result = isPasswordValid(password);

      expect(result).toBeTruthy();
    });
  });

  describe('Email validator', () => {
    test('it should return false for empty string', () => {
      const email = '';

      const result = isValidEmail(email);

      expect(result).toBeFalsy();
    });

    test('it should return false for string without @', () => {
      const email = 'myemaildomain.com';

      const result = isValidEmail(email);

      expect(result).toBeFalsy();
    });

    test('it should return false for string without domain', () => {
      const email = 'myemail@nodomain';

      const result = isValidEmail(email);

      expect(result).toBeFalsy();
    });

    test('it should return true for valid email', () => {
      const email = 'myemail@valid.com';

      const result = isValidEmail(email);

      expect(result).toBeTruthy();
    });
  });
});
