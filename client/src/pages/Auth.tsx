import '../styles/auth.scss';
import { Link } from 'react-router-dom';
import client from '../lib/index';
import { FormEvent, useState } from 'react';
import Button from '../components/Button';

export interface IProps {
    method?: 'login' | 'register'
}

export default function AuthPage(props: IProps) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    async function register(e: FormEvent) {
        e.preventDefault();
        setLoading(true);
        try {
            const data = await client.registerAccount(username, email, password);
            localStorage.setItem('token', data.token);
            window.location.replace('/');
        } catch (err: any) {
            if (err.response && err.response.status === 400) {
                const errors: any[] = err.response.data.errors;
                const list = ['username', 'email', 'password'];

                if (errors && errors.length) {
                    errors.forEach((error: { field: string }) => {
                        const element = document.getElementById(`auth__${error.field}-error`);
                        element?.classList.add('auth__input-error--active');

                        const index = list.indexOf(error.field);
                        if (index !== -1) {
                            list.splice(index, 1);
                        }
                    });
                }

                list.forEach((item) => {
                    const element = document.getElementById(`auth__${item}-error`);
                    element?.classList.remove('auth__input-error--active');
                })
            } else if (err.response && err.response.status === 500) {
                console.log('Unknown error', err.response.data);
            } else if (!err.response) {
                console.log(err);
            }
        } finally {
            setLoading(false);
        }
    }

    async function login(e: FormEvent) {
        try {
            e.preventDefault();
            setLoading(true);
            const data = await client.loginAccount(email, password);
            localStorage.setItem('token', data.token);
            window.location.replace('/');
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <div id="auth-container">
                <div id="auth__layout">
                    <div id="auth__column--first" className="auth__column">
                        <div id="auth__text">
                            <h2 id="auth__title">{props.method === "register" ? "Welcome!" : "Welcome back!"}</h2>
                            <h4 id="auth__subtitle">{props.method === "register" ? "We look forward to you joining us!" : "We are happy to see you again"}</h4>
                        </div>
                        <form onSubmit={(e) => props.method === "register" ? register(e) : login(e)} action="" id="auth__form">
                            {props.method === "register" ? (
                                <div className="auth__input-control">
                                    <label htmlFor="username" className="auth__input-label">Username</label>
                                    <input onChange={(e) => setUsername(e.target.value)} required name='username' type="text" className="auth__input" />
                                    <small id="auth__username-error" className="auth__input-error">Username invalid.</small>
                                </div>
                            ) : ""}
                            <div className="auth__input-control">
                                <label htmlFor="email" className="auth__input-label">Email</label>
                                <input onChange={(e) => setEmail(e.target.value)} required name='email' type="email" className="auth__input" />
                                <small id="auth__email-error" className="auth__input-error">Email invalid.</small>
                            </div>
                            <div className="auth__input-control">
                                <label htmlFor="password" className="auth__input-label">Password</label>
                                <input onChange={(e) => setPassword(e.target.value)} type="password" required name='password' className="auth__input" />
                                <small id="auth__password-error" className="auth__input-error">Password invalid.</small>
                            </div>

                            {props.method === "register" ? "" : <span className="auth__blue-deco">Forgot your password?</span>}
                            <Button loading={loading} htmlType='submit' label={props.method === "register" ? "Create account" : "Login"} />
                        </form>
                        {props.method === "register" ? (
                            <span id="auth__change-method">Already have an account? <Link to={'/login'} className="auth__blue-deco">Sign in!</Link></span>
                        ) : (
                            <span id="auth__change-method">Don't have an account? <Link to={'/register'} className="auth__blue-deco">Create one!</Link></span>
                        )}
                    </div>
                    <div className="auth__column">
                        <div id="auth__disclaimer">
                            <img src='github.png' width={176} height={176} alt="" />
                            <span id="auth__disclaimer__text">This is a project made by a Discord fan!</span>
                            <a target='_blank' rel="noreferrer" href='https://github.com/devdimer/discord-clone' id="auth__repo-link" className="auth__blue-deco">Repository on Github</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}