import {config} from 'dotenv';
import {getUpdatedCourses} from './crawler';
import chalk from 'chalk';

config();

if (!process.env.EDUX_USERNAME || !process.env.EDUX_PASSWORD) {
    throw new Error(chalk.red('Credentials are not set in the .env file!'));
}

getUpdatedCourses().catch(console.error.bind(console));