import { Component } from "node_modules/vldom/component";

export class PageComponent extends Component {
	logo: HTMLElement;
	rootNode: HTMLElement;

	render(child?: Node) {
		requestAnimationFrame(() => {
			this.logo.oncontextmenu = () => {
				this.logo.textContent = 'фолзене';
			}
		});

		return <ui-page>
			{this.logo = <ui-nav>
				a vollszene
			</ui-nav>}

			{child}
		</ui-page>;
    }
}