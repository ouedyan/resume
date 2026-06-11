/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'inter': ['var(--font-inter)', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        'lft': ['var(--font-inter)', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        'plex': ['IBM Plex Mono', 'monospace'],
      },
      colors: {
        resume: {
          accent: '#43F398',
          text: {
            primary: '#323336',
            secondary: '#707678',
            tertiary: '#A6AAAD'
          },
          background: {
            main: '#e4ebf1',
            card: '#ffffff',
            skill: '#f1f5f7',
          }
        }
      },
      letterSpacing: {
        'widest': '0.07em',
        'section': '1.2px',
        'name': '1.3px',
      },
    },
  },
  plugins: [],
}
