# Checklist de publication V3.5 Production

## Avant publication

- [ ] `npm install`
- [ ] Vérifier Node.js 20+
- [ ] `npm run build`
- [ ] `npm run check:build`
- [ ] `npm run check:seo`
- [ ] `npm run check:production`
- [ ] Tester navigation desktop
- [ ] Tester menu mobile
- [ ] Tester clair / sombre
- [ ] Tester filtres projets
- [ ] Tester modales et lightbox
- [ ] Tester téléchargement du CV
- [ ] Vérifier GitHub et LinkedIn
- [ ] Vérifier absence de secrets dans Git

## Après choix du domaine

- [ ] Définir `VITE_SITE_URL` avec l'URL réelle
- [ ] Rebuilder
- [ ] Vérifier `dist/sitemap.xml`
- [ ] Vérifier `dist/robots.txt`
- [ ] Vérifier le canonical
- [ ] Vérifier `og:url`
- [ ] Vérifier `og:image`
- [ ] Connecter le domaine personnalisé
- [ ] Vérifier HTTPS
- [ ] Tester les en-têtes de sécurité
- [ ] Lancer Lighthouse sur l'URL publique
- [ ] Vérifier les en-têtes CSP / HSTS / X-Content-Type-Options
- [ ] Tester le partage du portfolio sur LinkedIn

## Après publication

- [ ] Vérifier les liens depuis CV → Portfolio → GitHub → LinkedIn
- [ ] Vérifier le CV depuis mobile
- [ ] Vérifier le portfolio sur un écran large
- [ ] Vérifier le portfolio sur mobile
- [ ] Conserver l'URL de production dans le profil LinkedIn et les candidatures
