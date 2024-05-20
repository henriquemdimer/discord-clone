import { FormEvent, useEffect, useState } from "react";
import { FaHashtag, FaHeadphones } from "react-icons/fa";
import client from "../../lib";
import { Channel as LibChannel } from "../../lib/core/classes/Channel";
import Category from "../Category";
import Channel from "../Channel";
import Input from "../Input";
import Modal from "../Modal";
import "./styles.scss";

export default function ChannelList() {
    const [channels, setChannels] = useState<LibChannel[]>([]);
    const [createModal, setCreateModal] = useState(false);
    const [type, setType] = useState(99);
    const [name, setName] = useState('');
    const [parent, setParent] = useState('');
    const [selected, setSelected] = useState<LibChannel | undefined>();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        client.on('selectChannel', () => {
            setSelected(client.selectedChannel);
        })

        client.on('selectGuild', async () => {
            const guild = client.selectedGuild;
            if (guild) {
                guild.on('update', () => {
                    setChannels(guild.channels);
                });

                setChannels(guild.channels);
            }
        });
    }, []);

    function closeModal() {
        setCreateModal(false);
        setType(99);
        setName('');
        setParent('');
    }

    async function createChannel() {
        const guild = client.selectedGuild;

        if (guild) {
            try {
                const id = await guild.createChannel(name, type, parent);
                // client.selectChannel(id);
            } catch (err) {
                setLoading(false);
                return;
            }
        }

        closeModal();
    }

    function openModal(id: string) {
        setParent(id);
        setCreateModal(true);
    }

    return (
        <>
            <Modal disabled={type == 99} loading={loading} setLoading={setLoading} id="channel-list--modal" onSuccess={createChannel} active={createModal} onClose={closeModal}>
                <h4 id="channel-list--modal-title">Create channel</h4>
                <span className="channel-list--modal-subtitle">Channel type</span>

                <div id="channel-list--modal-channel-types">
                    <ChannelType
                        type={0}
                        setType={setType}
                        selected={type == 0}
                        title="Categoria"
                        description="Agrupe e organize canais e permissões"
                    />
                    <ChannelType
                        type={1}
                        setType={setType}
                        selected={type == 1}
                        title="Texto"
                        description="Envie mensagens, imagens, GIFs, emojis, opiniões e piadas"
                    />
                    <ChannelType
                        type={2}
                        setType={setType}
                        selected={type == 2}
                        title="Voz"
                        description="Passe o tempo com a turma com voz, video e compartilhamento de tela"
                        disabled
                    />
                    <span className="channel-list--modal-subtitle">Nome do canal</span>
                    {/* @ts-ignore */}
                    <Input onChange={(e) => setName(e.target.value)} placeholder="chat-geral" />
                </div>
            </Modal>
            <div id="channel-list">
                {channels.filter((c) => !c.parentId && c.type != 0).map((channel) => (
                    <Channel id={channel.id} selected={selected?.id == channel.id} name={channel.name} key={channel.id} />
                ))}
                {channels.map((channel) => (
                    channel.type == 0 && <Category selectedChannel={selected} name={channel.name} id={channel.id} createModal={openModal} key={channel.id} channels={channels.filter((c) => c.parentId == channel.id)} />
                ))}
            </div>
        </>
    )
}

interface ChannelTypeIProps {
    selected: boolean;
    type: number;
    setType: any;
    title: string;
    description: string;
    disabled?: boolean;
}

export function ChannelType(props: ChannelTypeIProps) {
    return (
        <div onClick={() => props.disabled ? {} : props.setType(props.type)} className={`channel-type ${props.selected ? 'channel-type__active' : ''} ${props.disabled ? "channel-type__disabled" : ""}`}>
            <i><FaHashtag /></i>
            <div className="channel-type--infos">
                <h5>{props.title}</h5>
                <span>{props.description}</span>
            </div>
            <input checked={props.selected} type="radio" />
        </div>
    )
}
