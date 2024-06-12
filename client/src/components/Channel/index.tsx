import { FaCog, FaUserPlus } from "react-icons/fa";
import { HiHashtag } from 'react-icons/hi';
import client from "../../lib";
import "./styles.scss";
import { Channel as LibChannel } from "../../lib/core/classes/Channel";
import { useEffect, useReducer } from "react";

export interface IProps {
    self: LibChannel;
    selected?: boolean;
}

export default function Channel(props: IProps) {
    const [, forceUpdate] = useReducer(x => x + 1, 0);

    useEffect(() => {
        client.on('mentionUpdate', forceUpdate);
    }, []);
    
    return (
        <>
            <div onClick={() => client.selectChannel(props.self.id)} className={`channel ${props.selected ? 'channel--selected' : ''} ${props.self.hasUnreadMessages ? 'channel--notification' : ''}`}>
                <div className="channel__infos">
                    <div className="channel__icon"><HiHashtag /></div>
                    <div className="channel__name">{props.self.name}</div>
                </div>

                <div className="channel__actions">
                    <i><FaUserPlus /></i>
                    <i><FaCog /></i>
                </div>
                <span className={`channel__mentions ${props.self.newMentions > 0 ? 'channel__mentions--active' : ''}`}>{props.self.newMentions}</span>
            </div>
        </>
    )
}
