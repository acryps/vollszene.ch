import { Component, PathRouter, Router } from '@acryps/page';
import { registerDirectives } from '@acryps/page-default-directives';
import { EventService, HostViewModel, SessionService } from './managed/services';
import { PageComponent } from './page';
import { EventsComponent } from './events';

export class Application {
	static router: Router;

	static hosts: HostViewModel[];

	static async main() {
		new SessionService().createSession((localStorage.session = localStorage.session || Math.random().toString(36).substring(2)), innerWidth, innerHeight);

		this.router = new PathRouter(PageComponent
			.route('/', EventsComponent)
		);

		registerDirectives(Component, this.router);

		this.hosts = await new EventService().getHosts();

		this.router.host(document.body);
	}
}

Application.main();