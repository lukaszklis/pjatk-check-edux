import Chromeless from 'chromeless';
import { eduxUrl } from '../config/edux';
import { getLogin, getPassword } from '../helper/store-helper';

export async function authenticate(chromeless: Chromeless<any>): Promise<void> {
    await chromeless
        .goto(`${eduxUrl}/Login.aspx`)
        .wait('table.login_form')
        .type(getLogin(), '#ctl00_ContentPlaceHolder1_Login1_UserName')
        .type(getPassword(), '#ctl00_ContentPlaceHolder1_Login1_Password')
        .click('#ctl00_ContentPlaceHolder1_Login1_LoginButton')
        .wait('#ctl00_ContentPlaceHolder1_grdNoweElementy');
}
