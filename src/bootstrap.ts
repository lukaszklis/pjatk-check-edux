import chalk from 'chalk';
import {config} from 'dotenv';
import {getEduxNotifications} from './crawler';

config();

if (!process.env.EDUX_USERNAME || !process.env.EDUX_PASSWORD) {
    throw new Error(chalk.red('Credentials are not set in the .env file!'));
}

getEduxNotifications().catch(console.error.bind(console));
