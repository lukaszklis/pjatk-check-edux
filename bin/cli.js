#!/usr/bin/env node

const program = require('commander');

program
    .version('1.0.0')
    .option('-i, --init', 'Initialize `check-edux` on your computer')
    .parse(process.argv);

require('ts-node').register({
    fast: true,
    noProject: true
});

if (program.init) {
    require('../src/init.ts');
} else {
    require('../src/run.ts');
}
