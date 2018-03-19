import * as program from 'commander';
import chalk from 'chalk';
import { renderInfo } from './helper/messages-helper';
import { hasCredentials } from './helper/store-helper';
import { getEduxNotifications } from './step/check-edux';
import { initialize } from './step/initialize';

program
    .option('-i, --init', 'Initialize `check-edux` on your computer')
    .parse(process.argv);

if (program.init) {
    renderInfo('Configuring edux-check…', '🔧');
    initialize();
} else {
    if (!hasCredentials()) {
        throw new Error(chalk.red('Credentials are not set in the .env file!'));
    }

    getEduxNotifications().catch(console.error.bind(console));
}
