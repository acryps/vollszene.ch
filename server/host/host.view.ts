import { ViewModel } from "vlserver";
import { Host } from "../managed/database";
import { EventViewModel } from "../events/event.view";

export class FullHostViewModel extends ViewModel<Host> {
	id;
	
	grabber;
	grabberDateTransformer;
	
	events: EventViewModel[];
}
