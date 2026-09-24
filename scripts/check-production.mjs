import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const required = [
  "package.json",
  "vite.config.js",
  "vercel.json",
  "public/404.html",
  "public/robots.txt",
  "public/.well-known/security.txt",
  "public/site.webmanifest",
  "public/og-cover.png",
  "public/cv/CV_Clement_Cathala_Developpeur_FullStack_2026.pdf",
  ".github/workflows/ci.yml"
];

const failures = [];
const warnings = [];

for (const relative of required) {
  if (!fs.existsSync(path.join(root, relative))) {
    failures.push(`Fichier de production manquant : ${relative}`);
  }
}

const pkg = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"));
if (pkg.version !== "3.5.0") {
  failures.push(`Version package.json inattendue : ${pkg.version}`);
}

const env = process.env.VITE_SITE_URL?.trim();
if (env) {
  try {
    const url = new URL(env);
    if (!["https:", "http:"].includes(url.protocol)) failures.push("VITE_SITE_URL doit utiliser http:// ou https://.");
    if (url.pathname !== "/" && url.pathname !== "") warnings.push("VITE_SITE_URL contient un chemin ; le portfolio attend normalement une origine.");
  } catch {
    failures.push("VITE_SITE_URL n'est pas une URL valide.");
  }
} else {
  warnings.push("VITE_SITE_URL non défini : le projet reste volontairement sans URL publique absolue.");
}

const vercel = fs.readFileSync(path.join(root, "vercel.json"), "utf8");
for (const header of ["X-Content-Type-Options", "Referrer-Policy", "X-Frame-Options", "Strict-Transport-Security", "Content-Security-Policy"]) {
  if (!vercel.includes(header)) failures.push(`En-tête de sécurité absent de vercel.json : ${header}`);
}

const gitignore = fs.readFileSync(path.join(root, ".gitignore"), "utf8");
for (const secretPattern of [".env", ".env.*", "!.env.example"]) {
  if (!gitignore.includes(secretPattern)) failures.push(`Protection environnementale absente de .gitignore : ${secretPattern}`);
}

if (failures.length) {
  console.error("❌ Contrôle production échoué :");
  failures.forEach((x) => console.error(`- ${x}`));
  process.exit(1);
}

console.log("✅ Contrôle production V3.5 réussi.");
warnings.forEach((x) => console.log(`ℹ️ ${x}`));
