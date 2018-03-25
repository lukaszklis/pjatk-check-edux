import chalk from 'chalk';

export function renderError(message: string): void {
    console.error(chalk.red(`\n${message}`));
}

export function renderInfo(message: string): void {
    console.log(chalk.gray(`\n> ${message}`));
}

export function renderSuccess(message: string): void {
    console.log(chalk.green(`\n${message}`));
}

export function renderWarning(message: string): void {
    console.log(chalk.yellow(`\n${message}`));
}
