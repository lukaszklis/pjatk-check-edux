import { validateLogin } from '../../src/validator/login-validator';

describe('validateLogin', () => {
    it('returns true whenever login matches the pattern', () => {
        expect(validateLogin('s12345')).toBeTruthy();
    });

    it('returns an error message whenever login does not match the pattern', () => {
        expect(typeof validateLogin('testing')).toEqual('string');
    });
});
