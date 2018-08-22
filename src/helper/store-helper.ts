import * as Configstore from "configstore";
import { storeLoginKey, storePasswordKey } from "../config/store";
import { decrypt, encrypt } from "./crypto-helper";

let currentStore: Configstore;

function getStore(): Configstore {
    if (!currentStore) {
        currentStore = new Configstore("pjatk-check-edux");
    }

    return currentStore;
}

export function hasCredentials(): boolean {
    const store = getStore();

    return store.has(storeLoginKey) && store.has(storePasswordKey);
}

export function storeValue<T>(field: string, value: T): void {
    const store = getStore();

    store.set(field, value);
}

export function getStoredValue<T>(field: string): T {
    const store = getStore();

    return store.get(field);
}

export function storeEncryptedValue(field: string, value: string): void {
    storeValue<string>(field, encrypt(value));
}

export function getEncryptedValue(field: string): string {
    return decrypt(getStoredValue<string>(field));
}

export function getLogin(): string {
    return getEncryptedValue(storeLoginKey);
}

export function getPassword(): string {
    return getEncryptedValue(storePasswordKey);
}

export function clearStore(): void {
    const store = getStore();

    store.clear();
}
