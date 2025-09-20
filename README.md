PRD – Plateforme Web Ultra-Complète (Astro Natifs)
1. Stack Technique

Framework : Astro (dernier stable)

Langages : TypeScript + CSS natif

Stores réactifs : Nanostores

Base de données : PostgreSQL via Prisma

Authentification : Better Auth

Email vérifié obligatoire

Rôles : user, admin

Gestion des organisations

Emails : Nodemailer (notifications, vérifications, alertes)

Content layer : via contentlayer (content.config.ts) pour typage strict et centralisation des contenus

Jamais de frameworks UI externes (React, Vue, Svelte, Tailwind, etc.)

2. Internationalisation (i18n)

Langues supportées : fr, en, de, es, ar, zh

Routage natif Astro : /fr/..., /en/..., etc.

Slugs traduits et liés par ID pour catégories, articles et pages

Traduction de :

Menus et navigation

Titres et textes éditoriaux

Meta SEO (title, description, canonical, OG, Twitter)

Messages système et formulaires

3. Design System

Tokens globaux : couleurs, typographies, espacements, radius, ombres

Thèmes : Light, Dark, +3 variantes appliquées à tous les composants

Composants HTML natifs :

Titres, paragraphes, listes, liens, tableaux

Formulaires : inputs, textareas, selects, checkboxes, radios, toggles, sliders, file upload, date/time pickers

Layouts : container, grid, flex, stack, card, divider

Navigation : navbar, sidebar, breadcrumbs, tabs, pagination, stepper

Feedback : alerts, toast, modals/dialogs, loading spinners, empty states, error boundaries

Media : image, video, audio, figure/figcaption, carousel

Interactive : accordions, collapsibles, popovers, tooltips

Variantes et thèmes appliqués à chaque composant

Accessibilité : ARIA, focus visible, navigation clavier

4. Authentification & Administration

Gestion complète des utilisateurs et profils (nom, avatar, bio)

Rôles : user, admin

Organisation : un utilisateur peut appartenir à plusieurs organisations

Administration : CRUD complet sur utilisateurs, organisations, articles, catégories, commentaires

Permissions granulaires : accès lecture/écriture/modération selon rôle

5. Blog Ultra-Complété

Routes Astro :

/[lang]/blog/ → liste articles

/[lang]/blog/[category]/ → articles par catégorie

/[lang]/blog/[category]/[slug]/ → page article

Articles :

Slug multilingue

Titre, contenu modulaire, images optimisées

Catégorie, tags, auteur

SEO complet par langue

Fonctionnalités utilisateurs :

Commentaires (threaded, modérés)

Likes, réactions

Partage social

Proposer un article (workflow avec validation admin)

Fonctionnalités admin :

CRUD complet articles, catégories, tags, commentaires, utilisateurs

Modération commentaires et propositions

Workflow de publication : draft → review → scheduled/published

6. Pages principales

/[lang]/ Accueil

/[lang]/about À propos

/[lang]/services Services

/[lang]/training Formations

/[lang]/blog Blog

/[lang]/contact Contact

/[lang]/legal Mentions légales

/[lang]/profile Profil utilisateur

/[lang]/admin Administration

7. Content Layer

Contentlayer (content.config.ts) :

Centralisation des schémas (articles, catégories, traductions, pages)

Typage strict TypeScript

Chargement unifié des contenus statiques et dynamiques

8. Objectifs

Performance maximale (Astro Islands, rendu hybride)

Accessibilité totale

Scalabilité (modulaire, extensible, multilingue)

Expérience cohérente : design system appliqué à toutes les balises et composants

Multilingue complet : fr, en, de, es, ar, zh
