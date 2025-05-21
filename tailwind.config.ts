import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        white: '#FFFFFF',
        slate: {
          dark: '#111827',
          medium: '#667085',
        },
        blue: {
          vibrant: '#0344dc',
          light: 'rgba(232, 247, 255, 0.57)',
        },
        amber: {
          vibrant: '#f65009',
        },
        red: {
          error: '#f04438',
        },
        background: '#f9f8f7',
        border: {
          light: '#fddcce',
        },
      },
      borderWidth: {
        '3': '3px',
      },
    },
  },
  plugins: [],
};

export default config;
