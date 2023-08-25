import { Component } from '@acryps/page';

export class PageComponent extends Component {
	declare rootNode: HTMLElement;
	logo: HTMLElement;

	render(child?: Node) {
		requestAnimationFrame(() => {
			this.logo.oncontextmenu = () => {
				this.logo.textContent = 'фолзене';
			}
		});

		return <ui-page>
			{this.logo = <ui-nav>
				acryps vollszene
			</ui-nav>}

			{child}
		</ui-page>;
	}
}