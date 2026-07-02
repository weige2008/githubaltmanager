/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        destructive: {
          DEFAULT: 'var(--destructive)',
          foreground: 'var(--destructive-foreground)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
        },
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
        },
        popover: {
          DEFAULT: 'var(--popover)',
          foreground: 'var(--popover-foreground)',
        },
        success: {
          DEFAULT: 'var(--success)',
          foreground: 'var(--success-foreground)',
        },
        warning: {
          DEFAULT: 'var(--warning)',
          foreground: 'var(--warning-foreground)',
        },
        info: {
          DEFAULT: 'var(--info)',
          foreground: 'var(--info-foreground)',
        },
        neutral: {
          DEFAULT: 'var(--neutral)',
          foreground: 'var(--neutral-foreground)',
        },
        sidebar: {
          DEFAULT: 'var(--sidebar)',
          foreground: 'var(--sidebar-foreground)',
          primary: 'var(--sidebar-primary)',
          'primary-foreground': 'var(--sidebar-primary-foreground)',
          accent: 'var(--sidebar-accent)',
          'accent-foreground': 'var(--sidebar-accent-foreground)',
          border: 'var(--sidebar-border)',
          ring: 'var(--sidebar-ring)',
        },
        chart: {
          1: 'var(--chart-1)',
          2: 'var(--chart-2)',
          3: 'var(--chart-3)',
          4: 'var(--chart-4)',
          5: 'var(--chart-5)',
        },
      },
      borderRadius: {
        '4xl': 'calc(var(--radius) * 2.6)',
        '3xl': 'calc(var(--radius) * 2.2)',
        '2xl': 'calc(var(--radius) * 1.8)',
        xl: 'calc(var(--radius) * 1.4)',
        lg: 'var(--radius)',
        md: 'calc(var(--radius) * 0.8)',
        sm: 'calc(var(--radius) * 0.6)',
      },
      fontFamily: {
        sans: ['"Public Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['"Lora"', '"Source Serif Pro"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', '"Cascadia Code"', 'monospace'],
      },
      fontSize: {
        'xs': ['var(--text-xs, 0.75rem)', { lineHeight: '1rem' }],
        'sm': ['var(--text-sm, 0.875rem)', { lineHeight: '1.25rem' }],
        'base': ['var(--text-base, 1rem)', { lineHeight: '1.5rem' }],
        'lg': ['var(--text-lg, 1.125rem)', { lineHeight: '1.75rem' }],
        'xl': ['var(--text-xl, 1.25rem)', { lineHeight: '1.75rem' }],
        '2xl': ['var(--text-2xl, 1.5rem)', { lineHeight: '2rem' }],
        '3xl': ['var(--text-3xl, 1.875rem)', { lineHeight: '2.25rem' }],
        '4xl': ['var(--text-4xl, 2.25rem)', { lineHeight: '2.5rem' }],
        '5xl': ['var(--text-5xl, 3rem)', { lineHeight: '1' }],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'fade-in-up': 'fadeInUp 0.4s cubic-bezier(0.16,1,0.3,1)',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'accordion-down': 'accordionDown 0.2s ease-out',
        'accordion-up': 'accordionUp 0.2s ease-out',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        fadeInUp: { '0%': { opacity: '0', transform: 'translateY(12px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        slideInRight: { '0%': { opacity: '0', transform: 'translateX(20px)' }, '100%': { opacity: '1', transform: 'translateX(0)' } },
        accordionDown: { from: { height: '0' }, to: { height: 'var(--radix-accordion-content-height)' } },
        accordionUp: { from: { height: 'var(--radix-accordion-content-height)' }, to: { height: '0' } },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
