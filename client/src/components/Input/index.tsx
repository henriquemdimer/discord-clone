import { FormEvent, HTMLAttributes } from "react";
import "./styles.scss";

interface IProps extends HTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  type?: string;
  onChange?: (event: FormEvent<HTMLInputElement>) => void;
}

export default function Input(props: IProps) {
  return (
    <>
      <input className='input' {...props} />
    </>
  )
}
