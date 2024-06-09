import "./styles.scss";

export type BUTTON_STYLES = 'default' | 'danger'


interface IProps {
  label: string;
  htmlType?: "button" | "submit" | "reset";
  type?: "default" | "outline";
  style?: BUTTON_STYLES;
  loading?: boolean;
  disabled?: boolean;
  onClick?: (...args: any) => any;
}

export default function Button(props: IProps) {
  return (
    <>
      <button disabled={props.loading || props.disabled} onClick={props.onClick} className={`button ${props.disabled ? 'button__disabled' : ''} ${props.loading ? 'button__loading' : ''} button__${props.type || 'default'} button__${props.style || 'default'}`} type={props.htmlType || 'button'}>
        <span>{props.label}</span>
        {props.loading && <img src='oval.svg' alt='loader' width={25} height={25} />}
      </button>
    </>
  )
}
