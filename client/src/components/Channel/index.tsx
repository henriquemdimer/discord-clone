import { FaCog, FaUserPlus } from "react-icons/fa";
import { HiHashtag } from 'react-icons/hi';
import client from "../../lib";
import "./styles.scss";

export interface IProps {
    name: string;
    id: string;
    selected?: boolean;
}

export default function Channel(props: IProps) {
    return (
        <>
            <div onClick={() => client.selectChannel(props.id)} className={`channel ${props.selected ? 'channel--selected' : ''}`}>
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
