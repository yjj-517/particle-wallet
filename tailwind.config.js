/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{html,jsx,js,ts,tsx}"],
	theme: {
		// fontFamily
		fontFamily: {
			primary: "var(--sm-font-family-1)",
			arial: "var(--sm-font-family-2)",
		},
		// screens
		screens: {
			sm: "480px",
			md: "768px",
			lg: "976px",
			xl: "1440px",
		},
		extend: {
			// 关键帧
			keyframes: {},
			// 动画
			animation: {
				"spin-slow-1": "spin 1s linear infinite",
				"spin-slow-5": "spin 5s linear infinite",
			},
			// 颜色
			colors: {
				primary: "#87cd00", //主色
				regular: "", //常规色
				secondary: "#00b4cd", //次要色
				disabled: "#ff99ff", //禁用色
				// background-color
				bgcolor: {
					100: "#060e1b",
					200: "#18182c",
					300: "#0D1442",
					400: "#1F293E",
				},
				// text-color
				text: {
					100: "#cccccc",
					200: "#999999",
				},
			},
		},
	},
	plugins: [],
};
