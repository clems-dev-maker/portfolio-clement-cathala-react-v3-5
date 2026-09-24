import fs from "node:fs";
import path from "node:path";

const dist = path.resolve("dist");
const failures = [];
const warnings = [];
const read = (file) => fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "";

const html = read(path.join(dist, "index.html"));
if (!html) failures.push("dist/index.html absent.");
for (const marker of [
  '<html lang="fr">',
  '<meta name="description"',
  '<meta name="viewport"',
  '<meta property="og:title"',
  '<meta name="twitter:card"',
  'application/ld+json',
  '<link rel="icon"',
  '<link rel="manifest"'
]) {
  if (!html.includes(marker)) failures.push(`Métadonnée SEO/accessibilité absente : ${marker}`);
}

if (html.includes("votre-domaine-reel.fr")) failures.push("Domaine d'exemple détecté dans dist/index.html.");

const siteUrl = process.env.VITE_SITE_URL?.trim();
const sitemap = path.join(dist, "sitemap.xml");
const robots = read(path.join(dist, "robots.txt"));
if (siteUrl) {
  if (!fs.existsSync(sitemap)) failures.push("sitemap.xml absent alors que VITE_SITE_URL est défini.");
  if (!robots.includes(`Sitemap: ${siteUrl}/sitemap.xml`)) failures.push("robots.txt ne référence pas le sitemap de production.");
  if (!html.includes(`canonical`)) warnings.push("Canonical absent du HTML de production.");
} else {
  warnings.push("VITE_SITE_URL non défini : contrôle des URLs absolues de production ignoré.");
}

if (failures.length) {
  console.error("❌ Contrôle SEO échoué :");
  failures.forEach(item => console.error(`- ${item}`));
  process.exit(1);
}

console.log("✅ Contrôle SEO réussi.");
warnings.forEach(item => console.log(`ℹ️ ${item}`));
