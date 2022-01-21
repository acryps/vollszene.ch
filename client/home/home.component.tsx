import { Component } from "node_modules/vldom/component";

export class HomeComponent extends Component {
    async onload() {
        // load data here
    }

    render() {
        return <ui-content>
            <ui-title>
                Welcome acryps-events!
            </ui-title>
        </ui-content>;
    }
}