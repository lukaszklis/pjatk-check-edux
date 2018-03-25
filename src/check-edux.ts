import * as program from 'commander';
import chalk from 'chalk';
import { renderInfo } from './helper/messages-helper';
import { hasCredentials } from './helper/store-helper';
import { getEduxNotifications } from './step/check-edux';
import { initialize } from './step/initialize';
import { clear } from './step/clear';

program
    .option('-i, --init', 'Initialize `check-edux` on your computer')
    .option('-c, --clear', 'Clear `check-edux`’s storage on your computer')
    .parse(process.argv);

if (program.init) {
    renderInfo('Configuring check-edux…');
    initialize();
} else if (program.clear) {
    renderInfo('Clearing check-edux’s store…');
    clear();
} else {
    if (!hasCredentials()) {
        throw new Error(chalk.red('Credentials are not set in the .env file!'));
    }

    getEduxNotifications().catch(console.error.bind(console));
}
