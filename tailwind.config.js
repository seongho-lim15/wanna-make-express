/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      sans: ['Pretendard', 'Sans-serif'],
    },
    extend: {
      screens: {
        md: '1000px',
      },
      letterSpacing: {
        'tighter-2': '-2%',
      },
      flex: {
        2: '2',
        3: '3',
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        purple: '#7b60ff',
        primary: '#7b60ff',
        secondary: '#f6f2ff',
        'font-black': '#1d1d1d',
        'font-grey': '#999999',
        'font-grey-light': '#c7c8c9',
        alert: '#cf2200',
        'ui-icon': '#24292e',
        'ui-stroke': '#d6d8db',
        'ui-line': '#eeeeee',
        'ui-bg': '#f5f5f5',
        'ui-bg-light': '#fffff',
      },
      fontSize: {
        title1: '32px',
        title2: '28px',
        title3: '24px',
        title4: '20px',
        title5: '18px',
        body: '16px',
        description: '14px',
      },
      fontWeight: {
        title1: '700',
        title2: '700',
        title3: '700',
        title4: '700',
        title5: '700',
        body: '500',
        description: '400',
      },
      textColor: {
        title1: 'var(--font-black)',
        title2: 'var(--font-black)',
        title3: 'var(--font-black)',
        title4: 'var(--font-black)',
        title5: 'var(--font-black)',
        body: 'var(--font-black)',
        description: 'var(--font-black)',
      },
      keyframes: {
        dropdown: {
          '0%': {
            opacity: '0',
            transform: 'scale(0.95) translateY(-10px)',
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1) translateY(0)',
          },
        },
        'slide-in': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        dropdown: 'dropdown 0.2s ease-out',
        'slide-in': 'slide-in 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        fadeIn: 'fadeIn 0.5s ease-in',
        'slide-up': 'slide-up 0.3s ease-out',
        'fade-in': 'fadeIn 0.2s ease-in-out',
      },
    },
  },
  plugins: [],
};
