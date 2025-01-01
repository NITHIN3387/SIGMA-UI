import type { Config } from "tailwindcss";

const config: Omit<Config, "content"> = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // both mode

        "primary": "rgb(59 130 246)",
        "secondary": "",

        // light mode

        "primary-bg-light": "rgb(255 255 255)",
        "secondary-bg-light": "",

        "primary-text-light": "rgb(0 0 0)",
        "secondary-text-light": "rgb(0 0 0 / 0.5)",

        // dark mode

        "primary-bg-dark": "rgb(0 0 0)",
        "secondary-bg-dark": "",

        "primary-text-dark": "rgb(255 255 255)",
        "secondary-text-dark": "rgb(255 255 255 / 0.5)",
      },
      backgroundImage: {
        'gradient-primary': "linear-gradient(to right, rgb(59 130 246), rgb(239 68 68))",
      }
    },
  },
  plugins: [],
};

export default config;
