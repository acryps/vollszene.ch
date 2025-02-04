import { ViewModel } from "vlserver";
import { HostRequest } from "../managed/database";

export class HostRequestViewModel extends ViewModel<HostRequest> {
	id;
	name;
	address;
	attempts;

	grabber;
	grabberDateTransformer;
}
