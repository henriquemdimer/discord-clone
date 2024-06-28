import { useEffect, useState } from "react";
import "./styles.scss";
import { FiAtSign } from "react-icons/fi";
import client from "../../lib";

export default function Input() {
    const [placeholder, setPlaceholder] = useState(true);
    const [text, setText] = useState('');

    async function sendMessage(content: string) {
        const channel = client.selectedChannel;
        if (channel) {
            await channel.createMessage(content);
        }
    }

    useEffect(() => {
        const input = document.getElementById('input');
        if (!input) return;

        const ignore_keys = ['Shift']
        client.on('clientKeyDown', (e) => {
            if(!ignore_keys.includes(e.key) && !client.activeModal) input.focus();
        })

        input.addEventListener("focus", () => {
            setPlaceholder(false);
        });

        input.addEventListener("blur", () => {
            setPlaceholder(true);
        });

        input.addEventListener('keydown', async (e) => {
            if (e.key == 'Enter') {
                e.preventDefault();
                await sendMessage(input.innerText);
                input.innerText = '';
                adjustHeight();
            }
        })
    }, [])

    function adjustHeight() {
        const input = document.getElementById('input');
        const container = document.getElementById('input__container');
        const channel = document.getElementById('channel-data');
        if (!input || !container || !channel) return;
        setText(input.innerText);

        const bounding = input.getBoundingClientRect();
        container.style.bottom = `${bounding.height - 28}px`
        channel.style.paddingBottom = `${bounding.height + 32}px`
    }

    return (
        <>
            <div id="input__container">
                <div suppressContentEditableWarning onInput={adjustHeight} contentEditable id='input' className={`${text.length ? 'input--active' : ''}`}>
                    {placeholder && !text.length ? <span id="input__placeholder">Text in #general</span> : ''}
                </div>
                <i id="input__icon"><FiAtSign /></i>
            </div>
            <div id="input__overlay"></div>
        </>
    )
}
