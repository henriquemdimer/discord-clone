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
                <div className="role__name">Available - 1</div>
                <div className="role__users">
                    {props.members.map((member, index) => (
                        <User key={index} username={member.user.username} />
                    ))}
                </div>
            </div>
        </>
    )
}
