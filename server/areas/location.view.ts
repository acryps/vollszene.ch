import { ViewModel } from "vlserver";
import { Location } from "../managed/database";

export class LocationViewModel extends ViewModel<Location> {
    id;

    name;
}