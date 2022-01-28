import { EventViewModel } from "managed/services";
import { Component } from "node_modules/vldom/component";
import { EventsComponent } from "./events.component";

export class EventComponent extends Component {
    parent: EventsComponent;
    rootNode: HTMLElement;

    constructor(
        private event: EventViewModel
    ) {
        super();
    }

    render() {
        requestAnimationFrame(() => {
            this.rootNode.style.transform = `rotate(${Math.random() - 0.5}deg)`;

            let slots = [];

            for (let i = 0; i < 100; i += Math.random() * 20 + 10) {
                slots.push(`${slots.length % 3 ? '#fff' : '#000'} ${i.toFixed()}%`);
            }

            slots.push(`#000 100%`);

            this.rootNode.style.setProperty('--gradient', `linear-gradient(90deg, ${slots})`);

            console.log(slots.join())
        })

        return <ui-event ui-sold-out={this.event.ticketLink && !this.event.ticketAvailable ? '' : null} ui-highlight={this.event.highlight ? '' : null} ui-id={this.event.id}>
            {this.event.imageUrl && <img src={this.event.imageUrl} />}

            <ui-tagline>
                <ui-host>
                    <ui-name>{this.event.host.name}</ui-name> 
                    <ui-location>{this.parent.filters.location ? '' : this.event.host.location.name}</ui-location>
                </ui-host>
                
                <ui-ticket-details>
                    {this.event.ticketPrice && this.event.ticketAvailable && <ui-price>{this.event.ticketPrice.toFixed(0)} CHF</ui-price>}
                    {this.event.ticketLink && !this.event.ticketAvailable && <ui-sold-out>sold out</ui-sold-out>}
                </ui-ticket-details>
            </ui-tagline>

            <ui-name>{this.event.name}</ui-name>

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