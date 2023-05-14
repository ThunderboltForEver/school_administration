/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            boxShadow: {
                shadowBlue: "0 0 0 1px rgb(59, 130, 246)",
            },
            gridTemplateColumns: {
                mainGrid: "220px 1fr",
                boxesGrid: "repeat(4,minmax(200px,1fr))",
            },
            keyframes: {
                fadeout: {
                    "0%": { opacity: 1 },
                    "100% ": { opacity: 0 },
                },
            },
            animation: {
                fadeout: "fadeout 1.5s ease-in-out infinite",
            },
            colors: {
                mainBlue: "var(--primary-blue)",
                mainGray: "var(--primary-gray)",
                secondaryGray: "var(--secondary-gray)",
                mainWhite: "var(--primary-white)",
            },
        },
    },

    plugins: [],
};
