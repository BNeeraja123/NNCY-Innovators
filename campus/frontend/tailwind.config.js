/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#FF6A00',
        'primary-dark': '#E65A00',
        'primary-light': '#FF9A4D',
        'secondary': '#FFB74D',
        'background': '#FFFFFF',
        'card': '#FFFFFF',
        // Backwards-compatible festival aliases mapped to brand colors
        'festival-orange': '#FF6A00',
        'festival-magenta': '#E65A00',
        'festival-blue': '#FF9A4D',
        'festival-cyan': '#FF9A4D',
        'festival-tangerine': '#FF9A4D',
        // Event Management Festival Colors
        festival: {
          orange: '#FFA500',
          blue: '#00BFFF',
          tangerine: '#FF8200',
          magenta: '#FF00FF',
          green: '#00FF40',
        },
        event: {
          technical: '#8B5CF6',
          cultural: '#FF8200',
          sports: '#00FF40',
          academic: '#00BFFF',
          workshop: '#F59E0B',
          social: '#FF00FF',
        },
      },
    },
  },
  plugins: [],
}
