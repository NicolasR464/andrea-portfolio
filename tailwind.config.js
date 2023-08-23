/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/flowbite-react/**/*.js",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      tablet: "640px",

      laptop: "1024px",

      desktop: "1280px",
    },
    extend: {
      maxWidth: {
        "1-2": "50%",
        "2-3": "66%",
        80: "80vw",
        logo: "20px",
      },
    },
  },
  plugins: [
    require("daisyui"),
    // function ({ addBase }) {
    //   addBase({
    //     body: {
    //       // You can change this to any selector of your choice
    //       scrollbarWidth: "none" /* For Firefox */,
    //       "-ms-overflow-style": "none" /* For Internet Explorer and Edge */,
    //       "&::-webkit-scrollbar": {
    //         display: "none" /* For Chrome, Safari and Opera */,
    //       },
    //     },
    //   });
    // },
  ],
  daisyui: {
    themes: [
      "light",
      "dark",
      "cupcake",
      "bumblebee",
      "emerald",
      "corporate",
      "synthwave",
      "retro",
      "cyberpunk",
      "valentine",
      "halloween",
      "garden",
      "forest",
      "aqua",
      "lofi",
      "pastel",
      "fantasy",
      "wireframe",
      "black",
      "luxury",
      "dracula",
      "cmyk",
      "autumn",
      "business",
      "acid",
      "lemonade",
      "night",
      "coffee",
      "winter",
      ,
      {
        mytheme: {
          neutral: "#f4ebe6",
        },
      },
    ],
  },
};
