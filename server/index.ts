import { Inject, StaticFileRoute, ViewModel } from "vlserver";
import { ManagedServer } from "./managed/server";
import { DbContext } from "./managed/database";
import { join } from "path";
import { DbClient, RunContext } from "vlquery";
import { Provider } from "./provider";

DbClient.connectedClient = new DbClient({});

DbClient.connectedClient.connect().then(async () => {
	const app = new ManagedServer();
	const database = new DbContext(new RunContext());

	Provider.update(database);
	
	app.createInjector = context => new Inject({
		Context: context,
		DbContext: database
	});

	app.use(new StaticFileRoute('/', join(process.cwd(), '..', 'page', 'built')));
	app.use(new StaticFileRoute('/assets', join(process.cwd(), '..', 'page', 'assets')));

	app.prepareRoutes();
	app.use(new StaticFileRoute('*', join(process.cwd(), '..', 'page', 'built', 'index.html')));

	ViewModel.globalFetchingContext = database;

	app.start(+process.env.PORT! || 8019);
});