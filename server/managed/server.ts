import { BaseServer, ViewModel, Inject } from "vlserver";

import { DbContext } from "././database";
import { EventViewModel } from "././../areas/event.view";
import { HostViewModel } from "././../areas/host.view";
import { EventService } from "././../areas/event.service";
import { Session } from "././database";
import { SessionService } from "././../areas/session.service";
import { LocationViewModel } from "./../areas/location.view";
import { Event } from "./../managed/database";
import { Host } from "./../managed/database";
import { Location } from "./../managed/database";

Inject.mappings = {
	"EventService": {
		objectConstructor: EventService,
		parameters: ["DbContext"]
	},
	"DbContext": {
		objectConstructor: DbContext,
		parameters: ["RunContext"]
	},
	"SessionService": {
		objectConstructor: SessionService,
		parameters: ["DbContext"]
	}
};

export class ManagedServer extends BaseServer {
	prepareRoutes() {
		this.expose(
			"80YThweDRlbTdtbTs2NTc2OXpyeXx0d3",
			{
				"1tdDpvdTFidDJhMDM5Zjl5dWUxeD01MD": {
					isArray: false,
					type: "string"
				}
			},
			inject => inject.construct(EventService),
			(controller, params) => controller.getEvents(
				params["1tdDpvdTFidDJhMDM5Zjl5dWUxeD01MD"]
			)
		);

		this.expose(
			"VtbnJmYTBkdXliYWE5aWI5NGczOGF5ZW",
			{},
			inject => inject.construct(EventService),
			(controller, params) => controller.getHosts(
				
			)
		);

		this.expose(
			"4yZHZpanI3ZnB0aj00d2R2NDFqNHQwa2",
			{
				"k5bnhqMWd4OW1iZmt2dmMxeDlsYWdyN3": {
					isArray: false,
					type: "string"
				},"RtcHI5M3c1YWcwbDxia2J2cGZ4aGlmMj": {
					isArray: false,
					type: "number"
				},"hvZ2FqNXgwcTlsNjJpcmZiYTNlemJpZn": {
					isArray: false,
					type: "number"
				}
			},
			inject => inject.construct(SessionService),
			(controller, params) => controller.createSession(
				params["k5bnhqMWd4OW1iZmt2dmMxeDlsYWdyN3"],
				params["RtcHI5M3c1YWcwbDxia2J2cGZ4aGlmMj"],
				params["hvZ2FqNXgwcTlsNjJpcmZiYTNlemJpZn"]
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
				link: this.model.link,
				imageUrl: this.model.imageUrl,
				ticketLink: this.model.ticketLink,
				ticketAvailable: this.model.ticketAvailable,
				ticketPrice: this.model.ticketPrice,
				highlight: this.model.highlight
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
				link: true,
				imageUrl: true,
				ticketLink: true,
				ticketAvailable: true,
				ticketPrice: true,
				highlight: true
			};
		}

		static toViewModel(data) {
			const item = new EventViewModel(null);
			"host" in data && (item.host = data.host && ViewModel.mappings.HostViewModel.toViewModel(data.host));
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"date" in data && (item.date = data.date === null ? null : new Date(data.date));
			"name" in data && (item.name = data.name === null ? null : `${data.name}`);
			"link" in data && (item.link = data.link === null ? null : `${data.link}`);
			"imageUrl" in data && (item.imageUrl = data.imageUrl === null ? null : `${data.imageUrl}`);
			"ticketLink" in data && (item.ticketLink = data.ticketLink === null ? null : `${data.ticketLink}`);
			"ticketAvailable" in data && (item.ticketAvailable = !!data.ticketAvailable);
			"ticketPrice" in data && (item.ticketPrice = data.ticketPrice === null ? null : +data.ticketPrice);
			"highlight" in data && (item.highlight = !!data.highlight);

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
			"imageUrl" in viewModel && (model.imageUrl = viewModel.imageUrl === null ? null : `${viewModel.imageUrl}`);
			"ticketLink" in viewModel && (model.ticketLink = viewModel.ticketLink === null ? null : `${viewModel.ticketLink}`);
			"ticketAvailable" in viewModel && (model.ticketAvailable = !!viewModel.ticketAvailable);
			"ticketPrice" in viewModel && (model.ticketPrice = viewModel.ticketPrice === null ? null : +viewModel.ticketPrice);
			"highlight" in viewModel && (model.highlight = !!viewModel.highlight);

			return model;
		}
	},
	HostViewModel: class ComposedHostViewModel extends HostViewModel {
		async map() {
			return {
				location: new LocationViewModel(await BaseServer.unwrap(this.model.location)),
				id: this.model.id,
				name: this.model.name,
				online: this.model.online,
				updatedAt: this.model.updatedAt
			}
		};

		static get items() { 
			return {
				get location() { 
					return ViewModel.mappings.LocationViewModel.items;
				},
				id: true,
				name: true,
				online: true,
				updatedAt: true
			};
		}

		static toViewModel(data) {
			const item = new HostViewModel(null);
			"location" in data && (item.location = data.location && ViewModel.mappings.LocationViewModel.toViewModel(data.location));
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
			
			"location" in viewModel && (model.location.id = viewModel.location ? viewModel.location.id : null);
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"name" in viewModel && (model.name = viewModel.name === null ? null : `${viewModel.name}`);
			"online" in viewModel && (model.online = !!viewModel.online);
			"updatedAt" in viewModel && (model.updatedAt = viewModel.updatedAt === null ? null : new Date(viewModel.updatedAt));

			return model;
		}
	},
	LocationViewModel: class ComposedLocationViewModel extends LocationViewModel {
		async map() {
			return {
				id: this.model.id,
				name: this.model.name
			}
		};

		static get items() { 
			return {
				id: true,
				name: true
			};
		}

		static toViewModel(data) {
			const item = new LocationViewModel(null);
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"name" in data && (item.name = data.name === null ? null : `${data.name}`);

			return item;
		}

		static async toModel(viewModel: LocationViewModel) {
			let model: Location;
			
			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(Location).find(viewModel.id)
			} else {
				model = new Location();
			}
			
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"name" in viewModel && (model.name = viewModel.name === null ? null : `${viewModel.name}`);

			return model;
		}
	}
};