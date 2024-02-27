import ChannelData from '../ChannelData';
import ChannelInfo from '../ChannelInfo';
import ChannelList from '../ChannelList';
import ServerList from '../ServerList';
import ServerName from '../ServerName';
import UserInfo from '../UserInfo';
import UsersList from '../UsersList';
import './styles.scss';

export default function Layout() {
    return (
        <>
            <div id="layout">
                <div className="layout--flex">
                    <ServerList />
                    <div className="layout__rigth-bar layout--column">
                        <ServerName />
                        <ChannelList />
                        <UserInfo />
                    </div>
                    <div className="layout--column layout--full">
                        <ChannelInfo />
                        <div className="layout--flex layout--full">
                            <ChannelData />
                            <UsersList />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}