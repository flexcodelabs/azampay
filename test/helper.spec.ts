import { ErrorMessage } from '../src/shared/helpers/error.helper';

jest.setTimeout(300000);

describe('Error Sanitizer', () => {
  it('Should return error given an object', () => {
    const error = ErrorMessage({ message: 'Error' });
    expect(error).toBe('Error');
  });

  it('Should return error given a string', () => {
    const error = ErrorMessage('Error');
    expect(error).toBe('Error');
  });
});
