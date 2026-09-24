# Portfolio Clément Cathala — React / Vite

> **Version 3.5.0 — Recruiter Edition / Production Ready**

Portfolio professionnel de **Clément Cathala**, développeur web / full-stack en formation, orienté **Python, Django, React et React Native**.

## Objectif de la V3.5

La V3.5 conserve l'identité visuelle et les fonctionnalités validées de la V3.4 et renforce surtout la lisibilité pour un recruteur :

- études de projets plus explicites ;
- galerie de captures et lightbox clavier ;
- section **Savoir-faire** qui traduit la stack en capacités concrètes ;
- informations projet immédiatement scannables ;
- CV intégré ;
- SEO et sécurité déjà préparés pour le déploiement ;
- contrôles automatisés du build, du contenu et de la configuration de production ;
- aucune URL publique inventée tant que `VITE_SITE_URL` n'est pas défini.

## Projets présentés

### E-Commerce Django

Python, Django, Bootstrap, JavaScript/AJAX, Stripe.

### WeatherApp

React Native, Expo, TypeScript, Axios, OpenWeatherMap, AsyncStorage.

### Portfolio Intelligence v2.6

Python, PySide6, analyse de portefeuille, reporting Excel/PDF.

Les descriptions, fonctionnalités et captures sont alignées sur les projets présentés dans les dépôts GitHub associés.

## Installation

```bash
npm install
npm run dev
```

## Contrôles

```bash
npm run build
npm run check:build
npm run check:seo
npm run check:production
npm run check:content
```

Ou en une seule commande :

```bash
npm run check:all
```

### URL de production

Aucune URL n'est supposée par défaut.

Pour une publication réelle :

```bash
VITE_SITE_URL=https://votre-vraie-url.example npm run check:all
```

Sous PowerShell :

```powershell
$env:VITE_SITE_URL="https://votre-vraie-url.example"; npm run check:all
```

Remplacer l'exemple uniquement par l'URL réellement choisie.

## Déploiement

Le projet est préparé pour une mise en production Vercel avec :

- `vercel.json` ;
- en-têtes de sécurité ;
- cache des assets ;
- `robots.txt` ;
- `sitemap.xml` généré uniquement avec une URL réelle ;
- canonical et métadonnées Open Graph générés conditionnellement ;
- workflow GitHub Actions avec contrôle automatique du build, du SEO, du contenu et de la configuration production.

Consulter `DEPLOYMENT_GUIDE_V3.5.md` et `DEPLOYMENT_CHECKLIST.md` avant la publication. La seule donnée restant à renseigner est l'URL publique réelle (`VITE_SITE_URL`) une fois le domaine choisi.

## Structure

```text
portfolio-clement-cathala-react-v3-5/
├── .github/workflows/ci.yml
├── public/
│   ├── .well-known/security.txt
│   ├── cv/
│   ├── projects/
│   ├── 404.html
│   ├── favicon.svg
│   ├── og-cover.png
│   ├── robots.txt
│   └── site.webmanifest
├── scripts/
│   ├── check-content.mjs
│   ├── check-production.mjs
│   ├── check-seo.mjs
│   └── verify-build.mjs
├── src/
│   ├── main.jsx
│   └── styles.css
├── index.html
├── package.json
├── vercel.json
└── vite.config.js
```

## Technologies

- React 18
- Vite 5
- JavaScript / JSX
- CSS moderne
- Git / GitHub
- Vercel-ready

## Licence

Portfolio personnel de Clément Cathala.
