import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-manrope)", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ['var(--font-instrument-serif)', "ui-serif", "Georgia", "serif"],
      },
      colors: {
        cream: "#FAF7F2",
        coral: {
          DEFAULT: "#E85D4A",
          soft: "#FBE2DC",
          deep: "#C8442F",
        },
        apricot: "#F5B07B",
        sage: "#B9C9A7",
        butter: "#F5DC8E",
        plum: "#8B6F8F",
      },
    },
  },
  plugins: [],
};
export default config;
