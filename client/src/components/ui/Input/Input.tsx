import { forwardRef, InputHTMLAttributes, Ref } from "react";
import cn from "classnames";

import styles from "./Input.module.scss";

export interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  inputType?: string;
  inputId: string;
  placeholder?: string;
  className?: string;
  ref?: Ref<HTMLInputElement>;
  value?: string;
  label?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = forwardRef<HTMLInputElement, IInputProps>(
  (
    {
      label,
      name,
      placeholder,
      className,
      inputId,
      inputType,
      value,
      onChange,
      ...props
    },
    ref
  ) => {
    return (
      <label
        className={styles.label}
        htmlFor={inputId}
      >
        {label}
        <input
          className={cn(styles.input, className)}
          type={inputType ?? "text"}
          id={inputId}
          name={name}
          placeholder={placeholder ?? ""}
          ref={ref}
          value={value}
          onChange={onChange}
          {...props}
        />
      </label>
    );
  }
);

Input.displayName = "Input"; // Задает имя компонента для отладки:
