import chalk from 'chalk';

export function validateLogin(input: string): boolean | string {
    if (/^s\d+$/g.test(input)) {
        return true;
    }

    return chalk.red('Username format is incorrect, example: s12345');
}
