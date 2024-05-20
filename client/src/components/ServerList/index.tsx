import { FaPlus } from "react-icons/fa";
import RoundIcon from "../RoundIcon";
import Separator from "../Separator";
import "./styles.scss";
import CreateServerModal from "../CreateServerModal";
import { useEffect, useState } from "react";
import client from "../../lib";
import { Guild } from "../../lib/core/classes/Guild";

export default function ServerList() {
    const [modal, setModal] = useState(false);
    const [guilds, setGuilds] = useState<Guild[]>([]);
    const [selected, setSelected] = useState<Guild>();

    useEffect(() => {
        client.on('guildsUpdate', () => {
            setGuilds(client.guilds);
        })

        client.on('selectGuild', () => {
            setSelected(client.selectedGuild);
        })
    }, []);

    return (
        <>
            <CreateServerModal active={modal} setActive={setModal} />
            <div id="server-list">
                <RoundIcon isHome />
                <Separator />
                {guilds.map((guild: Guild, i) => (
                    <RoundIcon onClick={async () => await client.selectGuild(guild)} active={selected?.id == guild.id} label={guild.name.split(' ').map((word: string, i: number) => i < 2 ? word[0].toUpperCase() : '')} key={i} />
                ))}
                {guilds.length > 0 && <Separator />}
                <RoundIcon onClick={() => setModal(true)} label={<FaPlus />} system />
            </div>
        </>
    )
}
