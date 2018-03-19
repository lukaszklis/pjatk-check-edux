# `check-edux` @ [PJATK](http://www.pja.edu.pl)

[![Build Status](https://travis-ci.org/lukaszklis/pjatk-check-edux.svg?branch=master)](https://travis-ci.org/lukaszklis/pjatk-check-edux) [![git3moji](https://img.shields.io/badge/git3moji-%E2%9A%A1%EF%B8%8F%F0%9F%90%9B%F0%9F%93%BA%F0%9F%91%AE%F0%9F%94%A4-fffad8.svg?style=flat-square)](https://robinpokorny.github.io/git3moji/) ![@lukaszklis/pjatk-check-edux](https://img.shields.io/npm/v/@lukaszklis/pjatk-check-edux.svg)


After becoming a student at PJATK, I was extremely disappointed with lack of ability to receive notifications whenever
something is updated in the system (new announcements, forum entries, homework assignments).

EDUX Checker allows you easily check for new updates in courses and global announcements via running a simple command
in your terminal: `check-edux`.

## Installation

```bash
npm i -g @lukaszklis/pjatk-check-edux
```

## How to use

Initialize the settings:

```bash
check-edux --init
```

From now on you can simply run the following:

```bash
check-edux
```

## Development

### Dependencies

* Node `8.9.1`+
* yarn `v1.5.1`+ (suggested, however npm `5.6.0`+ is going to work as well)

## Development flow

1. Clone this repository.
1. Install dependencies via: `yarn`.
1. Create necessary config files via: `yarn run config`.
1. Crawl the page by running: `yarn start`.
1. A list of all of the notifications will be shown with links to a specific course.
