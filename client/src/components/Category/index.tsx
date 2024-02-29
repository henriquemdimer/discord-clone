import { FaAngleDown, FaPlus } from "react-icons/fa";
import "./styles.scss";
import Channel from "../Channel";
import { useState } from "react";

export interface IProps {
    name: string;
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

                    <i className="category__icon"><FaPlus /></i>
                </div>
                {!closed && (
                    <div className="category__channels">
                        <Channel name="general"/>
                        <Channel name="media"/>
                    </div>
                )}
            </div>
        </>
    )
}