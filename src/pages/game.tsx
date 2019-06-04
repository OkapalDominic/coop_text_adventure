import * as React from 'react';

import styles from './game.module.css';

type Props = {
	messages: JSX.Element[],
	hints: string[],
	players: string[],
	inventory: string[],
	rooms: string[],
	items: string[],
};
interface State {
	areaText: string;
	cmdText: string;
	hintText: string;
	worldText: string;
	characterText: string;
	inventoryText: string;
	backgrounds: string[];
}
interface DataProp {
	dataStrArray?: string[];
	dataString?: string;
	dataElementArray?: JSX.Element[];
}

function History(props: DataProp) {
	return (
		<div className={styles.history}>
			<div className={styles.scrollArea}>{props.dataElementArray}</div>
		</div>
	);
}

function Commands(props: DataProp) {
	return (
		<div className={styles.commands}>
			<input type='text' placeholder={props.dataString} />
			<button type='button'>Submit</button>
		</div>
	);
}

function HintsArea(props: DataProp) {
	let hintElement: JSX.Element[] = [];
	if (props.dataStrArray !== undefined) {
		// currently slice so only 10 hints max
		props.dataStrArray.slice(0, 10).forEach((e, i) => {
			if (e.length > 0) {
				hintElement.push(<button key={i}>{e}</button>);
			}
		});
	}
	if(hintElement.length > 0) {
		return (
			<div className={styles.hints}>
				{hintElement}
			</div>
		);
	} else {
		return <p>There Are No Hints For You!</p>;
	}
}

function ListTemplate(props: DataProp) {
	let listElement;
	if (props.dataStrArray !== undefined) {
		listElement = [];
		listElement = props.dataStrArray.map((e, i) => {
			return (<li key={i}>{e}</li>);
		});
	}
	return (
		<div>
			<p>ListTemplate</p>
			<p>{props.dataString}</p>
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
			backgrounds: [
				'https://images.unsplash.com/photo-1542617454-e7d68f9d5626?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9',
				'https://images.unsplash.com/photo-1548368295-b7158d905383?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9',
				'https://images.unsplash.com/photo-1545263467-4e257e3b5ce7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9',
				'https://images.unsplash.com/photo-1508404768051-0809ca78340f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9'
			],
		};
	}

	render() {
		let bkgndImage: string = this.state.backgrounds[Math.floor(Math.random() * this.state.backgrounds.length)];
		let size: string = '&w=' + window.innerWidth + '&h=' + window.innerHeight;
		return (
			<div
				className={styles['row']}
				style={{backgroundImage: `url(${bkgndImage}${size}&fit=crop&auto=format)`}}
			>
				<div className={styles['main-content']}>
					<History dataElementArray={this.props.messages} />

					<Commands dataString="Command Thyself..." />

					<HintsArea dataStrArray={this.props.hints} />
				</div>
				<div className={styles['side-bar']}>
					<ListTemplate dataString={this.state.worldText} dataStrArray={['one', 'two', 'three']} />

					<ListTemplate dataString={this.state.worldText} />

					<ListTemplate dataStrArray={['one', 'two', 'three']} />
				</div>
			</div>
		);
	}
}

export default GamePage;