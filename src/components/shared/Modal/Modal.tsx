import style from "./style.module.scss";

export const Modal = ({ children }) => {
  return (
    <div className={style["modal"]}>
      <div className={style["modal-content"]}>{children}</div>
    </div>
  );
};

export default Modal;
