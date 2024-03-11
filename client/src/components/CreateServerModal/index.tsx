import { FaAngleRight } from 'react-icons/fa';
import './styles.scss';

interface IProps {
    active: boolean;
    setActive: (active: boolean) => any;
}

export default function CreateServerModal(props: IProps) {
    return (
        <>
            <div onClick={() => props.setActive(false)} id="create-server-modal-overlay" className={`${props.active ? "create-server-modal-overlay--active" : ""}`}></div>
            <div id="create-server-modal" className={`${props.active ? "create-server-modal--active" : ""}`}>
                <div id="create-server-modal__text">
                    <span id="create-server-modal__title">Create a server</span>
                    <span id="create-server-modal__subtitle">Your server is where you and your friends hang out. Make yours and start talking</span>
                </div>
                <div id="create-server-modal__options">
                    <div className="create-server-modal__option">
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
                    <button id="create-server-modal__footer-button">
                        Join a server
                    </button>
                </div>
            </div>
        </>
    )
}