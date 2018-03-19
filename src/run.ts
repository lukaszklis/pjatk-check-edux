import chalk from 'chalk';
import { getEduxNotifications } from './step/check-edux';
import { hasCredentials } from './helper/store-helper';

if (!hasCredentials()) {
    throw new Error(chalk.red('Credentials are not set in the .env file!'));
}

getEduxNotifications().catch(console.error.bind(console));
