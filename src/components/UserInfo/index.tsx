import RoundIcon from "../RoundIcon";
import "./styles.scss";

export default function UserInfo() {
    return (
        <>
            <div id="user-info">
                <div id="user-info__info">
                    <RoundIcon status="dnd" small disableHover />
                    <div id="user-info__texts">
                        <span>vonderheimsk</span>
                        <span id="user-info__status">#2890</span>
                    </div>
                </div>
            </div>
        </>
    )
}