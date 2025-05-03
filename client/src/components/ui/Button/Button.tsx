import { ButtonHTMLAttributes } from "react";

import styles from "./Button.module.scss";

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonText: string;
}

export const Button = ({ buttonText, className, ...props }: IButtonProps) => {
  return (
    <button className={styles.button} {...props}>
      <span className={styles.buttonText}>{buttonText}</span>
    </button>
  );
};
