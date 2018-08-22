import chalk from "chalk";

function prefixy(message: string, prefix?: string): string {
    let tmp = "  ";

    if (prefix) {
        tmp = prefix + tmp.slice(-1);
    }

    return `${tmp}${message}\n`;
}

export function renderError(message: string): void {
    console.error(chalk.red(prefixy(message)));
}

export function renderInfo(message: string): void {
    console.log(chalk.gray(prefixy(message, ">")));
}

export function renderSuccess(message: string): void {
    console.log(chalk.green(prefixy(message)));
}

export function renderWarning(message: string): void {
    console.log(chalk.yellow(prefixy(message)));
}
