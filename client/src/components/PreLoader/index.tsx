import "./styles.scss";
// @ts-ignore

interface IProps {
    active: boolean;
}

export default function PreLoader(props: IProps) {
    return (
        <>
            <div id="preloader" className={`${props.active ? "preloader--active" : ""}`}>
                <div id="preloader__container">
                    <img src='loader.gif' width={200} height={200} alt="" />
                </div>
            </div>
        </>
    )
}