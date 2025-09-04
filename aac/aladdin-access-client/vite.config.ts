/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { treatAsCommonjs } from 'vite-plugin-treat-umd-as-commonjs';
import svgr from 'vite-plugin-svgr';
import eslint from 'vite-plugin-eslint';

export default defineConfig({
    test: {
        // Vitest configuration options
        globals: true, // Makes Vitest APIs globally available (optional)
        environment: 'jsdom', // For testing browser-based components
        // ... more options like coverage, setup files, etc.
    },
    plugins: [
        react(),
        treatAsCommonjs(),
        svgr({
            svgrOptions: { exportType: 'named' },
            include: '**/*.svg?rc',
        }),
        {
            name: 'raw-css-as-string',
            enforce: 'pre',
            async resolveId(source, importer) {
                if (source.endsWith('.raw.css') && !source.includes('?raw')) {
                    // rewrite import to append ?raw query
                    const resolved = await this.resolve(source + '?raw', importer, {
                        skipSelf: true,
                    });
                    if (resolved) return resolved.id;
                    return null;
                }
                return null;
            },
        },
        {
            name: 'fix-text-query',
            enforce: 'pre',
            async resolveId(source, importer) {
                if (source.includes('?text')) {
                    let fixed = source.replace('?text', '?raw');
                    const resolved = await this.resolve(fixed, importer, { skipSelf: true });
                    if (resolved) {
                        return resolved.id;
                    }
                    return fixed;
                }
                return null;
            },
        },
        eslint({ emitWarning: true }),
    ],
    server: {
        port: 3000, // Set your desired port here
    },
    // assetsInclude: ['**/*.whl', '**/*.raw.css'],
    resolve: {
        alias: [
            {
                find: /^~(.*)$/,
                replacement: '$1',
            },
        ],
    },
    define: {
        global: 'globalThis',
        __webpack_public_path__: '""',
    },
    // build: {
    //     rollupOptions: {
    //         output: {
    //             assetFileNames: (assetInfo) => {
    //                 if (/pypi\//.test(assetInfo.names[0])) {
    //                     return 'pypi/[name][extname]';
    //                 }
    //                 return 'assets/[name][extname]';
    //             },
    //         },
    //         external: ['buffer/'],
    //     },
    // },
    optimizeDeps: {
        esbuildOptions: {
            loader: {
                '.whl': 'text',
            },
        },
    },
});
