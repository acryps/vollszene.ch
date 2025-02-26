import { Component } from "@acryps/page";
import { EventsPage } from ".";
import { EventViewModel } from "../managed/services";

export class EventComponent extends Component {
	declare parent: EventsPage;
	declare rootNode: HTMLElement;

	constructor(
		public event: EventViewModel
	) {
		super();
	}

	render() {
		let image: HTMLImageElement;
		let description: HTMLElement;

		requestAnimationFrame(() => {
			if (image) {
				image.onerror = async () => {
					image.remove();
				};

				image.src = this.event.imageUrl;
			}
		});

		return <ui-event ui-sold-out={!!this.event.ticketLink && !this.event.ticketAvailable} ui-highlight={this.event.highlight} ui-id={this.event.id}>
			{this.event.imageUrl && (image = <img ui-click={() => open(this.event.imageUrl)} />)}

			<ui-tagline>
				<ui-host>
					<ui-location>
						{this.event.host.location?.name}
					</ui-location> <ui-name>
						{this.event.host.name}
					</ui-name>
				</ui-host>

				{!!(this.event.ticketPrice && this.event.ticketLink) && <ui-ticket-details>
					{this.event.ticketPrice && this.event.ticketAvailable && <ui-price>{this.event.ticketPrice.toFixed(0)} CHF</ui-price>}
					{this.event.ticketLink && !this.event.ticketAvailable && <ui-sold-out>sold out</ui-sold-out>}
				</ui-ticket-details>}
			</ui-tagline>

			<ui-name>{this.event.name}</ui-name>

			{description = <ui-description ui-click={() => {
				description.toggleAttribute('ui-open');
			}}>
				{this.event.description}
			</ui-description>}

			<ui-links>
				{this.event.link && <a href={this.event.link} target="_blank">
					page
				</a>}

				{this.event.ticketLink && <a ui-ticket-link href={this.event.ticketLink} target="_blank">
					tickets
				</a>}
			</ui-links>
		</ui-event>;
	}
}
