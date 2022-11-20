import babel from "vite-plugin-babel";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        babel({
            babelConfig: {
                babelrc: false,
                configFile: false,
                plugins: ["macros"],
            },
        }),
    ],
    define: {
        "process.env": {},
    },
});
