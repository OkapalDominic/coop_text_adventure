import * as React from 'react';
// import { login } from '../components/api';
// import { LoginRequest, LoginResponse } from '../api_objects/login_api';

import styles from './login.module.css';

type Props = {
    socket: SocketIOClient.Socket,
    message: string,
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
        let msgClass: string = '';
        let msg: string = '';
        if(this.props.message === 'N') {
            msgClass = 'neutral';
            msg = 'Choose Wisely!';
        }
        if(this.props.message === 'S') {
            msgClass = 'success';
            msg = 'Thou Hast Chosen Goodly!';
        }
        if(this.props.message === 'E') {
            msgClass = 'error';
            msg = 'Thou Hast Chosen Poorly!';
        }

        return (
            <div className={styles.container}>
                <form className={styles.form} onSubmit={this.handleBegin}>
                    <h1 className={styles.title}>Choose Thy Adventerous Name</h1>
                    <br />
                    <div className={styles['thy-name-border']}>
                        <input
                            className={styles['thy-name']}
                            type="text"
                            placeholder="Thy Adventerous Name..."
                            onChange={this.updateUsername}
                        ></input>
                    </div>
                    <br />
                    <p className={styles[msgClass]}>{msg}</p>
                    <br />
                    <button
                        className={styles['begin-adventure']}
                        type="submit"
                        onClick={this.handleBegin}
                    >Begin</button>
                </form>
            </div>
        );
    }
}


export default LoginPage;