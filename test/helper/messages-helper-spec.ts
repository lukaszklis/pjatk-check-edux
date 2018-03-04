import { renderInfo, renderSuccess, renderError } from '../../src/helper/messages-helper';
import chalk from 'chalk';

describe('renderInfo', () => {
    it('returns an info message', () => {
        spyOn(console, 'log');
        renderInfo('Some info message');
        expect(console.log).toHaveBeenCalled();
    });
});

describe('renderSuccess', () => {
    it('returns a success message', () => {
        spyOn(console, 'log');
        renderSuccess('Some success message');
        expect(console.log).toHaveBeenCalled();
    });
});

describe('renderError', () => {
    it('returns an error message', () => {
        spyOn(console, 'error');
        renderError('Some error message');
        expect(console.error).toHaveBeenCalled();
    });
});
