// Static asset paths (next/image with unoptimized: true, metadata icons, raw
// hrefs) don't get GitHub Pages' "/profolio-website" sub-path prefix applied
// automatically the way next/link and next/script do. Prepend this to any
// root-relative public asset path used as a plain string. Must match the
// repoName in next.config.mjs.
export const basePath = process.env.NODE_ENV === "production" ? "/profolio-website" : "";
