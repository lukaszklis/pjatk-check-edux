import Chromeless from 'chromeless';
import {eduxUrl} from '../config/edux';

export async function authenticate(chromeless: Chromeless<any>): Promise<void> {
    await chromeless
        .goto(`${eduxUrl}/eng/Login.aspx`)
        .wait('table.login_form')
        .type(process.env.EDUX_USERNAME, '#ctl00_ContentPlaceHolder1_Login1_UserName')
        .type(process.env.EDUX_PASSWORD, '#ctl00_ContentPlaceHolder1_Login1_Password')
        .click('#ctl00_ContentPlaceHolder1_Login1_LoginButton')
        .wait('#ctl00_ContentPlaceHolder1_grdNoweElementy');
}
