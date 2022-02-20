import { FacebookParser } from "../parsers/facebook";
import { Provider } from "../provider";

export default class GwärbiProvider extends Provider {
    name = 'gwärbi';

    async fetch() {
        return await FacebookParser.fetch('275485633126019');
    }
}