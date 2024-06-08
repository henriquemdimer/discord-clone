import { HTMLAttributes } from "react";
import "./styles.scss";

interface IProps extends HTMLAttributes<HTMLButtonElement> {
  label: string;
  type?: "button" | "submit" | "reset";
  sstyle?: "default" | "outline";
  loading?: boolean;
  disabled?: boolean;
}

export default function Button(props: IProps) {
  return (
    <>
      <button disabled={props.loading || props.disabled} onClick={props.onClick} className={`button ${props.disabled ? 'button__disabled' : ''} ${props.loading ? 'button__loading' : ''} button__${props.sstyle || 'default'}`} type={props.type || 'button'}>
        <span>{props.label}</span>
        {props.loading && <img src='oval.svg' alt='loader' width={25} height={25} />}
      </button>
    </>
  )
}
