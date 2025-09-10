import classnames from "classnames";
import { MouseEventHandler, ReactNode } from "react";
import style from "./style.module.scss";

type ButtonProps = {
  title: string;
  icon?: ReactNode;
  outline?: boolean;
  disabled?: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

export const Button = ({ title, icon, outline, onClick }: ButtonProps) => {
  return (
    <button
      className={classnames(outline && style.outline, style.button)}
      onClick={onClick}
      type="button"
    >
      {icon && <span className={style.icon}>{icon}</span>}
      {title}
    </button>
  );
};
