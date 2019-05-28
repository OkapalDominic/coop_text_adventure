import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import styles from './game.module.css';

type Props = RouteComponentProps;
interface State {
	areaText: string;
	cmdText: string;
	hintText: string;
	worldText: string;
	characterText: string;
	inventoryText: string;
}
interface DataProp {
	dataStr?: string;
}

function TextArea(props: DataProp) {
	return (
		<div className={styles['column']}>
			<p>Text Area </p>
			<textarea readOnly>
				{props.dataStr}
			</textarea>
		</div>
	);
}

function InputArea(props: DataProp) {
	return (
		<div className={styles['column']}>
			<p>Input Area</p>
			Command: 
			<input type='text' value={props.dataStr} />
			<input type='submit' value='Enter' />
		</div>
	);
}

function Template(props: DataProp) {
	return (
		<div className={styles['column']}>
			
		</div>
	);
}

class GamePage extends React.Component<Props, State> {
	
	constructor(props: Props) {
		super(props);
		this.state = {
			areaText: 'The things that have happened',
			cmdText: 'No Cmds',
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
						<TextArea dataStr={this.state.areaText} />
					</div>
					<div className={styles['row']}>
						<InputArea dataStr={this.state.cmdText} />
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