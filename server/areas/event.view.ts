import { ViewModel } from "vlserver";
import { Event } from "../managed/database";
import { HostViewModel } from "./host.view";

export class EventViewModel extends ViewModel<Event> {
    id;

    name;
    date;
    link;

    host: HostViewModel;
}