import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "light-100": "hsl(0, 0%, 97%)",
        "light-200": "hsl(0, 0%, 90%)",
        "light-300": "hsl(0, 0%, 85%)",
        "dark-500": "hsl(0, 0%, 40%)",
        "dark-700": "hsl(0, 0%, 30%)",
        "dark-900": "hsl(0, 0%, 10%)",
      },
      spacing: {
        "18": "72px",
        "30": "120px",
        "125": "500px",
      },
      fontSize: {
        caption: ["12px", { lineHeight: "16px" }],
        body: ["14px", { lineHeight: "20px" }],
        "heading-3": ["20px", { lineHeight: "28px", fontWeight: "600" }],
      },
    },
  },
  plugins: [],
};

export default config;
