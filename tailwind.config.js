/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/flowbite-react/**/*.js",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        "1-2": "50%",
        "2-3": "66%",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      "cupcake",
      {
        mytheme: {
          neutral: "#f4ebe6",
        },
      },
    ],
  },
};
