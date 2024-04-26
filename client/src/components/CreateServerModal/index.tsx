import { FaAngleRight } from 'react-icons/fa';
import './styles.scss';
import { FormEvent, useState } from 'react';
import client from '../../lib';
import { FaCamera } from "react-icons/fa";

interface IProps {
    active: boolean;
    setActive: (active: boolean) => any;
}

export default function CreateServerModal(props: IProps) {
    const [level, setLevel] = useState(0);
    const [name, setName] = useState('');
    const [invite, setInvite] = useState('');

    async function join(e: FormEvent) {
        e.preventDefault();

        await client.joinGuild(invite);
    }

    async function create(e: FormEvent) {
        e.preventDefault();
        await client.createGuild(name);

        props.setActive(false);
        setTimeout(() => {
            setLevel(0);
            setName('');
        }, 500);
    }

    return (
        <>
            <div onClick={() => props.setActive(false)} id="create-server-modal-overlay" className={`${props.active ? "create-server-modal-overlay--active" : ""}`}></div>
            <div id="create-server-modal" className={`${props.active ? "create-server-modal--active" : ""} ${level === 0 ? "" : level === 1 ? "create-server-modal--invite" : level === 2 ? "create-server-modal--create" : ""}`}>
                <div id="create-server-modal__first-prompt" className="create-server-modal__column">
                    <div className="create-server-modal__text">
                        <span className="create-server-modal__title">Create a server</span>
                        <span className="create-server-modal__subtitle">Your server is where you and your friends hang out. Make yours and start talking</span>
                    </div>
                    <div id="create-server-modal__options">
                        <div onClick={() => setLevel(2)} className="create-server-modal__option">
                            <div className="create-server-modal__option-text">
                                <span>Create My Own</span>
                            </div>
                            <i className="create-server-modal__option-icon"><FaAngleRight /></i>
                        </div>
                    </div>
                    <div id="create-server-modal__footer">
                        <div id="create-server-modal__footer-title">
                            <span>Have an invite already?</span>
                        </div>
                        <button onClick={() => setLevel(1)} id="create-server-modal__footer-button">
                            Join a server
                        </button>
                    </div>
                </div>
                <form onSubmit={join} id="create-server-modal__invite" className="create-server-modal__column">
                    <div className="create-server-modal__text">
                        <span className="create-server-modal__title">Join a server</span>
                        <span className="create-server-modal__subtitle">Type a invite link below to join a server</span>
                    </div>
                    <div className="create-server-modal__input-control">
                        <label htmlFor="" className="create-server-modal__input-label">Invite link</label>
                        <input onChange={(e) => setInvite(e.target.value)} type="text" placeholder='https://discord-clone-nine-eta.vercel.app/invites/hJks87I' className="create-server-modal__input" />
                    </div>
                    <div className="create-server-modal__footer">
                        <button type='button' onClick={() => setLevel(0)} className="create-server-moval__goback">Go back</button>
                        <button type='submit' className="create-server-modal__button">Join server</button>
                    </div>
                </form>
                <form onSubmit={create} id="create-server-modal__create" className="create-server-modal__column">
                    <div className="create-server-modal__text">
                        <span className="create-server-modal__title">Create a server</span>
                        <span className="create-server-modal__subtitle">Your server is where you and your friends hang out. Make yours and start talking</span>
                    </div>
                    <div id="create-server-modal__server-icon">
                        <i><FaCamera /></i>
                        <span>Send</span>
                    </div>
                    <div className="create-server-modal__input-control">
                        <label htmlFor="" className="create-server-modal__input-label">Server name</label>
                        <input onChange={(e) => setName(e.target.value)} type="text" placeholder={`${client.user?.username}'s server`} className="create-server-modal__input" />
                    </div>
                    <div className="create-server-modal__footer">
                        <button type='button' onClick={() => setLevel(0)} className="create-server-moval__goback">Go back</button>
                        <button type='submit' className="create-server-modal__button">Create server</button>
                    </div>
                </form>
            </div>
        </>
    )
}
