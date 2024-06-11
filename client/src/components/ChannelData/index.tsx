import { useEffect, useState } from "react";
import client from "../../lib";
import LibMessage from "../../lib/core/classes/Message";
import Message from "../Message";
import "./styles.scss";
import Modal from "../Modal";

export default function ChannelData() {
    const [messageChunks, setMessageChunks] = useState<any[]>([]);
    const [deleteModal, setDeleteModal] = useState(false)
    const [messageToDelete, setMessageToDelete] = useState<LibMessage>();
    const [loading, setLoading] = useState(false);
    const [shiftDown, setShiftDown] = useState(false);

    useEffect(() => {
        client.on('selectChannel', parseMessages);
        client.on('messageCreate', parseMessages);
        client.on('messageDelete', parseMessages);

        client.on('clientKeyDown', (e) => {
            if(e.key == 'Shift') setShiftDown(true);
        })

        client.on('clientKeyUp', (e) => {
            if(e.key == 'Shift') setShiftDown(false);
        })

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

                    chunks.push(msgs.reverse());
                }

                setMessageChunks(chunks.reverse());
            }
        }
    }, []);

    async function deleteMessage(msg?: LibMessage) {
        try {
            if(msg) await msg.delete();
            else if(messageToDelete) await messageToDelete.delete()
        } catch(_) {
            console.log(_);
        } finally {
            setDeleteModal(false);
        }
    }
    
    async function openDeleteMessageModal(msg: LibMessage) {
        setMessageToDelete(msg);

        if(shiftDown) {
            await deleteMessage(msg);
        } else {
            setDeleteModal(true);
        }
    }

    return (
        <>
            <Modal onSuccess={deleteMessage} loading={loading} setLoading={setLoading} successButtonStyle='danger' successButtonLabel="Delete" active={deleteModal} onClose={() => setDeleteModal(false)}>
                <h3>Delete message</h3>
                <br />
                <span>Are you sure you want to delete this message?</span>
                <div id="modal__message__content">
                    {messageToDelete && <Message self={messageToDelete} author={true} />}
                </div>
            </Modal>
            <div id="channel-data">
                {messageChunks.map((chunk) => (
                    chunk.map((msg: LibMessage, i: number) => (
                        <Message onDelete={openDeleteMessageModal} author={i == chunk.length - 1} key={msg.id} self={msg} />
                    ))
                ))}
            </div>
        </>
    )
}
