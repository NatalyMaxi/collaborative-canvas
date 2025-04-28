import { ButtonHTMLAttributes } from "react";
import cn from "classnames";

import styles from './Button.module.scss'

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  drawingMode: string;
}

export const Button = ({drawingMode, ...props}:IButtonProps) => {
  return (
    <button className={cn(styles.button, styles[drawingMode])} {...props}>
    </button>
  )
}