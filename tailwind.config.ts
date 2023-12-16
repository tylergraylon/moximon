import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        // mono: ["var(--space_mono)"],
        serrat: ["var(--montserrat)"],
      },
      animation: {
        ringBlinker: 'blinker 1s infinite',
        wheelzSlider: 'slideInList 0.5s 1'
      },
      keyframes: {
        blinker: {
          '0%': {
            borderColor: '#FF00FF'
          },
          '25%': {
            borderColor: '#0000FF'
          },

          '50%': {
            borderColor: '#ef0a1a'
          },

          '75%': {
            borderColor: '#254878'
          },
          '100%': {
            borderColor: '#00FFFF'
          }

        },

        slideInList: {
          '0%': { marginLeft: '-36px', opacity: '0' },
          '100%': { marginLeft: '0', opacity: '1' }
        }

      }
    },
  },
  rippleui: {
    themes: [
      {
        themeName: "light",
        colorScheme: "dark",
        colors: {
          primary: "#573242",
          backgroundPrimary: "#090719",
        },
      },
      {
        themeName: "dark",
        colorScheme: "dark",
        colors: {
          primary: "#573242",
          backgroundPrimary: "#090719",
        },
      },
    ]
  },
  plugins: [require("rippleui")],
}
export default config
