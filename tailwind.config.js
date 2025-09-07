/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "var(--color-border)", /* subtle white border */
        input: "var(--color-input)", /* elevated surface color */
        ring: "var(--color-ring)", /* electric blue */
        background: "var(--color-background)", /* rich dark purple-blue */
        foreground: "var(--color-foreground)", /* pure white */
        primary: {
          DEFAULT: "var(--color-primary)", /* electric blue */
          foreground: "var(--color-primary-foreground)", /* pure white */
        },
        secondary: {
          DEFAULT: "var(--color-secondary)", /* deep navy */
          foreground: "var(--color-secondary-foreground)", /* pure white */
        },
        destructive: {
          DEFAULT: "var(--color-destructive)", /* bright coral-red */
          foreground: "var(--color-destructive-foreground)", /* pure white */
        },
        muted: {
          DEFAULT: "var(--color-muted)", /* deep navy */
          foreground: "var(--color-muted-foreground)", /* soft gray */
        },
        accent: {
          DEFAULT: "var(--color-accent)", /* bright cyan */
          foreground: "var(--color-accent-foreground)", /* rich dark purple-blue */
        },
        popover: {
          DEFAULT: "var(--color-popover)", /* elevated surface color */
          foreground: "var(--color-popover-foreground)", /* pure white */
        },
        card: {
          DEFAULT: "var(--color-card)", /* elevated surface color */
          foreground: "var(--color-card-foreground)", /* pure white */
        },
        success: {
          DEFAULT: "var(--color-success)", /* vibrant green */
          foreground: "var(--color-success-foreground)", /* rich dark purple-blue */
        },
        warning: {
          DEFAULT: "var(--color-warning)", /* warm amber */
          foreground: "var(--color-warning-foreground)", /* rich dark purple-blue */
        },
        error: {
          DEFAULT: "var(--color-error)", /* bright coral-red */
          foreground: "var(--color-error-foreground)", /* pure white */
        },
        surface: {
          DEFAULT: "var(--color-surface)", /* elevated surface color */
          foreground: "var(--color-surface-foreground)", /* pure white */
        },
        "text-primary": "var(--color-text-primary)", /* pure white */
        "text-secondary": "var(--color-text-secondary)", /* soft gray */
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        heading: ['Inter', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        caption: ['JetBrains Mono', 'monospace'],
        data: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
      },
      boxShadow: {
        'neo': '0 2px 8px rgba(0, 102, 255, 0.3), 0 8px 32px rgba(0, 0, 0, 0.4)',
        'neo-lg': '0 4px 20px rgba(0, 102, 255, 0.3), 0 16px 64px rgba(0, 0, 0, 0.4)',
        'glow-primary': '0 0 20px rgba(0, 102, 255, 0.3)',
        'glow-accent': '0 0 20px rgba(0, 255, 255, 0.3)',
        'glow-success': '0 0 20px rgba(0, 255, 136, 0.3)',
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-neon": "pulse-neon 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "fade-in": "fade-in 0.3s ease-out",
        "slide-in": "slide-in 0.3s ease-out",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "pulse-neon": {
          "0%, 100%": {
            boxShadow: "0 0 20px rgba(0, 102, 255, 0.3)",
          },
          "50%": {
            boxShadow: "0 0 30px rgba(0, 102, 255, 0.5)",
          },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "slide-in": {
          from: { transform: "translateY(-10px)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
      },
      backdropBlur: {
        'xs': '2px',
        'sm': '4px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
        '2xl': '40px',
        '3xl': '64px',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
        '1000': '1000',
        '1050': '1050',
        '1100': '1100',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
}