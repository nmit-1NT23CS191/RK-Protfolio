/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          navy: "#0B1120",
          cyan: "#00E5FF",
          violet: "#8B5CF6",
          green: "#00FF88",
          dark: "#050811",
          card: "rgba(17, 24, 39, 0.7)",
        }
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Orbitron", "sans-serif"],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'float-medium': 'float 5s ease-in-out infinite',
        'float-fast': 'float 3s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-15px) rotate(2deg)' },
        }
      },
      backgroundImage: {
        'cyber-gradient': 'linear-gradient(to bottom, #0B1120, #050811)',
        'text-glow': 'radial-gradient(circle, rgba(0,229,255,0.4) 0%, transparent 70%)',
      }
    },
  },
  plugins: [],
}
