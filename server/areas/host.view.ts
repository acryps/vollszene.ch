import { ViewModel } from "vlserver";
import { Host } from "../managed/database";

export class HostViewModel extends ViewModel<Host> {
    id;
    name;
}