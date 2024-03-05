import '../styles/auth.scss';
// @ts-ignore
import Github from '../assets/github.png';

export interface IProps {
    method?: 'login' | 'register'
}

export default function AuthPage(props: IProps) {
    return (
        <>
            <div id="auth-container">
                <div id="auth__layout">
                    <div id="auth__column--first" className="auth__column">
                        <div id="auth__text">
                            <h2 id="auth__title">{props.method === "register" ? "Bem vindo" : "Bem vindo de volta!"}</h2>
                            <h4 id="auth__subtitle">{props.method === "register" ? "Estamos ansiosos para você se juntar a nós!" : "Estamos felizes em ver você novamente"}</h4>
                        </div>
                        <form action="" id="auth__form">
                            {props.method === "register" ? (
                                <div className="auth__input-control">
                                    <label htmlFor="email" className="auth__input-label">Nome de usuario</label>
                                    <input name='username' type="text" className="auth__input" />
                                </div>
                            ) : ""}
                            <div className="auth__input-control">
                                <label htmlFor="email" className="auth__input-label">Email</label>
                                <input name='email' type="text" className="auth__input" />
                            </div>
                            <div className="auth__input-control">
                                <label htmlFor="password" className="auth__input-label">Senha</label>
                                <input name='password' type="text" className="auth__input" />
                            </div>
                        </form>
                        {props.method === "register" ? "" : <span className="auth__blue-deco">Esqueceu sua senha?</span>}
                        <button id="auth__button">
                            {props.method === "register" ? "Criar conta" : "Entrar"}
                        </button>
                        {props.method === "register" ? (
                            <span id="auth__change-method">Já tem uma conta? <a href="/login" className="auth__blue-deco">Entre nela!</a></span>
                        ) : (
                            <span id="auth__change-method">Não tem uma conta? <a href="/register" className="auth__blue-deco">Crie uma!</a></span>
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