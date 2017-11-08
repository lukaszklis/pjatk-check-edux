const {
  Chromeless
} = require('chromeless');
const dotenv = require('dotenv');

dotenv.config();

if (!process.env.EDUX_USERNAME || !process.env.EDUX_PASSWORD) {
  throw new Error('Credentials are not set in the .env file!');
}

const eduxUrl = 'https://edux.pjwstk.edu.pl';

async function run() {
  const chromeless = new Chromeless();
  const courses = await chromeless
    .goto(eduxUrl)
    .wait('table.login_form')
    .type(process.env.EDUX_USERNAME, '#ctl00_ContentPlaceHolder1_Login1_UserName')
    .type(process.env.EDUX_PASSWORD, '#ctl00_ContentPlaceHolder1_Login1_Password')
    .click('#ctl00_ContentPlaceHolder1_Login1_LoginButton')
    .wait('#ctl00_ContentPlaceHolder1_grdNoweElementy')
    .evaluate(() => {
      return Array
        .from(document.querySelectorAll('[id^="ctl00_ContentPlaceHolder1_grdNoweElementy_ctl00__"'))
        .filter(course => course.innerText.trim().match(/Nowe/g))
        .map(course => course.querySelector('a').textContent);
    });

  await chromeless.end();

  if (!courses || courses.length === 0) {
    console.log('No new notifications on the EDUX platform.');
    return;
  }

  console.log(`
New notifications for the following courses:\n
${courses.map(course => `    - ${course}`).join('\n')}
\nVisit the EDUX platform for more:\n
    ${eduxUrl}
  `);
}

run().catch(console.error.bind(console));
