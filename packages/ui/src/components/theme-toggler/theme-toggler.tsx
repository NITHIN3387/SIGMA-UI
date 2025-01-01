"use client";

import { Button } from "@sigma/ui";
import { Moon, Sun } from "lucide-react";
import { type FC, useEffect, useState } from "react";
import type { ThemeType } from "./theme-toggler.types";
import { toggleTheme } from "./theme-toggler.utils";

export const ThemeToggler: FC = () => {
  const [theme, setTheme] = useState<ThemeType>("dark");

  useEffect(() => {
    const savedTheme =
      (window.localStorage.getItem("theme") as ThemeType) || "dark";
    
    setTheme(savedTheme)

    savedTheme === "light"
      ? document.documentElement.classList.remove("dark")
      : document.documentElement.classList.add("dark");
    
    document.documentElement.classList.add("hydrated");
  }, []);

  return (
    <Button
      className="px-1 rounded-full h-fit space-x-2 bg-zinc-100 dark:bg-zinc-900 border dark:border-zinc-800 relative text-primary-text-light dark:text-primary-text-dark"
      onClick={() => toggleTheme(theme, setTheme)}
      variant="ghost"
    >
      <div
        className={`h-10 w-10 absolute bg-zinc-100 dark:bg-zinc-800 ${theme === "light" ? "animate-theme-light" : "animate-theme-dark"} rounded-full z-0 border border-zinc-400 dark:border-zinc-600`}
      />
      <Sun className="z-10 -translate-x-1" />
      <Moon className="z-10" />
    </Button>
  );
};
