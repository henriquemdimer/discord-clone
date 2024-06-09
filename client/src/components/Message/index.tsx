import { FaTrash } from "react-icons/fa";
import LibMessage from "../../lib/core/classes/Message";
import RoundIcon from "../RoundIcon";
import "./styles.scss";
import Modal from "../Modal";
import { useState } from "react";

interface IProps {
    self: LibMessage
    author?: boolean;
    onDelete?: (msg: LibMessage) => void;
}

export default function Message(props: IProps) {
    return (
        <>
            <div className={`message ${props.author != true ? 'message--no-author' : ''}`}>
                {props.author == true && <RoundIcon medium disableHover imageURL="https://external-preview.redd.it/4PE-nlL_PdMD5PrFNLnjurHQ1QKPnCvg368LTDnfM-M.png?auto=webp&s=ff4c3fbc1cce1a1856cff36b5d2a40a6d02cc1c3" />}
                <div className="message__data">
                    {props.author == true && <span className="message__author">{props.self.author.user.username}</span>}
                    <div className="message__content">
                        <span>{props.self.content}</span>
                        <div className="message__actions">
                            <div onClick={() => props.onDelete?.(props.self)} className="message__action message__action--red"><i><FaTrash /></i></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
