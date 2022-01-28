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
				vollszene
			</ui-nav>}

			<ui-covid>
				please get tested for covid19 before going out. say safe &lt;3
			</ui-covid>

			{child}
		</ui-page>;
    }
}