/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./index.html',
		'./src/**/*.{js,ts,jsx,tsx}',
		'./node_modules/react-tailwindcss-datepicker/dist/index.esm.js',
	],
	theme: {
		extend: {
			colors: {
				// Green Tones
				'deep-forest': '#0C221F',
				evergreen: '#142E2B',
				'deep-teal': '#1A3835',
				'hunter-green': '#232F2D',
				'moss-green': '#43A57C',
				'sage-green': '#7BB99F',
				'spring-fern': '#32C653',
				'pale-jade': '#B3DFC9',
				'frosty-lagoon': '#EFF8F7',
				'seafoam-green': '#E6F2ED',

				//Blue Tones
				'dark-indigo': '#272934',
				'midnight-steel': '#404B57',
				'slate-mist': '#6C6D75',
				'steel-blue': '#242834',
				'nightfall-navy': '#505475',
				'blue-grey': '#788489',
				'blue-ash': '#A5B2B7',
				'inky-twilight': '#1D2138',
				'luminous-azure': '#3973F8',
				'cerulean-breeze': '#3491FA',
				'winter-mint': '#E9F3F2',

				// Grey Tones
				'midnight-grey': '#292929',
				'shadow-slate': '#3F3F3F',
				'charcoal-grey': '#57585F',
				'whispering-gray': '#9EA1B0',
				'silver-mist': '#CECECE',
				'light-silver': '#D9D9D9',
				'ashen-grey': '#DFE3E1',
				'pale-silver': '#F1F1F1',

				// Purple Tones
				'mystic-amethyst': '#9D5FF3',
				'misty-lavender': '#B1B5CA',
				'misty-moonstone': '#CACCD2',
				'silvery-sky': '#C3C8CD',
				'opal-mist': '#EBF4F1',
				'frosty-mint': '#EBF5F1',
				'cloudy-pearl': '#F5F6FB',

				// White Tones
				'frost-white': '#FCFDFC',
				'aqua-haze': '#F5FFFA',

				// Orange Tones
				'spicy-apricot': '#FF9F5A',
				'golden-tangerine': '#FFB341',

				// Red Tones
				'crimson-blaze': '#FF4D4F',
			},
			fontFamily: {
				'inter-regular': ['InterRegular', 'sans-serif'],
				'inter-medium': ['InterMedium', 'sans-serif'],
				'inter-semi-bold': ['InterSemiBold', 'sans-serif'],
				'inter-bold': ['InterBold', 'sans-serif'],
				'gilroy-regular': ['GilroyRegular', 'sans-serif'],
				'gilroy-medium': ['GilroyMedium', 'sans-serif'],
				'gilroy-semi-bold': ['GilroySemiBold', 'sans-serif'],
				'gilroy-bold': ['GilroyBold', 'sans-serif'],
				'helvetica-neue-regular': ['HelveticaNeueRegular', 'sans-serif'],
				'helvetica-neue-medium': ['HelveticaNeueMedium', 'sans-serif'],
				'helvetica-neue-bold': ['HelveticaNeueBold', 'sans-serif'],
				'opensans-regular': ['OpenSansRegular', 'sans-serif'],
				'opensans-medium': ['OpenSansMedium', 'sans-serif'],
				'opensans-semi-bold': ['OpenSansSemiBold', 'sans-serif'],
				'opensans-bold': ['OpenSansBold', 'sans-serif'],
			},
		},
	},
	plugins: [require('@tailwindcss/forms'), require('tailwind-scrollbar')({ nocompatible: true })],
};
