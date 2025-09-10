import style from "./style.module.scss";

interface InputProps {
  label: string;
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  value: string;
}

export const Input = ({
  label,
  placeholder,
  onChange,
  name,
  value,
}: InputProps) => {
  return (
    <div className={style.input}>
      <label htmlFor="">{label}</label>
      <input
        type="text"
        placeholder={placeholder}
        onChange={onChange}
        name={name}
        value={value}
      />
    </div>
  );
};
