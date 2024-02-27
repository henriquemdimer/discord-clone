import User from "../User";
import "./styles.scss";

export default function Role() {
    return (
        <>
            <div className="role">
                <div className="role__name">dísponivel - 1</div>
                <div className="role__users">
                    <User />
                    <User />
                    <User />
                    <User />
                    <User />
                </div>
            </div>
        </>
    )
}