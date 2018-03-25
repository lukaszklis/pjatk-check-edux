import * as inquirer from 'inquirer';
import { announcementsCountKey, storeLoginKey, storePasswordKey } from '../config/store';
import { renderInfo } from '../helper/messages-helper';
import { storeEncryptedValue, storeValue } from '../helper/store-helper';
import { validateLogin } from '../validator/login-validator';

function askForCredentials(): void {
    const questions: inquirer.Questions = [
        {
            message: 'Enter your EDUX username:',
            name: storeLoginKey,
            validate: (input, answers) => validateLogin(input),
        },
        {
            type: 'password',
            message: 'Enter your EDUX password:',
            name: storePasswordKey,
        },
    ];
    inquirer.prompt(questions).then((answers: inquirer.Answers) => {
        storeEncryptedValue(storeLoginKey, answers.login);
        storeEncryptedValue(storePasswordKey, answers.password);
    });
}

export function initialize(): void {
    storeValue<number>(announcementsCountKey, 0);
    renderInfo('Enter your EDUX credentials…\n');
    askForCredentials();
}
