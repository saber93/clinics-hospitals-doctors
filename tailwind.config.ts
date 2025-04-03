
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				skin: {
					50: '#f7f8f8',
					100: '#eef0f2',
					200: '#d9dfe5',
					300: '#b8c4d0',
					400: '#92a2b6',
					500: '#738399',
					600: '#5d697d',
					700: '#4c5565',
					800: '#414855',
					900: '#383d47',
					950: '#25282f',
				},
				mint: {
					50: '#f0fdf6',
					100: '#dcfcec',
					200: '#baf5d9',
					300: '#85edc1',
					400: '#31d795',
					500: '#fa5d01',
					600: '#e15500',
					700: '#c04800',
					800: '#9c3a00',
					900: '#7a2e00',
					950: '#441a00',
				},
				rose: {
					50: '#fff1f2',
					100: '#ffe4e6',
					200: '#fecdd3',
					300: '#fda4af',
					400: '#fb7185',
					500: '#f43f5e',
					600: '#e11d48',
					700: '#be123c',
					800: '#9f1239',
					900: '#881337',
					950: '#4c0519',
				},
				sky: {
					50: '#f0f9ff',
					100: '#e0f2fe',
					200: '#bae6fd',
					300: '#7dd3fc',
					400: '#38bdf8',
					500: '#0ea5e9',
					600: '#0284c7',
					700: '#0369a1',
					800: '#075985',
					900: '#0c4a6e',
					950: '#082f49',
				},
				violet: {
					50: '#f5f3ff',
					100: '#ede9fe',
					200: '#ddd6fe',
					300: '#c4b5fd',
					400: '#a78bfa',
					500: '#8b5cf6',
					600: '#7c3aed',
					700: '#6d28d9',
					800: '#5b21b6',
					900: '#4c1d95',
					950: '#2e1065',
				},
				amber: {
					50: '#fffbeb',
					100: '#fef3c7',
					200: '#fde68a',
					300: '#fcd34d',
					400: '#fbbf24',
					500: '#f59e0b',
					600: '#d97706',
					700: '#b45309',
					800: '#92400e',
					900: '#78350f',
					950: '#451a03',
				},
				emerald: {
					50: '#ecfdf5',
					100: '#d1fae5',
					200: '#a7f3d0',
					300: '#6ee7b7',
					400: '#34d399',
					500: '#10b981',
					600: '#059669',
					700: '#047857',
					800: '#065f46',
					900: '#064e3b',
					950: '#022c22',
				},
				pink: {
					50: '#fdf2f8',
					100: '#fce7f3',
					200: '#fbcfe8',
					300: '#f9a8d4',
					400: '#f472b6',
					500: '#ec4899',
					600: '#db2777',
					700: '#be185d',
					800: '#9d174d',
					900: '#831843',
					950: '#500724',
				},
				indigo: {
					50: '#eef2ff',
					100: '#e0e7ff',
					200: '#c7d2fe',
					300: '#a5b4fc',
					400: '#818cf8',
					500: '#6366f1',
					600: '#4f46e5',
					700: '#4338ca',
					800: '#3730a3',
					900: '#312e81',
					950: '#1e1b4b',
				},
				red: {
					50: '#fef2f2',
					100: '#fee2e2',
					200: '#fecaca',
					300: '#fca5a5',
					400: '#f87171',
					500: '#ef4444',
					600: '#dc2626',
					700: '#b91c1c',
					800: '#991b1b',
					900: '#7f1d1d',
					950: '#450a0a',
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				'fade-out': {
					'0%': { opacity: '1' },
					'100%': { opacity: '0' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.3s ease-in-out',
				'fade-out': 'fade-out 0.3s ease-in-out',
			},
			typography: {
				DEFAULT: {
					css: {
						maxWidth: 'none',
					},
				},
			},
		}
	},
	safelist: [
		'text-rose-500',
		'text-sky-500',
		'text-violet-500',
		'text-amber-500',
		'text-emerald-500',
		'text-pink-500',
		'text-indigo-500',
		'text-red-500',
		'border-rose-500',
		'border-sky-500',
		'border-violet-500',
		'border-amber-500',
		'border-emerald-500',
		'border-pink-500',
		'border-indigo-500',
		'border-red-500',
		'bg-rose-50/30',
		'bg-sky-50/30',
		'bg-violet-50/30',
		'bg-amber-50/30',
		'bg-emerald-50/30',
		'bg-pink-50/30',
		'bg-indigo-50/30',
		'bg-red-50/30',
		'hover:bg-rose-500',
		'hover:bg-sky-500',
		'hover:bg-violet-500',
		'hover:bg-amber-500',
		'hover:bg-emerald-500',
		'hover:bg-pink-500',
		'hover:bg-indigo-500',
		'hover:bg-red-500',
		'bg-rose-500/10',
		'bg-sky-500/10',
		'bg-violet-500/10',
		'bg-amber-500/10', 
		'bg-emerald-500/10',
		'bg-pink-500/10',
		'bg-indigo-500/10',
		'bg-red-500/10',
		'border-rose-500/20',
		'border-sky-500/20',
		'border-violet-500/20',
		'border-amber-500/20',
		'border-emerald-500/20',
		'border-pink-500/20',
		'border-indigo-500/20',
		'border-red-500/20',
		'bg-rose-500/20',
		'bg-sky-500/20',
		'bg-violet-500/20',
		'bg-amber-500/20',
		'bg-emerald-500/20',
		'bg-pink-500/20',
		'bg-indigo-500/20',
		'bg-red-500/20',
	],
	plugins: [require("tailwindcss-animate"), require('@tailwindcss/typography')],
} satisfies Config;
