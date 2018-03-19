import * as CryptoJS from 'crypto-js';
import { storeHash } from '../config/store';

const { AES, enc } = CryptoJS;

export function decrypt(message: string): string {
    return AES.decrypt(message, storeHash).toString(enc.Utf8);
}

export function encrypt(message: string): string {
    return AES.encrypt(message, storeHash).toString();
}
