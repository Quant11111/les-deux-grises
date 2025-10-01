import { ReactNode } from "react";
import styles from "./OnlyLarge.module.css";

interface OnlyLargeProps {
  children: ReactNode;
  className?: string;
}

export default function OnlyLarge({ children, className = "" }: OnlyLargeProps) {
  return (
    <div className={`${styles.onlyLarge} ${className}`}>
      {children}
    </div>
  );
}