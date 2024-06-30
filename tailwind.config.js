/** @type {import('tailwindcss').Config} */
export default {
    content: [
		"./resources/views/**/*.blade.php",
    	"./resources/js/**/*.{js,ts,jsx,tsx}",
	],
    theme: {
        extend:{
            colors:{
                primary: "#44C7F4",
            },
            keyframes: {
                dotEllipse1: {
                    '0%': {transform: 'scale(0)'},
                    '100%': {transform: 'scale(1)'},
                },
                dotEllipse2: {
                    '0%': {transform: 'translate(0,0)'},
                    '100%': {transform: 'translate(14px, 0)'},
                },
                dotEllipse3: {
                    '0%': {transform: 'scale(1)'},
                    '100%': {transform: 'scale(0)'},
                },
            },
        }
    },
    plugins: [],
}

