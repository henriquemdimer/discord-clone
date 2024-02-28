import { FaCog, FaHeadphones, FaMicrophone } from "react-icons/fa";
import RoundIcon from "../RoundIcon";
import "./styles.scss";

export default function UserInfo() {
    return (
        <>
            <div id="user-info">
                <div id="user-info__info">
                    <RoundIcon status="dnd" small disableHover imageURL="https://external-preview.redd.it/4PE-nlL_PdMD5PrFNLnjurHQ1QKPnCvg368LTDnfM-M.png?auto=webp&s=ff4c3fbc1cce1a1856cff36b5d2a40a6d02cc1c3" />
                    <div id="user-info__texts">
                        <span>Henrique</span>
                        <span id="user-info__status">#2890</span>
                    </div>
                </div>
                <div id="user-info__actions">
                    <i><FaMicrophone /></i>
                    <i><FaHeadphones /></i>
                    <i><FaCog /></i>
                </div>
            </div>
        </>
    )
}