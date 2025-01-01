"use client";

import { forwardRef, useState, type FC } from "react";
import type { DialogBoxProps } from "./dialog-box.types";
import { cn } from "../../utils/cn";

export const DialogBox = forwardRef<HTMLElement, DialogBoxProps>(
  ({ children, className, ...props }, ref) => {
    const [show, setShow] = useState<boolean>(false);

    return (
      <div
        className={`absolute h-dvh w-screen backdrop-blur-sm bg-black/20 dark:bg-black/70 top-0 left-0 ${show ? "flex" : "hidden"} justify-center items-center z-10`}
        id="dialogBg"
        onClick={() => setShow(false)}
      >
        <article
          className={cn([
            "p-8 rounded-lg shadow-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 z-20",
            className,
          ])}
          onClick={(event) => event.stopPropagation()}
          ref={ref}
          {...props}
        >
          {children}
        </article>
      </div>
    );
  }
);
