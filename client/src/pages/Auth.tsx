import '../styles/auth.scss';
// @ts-ignore
import Github from '../assets/github.png';
import { Link } from 'react-router-dom';
import client from '../lib/index';
import { FormEvent, useState } from 'react';

export interface IProps {
    method?: 'login' | 'register'
}

export default function AuthPage(props: IProps) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function performAuth(e: FormEvent) {
        e.preventDefault();
        try {
            const data = await client.registerUser(username, email, password);
            localStorage.setItem('token', data.token);
            window.location.replace('/');
        } catch (err: any) {
            if (err.response) {
                const errors: any[] = err.response.data.errors;
                const list = ['username', 'email', 'password'];

                if (errors.length) {
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
            }
        }
    }

    return (
        <>
            <div id="auth-container">
                <div id="auth__layout">
                    <div id="auth__column--first" className="auth__column">
                        <div id="auth__text">
                            <h2 id="auth__title">{props.method === "register" ? "Bem vindo" : "Bem vindo de volta!"}</h2>
                            <h4 id="auth__subtitle">{props.method === "register" ? "Estamos ansiosos para você se juntar a nós!" : "Estamos felizes em ver você novamente"}</h4>
                        </div>
                        <form onSubmit={performAuth} action="" id="auth__form">
                            {props.method === "register" ? (
                                <div className="auth__input-control">
                                    <label htmlFor="username" className="auth__input-label">Nome de usuario</label>
                                    <input onChange={(e) => setUsername(e.target.value)} required name='username' type="text" className="auth__input" />
                                    <small id="auth__username-error" className="auth__input-error">O nome de usuario é invalido.</small>
                                </div>
                            ) : ""}
                            <div className="auth__input-control">
                                <label htmlFor="email" className="auth__input-label">Email</label>
                                <input onChange={(e) => setEmail(e.target.value)} required name='email' type="email" className="auth__input" />
                                <small id="auth__email-error" className="auth__input-error">O email é invalido.</small>
                            </div>
                            <div className="auth__input-control">
                                <label htmlFor="password" className="auth__input-label">Senha</label>
                                <input onChange={(e) => setPassword(e.target.value)} type="password" required name='password' className="auth__input" />
                                <small id="auth__password-error" className="auth__input-error">A senha é invalida.</small>
                            </div>

                            {props.method === "register" ? "" : <span className="auth__blue-deco">Esqueceu sua senha?</span>}
                            <button type='submit' id="auth__button">
                                {props.method === "register" ? "Criar conta" : "Entrar"}
                            </button>
                        </form>
                        {props.method === "register" ? (
                            <span id="auth__change-method">Já tem uma conta? <Link to={'/login'} className="auth__blue-deco">Entre nela!</Link></span>
                        ) : (
                            <span id="auth__change-method">Não tem uma conta? <Link to={'/register'} className="auth__blue-deco">Crie uma!</Link></span>
                        )}
                    </div>
                    <div className="auth__column">
                        <div id="auth__disclaimer">
                            <img src={Github} width={176} height={176} alt="" />
                            <span id="auth__disclaimer__text">Esse é um projeto feito por um fã do Discord!</span>
                            <a target='_blank' rel="noreferrer" href='https://github.com/devdimer/discord-clone' id="auth__repo-link" className="auth__blue-deco">Repositorio no Github</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}