import { Component, PathRouter, Router } from '@acryps/page';
import { registerDirectives } from '@acryps/page-default-directives';
import { EventService, HostViewModel, SessionService } from './managed/services';
import { PageComponent } from './page';
import { EventsPage } from './events';
import { RequestQueuePage } from './request/queue';
import { RequestHostPage } from './request';

export class Application {
	static router: Router;

	static hosts: HostViewModel[];

	static async main() {
		new SessionService().createSession((localStorage.session = localStorage.session || Math.random().toString(36).substring(2)), innerWidth, innerHeight);

		this.router = new PathRouter(PageComponent
			.route('/', EventsPage)

			.route('/request', RequestHostPage)
			.route('/queue', RequestQueuePage)
		);

		registerDirectives(Component, this.router);

		this.hosts = await new EventService().getHosts();

		this.router.host(document.body);
	}
}

Application.main();
