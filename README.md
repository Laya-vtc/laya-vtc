# Laya VTC — Site vitrine pour chauffeur VTC éco-responsable

Site one-page, responsive, en HTML/CSS/JS pur (aucune dépendance, aucun build).

## Contenu
- `index.html` — page unique (FR) : accueil, services, flotte électrique, tarifs (2 €/km), comment ça marche, engagement écologique, témoignages, formulaire de réservation, footer
- `styles.css` — thème vert éco, responsive (mobile/tablette/desktop)
- `script.js` — menu mobile, année auto, formulaire de réservation

## Coordonnées configurées
- **Nom** : Laya VTC
- **Téléphone** : +33 7 61 08 18 95
- **Email de réception** : lazeregg98@gmail.com (reçoit les réservations)
- **Zone** : Île-de-France
- **Tarif** : 2 € / km (+ 15 € prise en charge)

## Fonctionnement du formulaire
Par défaut, le formulaire ouvre un email pré-rempli vers `lazeregg98@gmail.com`
(le visiteur valide l'envoi depuis sa messagerie). Aucune inscription requise.
Pour un envoi 100% automatique (sans action du visiteur) :
1. Créer un compte gratuit sur https://formspree.io
2. Mettre `lazeregg98@gmail.com` comme destinataire
3. Récupérer l'endpoint (ex. `https://formspree.io/f/xxxxxx`)
4. Le coller dans `script.js` → variable `FORMSPREE_ENDPOINT`

## Lancer en local
```bash
cd site-vtc-eco
python -m http.server 8000
# ouvrir http://localhost:8000
```
Ou ouvrir `index.html` directement dans un navigateur.

## Mise en ligne (gratuite)
Trois options, aucune carte bancaire :
- **Netlify Drop** : glisser le dossier sur https://app.netlify.com/drop
- **GitHub Pages** : pousser le dossier dans un repo, activer Pages
- **Vercel** : importer le dossier depuis https://vercel.com

Le site est 100% statique : déposer les 3 fichiers suffit.

## Personnalisation
- **Photos** : remplacer les émojis/icônes par de vraies photos (`<img>` dans `index.html`)
- **Témoignages** : texte fictif, à remplacer par des avis réels
- **Tarifs** : section `#tarifs` dans `index.html`
