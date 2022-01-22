import { Component } from "node_modules/vldom/component";

export class PageComponent extends Component {
	render(child?: Node) {
		return <ui-page>
			<ui-nav>
				<ui-logo>acryps</ui-logo>events
			</ui-nav>

			{child}
		</ui-page>;
    }
}