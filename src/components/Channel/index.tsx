import { FaCog, FaUserPlus } from "react-icons/fa";
import { HiHashtag } from 'react-icons/hi';
import "./styles.scss";

export interface IProps {
    name: string;
}

export default function Channel(props: IProps) {
    return (
        <>
            <div className="channel">
                <div className="channel__infos">
                    <div className="channel__icon"><HiHashtag /></div>
                    <div className="channel__name">{props.name}</div>
                </div>

                <div className="channel__actions">
                    <i><FaUserPlus /></i>
                    <i><FaCog /></i>
                </div>
            </div>
        </>
    )
}