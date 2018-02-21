import Chromeless from 'chromeless';
import chalk from 'chalk';
import { authenticate } from './step/authenticate';
import { checkCourses } from './step/check-courses';
import { checkAnnouncements } from './step/check-announcements';

export async function getEduxNotifications() {
    const chromeless = new Chromeless();

    console.log(chalk.gray(`\n🔑  Logging in as ${process.env.EDUX_USERNAME}…`));
    await authenticate(chromeless);

    console.log(chalk.gray('\n👀  Looking for updated courses…'));
    await checkCourses(chromeless);

    console.log(chalk.gray('\n👀  Looking for unread global announcements…'));
    await checkAnnouncements(chromeless);

    console.log('');

    await chromeless.end();
}
