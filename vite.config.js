import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "node:path";

function normalizeSiteUrl(value) {
  if (!value) return null;
  try {
    const url = new URL(value);
    if (!/^https?:$/.test(url.protocol)) return null;
    return url.origin;
  } catch {
    return null;
  }
}

function productionSeo() {
  return {
    name: "production-seo",
    transformIndexHtml(html) {
      const siteUrl = normalizeSiteUrl(process.env.VITE_SITE_URL);
      if (!siteUrl) return html;

      const canonical = `    <link rel="canonical" href="${siteUrl}/" />`;
      const ogUrl = `    <meta property="og:url" content="${siteUrl}/" />`;
      const ogImage = `    <meta property="og:image:url" content="${siteUrl}/og-cover.png" />`;
      const twitterImage = `    <meta name="twitter:image" content="${siteUrl}/og-cover.png" />`;

      return html
        .replace('    <link rel="manifest" href="/site.webmanifest" />', `    <link rel="manifest" href="/site.webmanifest" />\n${canonical}\n${ogUrl}\n${ogImage}\n${twitterImage}`)
        .replace('"sameAs": [', `"url": "${siteUrl}/",\n        "sameAs": [`);
    },
    closeBundle() {
      const siteUrl = normalizeSiteUrl(process.env.VITE_SITE_URL);
      if (!siteUrl) return;

      const dist = path.resolve("dist");
      fs.writeFileSync(
        path.join(dist, "sitemap.xml"),
        `<?xml version="1.0" encoding="UTF-8"?>\n` +
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
          `  <url><loc>${siteUrl}/</loc></url>\n` +
          `</urlset>\n`,
        "utf8"
      );

      fs.writeFileSync(
        path.join(dist, "robots.txt"),
        `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`,
        "utf8"
      );
    }
  };
}
export default defineConfig({
  plugins: [react(), productionSeo()],
  build: {
    target: "es2020",
    sourcemap: false,
    cssCodeSplit: true,
    reportCompressedSize: true,
    chunkSizeWarningLimit: 500
  }
});
