import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      zIndex: {
        '1': '1',
      },
      transitionTimingFunction: {
        'swiper': 'var(--swiper-wrapper-transition-timing-function, initial)', 
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [
    function ({ addUtilities }:any) {
      const newUtilities = {
        '.box-content': {
          'box-sizing': 'content-box',
        },
        '.transition-timing-swiper': {
          'transition-timing-function': 'var(--swiper-wrapper-transition-timing-function, initial)',
        },
      };
      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],
} satisfies Config;
