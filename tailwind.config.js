module.exports = {
  purge: [
    './src/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html'
  ],
  darkMode: false,
  theme: {
    extend: {
      transitionProperty: {
        'height': 'height',
        'width': 'width',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
