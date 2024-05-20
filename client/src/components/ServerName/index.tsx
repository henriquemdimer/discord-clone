import "./styles.scss";
import { FaAngleDown } from "react-icons/fa";
import { useEffect, useState } from "react";
import client from "../../lib";

export default function ServerName() {
    const [name, setName] = useState<string | undefined>('');

    useEffect(() => {
        client.on('selectGuild', () => {
            setName(client.selectedGuild?.name);
        });
    }, []);

    return (
        <>
            <div id="server-name">
                <div id="server-name__title">{name || 'Unknown'}</div>
                <i id="server-name__icon"><FaAngleDown /></i>
            </div>
        </>
    )
}
