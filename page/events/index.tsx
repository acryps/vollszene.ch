import { Component } from "@acryps/page";
import { PageComponent } from "../page";
import { EventService, EventViewModel } from "../managed/services";
import { EventComponent } from "./item";
import { Application } from "..";
import { EventListComponent } from "./list";

export class EventsPage extends Component {
	declare parent: PageComponent;

	events: EventViewModel[];
	page = 0;

	list = new EventListComponent();

	async onload() {
		this.events = await new EventService().getEvents(0);
	}

	render() {
		return <ui-events>
			<ui-request>
				<ui-action ui-href='/request'>
					Request missing Venue
				</ui-action>
			</ui-request>

			{this.list}
		</ui-events>;
	}

	extractOptions<T extends { id: string }, TR extends { id: string }>(items: T[], mapper: (event: T) => TR) {
		const unique = {};

		for (let event of items) {
			const res = mapper(event);

			if (res) {
				unique[res.id] = res;
			}
		}

		return Object.keys(unique).map(key => unique[key]) as TR[];
	}
}
