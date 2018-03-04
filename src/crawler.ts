import Chromeless from 'chromeless';
import { authenticate } from './step/authenticate';
import { checkCourses } from './step/check-courses';
import { checkAnnouncements } from './step/check-announcements';
import { renderError, renderInfo } from './helper/messages-helper';

export async function getEduxNotifications() {
    const chromeless = new Chromeless();

    renderInfo(`Logging in as ${process.env.EDUX_USERNAME}…`, '🔑');
    await authenticate(chromeless).catch(() => renderError('Cannot log in to EDUX!'));

    renderInfo('Looking for updated courses…', '👀');
    await checkCourses(chromeless).catch(() => renderError('Cannot fetch courses!'));

    renderInfo('Looking for unread global announcements…', '👀');
    await checkAnnouncements(chromeless).catch(() => renderError('Cannot fetch announcements!'));

    await chromeless
        .end()
        .catch(() => renderError('EDUX seems to be down!'));
}
