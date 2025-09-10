import style from "./style.module.scss";

export const Modal = ({ children }) => {
  return (
    <div className={style.modal}>
      <div className={style.modalContent}>{children}</div>
    </div>
  );
};

export default Modal;
