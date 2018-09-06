import * as inquirer from "inquirer";
import {
    announcementsCountKey,
    storeLoginKey,
    storePasswordKey
} from "../config/store";
import { renderInfo } from "../helper/messages-helper";
import { storeEncryptedValue, storeValue } from "../helper/store-helper";
import { validateLogin } from "../validator/login-validator";

async function askForCredentials(): Promise<void> {
    const questions: inquirer.Questions = [
        {
            message: "Enter your EDUX username:",
            name: storeLoginKey,
            validate: (input, _) => validateLogin(input)
        },
        {
            type: "password",
            message: "Enter your EDUX password:",
            name: storePasswordKey
        }
    ];

    const answers = await inquirer.prompt(questions);

    storeEncryptedValue(storeLoginKey, answers.login);
    storeEncryptedValue(storePasswordKey, answers.password);
}

export async function initialize(): Promise<void> {
    storeValue<number>(announcementsCountKey, 0);
    renderInfo("Enter your EDUX credentials…\n");
    await askForCredentials();
}
