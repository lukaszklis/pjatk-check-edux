import Chromeless from 'chromeless';
import chalk from 'chalk';
import {Course} from './model/course';
import {getCourseLink, getCourseName, getUpdatedSections, hasUpdatedEduxColumns} from './helper/columns-helper';

const eduxUrl = 'https://edux.pjwstk.edu.pl';

export async function getUpdatedCourses() {
    console.log(chalk.gray('\nOpening EDUX to check for new notifications…'));

    const sections = new Map<number, string>();
    const updatedCourses = new Set<Course>();
    const chromeless = new Chromeless();

    await chromeless
        .goto(eduxUrl)
        .wait('table.login_form')
        .type(process.env.EDUX_USERNAME, '#ctl00_ContentPlaceHolder1_Login1_UserName')
        .type(process.env.EDUX_PASSWORD, '#ctl00_ContentPlaceHolder1_Login1_Password')
        .click('#ctl00_ContentPlaceHolder1_Login1_LoginButton')
        .wait('#ctl00_ContentPlaceHolder1_grdNoweElementy');

    const courseSections = await chromeless
        .evaluate<string[]>(() => {
            return Array
                .from(document.querySelectorAll('#ctl00_ContentPlaceHolder1_grdNoweElementy_ctl00 th.rgHeader'))
                .map((course) => course.textContent);
        });

    courseSections.forEach((courseSection, index) => sections.set(index, courseSection));

    const courseElements = await chromeless
        .evaluate<string[]>(() => {
            return Array
                .from(document.querySelectorAll('[id^="ctl00_ContentPlaceHolder1_grdNoweElementy_ctl00__"'))
                .filter((course) => course.textContent.includes('Nowe'))
                .map((course) => course.innerHTML.trim());
        });

    courseElements
        .map((courseElement) => {
            return courseElement
                .replace(/<tr[^>]*>/g, '<tr>')
                .replace(/<td[^>]*>/g, '<td>');
        })
        .forEach((courseElement) => {
            if (!hasUpdatedEduxColumns(courseElement)) {
                return;
            }

            updatedCourses.add(
                new Course(
                    getCourseName(courseElement),
                    getCourseLink(courseElement),
                    getUpdatedSections(courseElement, sections),
                ),
            );
        });

    await chromeless.end();

    if (updatedCourses.size === 0) {
        console.log(chalk.green('\nNo new notifications on the EDUX platform.'));
        return;
    }

    console.log(chalk.yellow('\nNew notifications for the following courses:\n'));

    Array.from(updatedCourses.values()).forEach((course) => {
        console.log(`* ${course.name} ` + chalk.cyan(`(${course.updates.join(', ')})`) + ':');
        console.log('  ' + chalk.blue.underline(`${eduxUrl}/${course.link}\n`));
    });
}
