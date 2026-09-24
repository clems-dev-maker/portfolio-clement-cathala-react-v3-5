# V3.5 Production — Release Notes

## Statut

**Release candidate production préparée.**

La V3.5 validée visuellement est conservée. Cette édition prépare la publication sans inventer d'URL publique tant que le domaine final n'est pas choisi.

## Contrôles effectués dans l'environnement de génération

- `node scripts/check-production.mjs` → OK
- `node scripts/check-content.mjs` → OK
- syntaxe JavaScript des scripts de contrôle → OK
- `vercel.json` → JSON valide
- hash CSP du bloc JSON-LD vérifié → OK

Le build Vite complet n'a pas été relancé ici car les dépendances npm ne sont pas disponibles dans l'environnement d'exécution. Le build final doit donc être exécuté dans ton environnement local ou par Vercel/GitHub Actions après installation des dépendances.

## Modifications production

- correction du workflow GitHub Actions : le contrôle production est maintenant réellement exécuté ;
- workflow CI simplifié pour ne pas dépendre d'un `package-lock.json` absent du package V3.5 ;
- vérification CSP alignée avec le contenu JSON-LD actuel ;
- ajout de `X-DNS-Prefetch-Control` ;
- documentation de publication actualisée ;
- aucune URL fictive ajoutée.

## Publication Vercel

1. Pousser le projet sur GitHub.
2. Importer le dépôt dans Vercel.
3. Laisser Vercel détecter Vite.
4. Ajouter `VITE_SITE_URL` avec l'URL publique réelle lorsque celle-ci est connue.
5. Redéployer.
6. Vérifier `robots.txt`, `sitemap.xml`, le canonical et les métadonnées Open Graph.
7. Tester le site public sur desktop et mobile.
8. Lancer Lighthouse sur l'URL publique.

## Important

Tant que le domaine n'est pas choisi, `VITE_SITE_URL` doit rester vide. Il ne faut pas remplacer cette valeur par une URL d'exemple.
