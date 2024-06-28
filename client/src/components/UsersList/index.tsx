import { useEffect, useState } from "react";
import client from "../../lib";
import { GuildMember } from "../../lib/core/classes/GuildMember";
import Role from "../Role";
import "./styles.scss";

export default function UsersList() {
    const [members, setMembers] = useState<GuildMember[]>([]);
    const [roles, setRoles] = useState<number[]>([1]);

    useEffect(() => {
        client.on('selectGuild', async () => {
            if (client.selectedGuild) setMembers(client.selectedGuild.members);
        });

        client.on('guildMemberAdd', async () => {
            setRoles([Math.random() * 9999]);
            setMembers(client.selectedGuild?.members || []);
        });
    }, []);


    return (
        <>
            <div id="users-list">
                {roles.map((_, i) => (
                    <Role key={i} members={members} />
                ))}
            </div>
        </>
    )
}
