import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";
import styles from "@/components/common/Button/Button.module.sass";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export function Button({ children, className, type = "button", ...props }: ButtonProps) {
  return (
    <button type={type} className={cn(styles.button, className)} {...props}>
      {children}
    </button>
  );
}
