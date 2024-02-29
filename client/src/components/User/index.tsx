import RoundIcon from "../RoundIcon";
import "./styles.scss";

export default function User() {
    return (
        <>
            <div className="user">
                <RoundIcon status="idle" small disableHover imageURL="https://external-preview.redd.it/4PE-nlL_PdMD5PrFNLnjurHQ1QKPnCvg368LTDnfM-M.png?auto=webp&s=ff4c3fbc1cce1a1856cff36b5d2a40a6d02cc1c3" />
                <div className="user__infos">
                    <span className="user__name">Henrique</span>
                </div>
            </div>
        </>
    )
}