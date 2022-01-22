import { Application } from "main";
import { EventService, EventViewModel } from "managed/services";
import { Component } from "node_modules/vldom/component";

export class EventsComponent extends Component {
    events: EventViewModel[];

    async onload() {
       this.events = await new EventService().getEvents();
    }

    render() {
        const days = [];

        let date = this.events[0].date;
        let day = [];

        for (let event of this.events) {
            if (+event.date != +date) {
                console.log(event.date);

                days.push(<ui-day>
                    <ui-date>{date.toLocaleDateString('en', { weekday: 'short' }).toUpperCase()} {date.getUTCDate()} {date.getUTCMonth() + 1} {date.getUTCFullYear()}</ui-date>

                    {day}
                </ui-day>);

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

            day.push(<ui-event>
                <ui-host>{event.host.name}</ui-host>
                <ui-name>{event.name}</ui-name>
                <ui-link>
                    <a href={event.link} target="_blank">→ {event.link}</a>
                </ui-link>
            </ui-event>)
        }

        return <ui-content>
            <ui-issues>
                {Application.hosts.filter(host => !host.online).map(host => <ui-issue>
                    {host.name} unavailable
                </ui-issue>)}
            </ui-issues>

            {days}

            <ui-about>
                we try to understand the clubs webpages to automatically figure out the details about upcomming events.
                information on this page may not be accurate.

                {Application.hosts.map(host => <ui-host>
                    <ui-name>{host.name}</ui-name>

                    updated {host.updatedAt.toISOString()}, {host.online ? 'online' : 'OFFLINE'}
                </ui-host>)}
            </ui-about>
        </ui-content>;
    }
}