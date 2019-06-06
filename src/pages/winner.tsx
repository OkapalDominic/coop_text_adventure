import React from 'react';
import styles from './winner.module.css';

type Props = {
    username: string,
    onClick: (event: React.FormEvent) => void,
};

export default class WinnerPage extends React.Component<Props> {
    //

    render() {
        return (
            <div className={styles.container}>
                <h1 className={styles.title}>Thou Hast Eaten an Apple in the Appointed Place!</h1>
                <h2 className={styles.title}>My Eternal Gratitude is Forever Yours, Brave {this.props.username}!</h2>
                <form onSubmit={this.props.onClick}>
                    <button className={styles['win-btn']} type="submit" onClick={this.props.onClick}>Leave Dungeon</button>
                </form>
            </div>
        );
    }
}