import { useEffect, useState } from "react";
import client from "../../lib";
import { Channel } from "../../lib/core/classes/Channel";
import Category from "../Category";
import "./styles.scss";

export default function ChannelList() {
    const [channels, setChannels] = useState<Channel[]>([]);

    useEffect(() => {
        client.on('selectGuild', async () => {
            const guild = client.selectedGuild;
            if (guild) {
                if (guild.channels.length) setChannels(guild.channels);
                else {
                    await guild.getChannels();
                    if (client.selectedGuild?.id === guild.id) setChannels(guild.channels);
                }
            }
        })
    }, []);

    return (
        <>
            <div id="channel-list">
                <Category name="main" channels={channels} />
            </div>
        </>
    )
}
