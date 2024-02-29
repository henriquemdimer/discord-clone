import RoundIcon from "../RoundIcon";
import "./styles.scss";

export default function Message() {
    return (
        <>
            <div className="message">
                <RoundIcon medium disableHover imageURL="https://external-preview.redd.it/4PE-nlL_PdMD5PrFNLnjurHQ1QKPnCvg368LTDnfM-M.png?auto=webp&s=ff4c3fbc1cce1a1856cff36b5d2a40a6d02cc1c3" />
                <div className="message__data">
                    <span className="message__author">Henrique</span>
                    <span className="message__content">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore id consectetur officia accusamus explicabo eveniet beatae nostrum facere numquam. Magnam aperiam dolor suscipit! Ratione aut, perferendis voluptatem enim tenetur optio.</span>
                </div>
            </div>
        </>
    )
}