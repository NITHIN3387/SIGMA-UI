import type { Dispatch, SetStateAction } from "react";

export type ThemeType = "light" | "dark";

export type ThemeTogglerType = (
  theme: ThemeType,
  setTheme: Dispatch<SetStateAction<ThemeType>>
) => void;
