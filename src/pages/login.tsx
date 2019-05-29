import * as React from 'react';
import { login } from '../components/api';
import { LoginRequest, LoginResponse } from '../api_objects/login_api';
import { RouteComponentProps } from 'react-router-dom';

import styles from './login.module.css';

type Props = RouteComponentProps;

interface State {
    username: string;
    message: {
        classes: string;
        message: string;
    };
}

class LoginPage extends React.Component<Props, State> {
    state: State = {
        username: '',
        message: {
            classes: 'neutral',
            message: 'Choose Wisely!',
        }
    };

    constructor(props: Props) {
        super(props);
        this.onLogin = this.onLogin.bind(this);
        this.updateUsername = this.updateUsername.bind(this);
        this.handleBegin = this.handleBegin.bind(this);
    }

    onLogin(res: LoginResponse): void {
        if (res.success) {
            sessionStorage.setItem('username', this.state.username);
            sessionStorage.setItem('room', res.room);
            if (res.players.length > 1) {
                let p2: number = this.state.username === res.players[0] ? 1 : 0;
                sessionStorage.setItem('player2', res.players[p2]);
            } else {
                sessionStorage.setItem('player2', '');
            }
            this.setState({
                message: {
                    classes: 'success',
                    message: 'Thou Hast Chosen Goodly!',
                }
            });
            setTimeout(() => {
                this.props.history.push('/tavern');
            }, 1200);
        } else {
            this.setState({
                message: {
                    classes: 'error',
                    message: 'Thou Hast Chosen Poorly!',
                }
            });
        }
    }

    updateUsername(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            username: event.target.value
        });
    }

    handleBegin(event: React.FormEvent) {
        event.preventDefault();
        let req: LoginRequest = new LoginRequest();
        req.username = this.state.username || '';
        if (sessionStorage.getItem('sessionKey') !== undefined) {
            req.sessionKey = sessionStorage.getItem('sessionKey') || '';
        }
        login(req, this.onLogin);
    }

    render() {
        return (
            <div className={styles.container}>
                <form className={styles.form} onSubmit={this.handleBegin}>
                    <h1 className={styles.title}>Choose Thy Adventerous Name Now</h1>
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
                    <p className={styles[this.state.message.classes]}>{this.state.message.message}</p>
                    <br />
                    <button
                        className={styles['begin-adventure']}
                        type="submit"
                        onClick={this.handleBegin}
                    >Begin Ye Adventure...</button>
                </form>
            </div>
        );
    }
}


export default LoginPage;