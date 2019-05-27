import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

type Props = RouteComponentProps;
interface State {
	teststr: string;
}

class GamePage extends React.Component<Props, State> {
	state: State = {
		teststr: 'init data',
	};
	
	constructor(props: Props) {
		super(props);
	}
	
	render() {
		return (
			<div>
				<p>Hello</p>
				<p>{this.state.teststr}</p>
			</div>
		);
	}
}

export default GamePage;