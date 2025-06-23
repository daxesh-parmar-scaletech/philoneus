import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    optimizeDeps: {
        exclude: ['lucide-react'],
    },
    server: {
        host: true,
        port: 4001,
    },
    resolve: {
        alias: {
            shared: path.resolve(__dirname, 'src/shared'),
            hooks: path.resolve(__dirname, 'src/hooks'),
            contexts: path.resolve(__dirname, 'src/contexts'),
        },
    },
});
