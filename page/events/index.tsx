import { Component } from "@acryps/page";
import { PageComponent } from "../page";
import { EventService, EventViewModel, LocationViewModel } from "../managed/services";
import { EventComponent } from "./item";
import { Application } from "..";

export class EventsComponent extends Component {
	declare parent: PageComponent;
	events: EventViewModel[];

	filters: {
		location?: LocationViewModel
	};

	filterStorageKey = 'filters';

	async onload() {
		if (this.filterStorageKey in localStorage) {
			this.filters = JSON.parse(localStorage[this.filterStorageKey]);
		} else {
			this.filters = {};
		}

		this.events = await new EventService().getEvents(
			this.filters.location?.id || null
		);
	}

	render() {
		const days = [];

		if (this.events.length) {
			let date = this.events[0].date;
			let day: EventComponent[] = [];

			for (let event of this.events) {
				if (+event.date != +date) {
					const today = date.toDateString() == new Date().toDateString();

					let dayElement = <ui-day ui-today={today}>
						<ui-date>
							{today && <ui-today>today</ui-today>}

							{date.toLocaleDateString('en', { weekday: 'short' }).toUpperCase()} {date.getUTCDate()} {date.getUTCMonth() + 1} {date.getUTCFullYear()}
						</ui-date>

						<ui-event-list>
							{day.sort((a, b) => a.event.highlight ? -1 : 1)}
						</ui-event-list>
					</ui-day> as HTMLElement;

					days.push(dayElement);

					if (date.getUTCMonth() != event.date.getUTCMonth()) {
						days.push(<ui-month>
							<ui-name>
								{event.date.toLocaleDateString('en', { month: 'long' }).toUpperCase()}
							</ui-name>
						</ui-month>)
					}

					date = event.date;
					day = [];
				}

				day.push(new EventComponent(event))
			}
		} else {
			days.push(<ui-none>
				no events found for the applied filters
			</ui-none>);
		}

		return <ui-events>
			<ui-filters>
				<ui-filter ui-active={this.filters.location || null}>
					<select $ui-value={this.filters.location} ui-change={() => (this.saveFilters(), this.reload())}>
						<option>All Locations</option>

						{this.extractOptions(Application.hosts, host => host.location).map(location => <option ui-value={location}>
							{location.name}
						</option>)}
					</select>
				</ui-filter>
			</ui-filters>
			
			<ui-content>
				<ui-issues>
					{Application.hosts.filter(host => !host.online).map(host => <ui-issue>
						{host.name} unavailable
					</ui-issue>)}
				</ui-issues>

				{days}

				<ui-about>
					we try to understand the clubs webpages to automatically figure out the details about upcomming events.
					information on this page may not be accurate.

					brought to you by acryps &lt;3

					{Application.hosts.map(host => <ui-host ui-offline={!host.online}>
						{host.location.name} <ui-name>{host.name}</ui-name> updated {host.updatedAt.toISOString()}, {host.online ? 'online' : 'OFFLINE'}
					</ui-host>)}
				</ui-about>
			</ui-content>
		</ui-events>;
	}

	extractOptions<T extends { id: string }, TR extends { id: string }>(items: T[], mapper: (event: T) => TR) {
		const unique = {};

		for (let event of items) {
			const res = mapper(event);

			unique[res.id] = res;
		}

		return Object.keys(unique).map(key => unique[key]) as TR[];
	}

	saveFilters() {
		for (let key in this.filters) {
			if (!this.filters[key]) {
				delete this.filters[key];
			}
		}

		localStorage[this.filterStorageKey] = JSON.stringify(this.filters);
	}
}