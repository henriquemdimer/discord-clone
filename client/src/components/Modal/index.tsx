import { Dispatch, HTMLAttributes, ReactNode, SetStateAction, useState } from "react";
import Button, { BUTTON_STYLES } from "../Button";
import "./styles.scss";
import { FaTimes } from "react-icons/fa";

interface IProps extends HTMLAttributes<HTMLDivElement> {
  active: boolean;
  onClose: () => void;
  onSuccess?: (...any: any[]) => Promise<any>;
  children: ReactNode;
  loading?: boolean;
  setLoading?: any;
  disabled?: boolean;
  successButtonLabel?: string
  successButtonStyle?: BUTTON_STYLES;
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
          <Button onClick={() => props.onClose()} label='Cancel' type='outline' />
          <Button style={props.successButtonStyle || 'default'} loading={props.loading} disabled={props.loading || props.disabled} onClick={async () => { props.setLoading?.(true); await props.onSuccess?.(); props.setLoading?.(false) }} label={props.successButtonLabel || 'OK'} />
        </div>
      </div>
      <div onClick={() => props.onClose()} className={`${props.active ? 'modal-overlay__active' : ''} modal-overlay`}></div>
    </>
  )
}
