import { useEffect, useState } from "react";
import { FaHashtag } from "react-icons/fa";
import client from "../../lib";
import { Channel } from "../../lib/core/classes/Channel";
import Category from "../Category";
import Modal from "../Modal";
import "./styles.scss";

export default function ChannelList() {
    const [channels, setChannels] = useState<Channel[]>([]);
    const [createModal, setCreateModal] = useState(false);

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
            <Modal id="channel-list--modal" active={createModal} setActive={setCreateModal}>
                <h4 id="channel-list--modal-title">Create channel</h4>
                <span id="channel-list--modal-subtitle">Channel type</span>

                <div id="channel-list--modal-channel-types">
                    <div className="channel-type">
                        <i><FaHashtag /></i>
                        <div className="channel-type--infos">
                            <h5>Text</h5>
                            <span>Send messages, images, GIFs, emojis, opinions and jokes</span>
                        </div>
                        <input type="radio" />
                    </div>
                    <div className="channel-type">
                        <i><FaHashtag /></i>
                        <div className="channel-type--infos">
                            <h5>Voice</h5>
                            <span>Passe o tempo com a turma com voz, video e compartilhamento de tela</span>
                        </div>
                        <input type="radio" />
                    </div>

                </div>
            </Modal>
            <div id="channel-list">
                <Category name="main" channels={channels} createModal={setCreateModal} />
            </div>
        </>
    )
}
