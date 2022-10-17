/** @type {import('tailwindcss').Config} */

function withOpacityValue(variable) {
  return function(config){
    var opacityValue = config.opacityValue;
    if (opacityValue === undefined) {
      return "rgba(var(" + variable + "))";
    }
    return "rgba(var(" + variable + ")," + opacityValue + ")";
  };
}

module.exports = {
  important: true,
  prefix: 'tw-',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        black: '#000',
        white: '#fff',
        'k-dark-blue': {
          DEFAULT: '#0d47a1',
          50: '#f3f6fa',
          100: '#e7edf6',
          200: '#c3d1e8',
          300: '#9eb5d9',
          400: '#567ebd',
          500: '#0d47a1',
          600: '#0c4091',
          700: '#0a3579',
          800: '#082b61',
          900: '#06234f',
        },

        'k-true-blue': {
          DEFAULT: '#1565c0',
          50: '#f3f7fc',
          100: '#e8f0f9',
          200: '#c5d9ef',
          300: '#a1c1e6',
          400: '#5b93d3',
          500: '#1565c0',
          600: '#135bad',
          700: '#104c90',
          800: '#0d3d73',
          900: '#0a315e',
        },

        'k-teal-blue': {
          DEFAULT: '#71b7dd',
          50: '#f8fbfd',
          100: '#f1f8fc',
          200: '#dcedf7',
          300: '#c6e2f1',
          400: '#9ccde7',
          500: '#71b7dd',
          600: '#66a5c7',
          700: '#5589a6',
          800: '#446e85',
          900: '#375a6c',
        },

        'k-tropical-blue': {
          DEFAULT: '#cadffe',
          50: '#fcfdff',
          100: '#fafcff',
          200: '#f2f7ff',
          300: '#eaf2ff',
          400: '#dae9fe',
          500: '#cadffe',
          600: '#b6c9e5',
          700: '#98a7bf',
          800: '#798698',
          900: '#636d7c',
        },

        'k-sky-blue': {
          DEFAULT: '#f1f7fe',
          50: '#feffff',
          100: '#fefeff',
          200: '#fcfdff',
          300: '#f9fcff',
          400: '#f5f9fe',
          500: '#f1f7fe',
          600: '#d9dee5',
          700: '#b5b9bf',
          800: '#919498',
          900: '#76797c',
        },

        'k-green': {
          DEFAULT: '#4caf50',
          50: '#e8f5e9',
          100: '#c8e6c9',
          200: '#a5d6a7',
          300: '#81c784',
          400: '#66bb6a',
          500: '#4caf50',
          600: '#43a047',
          700: '#388e3c',
          800: '#2e7d32',
          900: '#1b5e20',
        },        

        'k-purple': {
          DEFAULT: '#6C18C9',
          50: '#f6f3f8',
          100: '#eee7f1',
          200: '#d3c4db',
          300: '#b9a0c6',
          400: '#85599b',
          500: '#6C18C9',
          600: '#481065',
          700: '#3c0e54',
          800: '#300b43',
          900: '#270937',
          950: '#73418d'
        },

        'k-red': {
          DEFAULT: '#ff0000',
          50: '#fff2f2',
          100: '#ffe6e6',
          200: '#ffbfbf',
          300: '#ff9999',
          400: '#ff4d4d',
          500: '#ff0000',
          600: '#e60000',
          700: '#bf0000',
          800: '#990000',
          900: '#7d0000',
        },

        'k-orange': {
          DEFAULT: '#ec5d35',
          50: '#fef7f5',
          100: '#fdefeb',
          200: '#fad7cd',
          300: '#f7beae',
          400: '#f28e72',
          500: '#ec5d35',
          600: '#d45430',
          700: '#b14628',
          800: '#8e3820',
          900: '#742e1a',
        },

        'k-amber': {
          DEFAULT: '#e59433',
          50: '#fefaf5',
          100: '#fcf4eb',
          200: '#f9e4cc',
          300: '#f5d4ad',
          400: '#edb470',
          500: '#e59433',
          600: '#ce852e',
          700: '#ac6f26',
          800: '#89591f',
          900: '#704919',
        },

        'k-yellow': {
          DEFAULT: '#f5ff00',
          50: '#fffff2',
          100: '#feffe6',
          200: '#fdffbf',
          300: '#fbff99',
          400: '#f8ff4d',
          500: '#f5ff00',
          600: '#dde600',
          700: '#b8bf00',
          800: '#939900',
          900: '#787d00',
        },

        'k-gray': {
          DEFAULT: '#cccccc',
          50: '#fcfcfc',
          100: '#f5f7f9',
          200: '#f0f0f0',
          300: '#ececec',
          400: '#dbdbdb',
          500: '#cccccc',
          600: '#b8b8b8',
          700: '#999999',
          800: '#7a7a7a',
          900: '#666666',
          950: '#eeeeee'
        },

        brand: withOpacityValue('--theme-color-brand'),
        primary: withOpacityValue('--theme-color-primary'),
        secondary: withOpacityValue('--theme-color-secondary'),
        success: withOpacityValue('--theme-color-success'),
        info: withOpacityValue('--theme-color-info'),
        warning: withOpacityValue('--theme-color-warning'),
        danger: withOpacityValue('--theme-color-danger'),
        light:  withOpacityValue('--theme-color-light'),
        dark: withOpacityValue('--theme-color-dark'),        

        'kipu-dark-blue': '#0D47A1', //Deprecated use k-dark-blue
        'kipu-true-blue': '#1565C0', //Deprecated use k-true-blue
        'kipu-teal-blue': '#71B7DD', //Deprecated use k-teal-blue
        'kipu-sky-blue': '#F1F7FE', //Deprecated use k-sky-blue
        'kipu-light-sky-blue': '#F1F7FE',
        'kipu-purple': '#501270', //Deprecated use k-purple
        'kipu-dark-gray': '#666666', //Deprecated use k-gray-900
        'kipu-gray': '#999999', //Deprecated use k-gray-700
        'kipu-light-gray': '#CCCCCC', //Deprecated use k-gray
        'kipu-sky-gray-one': '#ECECEC', //Deprecated use k-gray-300
        'kipu-sky-gray-two': '#F0F0F0', //Deprecated use k-gray-200
        'kipu-sky-gray-three': '#F5F7F9', //Deprecated use k-gray-100
      },
      spacing: {
        '13': '160px',
        'px-3.25': '3.25px',
        'px-39': '39.63px',
        'px-19': '19px',
        'px-23.6': '23.63px'
      },
      fontFamily: {
        'k-sans': ['Roboto','sans-serif']
      },
      borderRadius: {
        round: '50%'
      },
      translate: {
        'r-1/2': '-50%'
      }
    },
  },
  plugins: [],
}
