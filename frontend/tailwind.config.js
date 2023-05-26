/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'h1':"'Montserrat', sans-serif",
        'h2':"'Montserrat', sans-serif",
        'a':"'Ubuntu', sans-serif",
        'p':"'Ubuntu', sans-serif",
        'label':"'Ubuntu', sans-serif",
        'strong':"'Ubuntu', sans-serif",
        'i':"'Ubuntu', sans-serif",
        'span':"'Ubuntu', sans-serif"
      },
      colors: {
        'jet':'#333333',
        'eminence':'#643173',
        'royalPurple':'#7D5BA6',
        'cambridgeBlue':'#86A59C',
        'celadon':'#89CE94'
      }
    },
  },
  plugins: [],
}
