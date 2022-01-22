import { Provider } from "../provider";

export default class FailProvider extends Provider {
    name = 'fail'

    async fetch() {
        throw new Error('fail');

        return [];
    }
}