import { HTMLAttributes, ReactNode } from "react";
import Button from "../Button";
import "./styles.scss";

interface IProps extends HTMLAttributes<HTMLDivElement> {
  active: boolean;
  setActive: any;
  children: ReactNode;
}

export default function Modal(props: IProps) {
  return (
    <>
      <div className={`${props.active ? 'modal__active' : ''} modal`}>
        <div className="modal--content">
          {props.children}
        </div>
        <div className="modal--footer">
          <Button onClick={() => props.setActive(false)} label='Cancelar' sstyle='outline' />
          <Button label="Criar canal" />
        </div>
      </div>
      <div onClick={() => props.setActive(false)} className={`${props.active ? 'modal-overlay__active' : ''} modal-overlay`}></div>
    </>
  )
}
