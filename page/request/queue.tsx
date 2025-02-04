import { Component } from "@acryps/page";
import { HostRequestViewModel, HostService } from "../managed/services";

export class RequestQueuePage extends Component {
	requests: HostRequestViewModel[];

	async onload() {
		this.requests = await new HostService().queue();

		setTimeout(() => {
			if (this.loaded) {
				this.reload();
			}
		}, 5 * 1000);
	}

	render() {
		if (!this.requests.length) {
			return <ui-queue>
				Queue empty, all clubs added!
			</ui-queue>
		}

		return <ui-queue>
			{this.requests.map(request => <ui-request>
				<ui-header>
					<ui-name>
						{request.name}
					</ui-name>

					<ui-address>
						{request.address}
					</ui-address>
				</ui-header>

				<ui-attempts>
					Attempt {request.attempts}
				</ui-attempts>

				{request.error &&  <ui-error>
					{request.error}
				</ui-error>}

				{this.renderGrabber(request.grabber)}
				{this.renderGrabber(request.grabberDateTransformer)}
			</ui-request>)}
		</ui-queue>;
	}

	renderGrabber(source: string) {
		if (source) {
			return <ui-grabber>
				{source.trim()}
			</ui-grabber>;
		}
	}
}
