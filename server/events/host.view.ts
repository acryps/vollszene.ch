import { ViewModel } from "vlserver";
import { Host } from "../managed/database";
import { LocationViewModel } from "./location.view";

export class HostViewModel extends ViewModel<Host> {
	id;
	name;

	online;
	updatedAt;

	location: LocationViewModel;
}