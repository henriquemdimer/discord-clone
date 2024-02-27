import "./styles.scss"
import { HiHashtag } from 'react-icons/hi';

export default function ChannelInfo() {
    return (
        <>
            <div id="channel-info">
                <div id="channel-info__title">
                    <i id="channel-info__icon"><HiHashtag /></i>
                    <div id="channel-info__name">chat-geral</div>
                    <div className="channel-info__separator"></div>
                    <div id="channel-info__topic">Fale sobre tudo!</div>
                </div>
            </div>
        </>
    )
}