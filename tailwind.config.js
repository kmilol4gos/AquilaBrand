/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		colors: {
			bgColor: "#402039",
			mainColor: "#5c164e",
			transparent: "transparent",
			black: "#170f11",
			white: "#e2fcef",
		},
		extend: {
			dropShadow: {
				aq: "4px 4px 5px rgba(0, 0, 0, 0.5)",
			},
		},
	},
	plugins: [],
};
