import * as puppeteer from 'puppeteer';
import { login } from './login';
import { checkCourses } from './check-courses';
import { checkAnnouncements } from './check-announcements';
import { renderError, renderInfo, renderSuccess } from '../helper/messages-helper';
import { getLogin } from '../helper/store-helper';
import { logout } from './logout';

export async function crawl() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    console.log('');

    renderInfo(`Logging in as ${getLogin()}…`);
    await login(page).catch(() => renderError('Cannot log in to EDUX!'));

    renderInfo('Looking for updated courses…');
    await checkCourses(page).catch(() => renderError('Cannot fetch courses!'));

    renderInfo('Looking for unread global announcements…');
    await checkAnnouncements(page).catch(() => renderError('Cannot fetch announcements!'));

    renderInfo('Logging out from EDUX…');
    await logout(page).catch(() => renderError('Cannot log out from EDUX!'));

    renderSuccess('Successfully logged out. :)');

    await browser
        .close()
        .catch(() => renderError('EDUX seems to be down!'));
}
