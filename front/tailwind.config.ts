import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      spacing: {
        '112': '28rem', // Añade tu tamaño personalizado aquí
        '144': '36rem', // Añade tu tamaño personalizado aquí
      },
      backgroundColor: {
        'custom-transparent': 'rgba(100, 6, 43, 0.5)',
        'custom-input': 'rgba(245, 199, 2, 0.7)',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        sans: 'var(--font-bebas)',
        mono: 'var(--font-antonio)',
        black: 'var (--font-josefin)'
      },
      keyframes: {
        display: {
          '0%': { transform: 'translateX(200px)', opacity: '0' },
          '10%': { transform: 'translateX(0)', opacity: '1' },
          '20%': { transform: 'translateX(0)', opacity: '1' },
          '30%': { transform: 'translateX(-200px)', opacity: '0' },
          '100%': { transform: 'translateX(-200px)', opacity: '0' },
        },
      },
      animation : {
        display: 'display 16s infinite'
      }
    },
  },
  plugins: [],
};
export default config;