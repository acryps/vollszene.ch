import { Provider } from "../provider";
import { FacebookParser } from "../parsers/facebook";


export default class MolobarProvider extends Provider {
	name = 'molobar';

	async fetch() {
		return await FacebookParser.fetch('1508818609194066');
	}
}