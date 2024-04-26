import RoundIcon from "../RoundIcon";
import "./styles.scss";

export interface IProps {
    username: string;
}

export default function User(props: IProps) {
    return (
        <>
            <div className="user">
                <RoundIcon status="idle" small disableHover imageURL="https://external-preview.redd.it/4PE-nlL_PdMD5PrFNLnjurHQ1QKPnCvg368LTDnfM-M.png?auto=webp&s=ff4c3fbc1cce1a1856cff36b5d2a40a6d02cc1c3" />
                <div className="user__infos">
                    <span className="user__name">{props.username}</span>
                </div>
            </div>
        </>
    )
}
