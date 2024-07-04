import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-bg': '#090909',
        'primary': '#FFFFFF',
        'secondary': '#7A7A7A',
        'third-color': '#FF7009',
        'bgColor-secondary': '#FF700933',
      },
    },
  },
  plugins: [],
};
export default config;
