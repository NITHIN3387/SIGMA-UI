import { forwardRef } from "react";
import Link from "next/link";
import { cn } from "../../utils/cn";
import type { ButtonProps } from "./button.types";
import { buttonVariants } from "./button.variants";

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, href, variant, size, type = "button", ...props }, ref) => {
    return href ? (
      <Link
        className={cn(buttonVariants({ variant, size, className }))}
        href={href}
        {...props}
      />
    ) : (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        type={type}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
