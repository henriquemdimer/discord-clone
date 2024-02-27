import { useEffect, useState } from "react";
import RoundIcon from "../RoundIcon";
import Separator from "../Separator";
import "./styles.scss";

export default function ServerList() {
    const [not,setNot] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setNot(true);
        }, 1000);
    }, []);

    return (
        <>
            <div id="server-list">
                <RoundIcon isHome />
                <Separator />
                <RoundIcon notifications={not ? 1 : 0}/>
                <RoundIcon messages={not}/>
                <RoundIcon />
                <RoundIcon />
                <RoundIcon  active messages />
                <RoundIcon />
                <RoundIcon />
                <RoundIcon />
                <RoundIcon />
                <RoundIcon />
                <RoundIcon />
                <RoundIcon />
                <RoundIcon />
                <RoundIcon />
                <RoundIcon />
                <RoundIcon />
                <RoundIcon />
                <RoundIcon />
                <RoundIcon />
                <RoundIcon />
            </div>
        </>
    )
}