import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
  		xs: '450px',
  		sm: '640px',
  		md: '768px',
  		lg: '1024px',
  		xl: '1280px',
  		'2xl': '1536px'
  	},
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: '#363942',
        dark: '#121212',
        accent1: '#C95701',
        accent2: '#F8DB7D',
        light: '#F1F4FE',
        'light-dark': '#E0E3EC',
        'logo-red': '#9F1F00',
        'logo-yellow': '#FCC172',
      },
      fontFamily: {
  			inter: 'var(--font-inter)',
        montserrat: 'var(--font-montserrat)'
  		},
    },
    plugins: [
      require('@tailwindcss/typography'),
    ],
  }
}
export default config;
