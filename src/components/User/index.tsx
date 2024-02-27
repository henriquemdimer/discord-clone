import RoundIcon from "../RoundIcon";
import "./styles.scss";

export default function User() {
    return (
        <>
            <div className="user">
                <RoundIcon status="idle" small disableHover />
                <div className="user__infos">
                    <span className="user__name">Von Der Heimsk</span>
                </div>
            </div>
        </>
    )
}