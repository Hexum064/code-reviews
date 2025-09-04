/// <reference types="vite/client" />
/// <reference types="vite/types/importMeta.d.ts" />

// If you want to use default imports (e.g., `import Logo from './logo.svg'`)
// and treat them as React components, you might also add:
declare module '*.svg?rc' {
    import React = require('react');
    export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement & { title?: string }>>;
    const src: string;
    export default src;
}

declare module '*.svg?import' {
    const content: string;
    export default content;
}
