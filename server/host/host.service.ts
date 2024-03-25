import { Service } from "vlserver";
import { DbContext, Host } from "../managed/database";
import { GrabberGenerator } from "./grabber-generator";
import { Downloader } from "./downloader";
import { FullHostViewModel } from "./host.view";

export class HostService extends Service {
	constructor(
		private database: DbContext
	) {
		super();
	}
	
	async create(name: string, address: string, grabbingAddress: string) {
		const host = new Host();
		host.name = name;
		host.address = address;
		host.grabbingAddress = grabbingAddress;
		
		// the host is not public yet
		host.public = false;
		
		// generate a grabber
		host.grabber = await new GrabberGenerator(grabbingAddress).generate();
		
		// generate a date transformer
		const rawEvents = await new Downloader(grabbingAddress).grabRaw(host.grabber) as any[];
		
		host.grabberDateTransformer = await new GrabberGenerator(grabbingAddress).generateDateTransformer(rawEvents.map(event => event.date).filter(event => event));
		
		// test the grabber
		const events = await new Downloader(grabbingAddress).grab(host.grabber, host.grabberDateTransformer);
		
		await host.create();
		
		for (let event of events) {
			event.host = host;
			
			await event.create();
		}
		
		return new FullHostViewModel(host);
	}
	
	async release(id: string) {
		const host = await this.database.host.find(id);
		host.public = true;
		host.updatedAt = new Date();
		
		await host.update();
	}
}
