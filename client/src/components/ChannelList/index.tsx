import { FormEvent, useEffect, useState } from "react";
import { FaHashtag, FaHeadphones } from "react-icons/fa";
import client from "../../lib";
import { Channel } from "../../lib/core/classes/Channel";
import Category from "../Category";
import Input from "../Input";
import Modal from "../Modal";
import "./styles.scss";

export default function ChannelList() {
    const [channels, setChannels] = useState<Channel[]>([]);
    const [createModal, setCreateModal] = useState(false);
    const [type, setType] = useState(99);
    const [name, setName] = useState('');

    useEffect(() => {
        client.on('selectGuild', async () => {
            const guild = client.selectedGuild;
            if (guild) {
                guild.on('update', () => {
                    setChannels(guild.channels);
                });

                if (guild.channels.length) setChannels(guild.channels);
                else {
                    await guild.getChannels();
                    if (client.selectedGuild?.id === guild.id) setChannels(guild.channels);
                }
            }
        });
    }, []);

    function closeModal() {
        setCreateModal(false);
        setType(99);
        setName('');
    }

    async function createChannel() {
        const guild = client.selectedGuild;

        if(guild) {
            await guild.createChannel(name);
        }

        closeModal();
    }

    return (
        <>
            <Modal id="channel-list--modal" onSuccess={createChannel} active={createModal} onClose={closeModal}>
                <h4 id="channel-list--modal-title">Create channel</h4>
                <span className="channel-list--modal-subtitle">Channel type</span>

                <div id="channel-list--modal-channel-types">
                    <div onClick={() => setType(0)} className={`channel-type ${type == 0 ? 'channel-type__active' : ''}`}>
                        <i><FaHashtag /></i>
                        <div className="channel-type--infos">
                            <h5>Text</h5>
                            <span>Envie mensagens, imagens, GIFs, emojis, opiniões e piadas</span>
                        </div>
                        <input checked={type == 0} type="radio" />
                    </div>
                    <div className={`channel-type channel-type__disabled ${type == 1 ? 'channel-type__active' : ''}`}>
                        <i><FaHeadphones /></i>
                        <div className="channel-type--infos">
                            <h5>Voice</h5>
                            <span>Passe o tempo com a turma com voz, video e compartilhamento de tela</span>
                        </div>
                        <input checked={type == 1} type="radio" />
                    </div>
                    <span className="channel-list--modal-subtitle">Nome do canal</span>
                    {/* @ts-ignore */}
                    <Input onChange={(e) => setName(e.target.value)} placeholder="chat-geral" />
                </div>
            </Modal>
            <div id="channel-list">
                <Category name="main" channels={channels} createModal={setCreateModal} />
            </div>
        </>
    )
}
