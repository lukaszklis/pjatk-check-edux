import Chromeless from 'chromeless';
import { authenticate } from './authenticate';
import { checkCourses } from './check-courses';
import { checkAnnouncements } from './check-announcements';
import { renderError, renderInfo } from '../helper/messages-helper';
import { getLogin } from '../helper/store-helper';

export async function getEduxNotifications() {
    const chromeless = new Chromeless();

    renderInfo(`Logging in as ${getLogin()}…`, '🔑');
    await authenticate(chromeless).catch(() => renderError('Cannot log in to EDUX!'));

    renderInfo('Looking for updated courses…', '👀');
    await checkCourses(chromeless).catch(() => renderError('Cannot fetch courses!'));

    renderInfo('Looking for unread global announcements…', '👀');
    await checkAnnouncements(chromeless).catch(() => renderError('Cannot fetch announcements!'));

    await chromeless
        .end()
        .catch(() => renderError('EDUX seems to be down!'));
}
