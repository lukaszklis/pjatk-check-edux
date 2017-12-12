# EDUX Crawler @ [PJATK](http://www.pja.edu.pl) [![Gitmoji](https://img.shields.io/badge/gitmoji-%20📖%20🛠-FFDD67.svg?style=flat-square)](https://gitmoji.carloscuesta.me)

After becoming a student at PJATK, I was extremely disappointed with lack of ability to receive notifications whenever
something is updated in the system (new announcements, forum entries, homework assignments).

EDUX Crawler allows you to run a command to get notifications about updates in the courses you are assigned to.

## Dependencies

* Node `8.9.1`+
* yarn `v1.3.2`+ (suggested, however npm `5.6.0`+ is going to work as well)

## How to use

1. Clone this repository.
1. Install dependencies via: `yarn` (or `npm i`).
1. Create necessary config files via: `yarn run config` (or `npm run config`).
1. Crawl the page by running: `yarn start` (or `npm start`).
1. A list of all of the notifications will be shown with links to a specific course.
