import { Component } from "@acryps/page";
import { EventComponent } from "./item";
import { EventsPage } from ".";
import { EventService } from "../managed/services";
import { Application } from "..";

export class EventListComponent extends Component {
	declare parent: EventsPage;

	render() {
		const days = [];

		if (this.parent.events.length) {
			let date = this.parent.events[0].date;
			let day: EventComponent[] = [];

			for (let event of this.parent.events) {
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

		return <ui-content>
			{days}

			<ui-more ui-click={async () => {
				this.parent.page++;

				this.parent.events.push(...await new EventService().getEvents(this.parent.page));
				this.update();
			}} ui-click-text='Commmmmmmming...'>
				More ! More !! More !!!
			</ui-more>

			<ui-about>
				we try to understand the clubs webpages to automatically figure out the details about upcomming events.
				information on this page may not be accurate.

				brought to you by <a href="https://acryps.com">acryps</a> from 8004

				{Application.hosts.map(host => <ui-host ui-offline={!host.online}>
					{host.location?.name} <ui-name>{host.name}</ui-name> updated {host.updatedAt?.toISOString()}, {host.online ? 'online' : 'OFFLINE'}
				</ui-host>)}
			</ui-about>
		</ui-content>;
	}
}
