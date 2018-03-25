import { clearStore } from '../helper/store-helper';
import { renderSuccess } from '../helper/messages-helper';

export function clear(): void {
    const store = clearStore();

    renderSuccess('The storage has been cleared.');
}
