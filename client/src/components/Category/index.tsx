import { FaAngleDown, FaPlus } from "react-icons/fa";
import "./styles.scss";
import Channel from "../Channel";
import { useState } from "react";
import { Channel as LibChannel } from "../../lib/core/classes/Channel";

export interface IProps {
    name: string;
    id: string;
    channels: LibChannel[];
    createModal: any;
    selectedChannel?: LibChannel;
}

export default function Category(props: IProps) {
    const [closed, setClosed] = useState(false);

    return (
        <>
            <div className="category">
                <div className="category__infos">
                    <div className="category__name" onClick={() => setClosed(!closed)}>
                        <i className={`category__toggle ${closed ? "category__toggle--active" : ""}`}><FaAngleDown /></i>
                        <div className="category__name">{props.name}</div>
                    </div>

                    <i onClick={() => props.createModal(props.id)} className="category__icon"><FaPlus /></i>
                </div>
                {!closed && (
                    <div className="category__channels">
                        {props.channels.map((channel, index) => (
                            <Channel self={channel} selected={props.selectedChannel?.id == channel.id} key={index} />
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}
