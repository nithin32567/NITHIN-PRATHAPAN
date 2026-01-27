import type { Config } from "tailwindcss";

const config: Config = {
    content: ["./src/**/*.{ts,tsx}"],
    theme: {
        extend: {
            colors: {
                bg: "var(--bg-color)",
                text: "var(--text-color)",
            },
        },
    },
    plugins: [],
};

export default config;
