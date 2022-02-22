import { EventsComponent } from "events/events.component";
import { Router } from "node_modules/vldom/router";
import { registerDirectives } from "node_modules/vldom-default-directives/index";
import { PageComponent } from "page.component";
import { Component } from "node_modules/vldom/component";
import { EventService, HostViewModel, SessionService } from "managed/services";

export class Application {
    static router: Router;

    static hosts: HostViewModel[];

    static async main() {
        new SessionService().createSession((localStorage.session = localStorage.session || Math.random().toString(36).substr(2)), innerWidth, innerHeight);

        if (!location.hash) {
            location.hash = `#/events`;
        }

        this.router = new Router(PageComponent, {
            "/events": EventsComponent
        });

        registerDirectives(Component, this.router);

        this.hosts = await new EventService().getHosts();

        this.router.host(document.body);
        onhashchange = () => this.router.update();
    }
}