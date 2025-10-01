import { memo, ReactNode } from "react";
import styles from "./OnlySmall.module.css";

interface OnlySmallProps {
  children: ReactNode;
  className?: string;
}

function OnlySmall({ children, className = "" }: OnlySmallProps) {
  return (
    <div className={`${styles.onlySmall} ${className}`}>
      {children}
    </div>
  );
}

export default memo(OnlySmall);