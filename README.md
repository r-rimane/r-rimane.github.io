# Portfolio de Rayan Rimane

Portfolio de développeur web et logiciel. Les projets y sont présentés par des schémas explorables plutôt que par des captures.

## Stack

- Next.js (App Router), React, TypeScript strict
- Tailwind CSS v4 pour les jetons et les utilitaires, CSS découpé par zone pour les formes propres au site
- Canvas 2D sans bibliothèque pour la scène d'ouverture
- ESLint et Prettier

## Choix techniques

- **Scène et schémas** : les données d'un schéma (`src/content/projects.ts`) servent à la fois au rendu React et aux points du canvas, qui se rassemblent pour le dessiner au défilement.
- **Contenu d'abord** : tout le texte est dans le HTML statique ; aucune section n'attend une animation pour s'afficher.
- **Accessibilité** : schémas utilisables au clavier, mouvements coupés si `prefers-reduced-motion` est actif.

## Lancer le projet

Node.js 20.9 ou plus récent.

```bash
npm install
npm run dev
```

Le site est servi sur http://localhost:3000.

## CV et image de partage

Leurs pages sources sont dans `cv/`. Pour les régénérer avec Chrome :

```powershell
powershell -ExecutionPolicy Bypass -File cv\generer.ps1
```

## Publication

Le site est exporté en fichiers statiques (`npm run build` écrit dans `out/`). `publier.ps1` envoie le site exporté sur la branche `main`, servie par GitHub Pages, et le code sur la branche `source`.

```powershell
powershell -ExecutionPolicy Bypass -File publier.ps1 -Message "Mise à jour du site"
```
