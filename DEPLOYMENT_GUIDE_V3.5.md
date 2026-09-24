# Guide de déploiement — Portfolio Clément Cathala V3.5

## 1. Vérifier localement

```bash
npm install
npm run check:all
```

Le contrôle doit être vert avant publication.

## 2. Tester visuellement

```bash
npm run dev
```

Tester au minimum :

- navigation desktop et mobile ;
- thème clair / sombre ;
- filtres des projets ;
- ouverture des études de projets ;
- galerie et navigation clavier ;
- téléchargement et ouverture du CV ;
- liens GitHub et LinkedIn ;
- section Contact.

## 3. Définir l'URL réelle

Ne pas renseigner une URL fictive.

Lorsque le domaine ou l'URL Vercel définitive est connu :

```bash
VITE_SITE_URL=https://URL-REELLE npm run check:all
```

Le build génère alors les éléments dépendant du domaine :

- canonical ;
- `og:url` ;
- URL absolue de l'image Open Graph ;
- `sitemap.xml` ;
- référence du sitemap dans `robots.txt`.

## 4. Déploiement Vercel

Importer le dépôt GitHub dans Vercel et conserver les paramètres Vite par défaut si Vercel les détecte correctement.

Définir `VITE_SITE_URL` dans les variables d'environnement avec l'URL réellement utilisée.

Après le premier déploiement :

```bash
npm run build
```

puis vérifier la version publique.

## 5. Contrôles après publication

- ouvrir le portfolio en navigation privée ;
- tester mobile et desktop ;
- tester HTTPS ;
- vérifier les liens externes ;
- vérifier le CV ;
- vérifier `robots.txt` et `sitemap.xml` ;
- lancer Lighthouse sur l'URL publique ;
- tester le partage social ;
- vérifier qu'aucune clé ou donnée sensible n'est publiée.

Les scores Lighthouse doivent être mesurés sur le site réellement déployé : ils ne sont pas prédits par le projet.
