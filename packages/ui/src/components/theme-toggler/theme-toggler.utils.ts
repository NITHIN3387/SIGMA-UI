import type { ThemeTogglerType } from "./theme-toggler.types";

export const toggleTheme: ThemeTogglerType = (theme, setTheme) => {
  if (theme === "light") {
    document.documentElement.classList.add("dark");
    window.localStorage.setItem("theme", "dark");
    setTheme("dark");
  } else {
    document.documentElement.classList.remove("dark");
    window.localStorage.setItem("theme", "light");
    setTheme("light");
  }
};
