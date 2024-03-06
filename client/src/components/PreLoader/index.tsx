import "./styles.scss";
// @ts-ignore
import Loader from '../../assets/loader.gif';

interface IProps {
    active: boolean;
}

export default function PreLoader(props: IProps) {
    return (
        <>
            <div id="preloader" className={`${props.active ? "preloader--active" : ""}`}>
                <div id="preloader__container">
                    <img src={Loader} width={200} height={200} alt="" />
                </div>
            </div>
        </>
    )
}