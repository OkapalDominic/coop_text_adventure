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
	dataElms?: string[];
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

function HintsArea(props: DataProp) {
	let hintElement;
	if (props.dataElms !== undefined) {
		hintElement = [];
		// currently slice so only 10 hints max
		props.dataElms.slice(0,10).map((e) => {
			if (e.length > 0) {
				hintElement.push(<button>{e}</button>);
			}
		});
		if (hintElement.length === 0) {
			hintElement = <p>No Hints</p>
		}
	} else {
		hintElement = <p>No Hints</p>;
	}
	return (
		<div className={styles['column']}>
			<p>Hint Area</p>
			{hintElement}
		</div>
	);
}

function ListTemplate(props: DataProp) {
	let listElement;
	if (props.dataElms !== undefined) {
		listElement = [];
		listElement = props.dataElms.map((e) => {
			return (<li>{e}</li>);
		});
	}
	return (
		<div className={styles['column']}>
			<p>ListTemplate</p>
			<p>{props.dataStr}</p>
			<ol>{listElement}</ol>
		</div>
	);
}

class GamePage extends React.Component<Props, State> {
	
	constructor(props: Props) {
		super(props);
		this.state = {
			areaText: 'The things that have happened',
			cmdText: 'No Cmds',
			hintText: 'Some minor hints :}',
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
						<HintsArea dataElms={this.state.hintText.split(' ')}/>
					</div>
				</div>
				<div className={styles['column']}>
					<div className={styles['row']}>
						<ListTemplate dataStr={this.state.worldText} dataElms={['one', 'two', 'three']}/>
					</div>
					<div className={styles['row']}>
						<ListTemplate dataStr={this.state.worldText}/>
					</div>
					<div className={styles['row']}>
						<ListTemplate dataElms={['one', 'two', 'three']}/>
					</div>
				</div>
			</div>
		);
	}
}

export default GamePage;