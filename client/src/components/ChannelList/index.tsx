import { useEffect, useState } from "react";
import { FaHashtag } from "react-icons/fa";
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
        setLoading(true);
        const guild = client.selectedGuild;

        if (guild) {
            try {
                await guild.createChannel(name, type, parent);
                // client.selectChannel(id);
            } catch (err) {
                setLoading(false);
                return;
            } finally {
                setLoading(false);
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
            <Modal successButtonLabel='Create channel' disabled={type == 99} loading={loading} setLoading={setLoading} id="channel-list--modal" onSuccess={createChannel} active={createModal} onClose={closeModal}>
                <h4 id="channel-list--modal-title">Create channel</h4>
                <span className="channel-list--modal-subtitle">Channel type</span>

                <div id="channel-list--modal-channel-types">
                    <ChannelType
                        type={0}
                        setType={setType}
                        selected={type == 0}
                        title="Category"
                        description="Group and organize channels and permissions"
                    />
                    <ChannelType
                        type={1}
                        setType={setType}
                        selected={type == 1}
                        title="Text"
                        description="Send messages, images, GIFs, opinions and jokes"
                    />
                    <ChannelType
                        type={2}
                        setType={setType}
                        selected={type == 2}
                        title="Voice"
                        description="Spend time with the gang with voice, video, and screen sharing"
                        disabled
                    />
                    <span className="channel-list--modal-subtitle">Channel name</span>
                    {/* @ts-ignore */}
                    <Input onKeyDown={async (e) => e.key == 'Enter' ? await createChannel() : {}} onChange={(e) => setName(e.target.value)} placeholder="general" />
                </div>
            </Modal>
            <div id="channel-list">
                {channels.filter((c) => !c.parentId && c.type != 0).map((channel) => (
                    <Channel self={channel} selected={selected?.id == channel.id} key={channel.id} />
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
            <input readOnly checked={props.selected} type="radio" />
        </div>
    )
}
