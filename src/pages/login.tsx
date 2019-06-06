import * as React from 'react';
// import { login } from '../components/api';
// import { LoginRequest, LoginResponse } from '../api_objects/login_api';

import styles from './login.module.css';

type Props = {
    socket: SocketIOClient.Socket,
    message: string,
    width: number;
    height: number;
    fullScreen: () => void,
};

interface State {
    username: string;
}

class LoginPage extends React.Component<Props, State> {
    state: State = {
        username: '',
    };

    constructor(props: Props) {
        super(props);
        // this.onLogin = this.onLogin.bind(this);
        this.updateUsername = this.updateUsername.bind(this);
        this.handleBegin = this.handleBegin.bind(this);
    }

    updateUsername(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            username: event.target.value
        });
    }

    handleBegin(event: React.FormEvent) {
        event.preventDefault();
        this.props.socket.emit('login', {
            s: this.props.socket.id,
            d: this.state.username,
        });
    }

    render() {
        if (this.props.width < this.props.height) {
            return (
                <div className="rotate-container">
                    <p className="rotate-screen">Please rotate your screen to play this game.</p>
                </div>
            );
        }
        let msgClass: string = '';
        let msg: string = '';
        if (this.props.message === 'N') {
            msgClass = 'neutral';
            msg = 'Choose Wisely!';
        }
        if (this.props.message === 'S') {
            msgClass = 'success';
            msg = 'Thou Hast Chosen Goodly!';
        }
        if (this.props.message === 'E') {
            msgClass = 'error';
            msg = 'Thou Hast Chosen Poorly!';
        }

        let bkgndImage: string = 'https://images.unsplash.com/photo-1548445929-4f60a497f851?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&fit=crop&crop=focalpoint&fp-x=.454&fp-y=.55&fp-z=1.9';
        let size: string = '&w=' + this.props.width + '&h=' + this.props.height;

        return (
            <div
                className={styles.container}
                style={{ backgroundImage: `url(${bkgndImage}${size}&fit=crop&auto=format)` }}
            >
                <button type="button" onClick={this.props.fullScreen} className={styles.fullscreen}>Toggle Fullscreen</button>
                <h1 className={styles.title}>Choose Thy Adventerous Name</h1>
                <p className={styles[msgClass]}>{msg}</p>
                <div className={styles['thy-name-border']}>
                    <input
                        className={styles['thy-name']}
                        type="text"
                        placeholder="Thy Adventerous Name..."
                        onChange={this.updateUsername}
                    ></input>
                </div>
                <form className={styles.form} onSubmit={this.handleBegin}>
                    <button
                        className={styles['begin-adventure']}
                        type="submit"
                        onClick={this.handleBegin}
                    >Enter</button>
                </form>
            </div>
        );

    }
}


export default LoginPage;