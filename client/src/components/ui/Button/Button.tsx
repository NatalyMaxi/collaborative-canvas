import { ButtonHTMLAttributes } from "react";

import styles from "./Button.module.scss";

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonText: string;
}

export const Button = ({ buttonText }: IButtonProps) => {
  return (
    <button className={styles.button}>
      <span className={styles.buttonText}>{buttonText}</span>
    </button>
  );
};
