import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        azul: "#161d34",
        vermelho: "#c32e58",
        branco: "#eeeeee",
        azulClaro: "#0dcaf0",
        primeiroPlano: "#0f0f0f",
        secundario: "#272727",
        textPrimario: "#919191",
      },
    },
  },
  plugins: [],
};
export default config;
