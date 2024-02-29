import "./styles.scss";
import { FaAngleDown } from "react-icons/fa";

export default function ServerName() {
    return (
        <>
            <div id="server-name">
                <div id="server-name__title">My Server Name</div>
                <i id="server-name__icon"><FaAngleDown /></i>
            </div>
        </>
    )
}