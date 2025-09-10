import { ReactNode } from "react";
import style from "./style.module.scss";
type childrenType = {
  children: ReactNode;
};
export const Modal = ({ children }: childrenType) => {
  return (
    <div className={style.modal}>
      <div className={style.modalContent}>{children}</div>
    </div>
  );
};

export default Modal;
