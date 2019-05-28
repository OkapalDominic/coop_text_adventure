import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import styles from './game.module.css';

type Props = RouteComponentProps;
interface State {
	areaText: string;
	hintText: string;
	worldText: string;
	characterText: string;
	inventoryText: string;
}
interface DataProp {
	dataStr: string;
}

function TextArea(props: DataProp) {
	return (
		<div>
			<p>Text Area</p>
			<textarea readOnly>
				{props.dataStr}
			</textarea>
		</div>
	);
}

class GamePage extends React.Component<Props, State> {
	
	constructor(props: Props) {
		super(props);
		this.state = {
			areaText: 'The things that have happened',
			hintText: 'No hints :(',
			worldText: 'It is a small world after all',
			characterText: 'go look in a mirror',
			inventoryText: 'your stuff good sir',
		};
	}
	
	render() {
		return (
			<div className={styles['row']}>
				<div className={styles['column']}>
					<div className={styles['row']}>
						<div className={styles['column']}>
							<TextArea dataStr={this.state.areaText}/>
						</div>
					</div>
					<div className={styles['row']}>
						<div className={styles['column']}>
							<p>Input Area</p>
							<p>{this.state.areaText}</p>
						</div>
					</div>
					<div className={styles['row']}>
						<div className={styles['column']}>
							<p>Hints</p>
							<p>{this.state.areaText}</p>
						</div>
					</div>
				</div>
				<div className={styles['column']}>
					<div className={styles['row']}>
						<div className={styles['column']}>
							<p>World state</p>
							<p>{this.state.areaText}</p>
						</div>
					</div>
					<div className={styles['row']}>
						<div className={styles['column']}>
							<p>Character State</p>
							<p>{this.state.areaText}</p>
						</div>
					</div>
					<div className={styles['row']}>
						<div className={styles['column']}>
							<p>Inventory</p>
							<p>{this.state.areaText}</p>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default GamePage;