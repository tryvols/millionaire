import type { Config } from 'tailwindcss';

export const colors = {
  'orange-1': '#FFF3EB',
  'orange-2': '#FFAC70',
  'orange-3': '#FF8B37',
  'orange-4': '#E87928',
  'green-1': '#E6FAEA',
  'green-3': '#47D867',
  'red-1': '#FDEEED',
  'red-3': '#EC6259',
  'grey-1': '#F5F5F7',
  'grey-3': '#D0D0D8',
  'grey-4': '#999999',
  'black-1': '#1C1C21',
  'white-1': '#FFFFFF',
} as const;

const colorsArray = Object.values(colors);
export type Colors = typeof colorsArray[number];

const config: Config = {
  important: true,
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/layouts/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    // Bigger number - more saturated color
    colors,
    screens: {
      sm: '421px',
      // => @media (min-width: 640px) { ... }

      md: '728px',
      // => @media (min-width: 768px) { ... }

      lg: '1024px',
      // => @media (min-width: 1024px) { ... }

      xl: '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      backgroundImage: {
        'game-start-background': `linear-gradient(to bottom right, ${colors['white-1']} 50%, ${colors['orange-1']} 50%)`,
      },
    },
  },
  plugins: [],
};
export default config;
