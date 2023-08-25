import { DbContext } from "./managed/database";
import { DbClient, RunContext } from "vlquery";
import { Provider } from "./provider";

DbClient.connectedClient = new DbClient({});

DbClient.connectedClient.connect().then(async () => {
	const database = new DbContext(new RunContext());

	async function fetchEvents() {
		try {
			await Provider.update(database);
		} catch (error) {
			console.log('Fetch failed', error);
		}

		setTimeout(() => fetchEvents(), +process.env.FETCH_INTERVAL_HOURS * 1000 * 60 * 60);
	}

	fetchEvents();
});