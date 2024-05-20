import LibMessage from "../../lib/core/classes/Message";
import RoundIcon from "../RoundIcon";
import "./styles.scss";

interface IProps {
    content: string;
    username: string;
    attached?: LibMessage[]
}

export default function Message(props: IProps) {
    return (
        <>
            <div className="message">
                <RoundIcon medium disableHover imageURL="https://external-preview.redd.it/4PE-nlL_PdMD5PrFNLnjurHQ1QKPnCvg368LTDnfM-M.png?auto=webp&s=ff4c3fbc1cce1a1856cff36b5d2a40a6d02cc1c3" />
                <div className="message__data">
                    <span className="message__author">{props.username}</span>
                    {!props.attached?.length && <span className="message__content">{props.content}</span>}
                    {props.attached?.map((msg) => (
                        <span className="message__content">{msg.content}</span>
                    ))}
                </div>
            </div>
        </>
    )
}
