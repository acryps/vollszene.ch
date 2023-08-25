import { Component } from '@acryps/page';

export class PageComponent extends Component {
	declare rootNode: HTMLElement;

	render(child?: Node) {
		return <ui-page>
			<ui-navigation>
				<ui-logo>
					{'vollszene'.split('').map((character, index, word) => <ui-character style={`--animation-offset: ${1 / word.length * index}`}>{character}</ui-character>)}
				</ui-logo>
			</ui-navigation>

			{child}
		</ui-page>;
	}
}