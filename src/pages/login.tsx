import * as React from 'react';
import { login } from '../components/api';
import { LoginRequest, LoginResponse } from '../api_objects/login_api';
import { RouteComponentProps } from 'react-router-dom';

import './login.css';

type Props = RouteComponentProps;

interface State {
    username?: string;
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
            sessionStorage.setItem('sessionKey', res.sessionKey);
            sessionStorage.setItem('username', res.username);
            this.setState({
                message: {
                    classes: 'success',
                    message: 'Thou Hast Chosen Goodly!',
                }
            });
            setTimeout(() => {
                this.props.history.push('/lobby');
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
            <div className="container">
                <form className="form" onSubmit={this.handleBegin}>
                    <h1 className="title">Choose Thy Adventerous Name Now</h1>
                    <br />
                    <div className="thy-name-border">
                        <input
                            className="thy-name"
                            type="text"
                            placeholder="Thy Adventerous Name..."
                            onChange={this.updateUsername}
                        ></input>
                    </div>
                    <br />
                    <p className={this.state.message.classes}>{this.state.message.message}</p>
                    <br />
                    <button
                        className="begin-adventure"
                        type="submit"
                        onClick={this.handleBegin}
                    >Begin Ye Adventure...</button>
                </form>
            </div>
        );
    }
}


export default LoginPage;