/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#0F4C81',
          secondary: '#2ECC71',
          accent: '#F39C12'
        }
      },
      boxShadow: {
        soft: '0 24px 80px rgba(15, 76, 129, 0.12)',
        floating: '0 30px 80px rgba(15, 76, 129, 0.08)'
      },
      borderRadius: {
        '4xl': '2rem'
      },
      backgroundImage: {
        'brand-gradient': 'radial-gradient(circle at top left, rgba(46, 204, 113, 0.18), transparent 28%), radial-gradient(circle at top right, rgba(243, 156, 18, 0.18), transparent 22%), linear-gradient(180deg, rgba(15, 76, 129, 0.08), rgba(255, 255, 255, 0.86))'
      }
    }
  },
  plugins: []
}
