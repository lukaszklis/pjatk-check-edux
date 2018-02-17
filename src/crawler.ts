import Chromeless from 'chromeless';
import chalk from 'chalk';
import {authenticate} from './step/authenticate';
import {checkCourses} from './step/check-courses';

export async function getEduxNotifications() {
    const chromeless = new Chromeless();

    console.log(chalk.gray(`\n🔑  Logging in as ${process.env.EDUX_USERNAME}…`));
    await authenticate(chromeless);

    console.log(chalk.gray('\n👀  Looking for updated courses…'));
    await checkCourses(chromeless);

    await chromeless.end();
}
