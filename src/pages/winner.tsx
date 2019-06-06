import React from 'react';
import styles from './winner.module.css';

type Props = {
    username: string,
    onClick: (event: React.FormEvent) => void,
    width: number,
    height: number,
};

type State = {
}

export default class WinnerPage extends React.Component<Props, State> {
    state: State = {
    };

    render() {
        if (this.props.width < this.props.height) {
            return (
                <div className="rotate-container">
                    <p className="rotate-screen">Please rotate your screen to play this game.</p>
                </div>
            );
        }
        let bkgndImage: string = 'https://images.unsplash.com/photo-1464809142576-df63ca4ed7f0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&fit=crop&crop=focalpoint&fp-x=.7&fp-y=.4&fp-z=1';
        let size: string = '&w=' + this.props.width + '&h=' + this.props.height;
        return (
            <div className={styles.container}
            style={{ backgroundImage: `url(${bkgndImage}${size}&fit=crop&auto=format)` }}
            >
                <div className={styles.title}>
                    <h1>Thou Hast Eaten an Apple in the Appointed Place!</h1>
                    <h2>My Eternal Gratitude is Forever Yours, Brave {this.props.username}!</h2>
                </div>
                <form className={styles.form} onSubmit={this.props.onClick}>
                    <button className={styles['win-btn']} type="submit" onClick={this.props.onClick}>Leave Dungeon</button>
                </form>
            </div>
        );
    }
}