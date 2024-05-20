import { useEffect, useState } from "react";
import client from "../../lib";
import LibMessage from "../../lib/core/classes/Message";
import Message from "../Message";
import "./styles.scss";

export default function ChannelData() {
    const [messageChunks, setMessageChunks] = useState<any[]>([]);

    useEffect(() => {
        client.on('selectChannel', parseMessages);
        client.on('messageCreate', parseMessages);

        function parseMessages() {
            const channel = client.selectedChannel;
            if (channel) {
                const messages = channel.messages;
                const chunks: any[] = [];

                for (let i = 0; i < messages.length; i++) {
                    const msgs = [messages[i]];

                    for (let y = i + 1; y < messages.length; y++) {
                        if (messages[y].author.id == msgs[0].author.id) {
                            msgs.push(messages[y]);
                            i++;
                        } else break;
                    }

                    chunks.push(msgs);
                }

                setMessageChunks(chunks);
            }
        }
    }, []);

    return (
        <>
            <div id="channel-data">
                {messageChunks.reverse().map((chunk) => (
                    <Message key={chunk[0].id} username={chunk[0].author.user.username} content={chunk[0].content} attached={chunk} />
                ))}
            </div>
        </>
    )
}
