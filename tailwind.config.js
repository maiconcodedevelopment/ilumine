const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./src/**/*.html', './src/**/*.ts'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#FFFFFF',
      snowWhite: '#FCFCFA',
      iceWhite: '#F8F8F8',
      veryLightGray: '#CBCBCB',
      lightGray: '#8B8B8B',
      darkGray: '#484444',
      veryDarkGray: '#383838',
      lightGreen: '#C7E2C0',
      green: '#178A5F',
      orange: '#F15E32',
      yellow: '#FDC42F',
      lightPink: '#EBC1D4',
      pink: '#EE5198',
      veryLightOrange: '#F4F2EF',
      gray: colors.gray
    },
    fontFamily: {
      zerocalcare: ['Zerocalcare-Blockletter', 'Helvetica', 'Arial', 'sans-serif'],
      zerocalcareDouble: ['Zerocalcare-Double-Trouble', 'Helvetica', 'Arial', 'sans-serif'],
      museoLight: ['Museo-Light', 'Helvetica', 'Arial', 'sans-serif'],
      museoRegular: ['Museo-Regular', 'Helvetica', 'Arial', 'sans-serif'],
      museoSemiBold: ['Museo-SemiBold', 'Helvetica', 'Arial', 'sans-serif'],
      museoBold: ['Museo-Bold', 'Helvetica', 'Arial', 'sans-serif'],
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        lg: '1rem',
        xl: '2rem',
      },
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
