import type { Config } from "tailwindcss";
import sharedConfig from "@sigma/tailwind-config";

const config: Pick<Config, "prefix" | "presets" | "content"> = {
  content: ["./src/**/*.{tsx,ts}"],
  presets: [sharedConfig],
};

export default config;
