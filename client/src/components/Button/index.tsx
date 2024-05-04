import { HTMLAttributes } from "react";
import "./styles.scss";

interface IProps extends HTMLAttributes<HTMLButtonElement> {
  label: string;
  type?: "button" | "submit" | "reset";
  sstyle?: "default" | "outline";
}

export default function Button(props: IProps) {
  return (
    <>
      <button onClick={props.onClick} className={`button button__${props.sstyle || 'default'}`} type={props.type || 'button'}>{props.label}</button>
    </>
  )
}
