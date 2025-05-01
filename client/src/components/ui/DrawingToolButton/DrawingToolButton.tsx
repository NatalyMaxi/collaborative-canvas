import { ButtonHTMLAttributes } from "react";
import cn from "classnames";

import styles from './DrawingToolButton.module.scss'

export interface IDrawingToolButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  drawingMode: string;
}

export const DrawingToolButton = ({drawingMode, ...props}:IDrawingToolButtonProps) => {
  return (
    <button className={cn(styles.button, styles[drawingMode])} {...props}>
    </button>
  )
}