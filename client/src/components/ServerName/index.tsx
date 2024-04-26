import "./styles.scss";
import { FaAngleDown } from "react-icons/fa";
import { useEffect, useState } from "react";
import client from "../../lib";

export default function ServerName() {
    const [name, setName] = useState('');

    useEffect(() => {
        client.on('selectGuild', () => {
            setName(client.selectedGuild?.name || 'Unknown');
        });
    }, []);

    return (
        <>
            <div id="server-name">
                <div id="server-name__title">{name}</div>
                <i id="server-name__icon"><FaAngleDown /></i>
            </div>
        </>
    )
}
