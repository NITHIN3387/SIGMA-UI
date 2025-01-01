import { forwardRef, type FC } from "react";
import { ButtonProps } from "./button.types";
import { cn } from "../../utils/cn";
import { buttonVariants } from "./button.variants";
import Link from "next/link";

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, href, variant, size, ...props }, ref) => {
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
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
