import React, { useEffect, useState } from "react";
import "./styles.scss";
import { FiAtSign } from "react-icons/fi";

export default function Input() {
    const [text, setText] = useState("");
    const [placeholder, setPlaceholder] = useState(true);

    useEffect(() => {
        const input = document.getElementById('input');
        if (!input) return;

        input.addEventListener("focus", () => {
            setPlaceholder(false);
        })

        input.addEventListener("blur", () => {
            setPlaceholder(true);
        })
    }, [])

    function adjustHeight(e: any) {
        const input = document.getElementById('input');
        const container = document.getElementById('input__container');
        const channel = document.getElementById('channel-data');
        if (!input || !container || !channel) return
        setText(input.innerText);

        const bounding = input.getBoundingClientRect();
        container.style.bottom = `${bounding.height - 28}px`
        channel.style.paddingBottom = `${bounding.height + 32}px`
    }

    return (
        <>
            <div id="input__container">
                <div onInput={adjustHeight} contentEditable id="input">
                    {placeholder && <span id="input__placeholder">Text in #general</span>}
                </div>
                <i id="input__icon"><FiAtSign /></i>
            </div>
            <div id="input__overlay"></div>
        </>
    )
}
