import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import styles from './game.module.css';

type Props = RouteComponentProps;
interface State {
	teststr: string;
}

class GamePage extends React.Component<Props, State> {
	
	constructor(props: Props) {
		super(props);
		this.state = {
			teststr:'boom',
		};
	}
	
	render() {
		return (
			<div className={styles['divClass']}>
				<p>Hello World</p>
				<p>{this.state.teststr}</p>
			</div>
		);
	}
}

export default GamePage;