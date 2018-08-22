import * as puppeteer from "puppeteer";
import { eduxUrl } from "../config/edux";
import { getLogin, getPassword } from "../helper/store-helper";

export async function login(page: puppeteer.Page): Promise<void> {
    await page.goto(`${eduxUrl}/Login.aspx`);
    await page.waitForSelector("table.login_form");
    await page.type("#ctl00_ContentPlaceHolder1_Login1_UserName", getLogin());
    await page.type(
        "#ctl00_ContentPlaceHolder1_Login1_Password",
        getPassword()
    );
    await page.click("#ctl00_ContentPlaceHolder1_Login1_LoginButton");
    await page.waitForSelector("#ctl00_ContentPlaceHolder1_grdNoweElementy");
}
