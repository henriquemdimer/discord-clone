import { FaPlus } from "react-icons/fa";
import RoundIcon from "../RoundIcon";
import Separator from "../Separator";
import "./styles.scss";
import CreateServerModal from "../CreateServerModal";
import { useEffect, useState } from "react";
import client from "../../lib";

export default function ServerList() {
    const [modal, setModal] = useState(false);
    const [guilds, setGuilds] = useState([]);

    useEffect(() => {
        client.on('ready', () => {
            setGuilds(client.guilds as never[]);
        })
    }, []);

    return (
        <>
            <CreateServerModal active={modal} setActive={setModal} />
            <div id="server-list">
                <RoundIcon isHome />
                <Separator />
                {guilds.map((guild: any, i) => (
                    <RoundIcon active={i === 0} label={guild.name.split(' ').map((word: string, i: number) => i < 2 ? word[0].toUpperCase() : '')} key={i} />
                ))}
                <Separator />
                <RoundIcon onClick={() => setModal(true)} label={<FaPlus />} system />
            </div>
        </>
    )
}