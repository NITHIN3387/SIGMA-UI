import type { ClassValue } from "clsx";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...className: ClassValue[]): string => twMerge(clsx(className));
