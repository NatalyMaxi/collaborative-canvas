import cn from "classnames";

import { ReactNode } from "react";

import styles from "./DecorContainer.module.scss";

export interface IDecorContainerProps {
  children: ReactNode;
  className?: string;
}

export const DecorContainer = ({
  children,
  className,
}: IDecorContainerProps) => {
  return <div className={cn(styles.container, className)}>{children}</div>;
};
