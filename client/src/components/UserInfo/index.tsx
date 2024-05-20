import { FaCog, FaHeadphones, FaMicrophone } from "react-icons/fa";
import RoundIcon from "../RoundIcon";
import "./styles.scss";
import client from '../../lib/index';
import { useEffect, useState } from "react";

export default function UserInfo() {
    const [username, setUsername] = useState('');
    const [tag, setTag] = useState('');

    useEffect(() => {
        client.on('ready', () => {
            setUsername(client.user?.username || '');
            setTag(client.user?.tag || '');
        })
    }, []);

    return (
        <>
            <div id="user-info">
                <div id="user-info__info">
                    <RoundIcon status="dnd" small disableHover imageURL="https://external-preview.redd.it/4PE-nlL_PdMD5PrFNLnjurHQ1QKPnCvg368LTDnfM-M.png?auto=webp&s=ff4c3fbc1cce1a1856cff36b5d2a40a6d02cc1c3" />
                    <div id="user-info__texts">
                        <span>{username}</span>
                        <span id="user-info__status">@{tag}</span>
                    </div>
                </div>
                <div id="user-info__actions">
                    <i><FaMicrophone /></i>
                    <i><FaHeadphones /></i>
                    <i><FaCog /></i>
                </div>
            </div>
        </>
    )
}
