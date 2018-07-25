import * as puppeteer from 'puppeteer';
import chalk from 'chalk';
import { eduxUrl } from '../config/edux';
import { announcementsCountKey } from '../config/store';
import { renderSuccess, renderWarning } from '../helper/messages-helper';
import { getStoredValue, storeValue } from '../helper/store-helper';

function hasNewAnnouncements(announcementRowsCount: number): boolean {
    return announcementRowsCount > 0 && getStoredValue(announcementsCountKey) !== announcementRowsCount;
}

export async function checkAnnouncements(page: puppeteer.Page): Promise<void> {
    const {announcementRowsCount} = await page.evaluate(() => ({
        announcementRowsCount: document.querySelectorAll('tr[id^=ctl00_ContentPlaceHolder1_grdOgloszeniaOgolne_ctl00__]').length,
    }));

    if (!hasNewAnnouncements(announcementRowsCount)) {
        renderSuccess('No new announcements on the EDUX platform.');
        return;
    }

    storeValue<number>(announcementsCountKey, announcementRowsCount);

    renderWarning(`There are ${chalk.bold(announcementRowsCount.toString())} new announcements.`);
    console.log(`  You can read them under the "Announcements" tab: ${chalk.blue.underline(eduxUrl)}\n`);
}
