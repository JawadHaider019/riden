/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                audiowide: ["Audiowide", "sans-serif"],
                dmsans: ["DM Sans", "sans-serif"],
            },
        },
    },
    plugins: [],
}