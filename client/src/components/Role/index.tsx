import { GuildMember } from "../../lib/core/classes/GuildMember";
import User from "../User";
import "./styles.scss";

export interface IProps {
    members: GuildMember[];
}

export default function Role(props: IProps) {
    return (
        <>
            <div className="role">
                <div className="role__name">Available - {props.members.length || 0}</div>
                <div className="role__users">
                    {props.members.map((member) => (
                        <User key={member.id} username={member.user.username} />
                    ))}
                </div>
            </div>
        </>
    )
}
