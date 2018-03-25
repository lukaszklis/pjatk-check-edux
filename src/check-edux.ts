import * as program from 'commander';
import chalk from 'chalk';
import { renderInfo } from './helper/messages-helper';
import { hasCredentials } from './helper/store-helper';
import { crawl } from './step/crawl';
import { initialize } from './step/initialize';
import { clear } from './step/clear';

program
    .option('-c, --clear', 'Clear `check-edux`’s storage on your computer')
    .parse(process.argv);

async function checkEdux(): Promise<void> {
    if (program.clear) {
        renderInfo('Clearing check-edux’s store…');
        clear();
    } else {
        if (!hasCredentials()) {
            renderInfo('Configuring check-edux…');
            await initialize();
        }

        crawl().catch(console.error.bind(console));
    }
}

checkEdux();
