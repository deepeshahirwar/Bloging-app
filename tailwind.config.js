export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0F62FE", // IBM Blue
        secondary: "#161616", // IBM Dark Gray
        accent: "#FF6B6B", // Accent color
        background: "#F4F4F4", // Light background
        text: "#161616", // Dark text
        link: "#0F62FE", // Link color
      },
      fontFamily: {
        sans: ['IBM Plex Sans', 'sans-serif'], // IBM Font
        serif: ['IBM Plex Serif', 'serif'],
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        'xl': '1rem',
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
    },
  },
  plugins: [],
}