import Chromeless from 'chromeless';
import chalk from 'chalk';
import {eduxUrl} from '../config/edux';
import * as Configstore from 'configstore';

const announcementsCountKey = 'announcementsCount';

function hasNewAnnouncements(store: Configstore, announcementRowsCount: number): boolean {
    return announcementRowsCount > 0 && store.get(announcementsCountKey) !== announcementRowsCount;
}

export async function checkAnnouncements(chromeless: Chromeless<any>): Promise<void> {
    const store = new Configstore('pjatk-edux-crawler');
    const announcementRowsCount = await chromeless
        .evaluate<number>(() => {
            return document
                .querySelectorAll('tr[id^=ctl00_ContentPlaceHolder1_grdOgloszeniaOgolne_ctl00__]')
                .length;
        });

    if (!hasNewAnnouncements(store, announcementRowsCount)) {
        console.log(chalk.green('\n✅  No new announcements on the EDUX platform.'));
        return;
    }

    store.set(announcementsCountKey, announcementRowsCount);

    console.log(chalk.yellow(`\n⚠️  There are ${chalk.bold(announcementRowsCount.toString())} new announcements.\n`));
    console.log(`  You can read them under the ”Ogłoszenia” tab: ${chalk.blue(eduxUrl)}`);
}
