const { createGlobPatternsForDependencies } = require("@nx/angular/tailwind");
const {join} = require("path");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './apps/**/*.html',
    './apps/**/*.tsx',
    './apps/**/*.ts',
    './libs/**/*.html',
    './libs/**/*.tsx',
    './libs/**/*.ts',
  ],
  theme: {
    extend: {
      colors: {
        background: {
          light: '#FCEEF0',  // Approximate lighter shade
          DEFAULT: '#FBEAEC',
          dark: '#E0B4B7',   // Approximate darker shade
        },
        primary: {
          light: '#1F8068',  // Approximate lighter shade
          DEFAULT: '#12594E',
          dark: '#0B4038',   // Approximate darker shade
        },
        secondary: {
          light: '#F5CAD0',  // Approximate lighter shade
          DEFAULT: '#F1BBC3',
          dark: '#DB8F99',   // Approximate darker shade
        },
        accent: {
          light: '#4DCBB9',  // Approximate lighter shade
          DEFAULT: '#26BAA4',
          dark: '#1A907D',   // Approximate darker shade
        },
        text: "#030d16",
        body: "#edf3fb",
        navbar: {
          bg: {
            100: "#1c4263",
            200: "#03294a",
            gradient: "linear-gradient(1deg, #03294,transparent)",
          },
          menuitems: "white",
          menuitemsHover: "#7dabcc"
        },
      }
    },
  },
  plugins: [],
}

