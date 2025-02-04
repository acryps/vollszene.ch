import { FullHostViewModel, HostService } from "../managed/services";
import { Component } from '@acryps/page';

export class RequestHostPage extends Component {
	name = '';
	address = '';
	grabbingAddress = '';

	render() {
		return <ui-request-host>
			<ui-title>
				Request missing Venue
			</ui-title>

			<ui-description>
				Can't find your favourite venue?
				Please make sure to check that we have not added it yet!
			</ui-description>

			<ui-field>
				<label>Event Location Name</label>

				<ui-hint>
					Name of the venue, for example "Exil Club".
					Do not include the city.
				</ui-hint>

				<input $ui-value={this.name} />
			</ui-field>

			<ui-field>
				<label>Event Page Address</label>

				<ui-hint>
					Paste the link of the venue where the events are listed.
				</ui-hint>

				<input $ui-value={this.address} type='url' />
			</ui-field>

			<ui-action ui-connect ui-click={async () => {
				await new HostService().create(this.name, this.address);

				this.navigate('/queue');
			}}>
				Request Club
			</ui-action>
		</ui-request-host>
	}
}
