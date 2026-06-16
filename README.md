# Logilift — Estimation de déménagement en ligne

> Le transit qui fait avancer vos affaires.

Application web qui permet à un client de **préparer lui-même son devis de
déménagement** : il crée les pièces de son logement, ajoute ses meubles d'un
simple `+` / `−`, et obtient instantanément le **volume estimé (m³)**. Il valide
ensuite ses adresses et accès, puis envoie sa demande à Logilift — sans visite
préalable.

## Stack

- [Next.js](https://nextjs.org/) 14 (App Router) + TypeScript
- Tailwind CSS (charte graphique Logilift)
- État client persisté en `localStorage`
- Envoi de la demande via une Route Handler (`/api/quotes`), email optionnel via [Resend](https://resend.com)

## Démarrage

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

## Parcours client (5 étapes)

1. **Coordonnées** — nom, prénom, email, téléphone.
2. **Pièces & objets** — créer des pièces (salon, cuisine, chambre…) et ajouter les objets avec `+` / `−`.
3. **Volume** — le volume total en m³, calculé automatiquement.
4. **Adresses & accès** — départ / arrivée, étage, ascenseur, escalier, distance de portage.
5. **Validation** — récapitulatif et envoi à Logilift.

## Catalogue des volumes

La source de vérité des volumes est `lib/catalog.ts` (volume en m³ par objet et
pièces associées). Pour ajuster un volume ou ajouter un objet, modifier ce seul
fichier. Le calcul est centralisé dans `lib/volume.ts`.

## Envoi des demandes (email)

Par défaut, l'API journalise la demande (console) et renvoie le récapitulatif :
l'application est donc **fonctionnelle sans configuration**.

Pour recevoir les demandes par email, renseigner ces variables (voir
`.env.example`) :

```
RESEND_API_KEY=...
COMPANY_EMAIL=contact@logilift.fr
FROM_EMAIL=devis@logilift.fr   # adresse vérifiée sur Resend
```

## Logo

Le logo affiché (`public/logilift-logo.svg`) est une reproduction vectorielle
dans la charte. **Pour utiliser le logo officiel**, déposez votre fichier sous
`public/logilift-logo.png` puis remplacez la source de l'image dans
`components/Header.tsx` (`src="/logilift-logo.png"`).

## Déploiement (Vercel)

1. Pousser le dépôt sur GitHub.
2. Importer le projet dans [Vercel](https://vercel.com) (détection Next.js automatique).
3. (Optionnel) Ajouter les variables d'environnement Resend.
4. Déployer.

## Pistes d'évolution

- Formule de **prix / devis chiffré** (tarif au m³, accès, distance).
- Espace société (back-office) pour consulter les demandes.
- Base de données pour le catalogue et l'historique des demandes.
