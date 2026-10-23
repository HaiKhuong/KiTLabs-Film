import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";
import styles from "@/components/common/Tag/Tag.module.sass";

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
}

export function Tag({ children, className, ...props }: TagProps) {
  return (
    <span className={cn(styles.tag, className)} {...props}>
      {children}
    </span>
  );
}
