import { BaseServer, ViewModel, Inject } from "vlserver";

import { DbContext } from "././database";
import { EventViewModel } from "././../areas/event.view";
import { HostViewModel } from "././../areas/host.view";
import { EventService } from "././../areas/event.service";
import { Event } from "./../managed/database";
import { Host } from "./../managed/database";

Inject.mappings = {
	"EventService": {
		objectConstructor: EventService,
		parameters: ["DbContext"]
	},
	"DbContext": {
		objectConstructor: DbContext,
		parameters: ["RunContext"]
	}
};

export class ManagedServer extends BaseServer {
	prepareRoutes() {
		this.expose(
			"g4NnQxcGowazFtano1bWo3MnRkemJ3c2",
			{},
			inject => inject.construct(EventService),
			(controller, params) => controller.getEvents(
				
			)
		);

		this.expose(
			"VtbnJmYTBkdXliYWE5aWI5NGczOGF5ZW",
			{},
			inject => inject.construct(EventService),
			(controller, params) => controller.getHosts(
				
			)
		)
	}
}

ViewModel.mappings = {
	EventViewModel: class ComposedEventViewModel extends EventViewModel {
		async map() {
			return {
				host: new HostViewModel(await BaseServer.unwrap(this.model.host)),
				id: this.model.id,
				date: this.model.date,
				name: this.model.name,
				link: this.model.link
			}
		};

		static get items() { 
			return {
				get host() { 
					return ViewModel.mappings.HostViewModel.items;
				},
				id: true,
				date: true,
				name: true,
				link: true
			};
		}

		static toViewModel(data) {
			const item = new EventViewModel(null);
			"host" in data && (item.host = data.host && ViewModel.mappings.HostViewModel.toViewModel(data.host));
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"date" in data && (item.date = data.date === null ? null : new Date(data.date));
			"name" in data && (item.name = data.name === null ? null : `${data.name}`);
			"link" in data && (item.link = data.link === null ? null : `${data.link}`);

			return item;
		}

		static async toModel(viewModel: EventViewModel) {
			let model: Event;
			
			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(Event).find(viewModel.id)
			} else {
				model = new Event();
			}
			
			"host" in viewModel && (model.host.id = viewModel.host ? viewModel.host.id : null);
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"date" in viewModel && (model.date = viewModel.date === null ? null : new Date(viewModel.date));
			"name" in viewModel && (model.name = viewModel.name === null ? null : `${viewModel.name}`);
			"link" in viewModel && (model.link = viewModel.link === null ? null : `${viewModel.link}`);

			return model;
		}
	},
	HostViewModel: class ComposedHostViewModel extends HostViewModel {
		async map() {
			return {
				id: this.model.id,
				name: this.model.name,
				online: this.model.online,
				updatedAt: this.model.updatedAt
			}
		};

		static get items() { 
			return {
				id: true,
				name: true,
				online: true,
				updatedAt: true
			};
		}

		static toViewModel(data) {
			const item = new HostViewModel(null);
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"name" in data && (item.name = data.name === null ? null : `${data.name}`);
			"online" in data && (item.online = !!data.online);
			"updatedAt" in data && (item.updatedAt = data.updatedAt === null ? null : new Date(data.updatedAt));

			return item;
		}

		static async toModel(viewModel: HostViewModel) {
			let model: Host;
			
			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(Host).find(viewModel.id)
			} else {
				model = new Host();
			}
			
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"name" in viewModel && (model.name = viewModel.name === null ? null : `${viewModel.name}`);
			"online" in viewModel && (model.online = !!viewModel.online);
			"updatedAt" in viewModel && (model.updatedAt = viewModel.updatedAt === null ? null : new Date(viewModel.updatedAt));

			return model;
		}
	}
};