import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "px-4 py-2 rounded-md font-semibold flex justify-center items-center",
  {
    variants: {
      variant: {
        primary: "bg-primary hover:bg-primary/85 disabled:bg-primary/85 text-primary-text-dark dark:text-primary-text-light",
        ghost: "bg-transparent",
      },
      size: {
        md: "px-4 py-2 gap-2",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);
