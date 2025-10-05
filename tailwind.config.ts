import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/component/**/*.{js,ts,jsx,tsx,mdx}',
    './src/container/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      spacing: {
        '0.75': '3px',
        '1.25': '5px',
        '2.5': '10px',
        '3.75': '15px',
        '5.25': '21px',
        '6.25': '25px',
        '12.5': '50px',
        '15': '60px',
        '17.5': '70px',
        '25': '100px',
        '30': '120px',
        '36': '144px',
        '43.75': '175px',
        '50': '200px',
        '75': '300px',
        '82.5': '330px',
        '87.5': '350px',
        '88': '352px',
        '94': '376px',
        '100': '400px',
        '108': '432px',
        '120': '480px',
        '135': '540px',
        '168': '672px',
      },
      maxWidth: {
        '95': '380px',
      },
    },
  },
  plugins: [],
}
export default config
