import { Dispatch, HTMLAttributes, ReactNode, SetStateAction, useState } from "react";
import Button from "../Button";
import "./styles.scss";
import { FaTimes } from "react-icons/fa";

interface IProps extends HTMLAttributes<HTMLDivElement> {
  active: boolean;
  onClose: () => void;
  onSuccess?: (...any: any[]) => Promise<void>;
  children: ReactNode;
  loading?: boolean;
  setLoading?: any;
  disabled?: boolean;
}

export default function Modal(props: IProps) {
  return (
    <>
      <div className={`${props.active ? 'modal__active' : ''} modal`}>
        <i onClick={() => props.onClose()} className="modal--close"><FaTimes /></i>
        <div className="modal--content">
          {props.children}
        </div>
        <div className="modal--footer">
          <Button onClick={() => props.onClose()} label='Cancelar' sstyle='outline' />
          <Button loading={props.loading} disabled={props.loading || props.disabled} onClick={async () => { props.setLoading(true); await props.onSuccess?.(); props.setLoading(false) }} label="Criar canal" />
        </div>
      </div>
      <div onClick={() => props.onClose()} className={`${props.active ? 'modal-overlay__active' : ''} modal-overlay`}></div>
    </>
  )
}
