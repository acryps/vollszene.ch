import { FullHostViewModel, HostService } from "../managed/services";
import { Component } from '@acryps/page';

export class CreateHostComponent extends Component {
	name = '';
	address = '';
	grabbingAddress = '';
	
	error: string;
	result: FullHostViewModel;
	
	render() {
		return <ui-create-host>
			<ui-field>
				<label>Event Location Name</label>
				<input $ui-value={this.name} />
			</ui-field>
			
			<ui-field>
				<label>Homepage Address</label>
				<input $ui-value={this.address} />
			</ui-field>
			
			<ui-field>
				<label>Event Page Address</label>
				<input $ui-value={this.grabbingAddress} />
			</ui-field>
			
			<ui-action ui-connect ui-click={async () => {
				this.error = null;
				this.result = null;
				
				this.update();
				
				try {
					this.result = await new HostService().create(this.name, this.address, this.grabbingAddress);
				} catch (error) {
					this.error = error;
				}
				
				this.update();
			}}>
				Connect
			</ui-action>
			
			{this.error && <ui-error>
				{this.error}
			</ui-error>}
			
			{this.result && <ui-result>
				{this.result.events.map(event => <ui-event>
					<ui-name>{event.name}</ui-name> {event.date.toLocaleDateString()}
				</ui-event>)}
				
				<ui-action ui-release ui-click={async () => {
					await new HostService().release(this.result.id);
					
					this.navigate('/');
				}}>
					Looks Good, Release!
				</ui-action>
				
				<ui-grabber>
					{this.result.grabber}
				</ui-grabber>
			</ui-result>}
		</ui-create-host>
	}
}
