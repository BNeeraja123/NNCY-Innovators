/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4CAF50',
        secondary: '#FF9800',
        background: '#F5F5F5',
        card: '#FFFFFF',
        // Event Management Festival Colors
        festival: {
          orange: '#FFA500',
          blue: '#00BFFF',
          tangerine: '#FF8200',
          magenta: '#FF00FF',
          green: '#00FF40',
        },
        event: {
          technical: '#8B5CF6', // Purple
          cultural: '#FF8200',  // Orange
          sports: '#00FF40',    // Green
          academic: '#00BFFF',  // Blue
          workshop: '#F59E0B',  // Amber
          social: '#FF00FF',    // Magenta
        },
      },
    },
  },
  plugins: [],
}
