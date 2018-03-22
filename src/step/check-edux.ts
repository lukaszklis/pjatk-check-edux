import * as puppeteer from 'puppeteer';
import { authenticate } from './authenticate';
import { checkCourses } from './check-courses';
import { checkAnnouncements } from './check-announcements';
import { renderError, renderInfo } from '../helper/messages-helper';
import { getLogin } from '../helper/store-helper';

export async function getEduxNotifications() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    renderInfo(`Logging in as ${getLogin()}…`, '🔑');
    await authenticate(page).catch(() => renderError('Cannot log in to EDUX!'));

    renderInfo('Looking for updated courses…', '👀');
    await checkCourses(page).catch(() => renderError('Cannot fetch courses!'));

    renderInfo('Looking for unread global announcements…', '👀');
    await checkAnnouncements(page).catch(() => renderError('Cannot fetch announcements!'));

    await browser
        .close()
        .catch(() => renderError('EDUX seems to be down!'));
}
