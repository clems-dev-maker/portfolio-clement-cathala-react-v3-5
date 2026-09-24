import fs from "node:fs";
import path from "node:path";

const dist = path.resolve("dist");
const required = [
  "index.html",
  "robots.txt",
  "404.html",
  "favicon.svg",
  "site.webmanifest",
  "cv/CV_Clement_Cathala_Developpeur_FullStack_2026.pdf"
];

const failures = [];
for (const relative of required) {
  if (!fs.existsSync(path.join(dist, relative))) failures.push(`Fichier manquant : ${relative}`);
}

const htmlPath = path.join(dist, "index.html");
if (fs.existsSync(htmlPath)) {
  const html = fs.readFileSync(htmlPath, "utf8");
  for (const forbidden of ["votre-domaine-reel.fr", "localhost:5173", "127.0.0.1"]) {
    if (html.includes(forbidden)) failures.push(`Valeur de démonstration ou locale détectée dans dist/index.html : ${forbidden}`);
  }
  for (const marker of ["<title>", 'name="description"', 'property="og:title"', 'application/ld+json']) {
    if (!html.includes(marker)) failures.push(`Métadonnée attendue absente de dist/index.html : ${marker}`);
  }
}

const siteUrl = process.env.VITE_SITE_URL?.trim();
if (siteUrl) {
  const sitemap = path.join(dist, "sitemap.xml");
  const robots = path.join(dist, "robots.txt");
  if (!fs.existsSync(sitemap)) failures.push("sitemap.xml absent alors que VITE_SITE_URL est défini.");
  if (!fs.existsSync(robots)) failures.push("robots.txt absent alors que VITE_SITE_URL est défini.");
  if (fs.existsSync(sitemap) && !fs.readFileSync(sitemap, "utf8").includes(siteUrl)) failures.push("sitemap.xml ne référence pas VITE_SITE_URL.");
  if (fs.existsSync(robots) && !fs.readFileSync(robots, "utf8").includes(`${siteUrl}/sitemap.xml`)) failures.push("robots.txt ne référence pas le sitemap de production.");
} else {
  console.log("ℹ️ VITE_SITE_URL non défini : contrôle des URLs de production absolues ignoré.");
}

if (failures.length) {
  console.error("❌ Vérification du build échouée :");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("✅ Build vérifié : fichiers critiques, métadonnées et garde-fous production OK.");
