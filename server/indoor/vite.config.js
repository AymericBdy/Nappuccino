// vite.config.js
import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        target: 'esnext',
        rollupOptions: {
            input: {
                main: resolve(__dirname, "example/simple-map-2.html")
            },
        },
    }
});
