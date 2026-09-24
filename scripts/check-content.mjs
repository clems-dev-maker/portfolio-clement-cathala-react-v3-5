import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const required = [
  "src/main.jsx",
  "src/styles.css",
  "public/cv/CV_Clement_Cathala_Developpeur_FullStack_2026.pdf",
  "public/projects/ecommerce/home.webp",
  "public/projects/ecommerce/detail.webp",
  "public/projects/ecommerce/cart.webp",
  "public/projects/weather/home.webp",
  "public/projects/weather/forecast.webp",
  "public/projects/weather/favorites.webp",
  "public/projects/portfolio/dashboard.webp",
  "public/projects/portfolio/excel.webp",
  "public/projects/portfolio/pdf.webp"
];
const failures = [];
for (const relative of required) {
  if (!fs.existsSync(path.join(root, relative))) failures.push(`Ressource du portfolio manquante : ${relative}`);
}
const source = fs.readFileSync(path.join(root, "src/main.jsx"), "utf8");
for (const marker of ["case-study", "projectFilter", "portfolio-theme", "clementcathala430@gmail.com", "https://github.com/clems-dev-maker"]) {
  if (!source.includes(marker)) failures.push(`Élément attendu absent du code : ${marker}`);
}
if (failures.length) {
  console.error("❌ Contrôle contenu V3.5 échoué :");
  failures.forEach(item => console.error(`- ${item}`));
  process.exit(1);
}
console.log("✅ Contrôle contenu V3.5 réussi.");
