import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2885FF',
        primaryHover: '#65A8FF',
        secondary: '#FFA527',
        secondaryHover: '#FFBE64',
        tertiary: '#AE9B88',
        tertiary2: '#D2E8FF',
        tertiary3: '#7B7B7B',
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
} satisfies Config;
