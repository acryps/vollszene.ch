import { Provider } from "../provider";
import fetch from "node-fetch";
import { JSDOM } from "jsdom";
import { Event } from "../../managed/database";
import { FacebookParser } from "../parsers/facebook";


export default class MolobarProvider extends Provider {
    name = 'molobar';

    async fetch() {
        return await FacebookParser.fetch('1508818609194066');
    }
}