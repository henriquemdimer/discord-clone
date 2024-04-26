import { useEffect, useState } from "react";
import client from "../../lib";
import { GuildMember } from "../../lib/core/classes/GuildMember";
import Role from "../Role";
import "./styles.scss";

export default function UsersList() {
    const [members, setMembers] = useState<GuildMember[]>([]);

    useEffect(() => {
        client.on('selectGuild', async () => {
            if (client.selectedGuild) {
                if (client.selectedGuild.members.length) setMembers(client.selectedGuild.members);
                else {
                    const id = client.selectedGuild.id;
                    await client.selectedGuild.getMembers();
                    if (client.selectedGuild.id === id) setMembers(client.selectedGuild.members);
                }
            }
        })
    }, []);

    return (
        <>
            <div id="users-list">
                <Role members={members} />
            </div>
        </>
    )
}
