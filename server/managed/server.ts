import { BaseServer, ViewModel, Inject } from "vlserver";

import { DbContext } from "././database";
import { EventViewModel } from "././../events/event.view";
import { HostViewModel } from "././../events/host.view";
import { EventService } from "././../events/event.service";
import { Host } from "././database";
import { HostRequest } from "././database";
import { HostDeveloper } from "././../host/developer";
import { HostRequestViewModel } from "././../host/requiest.view";
import { HostService } from "././../host/host.service";
import { Session } from "././database";
import { SessionService } from "././../session.service";
import { LocationViewModel } from "./../events/location.view";
import { FullHostViewModel } from "./../host/host.view";
import { Event } from "./../managed/database";
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
	"HostService": {
		objectConstructor: HostService,
		parameters: ["DbContext"]
	},
	"SessionService": {
		objectConstructor: SessionService,
		parameters: ["DbContext"]
	}
};

export class ManagedServer extends BaseServer {
	prepareRoutes() {
		this.expose(
			"N4OHQ2YXQ5YWltcTJxMGVsMGZldTJiY2",
			{
				"hmeWtxc2Nudmh0Mmp2eHBuODtzZXJ4d2": {
					isArray: false,
					type: "number"
				}
			},
			inject => inject.construct(EventService),
			(controller, params) => controller.getEvents(
				params["hmeWtxc2Nudmh0Mmp2eHBuODtzZXJ4d2"]
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
			"h0a3ZncTE4NGU0cHV6cWY3NnduYTl6cn",
			{
				"dtdX9leWNsbXNwbGU2en5qbWBpZ2U4N3": {
					isArray: false,
					type: "string"
				},"BpZXw4ZDA2ZXJ2NWR5aTtkbGEwaTlzYX": {
					isArray: false,
					type: "string"
				}
			},
			inject => inject.construct(HostService),
			(controller, params) => controller.create(
				params["dtdX9leWNsbXNwbGU2en5qbWBpZ2U4N3"],
				params["BpZXw4ZDA2ZXJ2NWR5aTtkbGEwaTlzYX"]
			)
		);

		this.expose(
			"QyZjQwNDB3NWkzbD11eGM1NTBpNXdpNn",
			{},
			inject => inject.construct(HostService),
			(controller, params) => controller.queue(
				
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
				date: this.model.date,
				ticketAvailable: this.model.ticketAvailable,
				ticketPrice: this.model.ticketPrice,
				highlight: this.model.highlight,
				id: this.model.id,
				description: this.model.description,
				name: this.model.name,
				link: this.model.link,
				imageUrl: this.model.imageUrl,
				ticketLink: this.model.ticketLink
			}
		};

		static get items() { 
			return {
				get host() { 
					return ViewModel.mappings.HostViewModel.items;
				},
				date: true,
				ticketAvailable: true,
				ticketPrice: true,
				highlight: true,
				id: true,
				description: true,
				name: true,
				link: true,
				imageUrl: true,
				ticketLink: true
			};
		}

		static toViewModel(data) {
			const item = new EventViewModel(null);
			"host" in data && (item.host = data.host && ViewModel.mappings.HostViewModel.toViewModel(data.host));
			"date" in data && (item.date = data.date === null ? null : new Date(data.date));
			"ticketAvailable" in data && (item.ticketAvailable = !!data.ticketAvailable);
			"ticketPrice" in data && (item.ticketPrice = data.ticketPrice === null ? null : +data.ticketPrice);
			"highlight" in data && (item.highlight = !!data.highlight);
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"description" in data && (item.description = data.description === null ? null : `${data.description}`);
			"name" in data && (item.name = data.name === null ? null : `${data.name}`);
			"link" in data && (item.link = data.link === null ? null : `${data.link}`);
			"imageUrl" in data && (item.imageUrl = data.imageUrl === null ? null : `${data.imageUrl}`);
			"ticketLink" in data && (item.ticketLink = data.ticketLink === null ? null : `${data.ticketLink}`);

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
			"date" in viewModel && (model.date = viewModel.date === null ? null : new Date(viewModel.date));
			"ticketAvailable" in viewModel && (model.ticketAvailable = !!viewModel.ticketAvailable);
			"ticketPrice" in viewModel && (model.ticketPrice = viewModel.ticketPrice === null ? null : +viewModel.ticketPrice);
			"highlight" in viewModel && (model.highlight = !!viewModel.highlight);
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"description" in viewModel && (model.description = viewModel.description === null ? null : `${viewModel.description}`);
			"name" in viewModel && (model.name = viewModel.name === null ? null : `${viewModel.name}`);
			"link" in viewModel && (model.link = viewModel.link === null ? null : `${viewModel.link}`);
			"imageUrl" in viewModel && (model.imageUrl = viewModel.imageUrl === null ? null : `${viewModel.imageUrl}`);
			"ticketLink" in viewModel && (model.ticketLink = viewModel.ticketLink === null ? null : `${viewModel.ticketLink}`);

			return model;
		}
	},
	HostViewModel: class ComposedHostViewModel extends HostViewModel {
		async map() {
			return {
				location: new LocationViewModel(await BaseServer.unwrap(this.model.location)),
				online: this.model.online,
				updatedAt: this.model.updatedAt,
				id: this.model.id,
				name: this.model.name
			}
		};

		static get items() { 
			return {
				get location() { 
					return ViewModel.mappings.LocationViewModel.items;
				},
				online: true,
				updatedAt: true,
				id: true,
				name: true
			};
		}

		static toViewModel(data) {
			const item = new HostViewModel(null);
			"location" in data && (item.location = data.location && ViewModel.mappings.LocationViewModel.toViewModel(data.location));
			"online" in data && (item.online = !!data.online);
			"updatedAt" in data && (item.updatedAt = data.updatedAt === null ? null : new Date(data.updatedAt));
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"name" in data && (item.name = data.name === null ? null : `${data.name}`);

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
			"online" in viewModel && (model.online = !!viewModel.online);
			"updatedAt" in viewModel && (model.updatedAt = viewModel.updatedAt === null ? null : new Date(viewModel.updatedAt));
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"name" in viewModel && (model.name = viewModel.name === null ? null : `${viewModel.name}`);

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
	},
	FullHostViewModel: class ComposedFullHostViewModel extends FullHostViewModel {
		async map() {
			return {
				events: (await this.model.events.includeTree(ViewModel.mappings.EventViewModel.items).toArray()).map(item => new EventViewModel(item)),
				id: this.model.id,
				grabberDateTransformer: this.model.grabberDateTransformer,
				grabber: this.model.grabber
			}
		};

		static get items() { 
			return {
				get events() { 
					return ViewModel.mappings.EventViewModel.items;
				},
				id: true,
				grabberDateTransformer: true,
				grabber: true
			};
		}

		static toViewModel(data) {
			const item = new FullHostViewModel(null);
			"events" in data && (item.events = data.events && [...data.events].map(i => ViewModel.mappings.EventViewModel.toViewModel(i)));
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"grabberDateTransformer" in data && (item.grabberDateTransformer = data.grabberDateTransformer === null ? null : `${data.grabberDateTransformer}`);
			"grabber" in data && (item.grabber = data.grabber === null ? null : `${data.grabber}`);

			return item;
		}

		static async toModel(viewModel: FullHostViewModel) {
			let model: Host;
			
			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(Host).find(viewModel.id)
			} else {
				model = new Host();
			}
			
			"events" in viewModel && (null);
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"grabberDateTransformer" in viewModel && (model.grabberDateTransformer = viewModel.grabberDateTransformer === null ? null : `${viewModel.grabberDateTransformer}`);
			"grabber" in viewModel && (model.grabber = viewModel.grabber === null ? null : `${viewModel.grabber}`);

			return model;
		}
	},
	HostRequestViewModel: class ComposedHostRequestViewModel extends HostRequestViewModel {
		async map() {
			return {
				attempts: this.model.attempts,
				id: this.model.id,
				grabberDateTransformer: this.model.grabberDateTransformer,
				error: this.model.error,
				name: this.model.name,
				address: this.model.address,
				grabber: this.model.grabber
			}
		};

		static get items() { 
			return {
				attempts: true,
				id: true,
				grabberDateTransformer: true,
				error: true,
				name: true,
				address: true,
				grabber: true
			};
		}

		static toViewModel(data) {
			const item = new HostRequestViewModel(null);
			"attempts" in data && (item.attempts = data.attempts === null ? null : +data.attempts);
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"grabberDateTransformer" in data && (item.grabberDateTransformer = data.grabberDateTransformer === null ? null : `${data.grabberDateTransformer}`);
			"error" in data && (item.error = data.error === null ? null : `${data.error}`);
			"name" in data && (item.name = data.name === null ? null : `${data.name}`);
			"address" in data && (item.address = data.address === null ? null : `${data.address}`);
			"grabber" in data && (item.grabber = data.grabber === null ? null : `${data.grabber}`);

			return item;
		}

		static async toModel(viewModel: HostRequestViewModel) {
			let model: HostRequest;
			
			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(HostRequest).find(viewModel.id)
			} else {
				model = new HostRequest();
			}
			
			"attempts" in viewModel && (model.attempts = viewModel.attempts === null ? null : +viewModel.attempts);
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"grabberDateTransformer" in viewModel && (model.grabberDateTransformer = viewModel.grabberDateTransformer === null ? null : `${viewModel.grabberDateTransformer}`);
			"error" in viewModel && (model.error = viewModel.error === null ? null : `${viewModel.error}`);
			"name" in viewModel && (model.name = viewModel.name === null ? null : `${viewModel.name}`);
			"address" in viewModel && (model.address = viewModel.address === null ? null : `${viewModel.address}`);
			"grabber" in viewModel && (model.grabber = viewModel.grabber === null ? null : `${viewModel.grabber}`);

			return model;
		}
	}
};