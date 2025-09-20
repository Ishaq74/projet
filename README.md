# ✅ PROJET TERMINÉ - Plateforme Ville Numérique

> **Status**: Production-ready | **Dernière mise à jour**: Décembre 2024
> 
> Plateforme communautaire complète pour Annecy avec support multilingue (6 langues), système de thèmes, blog, forums, petites annonces et plus.

## 🚀 Démarrage rapide

```bash
npm install
npm run dev    # http://localhost:4321
npm run build  # Production build
```

---

# PRD – Plateforme Web Ultra-Complète (Astro Natifs)
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

# Conception Technique Détaillée : Ville Numérique Vivante

## Table des matières
- [0. MÉTA](#0-meta)
  - [Version du document](#version-du-document)
  - [Date de génération](#date-de-génération)
  - [Auteur](#auteur)
  - [Références PRD](#références-prd)
  - [Portée](#portée)
    - [Objectifs](#objectifs)
    - [Livrables](#livrables)
    - [Non-objectifs (Anti-exigences)](#non-objectifs-anti-exigences)
  - [Parties prenantes](#parties-prenantes)
  - [Glossaire](#glossaire)
- [1. MODÈLE DE DOMAINE & DICTIONNAIRE DE DONNÉES](#1-modèle-de-domaine--dictionnaire-de-données)
  - [1.1 Catalogue des entités (tables/collections)](#11-catalogue-des-entités-tablescollections)
  - [1.2 Spécification détaillée par entité](#12-spécification-détaillée-par-entité)
    - [Entité : Utilisateur](#entité--utilisateur)
    - [Entité : Catégorie](#entité--catégorie)
    - [Entité : Lieu](#entité--lieu)
    - [Entité : TraductionLieu](#entité--traductionlieu)
    - [Entité : AttributLieu](#entité--attributlieu)
    - [Entité : DétailsHébergement](#entité--détailshébergement)
    - [Entité : DétailsGastronomie](#entité--détailsgastronomie)
    - [Entité : Article](#entité--article)
    - [Entité : ContenuArticle](#entité--contenuarticle)
    - [Entité : LienArticleCatégorie](#entité--lienarticlecatégorie)
    - [Entité : LienArticleLieu](#entité--lienarticlelieu)
    - [Entité : Avis](#entité--avis)
    - [Entité : SousNotation](#entité--sousnotation)
    - [Entité : Commentaire](#entité--commentaire)
    - [Entité : SujetForum](#entité--sujetforum)
    - [Entité : MessageForum](#entité--messageforum)
    - [Entité : Annonce](#entité--annonce)
    - [Entité : ServiceLocal](#entité--servicelocal)
    - [Entité : Conversation](#entité--conversation)
    - [Entité : Message](#entité--message)
    - [Entité : Notification](#entité--notification)
    - [Entité : Portefeuille](#entité--portefeuille)
    - [Entité : Transaction](#entité--transaction)
    - [Entité : Réservation](#entité--réservation)
    - [Entité : Disponibilité](#entité--disponibilité)
    - [Entité : CommissionSystème](#entité--commissionsystème)
    - [Entité : JournalAudit](#entité--journalaudit)
- [1.3 Relations globales](#13-relations-globales)
- [2. PERMISSIONS & SÉCURITÉ (AGNOSTIQUE)](#2-permissions--sécurité-agnostique)
  - [2.1 Rôles & acteurs](#21-rôles--acteurs)
  - [2.2 Matrice d’autorisations (CRUD+)](#22-matrice-dautorisations-crud)
  - [2.3 Règles transverses](#23-règles-transverses)
    - [Visibilité des champs](#visibilité-des-champs)
    - [Contrôles d’abus](#contrôles-dabus)
    - [Journalisation/audit](#journalisationaudit)
    - [Confidentialité & données personnelles](#confidentialité--données-personnelles)
- [3. OPÉRATIONS LOGIQUES / SURFACE « API » (AGNOSTIQUE)](#3-opérations-logiques--surface--api--agnostique)
  - [Catalogue récapitulatif des opérations](#catalogue-récapitulatif-des-opérations)
  - [Spécification détaillée des opérations](#spécification-détaillée-des-opérations)
    - [Opération : AuthentifierUtilisateur](#opération--authentifierutilisateur)
    - [Opération : InscrireUtilisateur](#opération--inscrireutilisateur)
    - [Opération : RéinitialiserMotDePasse](#opération--réinitialisermotdepasse)
    - [Opération : AuthentifierOAuth](#opération--authentifieroauth)
    - [Opération : RécupérerProfilUtilisateurPublic](#opération--récupérerprofilutilisateurpublic)
    - [Opération : MettreÀJourProfilUtilisateur](#opération--mettreàjourprofilutilisateur)
    - [Opération : TéléchargerAvatarUtilisateur](#opération--téléchargeravatarutilisateur)
    - [Opération : RécupérerArbreCatégories](#opération--récupérerarbrecatégories)
    - [Opération : ListerSousCatégories](#opération--listersouscatégories)
    - [Opération : ListerLieuxParCatégorie](#opération--listerlieuxparcatégorie)
    - [Opération : RécupérerDétailsLieu](#opération--récupérerdétailslieu)
    - [Opération : SoumettreLieu](#opération--soumettrelieu)
    - [Opération : MettreÀJourLieu](#opération--mettreàjourlieu)
    - [Opération : ListerLieuxPropriétaire](#opération--listerlieuxpropriétaire)
    - [Opération : RécupérerStatutLieu](#opération--récupérerstatutlieu)
    - [Opération : CréerArticle](#opération--créerarticle)
    - [Opération : MettreÀJourArticle](#opération--mettreàjourarticle)
    - [Opération : ChercherLieuxPourArticle](#opération--chercherlieuxpourarticle)
    - [Opération : ComparerLieux](#opération--comparerlieux)
    - [Opération : ListerArticlesAuteur](#opération--listerarticlesauteur)
    - [Opération : ListerArticlesParCatégorieMagazine](#opération--listerarticlesparcatégoriemagazine)
    - [Opération : RécupérerDétailsArticle](#opération--récupérerdétailsarticle)
    - [Opération : ListerArticlesLiésÀLieu](#opération--listerarticlesliésàlieu)
    - [Opération : ListerArticlesLiésÀCatégorie](#opération--listerarticlesliésàcatégorie)
    - [Opération : SoumettreAvis](#opération--soumettreavis)
    - [Opération : RépondreÀAvis](#opération--répondreàavis)
    - [Opération : ListerAvisPourLieu](#opération--listeravispourlieu)
    - [Opération : SoumettreCommentaire](#opération--soumettrecommentaire)
    - [Opération : RépondreÀCommentaire](#opération--répondreàcommentaire)
    - [Opération : ListerCommentairesPourArticle](#opération--listercommentairespourarticle)
    - [Opération : CréerSujetForum](#opération--créersujetforum)
    - [Opération : RépondreSujetForum](#opération--répondresujetforum)
    - [Opération : ListerCatégoriesForum](#opération--listercatégoriesforum)
    - [Opération : ListerSujetsForum](#opération--listersujetsforum)
    - [Opération : RécupérerDétailsSujetForum](#opération--récupérerdétailssujetforum)
    - [Opération : ListerActivitéForumUtilisateur](#opération--listeractivitéforumutilisateur)
    - [Opération : CréerAnnonce](#opération--créerannonce)
    - [Opération : MettreÀJourAnnonce](#opération--mettreàjourannonce)
    - [Opération : ListerAnnonces](#opération--listerannonces)
    - [Opération : CréerServiceLocal](#opération--créerservicelocal)
    - [Opération : MettreÀJourServiceLocal](#opération--mettreàjourservicelocal)
    - [Opération : ListerServicesLocaux](#opération--listerserviceslocaux)
    - [Opération : InitierConversationContactAnnonce](#opération--initierconversationcontactannonce)
    - [Opération : RécupérerOuCréerConversation](#opération--récupéreroucréerconversation)
    - [Opération : EnvoyerMessage](#opération--envoyermessage)
    - [Opération : ListerConversations](#opération--listerconversations)
    - [Opération : ListerMessagesConversation](#opération--listermessagesconversation)
    - [Opération : ListerNotificationsUtilisateur](#opération--listernotificationsutilisateur)
    - [Opération : MarquerNotificationLue](#opération--marquernotificationlue)
    - [Opération : CréditerPortefeuille](#opération--créditerportefeuille)
    - [Opération : TransférerFonds](#opération--transférerfonds)
    - [Opération : RécupérerSoldePortefeuille](#opération--récupérersoldeportefeuille)
    - [Opération : RécupérerHistoriqueTransactions](#opération--récupérerhistoriquetransactions)
    - [Opération : CréerRéservation](#opération--créerréservation)
    - [Opération : MettreÀJourStatutRéservation](#opération--mettreàjourstatutréservation)
    - [Opération : DéfinirDisponibilités](#opération--définirdisponibilités)
    - [Opération : RécupérerDisponibilitésLieu](#opération--récupérernotificationsutilisateur-1)
    - [Opération : TraiterPaiementRéservation](#opération--traiterpaiementréservation)
    - [Opération : ListerUtilisateursAdmin](#opération--listerutilisateursadmin)
    - [Opération : MettreÀJourRôleUtilisateurAdmin](#opération--mettreàjourrôleutilisateuradmin)
    - [Opération : BannirUtilisateurAdmin](#opération--bannirutilisateuradmin)
    - [Opération : ApprouverLieuAdmin](#opération--approuverlieuadmin)
    - [Opération : RejeterLieuAdmin](#opération--rejeterlieuadmin)
    - [Opération : ModérerContenuAdmin](#opération--modérercontenuadmin)
    - [Opération : GérerCatégoriesAdmin](#opération--gérercatégoriesadmin)
    - [Opération : GérerAttributsAdmin](#opération--gérerattributsadmin)
- [4. PARCOURS UTILISATEURS (FLOWS)](#4-parcours-utilisateurs-flows)
  - [Parcours : Authentification et gestion de profil](#parcours--authentification-et-gestion-de-profil)
  - [Parcours : Découverte de lieux par catégorie](#parcours--découverte-de-lieux-par-catégorie)
  - [Parcours : Soumission d'un nouveau lieu par un propriétaire](#parcours--soumission-dun-nouveau-lieu-par-un-propriétaire)
  - [Parcours : Rédaction et publication d'un article par un auteur](#parcours--rédaction-et-publication-dun-article-par-un-auteur)
  - [Parcours : Ajout d'un avis sur un lieu](#parcours--ajout-dun-avis-sur-un-lieu)
  - [Parcours : Participation au forum de la ville](#parcours--participation-au-forum-de-la-ville)
  - [Parcours : Création et consultation d'une petite annonce](#parcours--création-et-consultation-dune-petite-annonce)
  - [Parcours : Initiation et participation à une conversation privée](#parcours--initiation-et-participation-à-une-conversation-privée)
  - [Parcours : Crédit et transfert de fonds via le portefeuille](#parcours--crédit-et-transfert-de-fonds-via-le-portefeuille)
  - [Parcours : Réservation d'un service/hébergement avec paiement](#parcours--réservation-dun-servicehébergement-avec-paiement)
  - [Parcours : Modération des contenus par un administrateur](#parcours--modération-des-contenus-par-un-administrateur)
- [5. PLAN UI (AGNOSTIQUE)](#5-plan-ui-agnostique)
  - [5.1 Vues/Pages](#51-vuespages)
  - [5.2 Composants](#52-composants)
    - [Catalogue récapitulatif des composants](#catalogue-récapitulatif-des-composants)
    - [Spécification détaillée des composants](#spécification-détaillée-des-composants)
      - [Composant : CategoryBreadcrumb](#composant--categorybreadcrumb)
      - [Composant : PlaceCard](#composant--placecard)
      - [Composant : SubmitPlaceForm](#composant--submitplaceform)
      - [Composant : DetailsAccommodationComponent](#composant--detailsaccommodationcomponent)
      - [Composant : DetailsGastronomyComponent](#composant--detailsgastronomycomponent)
      - [Composant : ArticleEditor](#composant--articleeditor)
      - [Composant : BlocLienLieu](#composant--bloclienlieu)
      - [Composant : BlocComparatifLieux](#composant--blocomparatiflieux)
      - [Composant : ReviewsSection](#composant--reviewssection)
      - [Composant : CommentsSection](#composant--commentssection)
      - [Composant : NewThreadForm](#composant--newthreadform)
      - [Composant : ReplyForm](#composant--replyform)
      - [Composant : NotificationBell](#composant--notificationbell)
      - [Composant : BookingWidget](#composant--bookingwidget)
      - [Composant : DisponibilityCalendar](#composant--disponibilitycalendar)
      - [Composant : ContactButton](#composant--contactbutton)
      - [Composant : Bouton](#composant--bouton)
      - [Composant : ChampSaisie](#composant--champsaisie)
      - [Composant : Modale](#composant--modale)
      - [Composant : Tableau](#composant--tableau)
      - [Composant : Sélection](#composant--sélection)
      - [Composant : Calendrier](#composant--calendrier)
      - [Composant : Carrousel](#composant--carrousel)
      - [Composant : Formulaire](#composant--formulaire)
      - [Composant : Carte](#composant--carte)
      - [Composant : CaseÀCocher](#composant--caseàcocher)
      - [Composant : BoutonRadio](#composant--boutonradio)
      - [Composant : MenuDéroulant](#composant--menudéroulant)
      - [Composant : Onglets](#composant--onglets)
      - [Composant : Interrupteur](#composant--interrupteur)
      - [Composant : Toggle](#composant--toggle)
- [6. EXIGENCES NON FONCTIONNELLES (NFR)](#6-exigences-non-fonctionnelles-nfr)
  - [Performance](#performance)
  - [Scalabilité](#scalabilité)
  - [Cohérence & concurrence](#cohérence--concurrence)
  - [Fiabilité](#fiabilité)
  - [Horodatage & fuseaux](#horodatage--fuseaux)
  - [i18n/L10n](#i18nl10n)
  - [Accessibilité](#accessibilité)
  - [Sécurité](#sécurité)
  - [Conformité](#conformité)
- [7. INTÉGRATIONS EXTERNES (SI PRD)](#7-intégrations-externes-si-prd)
  - [Système de paiement externe](#système-de-paiement-externe)
  - [Fournisseur d'authentification OAuth](#fournisseur-dauthentification-oauth)
  - [Fournisseur de carte de localisation](#fournisseur-de-carte-de-localisation)
  - [Stockage de fichiers externes](#stockage-de-fichiers-externes)
- [8. TÂCHES D’IMPLÉMENTATION (WORKPACKAGES & TODO)](#8-tâches-dimplémentation-workpackages--todo)
  - [8.1 Découpage par domaines](#81-découpage-par-domaines)
    - [Lot : Fondations techniques et qualité](#lot--fondations-techniques-et-qualité)
    - [Lot : Citoyenneté Numérique (Authentification & Profils)](#lot--citoyenneté-numérique-authentification--profils)
    - [Lot : Annuaires de Lieux et Catégories](#lot--annuaires-de-lieux-et-catégories)
    - [Lot : Soumission et Gestion des Lieux](#lot--soumission-et-gestion-des-lieux)
    - [Lot : Contenu Rédactionnel (Magazine)](#lot--contenu-rédactionnel-magazine)
    - [Lot : Système d'Avis et Commentaires](#lot--système-davis-et-commentaires)
    - [Lot : Forum Communautaire](#lot--forum-communautaire)
    - [Lot : Annonces et Services Locaux](#lot--annonces-et-services-locaux)
    - [Lot : Messagerie Privée](#lot--messagerie-privée)
    - [Lot : Portefeuille Numérique](#lot--portefeuille-numérique)
    - [Lot : Système de Réservation](#lot--système-de-réservation)
    - [Lot : Panel d'Administration](#lot--panel-dadministration)
    - [Lot : Lancement et Opérations Continues](#lot--lancement-et-opérations-continues)
  - [8.2 Tâches atomiques](#82-tâches-atomiques)
    - [Matrice de traçabilité](#matrice-de-traçabilité)
- [9. PLAN DE TESTS](#9-plan-de-tests)
  - [9.1 Unitaires (par entité & fonction métier)](#91-unitaires-par-entité--fonction-métier)
  - [9.2 Intégration (par opérations & permissions)](#92-intégration-par-opérations--permissions)
  - [9.3 E2E (par parcours utilisateurs)](#93-e2e-par-parcours-utilisateurs)
  - [9.4 Sécurité & abus](#94-sécurité--abus)
  - [9.5 Charge & volumétrie (agnostiques)](#95-charge--volumétrie-agnostiques)
- [10. FICHIERS & MÉDIAS (SI PRD)](#10-fichiers--médias-si-prd)
- [11. TRAITEMENTS DIFFÉRÉS & PLANIFICATION (SI PRD)](#11-traitements-différés--planification-si-prd)
- [12. OBSERVABILITÉ & ANALYTIQUE](#12-observabilité--analytique)
- [13. MIGRATIONS & DONNÉES INITIALES](#13-migrations--données-initiales)
- [14. RISQUES, HYPOTHÈSES & QUESTIONS OUVERTES](#14-risques-hypothèses--questions-ouvertes)
  - [Hypothèses & Déductions](#hypothèses--déductions)
  - [Risques](#risques)
  - [Questions ouvertes](#questions-ouvertes)
- [15. ANNEXES NORMATIVES](#15-annexes-normatives)
  - [Taxonomie d’erreurs](#taxonomie-derreurs)
  - [Liste des énumérations](#liste-des-énumérations)
  - [Schéma relationnel textuel consolidé](#schéma-relationnel-textuel-consolidé)
  - [Catalogue des opérations](#catalogue-des-opérations)
  - [Catalogue des composants](#catalogue-des-composants)
  - [Journal des changements](#journal-des-changements)
- [16. CONTRÔLES QUALITÉ & CHECKLISTS (AUTO-LINTER)](#16-contrôles-qualité--checklists-auto-linter)

---

# 0. MÉTA
### Version du document
1.0.0
### Date de génération
2023-10-27
### Auteur
Concepteur IA
### Références PRD
Le PRD ne fournit pas d'identifiants d'exigences spécifiques, mais les sections sont implicitement référencées par les noms des "WORK PACKAGE" et "PILIER".

### Portée
#### Objectifs
*   **Établir une base civique numérique fiable :** Mettre en place un système d'authentification robuste, de gestion de profils utilisateur et des fondations de sécurité.
*   **Cartographier le territoire numérique :** Indexer et présenter les lieux physiques à travers un système de catégories et des fiches détaillées, permettant la découverte et la soumission par les propriétaires.
*   **Animer le territoire avec du contenu :** Intégrer un système de contenu rédactionnel (articles) lié aux lieux, permettant aux auteurs de créer et diffuser des récits.
*   **Créer une agora numérique interactive :** Fournir des outils de communication et d'interaction pour les citoyens, incluant avis, commentaires, forums, annonces, services locaux et messagerie privée.
*   **Soutenir l'économie locale :** Développer un système de portefeuille numérique et un mécanisme de réservation/paiement pour des services et hébergements.
*   **Assurer la gouvernance et la maintenance :** Mettre en place un panneau d'administration pour la modération, la gestion des utilisateurs et la taxonomie, et définir les opérations continues.

#### Livrables
*   Infrastructure de développement et d'outillage de qualité.
*   Schéma directeur de données et politiques de sécurité (contrôle d'accès logique).
*   Flux d'authentification complet et pages de gestion/affichage des profils.
*   Interface d'exploration de catégories et de lieux.
*   Fiches détaillées pour chaque lieu avec informations dynamiques.
*   Formulaire de soumission de lieux pour les propriétaires.
*   Système de back-office et éditeur d'articles (avec intégration de lieux).
*   Portail et pages de lecture d'articles, avec intégration croisée aux lieux et catégories.
*   Composants d'avis (avec sous-notations) et de commentaires.
*   Structure de forum thématique avec création et réponse de sujets.
*   Fonctionnalités de petites annonces et de services locaux.
*   Système de messagerie privée en temps réel.
*   Portefeuille numérique (crédit, transfert, historique).
*   Système de réservation (disponibilités, paiement, commissions).
*   Tableau de bord et outils d'administration (gestion utilisateurs, modération, taxonomie).
*   Checklist de lancement, monitoring et documentation utilisateur.

#### Non-objectifs (Anti-exigences)
*   **MVP sans hiérarchisation claire :** Le PRD n'identifie pas un Minimum Viable Product (MVP) clair avec une hiérarchisation des fonctionnalités, ce qui peut entraîner une complexité excessive.
*   **Priorisation de la technique sur l'expérience utilisateur :** Le PRD met un accent fort sur les "DoD" techniques au détriment de l'expérience utilisateur, de l'accessibilité réelle ou du ressenti.
*   **Produit monolithique :** Le projet tel que décrit combine des fonctionnalités de place de marché, CMS, réservation, forum et messagerie, risquant une friction d'usage et de maintenance.
*   **Lancement rapide :** L'ambition globale ne permet pas un lancement en 6 semaines comme suggéré par le PRD lui-même comme une "erreur stratégique".

### Parties prenantes
*   **Citoyen :** Utilisateur authentifié de la plateforme, peut consulter les lieux, articles, forum, annonces, services, laisser des avis/commentaires, participer au forum, utiliser la messagerie, gérer son portefeuille.
*   **Anonyme :** Utilisateur non authentifié, peut consulter les lieux, articles, forum, annonces, services (lecture seule).
*   **Propriétaire :** Citoyen authentifié ayant la capacité de soumettre et gérer ses établissements, services locaux, annonces, définir des disponibilités et recevoir des paiements.
*   **Auteur :** Citoyen authentifié ayant la capacité de créer, éditer et publier des articles via le back-office dédié.
*   **Administrateur :** Utilisateur avec des privilèges étendus pour gérer les utilisateurs, modérer le contenu, gérer la taxonomie et superviser la plateforme.
*   **Système de paiement externe :** Gère le crédit du portefeuille (ex: Stripe).
*   **Système d'authentification OAuth externe :** Gère l'authentification via des fournisseurs tiers.
*   **Fournisseur de carte :** Affiche les localisations des lieux.

### Glossaire
*   **Annonce :** Offre de bien entre citoyens sur la place du marché.
*   **Article :** Contenu rédactionnel publié sur la plateforme, lié aux catégories "Magazine".
*   **Attribut :** Caractéristique dynamique et typée d'un lieu (ex: "Wifi: Oui").
*   **Avis :** Retour structuré (notation, sous-notations, texte) d'un citoyen sur un lieu.
*   **Catégorie :** Entité hiérarchique utilisée pour organiser les lieux, articles, services et sujets de forum.
*   **Citoyen :** Utilisateur authentifié de la Ville Numérique.
*   **Commentaire :** Texte de feedback sur un article ou une réponse à un avis/commentaire.
*   **Conversation :** Échange privé entre deux ou plusieurs citoyens via la messagerie.
*   **Détails Spécifiques :** Informations additionnelles propres à certains types de lieux (ex: nombre d'étoiles pour un hébergement).
*   **Lieu :** Représentation d'un établissement physique ou point d'intérêt dans l'annuaire.
*   **Messagerie :** Système de communication privée et en temps réel entre citoyens.
*   **Opération atomique :** Une transaction ou une suite d'opérations qui est exécutée entièrement ou pas du tout, garantissant la cohérence des données.
*   **Portefeuille Numérique :** Solde de crédit interne à la plateforme pour les transactions.
*   **Propriétaire :** Utilisateur gérant un lieu, une annonce ou un service local.
*   **Réservation :** Processus de blocage d'un créneau ou d'une date pour un service ou un hébergement.
*   **RLS (Row-Level Security) :** Contrôle d'accès logique appliqué au niveau des lignes de données, définissant qui peut voir ou modifier quelles données.
*   **Service Local :** Offre de service entre citoyens ou professionnels.
*   **Slug :** Identifiant textuel unique et lisible, souvent utilisé dans les URLs.
*   **Sous-notation :** Notation granulaire sur un aspect spécifique d'un lieu, faisant partie d'un avis.
*   **Sujet / Thread :** Publication initiale dans une catégorie de forum, déclenchant une discussion.
*   **Taxonomie :** Système de classification hiérarchique (ici, les catégories).
*   **Transaction :** Opération financière affectant le portefeuille numérique.

---

# 1. MODÈLE DE DOMAINE & DICTIONNAIRE DE DONNÉES
### 1.1 Catalogue des entités (tables/collections)

| Entité                 | Description métier                                                                      | Clé primaire logique | Identifiants externes | Propriétaire/ownership | Invariants métier                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| :--------------------- | :-------------------------------------------------------------------------------------- | :------------------- | :-------------------- | :--------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Utilisateur            | Représente un citoyen de la plateforme.                                                 | `id`                 | `id_authentification` | Utilisateur            | `username` est unique et immuable. `email` est unique et validé. Le rôle est bien défini.                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| Catégorie              | Structure hiérarchique pour classer lieux, articles, forum.                             | `id`                 | Non applicable        | Système                | `slug` est unique. `type_categorie` est défini. `level` est cohérent avec `parent_id`.                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| Lieu                   | Un établissement physique ou un point d'intérêt.                                        | `id`                 | Non applicable        | Utilisateur (propriétaire) | Un lieu appartient toujours à un utilisateur (propriétaire). `status` est géré par une machine à états. `category_id` pointe vers une catégorie de type 'place_category'. `slug` est unique par langue.                                                                                                                                                                                                                                                                                                                       |
| TraductionLieu         | Informations multilingues pour un lieu.                                                 | `id`                 | `place_id`            | Utilisateur (propriétaire) | Un lieu a au moins une traduction par défaut.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| AttributLieu           | Caractéristiques dynamiques d'un lieu (ex: Wi-Fi, Terrasse).                             | `id`                 | Non applicable        | Système                | Un attribut est défini par une clé et un type.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| DétailsHébergement     | Informations spécifiques pour les lieux de type "Hébergement".                          | `place_id`           | Non applicable        | Utilisateur (propriétaire) | Existe seulement si `Lieu.category_id` est une catégorie d'hébergement.                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| DétailsGastronomie     | Informations spécifiques pour les lieux de type "Gastronomie".                          | `place_id`           | Non applicable        | Utilisateur (propriétaire) | Existe seulement si `Lieu.category_id` est une catégorie de gastronomie.                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| Article                | Contenu éditorial publié par un auteur.                                                 | `id`                 | Non applicable        | Utilisateur (auteur)   | Un article appartient toujours à un auteur. `status` est géré par une machine à états. `slug` est unique par langue.                                                                                                                                                                                                                                                                                                                                                                                                          |
| ContenuArticle         | Stocke le contenu structuré d'un article.                                               | `id`                 | `article_id`          | Utilisateur (auteur)   | Un article a un contenu principal.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| LienArticleCatégorie   | Associe un article à une ou plusieurs catégories "Magazine".                             | `id`                 | Non applicable        | Système                | Un lien associe un article et une catégorie de type 'magazine_category'.                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| LienArticleLieu        | Relie un article à un lieu mentionné.                                                   | `id`                 | Non applicable        | Système                | Un lien associe un article et un lieu.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| Avis                   | Feedback d'un citoyen sur un lieu, avec notations.                                      | `id`                 | Non applicable        | Utilisateur            | Un avis est lié à un utilisateur et à un lieu. Un avis peut être une réponse à un autre avis. `parent_review_id` ne doit pas former de boucle.                                                                                                                                                                                                                                                                                                                                                                            |
| SousNotation           | Notation spécifique (ex: propreté) pour un avis de lieu.                                | `id`                 | Non applicable        | Utilisateur            | Une sous-notation est toujours liée à un avis et un attribut prédéfini.                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| Commentaire            | Feedback d'un citoyen sur un article.                                                   | `id`                 | Non applicable        | Utilisateur            | Un commentaire est lié à un utilisateur et à un article. Un commentaire peut être une réponse à un autre commentaire. `parent_comment_id` ne doit pas former de boucle.                                                                                                                                                                                                                                                                                                                                                |
| SujetForum             | Publication initiale dans une catégorie de forum.                                       | `id`                 | Non applicable        | Utilisateur            | Un sujet appartient à un utilisateur et à une catégorie de type 'forum_category'.                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| MessageForum           | Réponse ou message dans un sujet de forum.                                              | `id`                 | Non applicable        | Utilisateur            | Un message appartient à un utilisateur et à un sujet de forum. Un message peut être une réponse à un autre message de forum.                                                                                                                                                                                                                                                                                                                                                                                                 |
| Annonce                | Offre de bien/service entre citoyens.                                                   | `id`                 | Non applicable        | Utilisateur            | Une annonce appartient à un utilisateur. `status` est géré par une machine à états.                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ServiceLocal           | Offre de service professionnel ou non professionnel.                                    | `id`                 | Non applicable        | Utilisateur            | Un service local appartient à un utilisateur. `status` est géré par une machine à états.                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| Conversation           | Fil de discussion privé entre utilisateurs.                                             | `id`                 | Non applicable        | Utilisateur            | Une conversation a au moins deux participants.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| ParticipantConversation| Utilisateurs participant à une conversation.                                            | `id`                 | Non applicable        | Utilisateur            | Un participant est lié à une conversation et un utilisateur.                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| Message                | Un message envoyé dans une conversation privée.                                         | `id`                 | Non applicable        | Utilisateur            | Un message est lié à un expéditeur et à une conversation.                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| Notification           | Alerte destinée à un utilisateur.                                                       | `id`                 | Non applicable        | Utilisateur            | Une notification est liée à un utilisateur. Son `type` est défini.                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| Portefeuille           | Solde de crédit interne d'un utilisateur.                                               | `user_id`            | Non applicable        | Utilisateur            | Un utilisateur a un seul portefeuille. Le solde est toujours positif ou nul.                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| Transaction            | Enregistrement d'une opération financière du portefeuille.                               | `id`                 | `external_ref_id`     | Système                | Une transaction est liée à un portefeuille. La somme des débits et crédits d'une transaction complexe doit être nulle (transfert P2P).                                                                                                                                                                                                                                                                                                                                                                                    |
| Réservation            | Enregistrement d'une réservation de service ou hébergement.                             | `id`                 | Non applicable        | Utilisateur            | Une réservation est liée à un utilisateur, un lieu (ou service/annonce), et des disponibilités. `status` est géré par une machine à états. Le prix final doit correspondre aux disponibilités et commissions.                                                                                                                                                                                                                                                                                                            |
| Disponibilité          | Créneaux ou dates disponibles pour un lieu/service réservable.                          | `id`                 | Non applicable        | Utilisateur (propriétaire) | Une disponibilité est liée à un lieu/service. La `date_debut` doit être antérieure ou égale à la `date_fin`. Les prix sont définis.                                                                                                                                                                                                                                                                                                                                                                                        |
| CommissionSystème      | Historique des commissions prélevées par la plateforme.                                 | `id`                 | `transaction_id`      | Système                | Une commission est liée à une transaction de réservation. Le `montant` doit être un pourcentage du `montant_total` de la réservation.                                                                                                                                                                                                                                                                                                                                                                                        |
| JournalAudit           | Enregistre les événements importants pour la sécurité et la modération.                 | `id`                 | Non applicable        | Système                | Chaque entrée inclut un utilisateur, une action, une entité impactée et un horodatage. Les données sensibles sont masquées.                                                                                                                                                                                                                                                                                                                                                                                                  |

### 1.2 Spécification détaillée par entité

#### Entité : Utilisateur
*   **Description** : Représente un citoyen de la plateforme, avec ses informations de profil et ses accès.
*   **Champs** :
    | Nom                   | Type logique | Obligatoire | Unicité        | Valeur par défaut | Validation                               | Exemple                                        |
    | :-------------------- | :----------- | :---------- | :------------- | :---------------- | :--------------------------------------- | :--------------------------------------------- |
    | `id`                  | `uuid`       | Oui         | Oui (PK)       | Généré            | Format UUID                              | `a1b2c3d4-e5f6-7890-1234-567890abcdef`         |
    | `id_authentification` | `string`     | Oui         | Oui (Externe)  | Non applicable    | Identifiant externe du système d'authentification | `auth_provider_user_id_123`                    |
    | `username`            | `string`     | Oui         | Oui            | Non applicable    | Min 3, Max 50 caractères, alphanumérique, pas d'espaces | `ville_num_user`                               |
    | `email`               | `email`      | Oui         | Oui            | Non applicable    | Format email                             | `user@example.com`                             |
    | `nom_affichage`       | `string`     | Oui         | Non            | `username`        | Min 3, Max 100 caractères                | `Jean Dupond`                                  |
    | `bio`                 | `text`       | Non         | Non            | Non applicable    | Max 500 caractères                       | `Passionné de gastronomie locale.`             |
    | `avatar_url`          | `url`        | Non         | Non            | URL par défaut    | Format URL                               | `https://cdn.example.com/avatars/user123.jpg`  |
    | `date_inscription`    | `datetime`   | Oui         | Non            | Maintenant        | Non applicable                           | `2023-10-26T10:00:00Z`                         |
    | `role`                | `enum`       | Oui         | Non            | `citoyen`         | Voir liste des énumérations              | `citoyen`                                      |
    | `langue_preferee`     | `string`     | Oui         | Non            | `fr`              | Code ISO 639-1                           | `en`                                           |
*   **Contraintes** : `username` unique et ne peut être modifié après création (déduction H - les URLs publiques `/[username]` en dépendent), `email` unique.
*   **Indexation logique** : `id_authentification` (recherche rapide par identifiant externe), `username` (recherche rapide de profil public), `email` (recherche/connexion), `role` (filtrage par permissions).
*   **Relations** :
    *   `Portefeuille (FK: user_id)` | `1-1` | `ownership` | Non nullable | `cascade`
    *   `Lieu (FK: proprietaire_id)` | `1-N` | `ownership` | Non nullable | `restrict` (si lieux publiés)
    *   `Article (FK: auteur_id)` | `1-N` | `ownership` | Non nullable | `restrict` (si articles publiés)
    *   `Avis (FK: utilisateur_id)` | `1-N` | `ownership` | Non nullable | `cascade`
    *   `Commentaire (FK: utilisateur_id)` | `1-N` | `ownership` | Non nullable | `cascade`
    *   `SujetForum (FK: utilisateur_id)` | `1-N` | `ownership` | Non nullable | `cascade`
    *   `MessageForum (FK: utilisateur_id)` | `1-N` | `ownership` | Non nullable | `cascade`
    *   `Annonce (FK: proprietaire_id)` | `1-N` | `ownership` | Non nullable | `restrict` (si annonces actives)
    *   `ServiceLocal (FK: proprietaire_id)` | `1-N` | `ownership` | Non nullable | `restrict` (si services actifs)
    *   `Conversation (FK: createur_id)` | `1-N` | `ownership` | Non nullable | `cascade`
    *   `ParticipantConversation (FK: utilisateur_id)` | `1-N` | `ownership` | Non nullable | `cascade`
    *   `Message (FK: expéditeur_id)` | `1-N` | `ownership` | Non nullable | `cascade`
    *   `Notification (FK: utilisateur_id)` | `1-N` | `ownership` | Non nullable | `cascade`
    *   `Réservation (FK: client_id)` | `1-N` | `ownership` | Non nullable | `cascade`
*   **États & machine à états** : Non applicable (le rôle peut être modifié par admin, pas un état métier cyclique).
*   **Cycle de vie & rétention** :
    *   Création : Lors de l'inscription via email/mot de passe ou OAuth.
    *   Mise à jour : Par l'utilisateur (profil) ou par l'administrateur (rôle, bannissement).
    *   Suppression : Soft delete (marquer comme inactif, masquer le profil public), ou hard delete sur demande via un processus RGPD après un délai de rétention défini.
    *   Archivage : Non applicable.
    *   Durée de conservation : Profils archivés 7 ans après soft-delete, profils actifs indéfiniment.
*   **Exemples de lignes/objets** :
    ```json
    {
      "id": "e4a5b6c7-d8e9-0123-4567-890abcdef012",
      "id_authentification": "oauth_google_12345",
      "username": "super_citoyen",
      "email": "super.citoyen@example.com",
      "nom_affichage": "Super Citoyen",
      "bio": "Explorateur de la ville numérique, aime les pizzerias et le forum de randonnée.",
      "avatar_url": "https://cdn.example.com/avatars/super_citoyen.png",
      "date_inscription": "2023-09-01T14:30:00Z",
      "role": "citoyen",
      "langue_preferee": "fr"
    }
    ```

#### Entité : Catégorie
*   **Description** : Organise les contenus de la plateforme de manière hiérarchique (lieux, articles, forum).
*   **Champs** :
    | Nom               | Type logique | Obligatoire | Unicité        | Valeur par défaut | Validation                               | Exemple                                        |
    | :---------------- | :----------- | :---------- | :------------- | :---------------- | :--------------------------------------- | :--------------------------------------------- |
    | `id`              | `uuid`       | Oui         | Oui (PK)       | Généré            | Format UUID                              | `1a2b3c4d-e5f6-7890-1234-567890abcdef`         |
    | `nom`             | `string`     | Oui         | Non            | Non applicable    | Min 3, Max 100 caractères                | `Gastronomie`                                  |
    | `slug`            | `string`     | Oui         | Oui            | Dérivé de `nom`   | Min 3, Max 120 caractères, lowercase, sans accents/espaces | `gastronomie`                                  |
    | `description`     | `text`       | Non         | Non            | Non applicable    | Max 500 caractères                       | `Découvrez les meilleurs restaurants.`         |
    | `icone_url`       | `url`        | Non         | Non            | Non applicable    | Format URL                               | `https://cdn.example.com/icons/food.svg`       |
    | `parent_id`       | `uuid`       | Non         | Non            | Non applicable    | Référence à `Catégorie.id`               | `0a1b2c3d-e5f6-7890-1234-567890abcdef`         |
    | `level`           | `integer`    | Oui         | Non            | 0                 | >= 0                                     | `1`                                            |
    | `type_categorie`  | `enum`       | Oui         | Non            | `place_category`  | `place_category`, `magazine_category`, `forum_category` | `place_category`                               |
    | `langue_code`     | `string`     | Oui         | Non            | `fr`              | Code ISO 639-1                           | `en` (Deduction H: URL avec `[lang]`)          |
*   **Contraintes** : `slug` est unique pour un `type_categorie` donné et une `langue_code` donnée (déduction H pour la navigation, sans cela, `/[lang]/[category_slug]` serait ambigu). `level` doit être `parent_id.level + 1`.
*   **Indexation logique** : `slug` (recherche rapide par URL), `parent_id` (navigation hiérarchique), `type_categorie` (filtrage principal), `langue_code` (filtrage multilingue).
*   **Relations** :
    *   `Catégorie (FK: parent_id)` | `1-N` | `ownership` | Nullable | `restrict`
    *   `Lieu (FK: category_id)` | `1-N` | `non-ownership` | Non nullable | `restrict`
    *   `LienArticleCatégorie (FK: category_id)` | `1-N` | `non-ownership` | Non nullable | `restrict`
    *   `SujetForum (FK: category_id)` | `1-N` | `non-ownership` | Non nullable | `restrict`
*   **États & machine à états** : Non applicable.
*   **Cycle de vie & rétention** :
    *   Création : Par l'administrateur ou via migration initiale.
    *   Mise à jour : Par l'administrateur.
    *   Suppression : Par l'administrateur, nécessite de vérifier qu'aucune entité (Lieu, Article, SujetForum) n'y est rattachée.
    *   Archivage : Non applicable.
    *   Durée de conservation : Indéfinie tant qu'elles sont utilisées.
*   **Exemples de lignes/objets** :
    ```json
    {
      "id": "0a1b2c3d-e5f6-7890-1234-567890abcdef",
      "nom": "Gastronomie",
      "slug": "gastronomie",
      "description": "Restaurants, bars et cafés de la ville.",
      "icone_url": "https://cdn.example.com/icons/gastronomy.svg",
      "parent_id": null,
      "level": 0,
      "type_categorie": "place_category",
      "langue_code": "fr"
    },
    {
      "id": "b1c2d3e4-f5a6-7890-1234-567890abcdef",
      "nom": "Restaurants",
      "slug": "restaurants",
      "description": "Tous les types de restaurants, du bistrot au gastronomique.",
      "icone_url": "https://cdn.example.com/icons/restaurant.svg",
      "parent_id": "0a1b2c3d-e5f6-7890-1234-567890abcdef",
      "level": 1,
      "type_categorie": "place_category",
      "langue_code": "fr"
    },
    {
      "id": "c1d2e3f4-a5b6-7890-1234-567890abcdef",
      "nom": "Top 10 des Pizzerias",
      "slug": "top-10-pizzerias",
      "description": "Les meilleures pizzerias de la ville sélectionnées par nos auteurs.",
      "icone_url": null,
      "parent_id": null,
      "level": 0,
      "type_categorie": "magazine_category",
      "langue_code": "fr"
    }
    ```

#### Entité : Lieu
*   **Description** : Représente un établissement ou un point d'intérêt physique dans la ville.
*   **Champs** :
    | Nom             | Type logique | Obligatoire | Unicité        | Valeur par défaut | Validation                               | Exemple                                        |
    | :-------------- | :----------- | :---------- | :------------- | :---------------- | :--------------------------------------- | :--------------------------------------------- |
    | `id`            | `uuid`       | Oui         | Oui (PK)       | Généré            | Format UUID                              | `p1a2c3e4-f5a6-7b8c-9d0e-1f2a3b4c5d6e`         |
    | `proprietaire_id` | `uuid`       | Oui         | Non            | Non applicable    | Référence à `Utilisateur.id`             | `e4a5b6c7-d8e9-0123-4567-890abcdef012`         |
    | `category_id`   | `uuid`       | Oui         | Non            | Non applicable    | Référence à `Catégorie.id` (type `place_category`) | `b1c2d3e4-f5a6-7890-1234-567890abcdef`         |
    | `latitude`      | `decimal`    | Oui         | Non            | Non applicable    | Entre -90 et 90                          | `48.8566`                                      |
    | `longitude`     | `decimal`    | Oui         | Non            | Non applicable    | Entre -180 et 180                        | `2.3522`                                       |
    | `adresse`       | `string`     | Oui         | Non            | Non applicable    | Max 255 caractères                       | `1 Rue de la Paix, 75001 Paris`                |
    | `telephone`     | `phone`      | Non         | Non            | Non applicable    | Format international                     | `+33 1 23 45 67 89`                            |
    | `email`         | `email`      | Non         | Non            | Non applicable    | Format email                             | `contact@pizzatime.com`                        |
    | `site_web`      | `url`        | Non         | Non            | Non applicable    | Format URL                               | `https://www.pizzatime.com`                    |
    | `status`        | `enum`       | Oui         | Non            | `pending_review`  | `pending_review`, `published`, `rejected` | `published`                                    |
    | `date_creation` | `datetime`   | Oui         | Non            | Maintenant        | Non applicable                           | `2023-10-26T10:05:00Z`                         |
    | `date_mise_a_jour` | `datetime`   | Oui         | Non            | Maintenant        | Non applicable                           | `2023-10-26T11:00:00Z`                         |
    | `image_principale_url` | `url`    | Non         | Non            | Non applicable    | Format URL                               | `https://cdn.example.com/places/pizza1.jpg`    |
*   **Contraintes** : `category_id` doit pointer vers une catégorie de `type_categorie = 'place_category'`.
*   **Indexation logique** : `proprietaire_id` (gestion par propriétaire), `category_id` (filtrage par catégorie), `status` (modération), `latitude`, `longitude` (recherche spatiale).
*   **Relations** :
    *   `Utilisateur (FK: proprietaire_id)` | `N-1` | `non-ownership` | Non nullable | `restrict`
    *   `Catégorie (FK: category_id)` | `N-1` | `non-ownership` | Non nullable | `restrict`
    *   `TraductionLieu (FK: place_id)` | `1-N` | `ownership` | Non nullable | `cascade`
    *   `AttributLieu (FK: place_id)` | `1-N` | `ownership` | Non nullable | `cascade`
    *   `DétailsHébergement (FK: place_id)` | `1-1` | `ownership` | Nullable | `cascade`
    *   `DétailsGastronomie (FK: place_id)` | `1-1` | `ownership` | Nullable | `cascade`
    *   `LienArticleLieu (FK: place_id)` | `N-M` (via table de liaison) | `non-ownership` | Non nullable | `restrict`
    *   `Avis (FK: place_id)` | `1-N` | `non-ownership` | Non nullable | `cascade`
    *   `Disponibilité (FK: place_id)` | `1-N` | `ownership` | Nullable | `cascade`
*   **États & machine à états** :
    *   **États** : `pending_review` (En attente de révision), `published` (Publié), `rejected` (Rejeté).
    *   **Transitions** :
        *   `pending_review` -> `published` (Garde: Par Administrateur ; Effet: Rendre le lieu public, créer JournalAudit)
        *   `pending_review` -> `rejected` (Garde: Par Administrateur ; Effet: Notifier le propriétaire, créer JournalAudit)
        *   `published` -> `pending_review` (Garde: Par Propriétaire (modification majeure), Administrateur (signalement) ; Effet: Rendre le lieu privé temporairement, créer JournalAudit)
        *   `published` -> `rejected` (Garde: Par Administrateur ; Effet: Rendre le lieu privé, notifier le propriétaire, créer JournalAudit)
        *   `rejected` -> `pending_review` (Garde: Par Propriétaire (après modifications) ; Effet: Soumettre à nouveau le lieu pour révision)
*   **Cycle de vie & rétention** :
    *   Création : Par un propriétaire via le formulaire de soumission. Statut initial `pending_review`.
    *   Mise à jour : Par le propriétaire (si `published`, peut repasser en `pending_review` si changements importants), ou par l'administrateur.
    *   Suppression : Soft delete (marquer `is_deleted = true`, masquer au public), ou hard delete par administrateur après un délai.
    *   Archivage : Les lieux `rejected` ou `deleted` sont archivés après 5 ans.
    *   Durée de conservation : Les données des lieux `published` sont conservées indéfiniment.
*   **Exemples de lignes/objets** :
    ```json
    {
      "id": "p1a2c3e4-f5a6-7b8c-9d0e-1f2a3b4c5d6e",
      "proprietaire_id": "e4a5b6c7-d8e9-0123-4567-890abcdef012",
      "category_id": "b1c2d3e4-f5a6-7890-1234-567890abcdef",
      "latitude": 48.8584,
      "longitude": 2.2945,
      "adresse": "Tour Eiffel, Champ de Mars, 5 Avenue Anatole France, 75007 Paris, France",
      "telephone": "+33 892 70 12 39",
      "email": "contact@toureiffel.paris",
      "site_web": "https://www.toureiffel.paris",
      "status": "published",
      "date_creation": "2023-10-25T09:15:00Z",
      "date_mise_a_jour": "2023-10-26T11:30:00Z",
      "image_principale_url": "https://cdn.example.com/places/eiffel_tower.jpg"
    }
    ```

#### Entité : TraductionLieu
*   **Description** : Contient les informations descriptives d'un lieu dans une langue spécifique.
*   **Champs** :
    | Nom           | Type logique | Obligatoire | Unicité        | Valeur par défaut | Validation               | Exemple                                        |
    | :------------ | :----------- | :---------- | :------------- | :---------------- | :----------------------- | :--------------------------------------------- |
    | `id`          | `uuid`       | Oui         | Oui (PK)       | Généré            | Format UUID              | `t1r2a3d4-e5f6-7890-1234-567890abcdef`         |
    | `place_id`    | `uuid`       | Oui         | Non            | Non applicable    | Référence à `Lieu.id`    | `p1a2c3e4-f5a6-7b8c-9d0e-1f2a3b4c5d6e`         |
    | `langue_code` | `string`     | Oui         | Oui (composite) | `fr`              | Code ISO 639-1           | `en`                                           |
    | `nom`         | `string`     | Oui         | Non            | Non applicable    | Min 3, Max 255 caractères | `Tour Eiffel`                                  |
    | `slug`        | `string`     | Oui         | Oui (composite) | Dérivé de `nom`   | Min 3, Max 255 caractères | `tour-eiffel`                                  |
    | `description` | `text`       | Oui         | Non            | Non applicable    | Min 10 caractères        | `Monument emblématique de Paris...`            |
*   **Contraintes** : `(place_id, langue_code)` doit être unique. `(place_id, slug)` doit être unique.
*   **Indexation logique** : `place_id` (récupération rapide des traductions d'un lieu), `langue_code` (filtrage par langue), `slug` (navigation URL).
*   **Relations** : `Lieu (FK: place_id)` | `N-1` | `ownership` | Non nullable | `cascade`
*   **États & machine à états** : Non applicable.
*   **Cycle de vie & rétention** : Lié au `Lieu` parent. Créé, mis à jour et supprimé en même temps.
*   **Exemples de lignes/objets** :
    ```json
    {
      "id": "t1r2a3d4-e5f6-7890-1234-567890abcdef",
      "place_id": "p1a2c3e4-f5a6-7b8c-9d0e-1f2a3b4c5d6e",
      "langue_code": "fr",
      "nom": "Tour Eiffel",
      "slug": "tour-eiffel",
      "description": "La Tour Eiffel, symbole incontestable de Paris et de la France, est une tour de fer puddlé de 330 mètres de hauteur (avec antennes)."
    },
    {
      "id": "t5r6a7d8-e9f0-1234-5678-90abcdef0123",
      "place_id": "p1a2c3e4-f5a6-7b8c-9d0e-1f2a3b4c5d6e",
      "langue_code": "en",
      "nom": "Eiffel Tower",
      "slug": "eiffel-tower",
      "description": "The Eiffel Tower, an undeniable symbol of Paris and France, is a 330-meter high wrought-iron lattice tower (with antennas)."
    }
    ```

#### Entité : AttributLieu
*   **Description** : Permet de stocker des caractéristiques dynamiques pour un lieu.
*   **Champs** :
    | Nom           | Type logique | Obligatoire | Unicité        | Valeur par défaut | Validation                   | Exemple        |
    | :------------ | :----------- | :---------- | :------------- | :---------------- | :--------------------------- | :------------- |
    | `id`          | `uuid`       | Oui         | Oui (PK)       | Généré            | Format UUID                  | `a1t2t3r4-e5f6-7890-1234-567890abcdef`         |
    | `place_id`    | `uuid`       | Oui         | Non            | Non applicable    | Référence à `Lieu.id`        | `p1a2c3e4-f5a6-7b8c-9d0e-1f2a3b4c5d6e`         |
    | `cle`         | `string`     | Oui         | Oui (composite) | Non applicable    | Min 1, Max 100 caractères, camelCase/snake_case | `wifiDisponible`         |
    | `valeur`      | `string`     | Oui         | Non            | Non applicable    | Min 1, Max 255 caractères    | `Oui`          |
    | `type_valeur` | `enum`       | Oui         | Non            | `string`          | `string`, `boolean`, `integer`, `decimal`, `date`, `url` | `boolean`        |
    | `position`    | `integer`    | Oui         | Non            | 0                 | >= 0                         | `1`            |
*   **Contraintes** : `(place_id, cle)` doit être unique.
*   **Indexation logique** : `place_id` (récupération rapide des attributs), `cle` (recherche d'attribut spécifique).
*   **Relations** : `Lieu (FK: place_id)` | `N-1` | `ownership` | Non nullable | `cascade`
*   **États & machine à états** : Non applicable.
*   **Cycle de vie & rétention** : Lié au `Lieu` parent.
*   **Exemples de lignes/objets** :
    ```json
    {
      "id": "a1t2t3r4-e5f6-7890-1234-567890abcdef",
      "place_id": "p1a2c3e4-f5a6-7b8c-9d0e-1f2a3b4c5d6e",
      "cle": "wifiDisponible",
      "valeur": "true",
      "type_valeur": "boolean",
      "position": 1
    },
    {
      "id": "a5t6t7r8-e9f0-1234-5678-90abcdef0123",
      "place_id": "p1a2c3e4-f5a6-7b8c-9d0e-1f2a3b4c5d6e",
      "cle": "terrasseExterieure",
      "valeur": "false",
      "type_valeur": "boolean",
      "position": 2
    }
    ```

#### Entité : DétailsHébergement
*   **Description** : Détails spécifiques pour les lieux classés comme hébergements.
*   **Champs** :
    | Nom                   | Type logique | Obligatoire | Unicité        | Valeur par défaut | Validation                               | Exemple        |
    | :-------------------- | :----------- | :---------- | :------------- | :---------------- | :--------------------------------------- | :------------- |
    | `place_id`            | `uuid`       | Oui         | Oui (PK)       | Non applicable    | Référence à `Lieu.id`                  | `h1e2b3e4-f5a6-7b8c-9d0e-1f2a3b4c5d6e`         |
    | `nombre_etoiles`      | `integer`    | Non         | Non            | Non applicable    | Entre 1 et 5                             | `4`            |
    | `capacite_max_personnes` | `integer`    | Non         | Non            | Non applicable    | >= 1                                     | `150`          |
    | `check_in_heure`      | `time`       | Non         | Non            | `15:00`           | Format HH:MM                             | `14:00`        |
    | `check_out_heure`     | `time`       | Non         | Non            | `11:00`           | Format HH:MM                             | `12:00`        |
    | `services_inclus`     | `array`      | Non         | Non            | `[]`              | Tableau de chaînes (max 100 caractères par item) | `["Petit-déjeuner", "Piscine"]` |
*   **Contraintes** : `place_id` doit correspondre à un `Lieu` dont la `category_id` est de type "hébergement".
*   **Indexation logique** : `place_id`.
*   **Relations** : `Lieu (FK: place_id)` | `1-1` | `ownership` | Non nullable | `cascade`
*   **États & machine à états** : Non applicable.
*   **Cycle de vie & rétention** : Lié au `Lieu` parent.
*   **Exemples de lignes/objets** :
    ```json
    {
      "place_id": "h1e2b3e4-f5a6-7b8c-9d0e-1f2a3b4c5d6e",
      "nombre_etoiles": 5,
      "capacite_max_personnes": 200,
      "check_in_heure": "15:00",
      "check_out_heure": "11:00",
      "services_inclus": ["Petit-déjeuner", "Wi-Fi Gratuit", "Spa"]
    }
    ```

#### Entité : DétailsGastronomie
*   **Description** : Détails spécifiques pour les lieux classés comme restaurants, bars, cafés.
*   **Champs** :
    | Nom           | Type logique | Obligatoire | Unicité        | Valeur par défaut | Validation                               | Exemple        |
    | :------------ | :----------- | :---------- | :------------- | :---------------- | :--------------------------------------- | :------------- |
    | `place_id`    | `uuid`       | Oui         | Oui (PK)       | Non applicable    | Référence à `Lieu.id`                  | `g1a2s3t4-o5n6-7b8c-9d0e-1f2a3b4c5d6e`         |
    | `type_cuisine`| `array`      | Non         | Non            | `[]`              | Tableau de chaînes (max 50 caractères par item) | `["Italienne", "Végétarienne"]` |
    | `prix_moyen`  | `decimal`    | Non         | Non            | Non applicable    | >= 0                                     | `30.50`        |
    | `options_diet`| `array`      | Non         | Non            | `[]`              | Tableau de chaînes (max 50 caractères par item) | `["Végétarien", "Sans Gluten"]` |
    | `ambiance`    | `array`      | Non         | Non            | `[]`              | Tableau de chaînes (max 50 caractères par item) | `["Branché", "Cosy"]`        |
*   **Contraintes** : `place_id` doit correspondre à un `Lieu` dont la `category_id` est de type "gastronomie".
*   **Indexation logique** : `place_id`.
*   **Relations** : `Lieu (FK: place_id)` | `1-1` | `ownership` | Non nullable | `cascade`
*   **États & machine à états** : Non applicable.
*   **Cycle de vie & rétention** : Lié au `Lieu` parent.
*   **Exemples de lignes/objets** :
    ```json
    {
      "place_id": "g1a2s3t4-o5n6-7b8c-9d0e-1f2a3b4c5d6e",
      "type_cuisine": ["Française", "Moderne"],
      "prix_moyen": 45.00,
      "options_diet": ["Végétarien"],
      "ambiance": ["Élégant", "Romantique"]
    }
    ```

#### Entité : Article
*   **Description** : Contenu rédactionnel (magazine) créé par un auteur.
*   **Champs** :
    | Nom             | Type logique | Obligatoire | Unicité        | Valeur par défaut | Validation                               | Exemple                                        |
    | :-------------- | :----------- | :---------- | :------------- | :---------------- | :--------------------------------------- | :--------------------------------------------- |
    | `id`            | `uuid`       | Oui         | Oui (PK)       | Généré            | Format UUID                              | `ar1t2i3c4l5e6-7890-1234-567890abcdef`         |
    | `auteur_id`     | `uuid`       | Oui         | Non            | Non applicable    | Référence à `Utilisateur.id`             | `e4a5b6c7-d8e9-0123-4567-890abcdef012`         |
    | `titre`         | `string`     | Oui         | Non            | Non applicable    | Min 5, Max 255 caractères                | `Les 5 meilleures pizzerias du quartier`       |
    | `slug`          | `string`     | Oui         | Oui (composite) | Dérivé de `titre` | Min 5, Max 255 caractères                | `top-5-pizzerias-quartier`                     |
    | `description_courte` | `text`    | Non         | Non            | Non applicable    | Max 300 caractères                       | `Découvrez notre sélection des meilleures...`  |
    | `image_couverture_url` | `url`  | Non         | Non            | Non applicable    | Format URL                               | `https://cdn.example.com/articles/pizza.jpg`   |
    | `langue_code`   | `string`     | Oui         | Non            | `fr`              | Code ISO 639-1                           | `fr`                                           |
    | `status`        | `enum`       | Oui         | Non            | `draft`           | `draft`, `published`, `archived`         | `published`                                    |
    | `date_creation` | `datetime`   | Oui         | Non            | Maintenant        | Non applicable                           | `2023-10-26T12:00:00Z`                         |
    | `date_publication` | `datetime`  | Non         | Non            | Non applicable    | Non applicable (si `published`)          | `2023-10-27T10:00:00Z`                         |
    | `date_mise_a_jour` | `datetime`  | Oui         | Non            | Maintenant        | Non applicable                           | `2023-10-27T10:00:00Z`                         |
*   **Contraintes** : `(slug, langue_code)` doit être unique. `date_publication` doit être définie si `status = 'published'`.
*   **Indexation logique** : `auteur_id` (articles par auteur), `slug` (navigation URL), `status` (filtrage par statut), `langue_code`.
*   **Relations** :
    *   `Utilisateur (FK: auteur_id)` | `N-1` | `ownership` | Non nullable | `restrict`
    *   `ContenuArticle (FK: article_id)` | `1-1` | `ownership` | Non nullable | `cascade`
    *   `LienArticleCatégorie (FK: article_id)` | `1-N` | `ownership` | Non nullable | `cascade`
    *   `LienArticleLieu (FK: article_id)` | `1-N` | `ownership` | Non nullable | `cascade`
    *   `Commentaire (FK: article_id)` | `1-N` | `non-ownership` | Non nullable | `cascade`
*   **États & machine à états** :
    *   **États** : `draft` (Brouillon), `published` (Publié), `archived` (Archivé).
    *   **Transitions** :
        *   `draft` -> `published` (Garde: Par Auteur ou Admin ; Effet: Définir `date_publication`, rendre l'article public)
        *   `published` -> `archived` (Garde: Par Auteur ou Admin ; Effet: Rendre l'article privé)
        *   `archived` -> `published` (Garde: Par Auteur ou Admin ; Effet: Rendre l'article public)
        *   `any` -> `draft` (Garde: Par Auteur ou Admin ; Effet: Mettre l'article en brouillon pour modifications)
*   **Cycle de vie & rétention** :
    *   Création : Par un auteur via l'éditeur. Statut initial `draft`.
    *   Mise à jour : Par l'auteur (titre, slug, description, contenu, statut), ou par l'administrateur (statut, modération).
    *   Suppression : Soft delete (marquer `is_deleted = true`, masquer au public), ou hard delete par administrateur après un délai.
    *   Archivage : Les articles archivés restent accessibles aux auteurs et admins.
    *   Durée de conservation : Les données des articles `published` sont conservées indéfiniment.
*   **Exemples de lignes/objets** :
    ```json
    {
      "id": "ar1t2i3c4l5e6-7890-1234-567890abcdef",
      "auteur_id": "e4a5b6c7-d8e9-0123-4567-890abcdef012",
      "titre": "Les 5 plus beaux parcs pour pique-niquer à Paris",
      "slug": "top-5-parcs-pique-niquer-paris",
      "description_courte": "Découvrez notre sélection des espaces verts idéaux pour un déjeuner en plein air.",
      "image_couverture_url": "https://cdn.example.com/articles/parcs_paris.jpg",
      "langue_code": "fr",
      "status": "published",
      "date_creation": "2023-10-20T08:00:00Z",
      "date_publication": "2023-10-21T09:00:00Z",
      "date_mise_a_jour": "2023-10-21T09:00:00Z"
    }
    ```

#### Entité : ContenuArticle
*   **Description** : Contient la structure des blocs de contenu de l'article, au format JSON.
*   **Champs** :
    | Nom        | Type logique | Obligatoire | Unicité        | Valeur par défaut | Validation               | Exemple                                        |
    | :--------- | :----------- | :---------- | :------------- | :---------------- | :----------------------- | :--------------------------------------------- |
    | `id`       | `uuid`       | Oui         | Oui (PK)       | Généré            | Format UUID              | `co1n2t3e4n5u6-7890-1234-567890abcdef`         |
    | `article_id` | `uuid`     | Oui         | Oui (FK)       | Non applicable    | Référence à `Article.id` | `ar1t2i3c4l5e6-7890-1234-567890abcdef`         |
    | `blocs`    | `json`       | Oui         | Non            | `[]`              | Schéma de blocs JSON     | `[{"type": "paragraph", "content": "..."}]`    |
*   **Contraintes** : `article_id` est clé primaire et étrangère (relation 1-1).
*   **Indexation logique** : `article_id`.
*   **Relations** : `Article (FK: article_id)` | `1-1` | `ownership` | Non nullable | `cascade`
*   **États & machine à états** : Non applicable.
*   **Cycle de vie & rétention** : Lié à l'`Article` parent.
*   **Exemples de lignes/objets** :
    ```json
    {
      "id": "co1n2t3e4n5u6-7890-1234-567890abcdef",
      "article_id": "ar1t2i3c4l5e6-7890-1234-567890abcdef",
      "blocs": [
        {
          "type": "paragraph",
          "content": "Paris regorge de magnifiques parcs, parfaits pour une échappée verte au cœur de la ville lumière. Que vous soyez en quête de calme ou d'un lieu animé pour un pique-nique entre amis, notre sélection vous guidera."
        },
        {
          "type": "heading",
          "level": 2,
          "content": "1. Le Jardin du Luxembourg"
        },
        {
          "type": "paragraph",
          "content": "Situé dans le 6ème arrondissement, ce jardin historique est un favori des Parisiens. Idéal pour... "
        },
        {
          "type": "place_link",
          "place_id": "p1a2c3e4-f5a6-7b8c-9d0e-1f2a3b4c5d6e",
          "text": "la Tour Eiffel"
        },
        {
          "type": "place_comparison",
          "place_ids": ["place_id_A", "place_id_B"],
          "attributes": ["wifi", "terrasse", "prix_moyen"]
        }
      ]
    }
    ```

#### Entité : LienArticleCatégorie
*   **Description** : Table de liaison pour associer un article à plusieurs catégories de type 'magazine_category'.
*   **Champs** :
    | Nom           | Type logique | Obligatoire | Unicité        | Valeur par défaut | Validation                  | Exemple                                        |
    | :------------ | :----------- | :---------- | :------------- | :---------------- | :-------------------------- | :--------------------------------------------- |
    | `id`          | `uuid`       | Oui         | Oui (PK)       | Généré            | Format UUID                 | `la1c2e3n4t5e6-7890-1234-567890abcdef`         |
    | `article_id`  | `uuid`       | Oui         | Oui (composite) | Non applicable    | Référence à `Article.id`    | `ar1t2i3c4l5e6-7890-1234-567890abcdef`         |
    | `category_id` | `uuid`       | Oui         | Oui (composite) | Non applicable    | Référence à `Catégorie.id` (type `magazine_category`) | `c1d2e3f4-a5b6-7890-1234-567890abcdef`         |
*   **Contraintes** : `(article_id, category_id)` doit être unique. `category_id` doit pointer vers une catégorie de `type_categorie = 'magazine_category'`.
*   **Indexation logique** : `article_id`, `category_id`.
*   **Relations** :
    *   `Article (FK: article_id)` | `N-1` | `ownership` | Non nullable | `cascade`
    *   `Catégorie (FK: category_id)` | `N-1` | `non-ownership` | Non nullable | `restrict`
*   **États & machine à états** : Non applicable.
*   **Cycle de vie & rétention** : Lié aux entités parentes.
*   **Exemples de lignes/objets** :
    ```json
    {
      "id": "la1c2e3n4t5e6-7890-1234-567890abcdef",
      "article_id": "ar1t2i3c4l5e6-7890-1234-567890abcdef",
      "category_id": "c1d2e3f4-a5b6-7890-1234-567890abcdef"
    }
    ```

#### Entité : LienArticleLieu
*   **Description** : Table de liaison pour associer un article à un ou plusieurs lieux mentionnés.
*   **Champs** :
    | Nom        | Type logique | Obligatoire | Unicité        | Valeur par défaut | Validation               | Exemple                                        |
    | :--------- | :----------- | :---------- | :------------- | :---------------- | :----------------------- | :--------------------------------------------- |
    | `id`       | `uuid`       | Oui         | Oui (PK)       | Généré            | Format UUID              | `la1l2i3e4u5x6-7890-1234-567890abcdef`         |
    | `article_id` | `uuid`     | Oui         | Oui (composite) | Non applicable    | Référence à `Article.id` | `ar1t2i3c4l5e6-7890-1234-567890abcdef`         |
    | `place_id` | `uuid`       | Oui         | Oui (composite) | Non applicable    | Référence à `Lieu.id`    | `p1a2c3e4-f5a6-7b8c-9d0e-1f2a3b4c5d6e`         |
*   **Contraintes** : `(article_id, place_id)` doit être unique.
*   **Indexation logique** : `article_id`, `place_id`.
*   **Relations** :
    *   `Article (FK: article_id)` | `N-1` | `ownership` | Non nullable | `cascade`
    *   `Lieu (FK: place_id)` | `N-1` | `non-ownership` | Non nullable | `restrict`
*   **États & machine à états** : Non applicable.
*   **Cycle de vie & rétention** : Lié aux entités parentes.
*   **Exemples de lignes/objets** :
    ```json
    {
      "id": "la1l2i3e4u5x6-7890-1234-567890abcdef",
      "article_id": "ar1t2i3c4l5e6-7890-1234-567890abcdef",
      "place_id": "p1a2c3e4-f5a6-7b8c-9d0e-1f2a3b4c5d6e"
    }
    ```

#### Entité : Avis
*   **Description** : Un avis structuré laissé par un utilisateur sur un lieu, avec une notation globale et des sous-notations.
*   **Champs** :
    | Nom                 | Type logique | Obligatoire | Unicité        | Valeur par défaut | Validation                               | Exemple                                        |
    | :------------------ | :----------- | :---------- | :------------- | :---------------- | :--------------------------------------- | :--------------------------------------------- |
    | `id`                | `uuid`       | Oui         | Oui (PK)       | Généré            | Format UUID                              | `a1v2i3s4c5t6-7890-1234-567890abcdef`         |
    | `utilisateur_id`    | `uuid`       | Oui         | Non            | Non applicable    | Référence à `Utilisateur.id`             | `e4a5b6c7-d8e9-0123-4567-890abcdef012`         |
    | `place_id`          | `uuid`       | Oui         | Non            | Non applicable    | Référence à `Lieu.id`                    | `p1a2c3e4-f5a6-7b8c-9d0e-1f2a3b4c5d6e`         |
    | `parent_review_id`  | `uuid`       | Non         | Non            | Non applicable    | Référence à `Avis.id` (pour réponses)    | `a1v2i3s4c5t6-7890-1234-567890abcdef`         |
    | `notation_globale`  | `integer`    | Oui         | Non            | Non applicable    | Entre 1 et 5                             | `4`                                            |
    | `titre`             | `string`     | Non         | Non            | Non applicable    | Max 100 caractères                       | `Excellent restaurant italien`                 |
    | `contenu`           | `text`       | Oui         | Non            | Non applicable    | Min 10, Max 2000 caractères              | `L'ambiance était super, les pâtes délicieuses...` |
    | `date_creation`     | `datetime`   | Oui         | Non            | Maintenant        | Non applicable                           | `2023-10-27T14:00:00Z`                         |
    | `date_mise_a_jour`  | `datetime`   | Oui         | Non            | Maintenant        | Non applicable                           | `2023-10-27T14:00:00Z`                         |
    | `est_modere`        | `boolean`    | Oui         | Non            | `false`           | Non applicable                           | `true`                                         |
    | `langue_code`       | `string`     | Oui         | Non            | `fr`              | Code ISO 639-1                           | `en` (Deduction H: la page est multilingue)    |
*   **Contraintes** : Un utilisateur ne peut laisser qu'un seul avis parent par lieu (déduction M pour éviter le spam et maintenir la pertinence). `parent_review_id` doit être un `Avis` existant lié au même `place_id`.
*   **Indexation logique** : `utilisateur_id`, `place_id` (récupération des avis pour un lieu), `parent_review_id` (récupération des réponses).
*   **Relations** :
    *   `Utilisateur (FK: utilisateur_id)` | `N-1` | `ownership` | Non nullable | `restrict`
    *   `Lieu (FK: place_id)` | `N-1` | `non-ownership` | Non nullable | `restrict`
    *   `Avis (FK: parent_review_id)` | `1-N` | `ownership` | Nullable | `cascade`
    *   `SousNotation (FK: avis_id)` | `1-N` | `ownership` | Non nullable | `cascade`
*   **États & machine à états** : Non applicable (la modération est un flag).
*   **Cycle de vie & rétention** :
    *   Création : Par un utilisateur sur la page d'un lieu.
    *   Mise à jour : Par l'utilisateur (son propre avis) ou l'administrateur (modération).
    *   Suppression : Soft delete (masquer l'avis), ou hard delete par administrateur.
    *   Archivage : Non applicable.
    *   Durée de conservation : Indéfinie si `published`.
*   **Exemples de lignes/objets** :
    ```json
    {
      "id": "a1v2i3s4c5t6-7890-1234-567890abcdef",
      "utilisateur_id": "e4a5b6c7-d8e9-0123-4567-890abcdef012",
      "place_id": "p1a2c3e4-f5a6-7b8c-9d0e-1f2a3b4c5d6e",
      "parent_review_id": null,
      "notation_globale": 5,
      "titre": "Magnifique ! Incontournable",
      "contenu": "La Tour Eiffel offre une vue imprenable sur Paris. L'expérience est unique, surtout au coucher du soleil.",
      "date_creation": "2023-10-27T14:00:00Z",
      "date_mise_a_jour": "2023-10-27T14:00:00Z",
      "est_modere": false,
      "langue_code": "fr"
    },
    {
      "id": "a7v8i9s0c1t2-3456-7890-1234-567890abcdef",
      "utilisateur_id": "p3r4o5p6r7i8-9012-3456-7890-1234567890ab",
      "place_id": "p1a2c3e4-f5a6-7b8c-9d0e-1f2a3b4c5d6e",
      "parent_review_id": "a1v2i3s4c5t6-7890-1234-567890abcdef",
      "notation_globale": null,
      "titre": null,
      "contenu": "Nous vous remercions pour votre aimable commentaire ! Nous sommes ravis que vous ayez apprécié la vue.",
      "date_creation": "2023-10-27T15:00:00Z",
      "date_mise_a_jour": "2023-10-27T15:00:00Z",
      "est_modere": false,
      "langue_code": "fr"
    }
    ```

#### Entité : SousNotation
*   **Description** : Une notation détaillée sur un critère spécifique au sein d'un avis.
*   **Champs** :
    | Nom           | Type logique | Obligatoire | Unicité        | Valeur par défaut | Validation                               | Exemple        |
    | :------------ | :----------- | :---------- | :------------- | :---------------- | :--------------------------------------- | :------------- |
    | `id`          | `uuid`       | Oui         | Oui (PK)       | Généré            | Format UUID                              | `s1o2u3s4n5o6-7890-1234-567890abcdef`         |
    | `avis_id`     | `uuid`       | Oui         | Non            | Non applicable    | Référence à `Avis.id`                    | `a1v2i3s4c5t6-7890-1234-567890abcdef`         |
    | `cle_notation`| `string`     | Oui         | Oui (composite) | Non applicable    | Min 1, Max 50 caractères                 | `propreté`     |
    | `valeur`      | `integer`    | Oui         | Non            | Non applicable    | Entre 1 et 5                             | `4`            |
*   **Contraintes** : `(avis_id, cle_notation)` doit être unique.
*   **Indexation logique** : `avis_id`.
*   **Relations** : `Avis (FK: avis_id)` | `N-1` | `ownership` | Non nullable | `cascade`
*   **États & machine à états** : Non applicable.
*   **Cycle de vie & rétention** : Lié à l'`Avis` parent.
*   **Exemples de lignes/objets** :
    ```json
    {
      "id": "s1o2u3s4n5o6-7890-1234-567890abcdef",
      "avis_id": "a1v2i3s4c5t6-7890-1234-567890abcdef",
      "cle_notation": "ambiance",
      "valeur": 5
    },
    {
      "id": "s7o8u9s0n1o2-3456-7890-1234-567890abcdef",
      "avis_id": "a1v2i3s4c5t6-7890-1234-567890abcdef",
      "cle_notation": "service",
      "valeur": 4
    }
    ```

#### Entité : Commentaire
*   **Description** : Un commentaire laissé par un utilisateur sur un article.
*   **Champs** :
    | Nom                | Type logique | Obligatoire | Unicité        | Valeur par défaut | Validation                               | Exemple                                        |
    | :----------------- | :----------- | :---------- | :------------- | :---------------- | :--------------------------------------- | :--------------------------------------------- |
    | `id`               | `uuid`       | Oui         | Oui (PK)       | Généré            | Format UUID                              | `c1o2m3m4e5n6t7-8901-2345-6789-0abcdef0123`   |
    | `utilisateur_id`   | `uuid`       | Oui         | Non            | Non applicable    | Référence à `Utilisateur.id`             | `e4a5b6c7-d8e9-0123-4567-890abcdef012`         |
    | `article_id`       | `uuid`       | Oui         | Non            | Non applicable    | Référence à `Article.id`                 | `ar1t2i3c4l5e6-7890-1234-567890abcdef`         |
    | `parent_comment_id`| `uuid`       | Non         | Non            | Non applicable    | Référence à `Commentaire.id` (pour réponses) | `c1o2m3m4e5n6t7-8901-2345-6789-0abcdef0123`   |
    | `contenu`          | `text`       | Oui         | Non            | Non applicable    | Min 10, Max 2000 caractères              | `Très bel article, je connais ce parc !`      |
    | `date_creation`    | `datetime`   | Oui         | Non            | Maintenant        | Non applicable                           | `2023-10-27T16:00:00Z`                         |
    | `date_mise_a_jour` | `datetime`   | Oui         | Non            | Maintenant        | Non applicable                           | `2023-10-27T16:00:00Z`                         |
    | `est_modere`       | `boolean`    | Oui         | Non            | `false`           | Non applicable                           | `false`                                        |
    | `langue_code`      | `string`     | Oui         | Non            | `fr`              | Code ISO 639-1                           | `fr` (Deduction H: la page est multilingue)    |
*   **Contraintes** : `parent_comment_id` doit être un `Commentaire` existant lié au même `article_id`.
*   **Indexation logique** : `utilisateur_id`, `article_id` (récupération des commentaires pour un article), `parent_comment_id` (récupération des réponses).
*   **Relations** :
    *   `Utilisateur (FK: utilisateur_id)` | `N-1` | `ownership` | Non nullable | `restrict`
    *   `Article (FK: article_id)` | `N-1` | `non-ownership` | Non nullable | `restrict`
    *   `Commentaire (FK: parent_comment_id)` | `1-N` | `ownership` | Nullable | `cascade`
*   **États & machine à états** : Non applicable.
*   **Cycle de vie & rétention** : Lié à l'`Article` parent.
*   **Exemples de lignes/objets** :
    ```json
    {
      "id": "c1o2m3m4e5n6t7-8901-2345-6789-0abcdef0123",
      "utilisateur_id": "e4a5b6c7-d8e9-0123-4567-890abcdef012",
      "article_id": "ar1t2i3c4l5e6-7890-1234-567890abcdef",
      "parent_comment_id": null,
      "contenu": "J'adore cette sélection, le Jardin du Luxembourg est mon préféré pour lire et se détendre. Merci pour cet article !",
      "date_creation": "2023-10-27T16:00:00Z",
      "date_mise_a_jour": "2023-10-27T16:00:00Z",
      "est_modere": false,
      "langue_code": "fr"
    },
    {
      "id": "c8o9m0m1e2n3t4-5678-9012-3456-7890abcdef01",
      "utilisateur_id": "p3r4o5p6r7i8-9012-3456-7890-1234567890ab",
      "article_id": "ar1t2i3c4l5e6-7890-1234-567890abcdef",
      "parent_comment_id": "c1o2m3m4e5n6t7-8901-2345-6789-0abcdef0123",
      "contenu": "De rien ! Heureux que notre guide vous soit utile.",
      "date_creation": "2023-10-27T16:15:00Z",
      "date_mise_a_jour": "2023-10-27T16:15:00Z",
      "est_modere": false,
      "langue_code": "fr"
    }
    ```

#### Entité : SujetForum
*   **Description** : Le message initial d'une discussion dans une catégorie de forum.
*   **Champs** :
    | Nom                | Type logique | Obligatoire | Unicité        | Valeur par défaut | Validation                               | Exemple                                        |
    | :----------------- | :----------- | :---------- | :------------- | :---------------- | :--------------------------------------- | :--------------------------------------------- |
    | `id`               | `uuid`       | Oui         | Oui (PK)       | Généré            | Format UUID                              | `s1u2j3e4t5f6o7-8901-2345-6789-0abcdef0123`   |
    | `utilisateur_id`   | `uuid`       | Oui         | Non            | Non applicable    | Référence à `Utilisateur.id`             | `e4a5b6c7-d8e9-0123-4567-890abcdef012`         |
    | `category_id`      | `uuid`       | Oui         | Non            | Non applicable    | Référence à `Catégorie.id` (type `forum_category`) | `c1d2e3f4-a5b6-7890-1234-567890abcdef`         |
    | `titre`            | `string`     | Oui         | Non            | Non applicable    | Min 5, Max 255 caractères                | `Idées de randonnée en forêt de Fontainebleau` |
    | `contenu_initial`  | `text`       | Oui         | Non            | Non applicable    | Min 10, Max 5000 caractères              | `Bonjour à tous, je cherche des itinéraires...` |
    | `date_creation`    | `datetime`   | Oui         | Non            | Maintenant        | Non applicable                           | `2023-10-27T17:00:00Z`                         |
    | `date_derniere_activite` | `datetime` | Oui       | Non            | Maintenant        | Non applicable                           | `2023-10-27T17:00:00Z`                         |
    | `nombre_messages`  | `integer`    | Oui         | Non            | 0                 | >= 0                                     | `5`                                            |
    | `est_ferme`        | `boolean`    | Oui         | Non            | `false`           | Non applicable                           | `false`                                        |
    | `est_epingle`      | `boolean`    | Oui         | Non            | `false`           | Non applicable                           | `false`                                        |
    | `langue_code`      | `string`     | Oui         | Non            | `fr`              | Code ISO 639-1                           | `fr` (Deduction H: la page est multilingue)    |
*   **Contraintes** : `category_id` doit pointer vers une catégorie de `type_categorie = 'forum_category'`.
*   **Indexation logique** : `utilisateur_id`, `category_id` (sujets par catégorie), `date_derniere_activite` (tri par activité récente).
*   **Relations** :
    *   `Utilisateur (FK: utilisateur_id)` | `N-1` | `ownership` | Non nullable | `restrict`
    *   `Catégorie (FK: category_id)` | `N-1` | `non-ownership` | Non nullable | `restrict`
    *   `MessageForum (FK: sujet_id)` | `1-N` | `ownership` | Non nullable | `cascade`
*   **États & machine à états** : Non applicable (les flags `est_ferme` et `est_epingle` sont gérés indépendamment).
*   **Cycle de vie & rétention** :
    *   Création : Par un utilisateur dans une catégorie de forum.
    *   Mise à jour : Par l'utilisateur (son propre sujet, si non fermé) ou l'administrateur (titre, fermeture, épinglage, modération).
    *   Suppression : Soft delete, ou hard delete par administrateur.
    *   Archivage : Non applicable.
    *   Durée de conservation : Indéfinie si non supprimé.
*   **Exemples de lignes/objets** :
    ```json
    {
      "id": "s1u2j3e4t5f6o7-8901-2345-6789-0abcdef0123",
      "utilisateur_id": "e4a5b6c7-d8e9-0123-4567-890abcdef012",
      "category_id": "forum_randonnee_id",
      "titre": "Meilleurs spots pour l'observation des oiseaux en ville ?",
      "contenu_initial": "Bonjour la communauté, je suis passionné d'ornithologie et je cherche des recoins tranquilles en ville où l'on peut observer différentes espèces d'oiseaux. Des idées ?",
      "date_creation": "2023-10-27T17:00:00Z",
      "date_derniere_activite": "2023-10-27T17:30:00Z",
      "nombre_messages": 3,
      "est_ferme": false,
      "est_epingle": false,
      "langue_code": "fr"
    }
    ```

#### Entité : MessageForum
*   **Description** : Une réponse ou un message dans un sujet de forum.
*   **Champs** :
    | Nom                | Type logique | Obligatoire | Unicité        | Valeur par défaut | Validation                               | Exemple                                        |
    | :----------------- | :----------- | :---------- | :------------- | :---------------- | :--------------------------------------- | :--------------------------------------------- |
    | `id`               | `uuid`       | Oui         | Oui (PK)       | Généré            | Format UUID                              | `m1e2s3s4a5g6e7-8901-2345-6789-0abcdef0123`   |
    | `utilisateur_id`   | `uuid`       | Oui         | Non            | Non applicable    | Référence à `Utilisateur.id`             | `e4a5b6c7-d8e9-0123-4567-890abcdef012`         |
    | `sujet_id`         | `uuid`       | Oui         | Non            | Non applicable    | Référence à `SujetForum.id`              | `s1u2j3e4t5f6o7-8901-2345-6789-0abcdef0123`   |
    | `parent_message_id`| `uuid`       | Non         | Non            | Non applicable    | Référence à `MessageForum.id` (pour réponses) | `m1e2s3s4a5g6e7-8901-2345-6789-0abcdef0123`   |
    | `contenu`          | `text`       | Oui         | Non            | Non applicable    | Min 10, Max 5000 caractères              | `J'ai vu des faucons crécerelle au Parc...`   |
    | `date_creation`    | `datetime`   | Oui         | Non            | Maintenant        | Non applicable                           | `2023-10-27T17:15:00Z`                         |
    | `date_mise_a_jour` | `datetime`   | Oui         | Non            | Maintenant        | Non applicable                           | `2023-10-27T17:15:00Z`                         |
    | `est_modere`       | `boolean`    | Oui         | Non            | `false`           | Non applicable                           | `false`                                        |
*   **Contraintes** : `parent_message_id` doit être un `MessageForum` existant lié au même `sujet_id`.
*   **Indexation logique** : `utilisateur_id`, `sujet_id` (messages par sujet), `date_creation`.
*   **Relations** :
    *   `Utilisateur (FK: utilisateur_id)` | `N-1` | `ownership` | Non nullable | `restrict`
    *   `SujetForum (FK: sujet_id)` | `N-1` | `non-ownership` | Non nullable | `cascade`
    *   `MessageForum (FK: parent_message_id)` | `1-N` | `ownership` | Nullable | `cascade`
*   **États & machine à états** : Non applicable.
*   **Cycle de vie & rétention** : Lié au `SujetForum` parent.
*   **Exemples de lignes/objets** :
    ```json
    {
      "id": "m1e2s3s4a5g6e7-8901-2345-6789-0abcdef0123",
      "utilisateur_id": "e4a5b6c7-d8e9-0123-4567-890abcdef012",
      "sujet_id": "s1u2j3e4t5f6o7-8901-2345-6789-0abcdef0123",
      "parent_message_id": null,
      "contenu": "Je vous conseille le Parc des Buttes-Chaumont, particulièrement tôt le matin. On y voit des espèces assez variées, et c'est très calme.",
      "date_creation": "2023-10-27T17:15:00Z",
      "date_mise_a_jour": "2023-10-27T17:15:00Z",
      "est_modere": false
    }
    ```

#### Entité : Annonce
*   **Description** : Une petite annonce pour un bien (ex: vélo) publiée par un citoyen.
*   **Champs** :
    | Nom             | Type logique | Obligatoire | Unicité        | Valeur par défaut | Validation                               | Exemple                                        |
    | :-------------- | :----------- | :---------- | :------------- | :---------------- | :--------------------------------------- | :--------------------------------------------- |
    | `id`            | `uuid`       | Oui         | Oui (PK)       | Généré            | Format UUID                              | `a1n2n3o4n5c6e7-8901-2345-6789-0abcdef0123`   |
    | `proprietaire_id` | `uuid`       | Oui         | Non            | Non applicable    | Référence à `Utilisateur.id`             | `e4a5b6c7-d8e9-0123-4567-890abcdef012`         |
    | `titre`         | `string`     | Oui         | Non            | Non applicable    | Min 5, Max 100 caractères                | `Vélo de ville en excellent état`              |
    | `description`   | `text`       | Oui         | Non            | Non applicable    | Min 10, Max 2000 caractères              | `Je vends mon vélo de ville, très peu utilisé...` |
    | `prix`          | `currency`   | Oui         | Non            | Non applicable    | >= 0                                     | `150.00`                                       |
    | `devise`        | `string`     | Oui         | Non            | `EUR`             | Code ISO 4217                            | `USD`                                          |
    | `categorie`     | `string`     | Non         | Non            | Non applicable    | Ex: `vélo`, `mobilier`, `électronique`   | `Vélo`                                         |
    | `etat_bien`     | `enum`       | Non         | Non            | `occasion`        | `neuf`, `occasion`, `abime`, `pour pièces` | `occasion`                                     |
    | `images_url`    | `array`      | Non         | Non            | `[]`              | Tableau d'URLs                           | `["url_image1.jpg", "url_image2.jpg"]`         |
    | `status`        | `enum`       | Oui         | Non            | `active`          | `active`, `pending_review`, `sold`, `archived` | `active`                                       |
    | `date_creation` | `datetime`   | Oui         | Non            | Maintenant        | Non applicable                           | `2023-10-27T18:00:00Z`                         |
    | `date_mise_a_jour` | `datetime`   | Oui         | Non            | Maintenant        | Non applicable                           | `2023-10-27T18:00:00Z`                         |
    | `date_expiration` | `datetime`   | Non         | Non            | Non applicable    | Date future                              | `2023-11-27T18:00:00Z`                         |
*   **Contraintes** : `prix` doit être supérieur ou égal à 0.
*   **Indexation logique** : `proprietaire_id`, `categorie`, `status`, `prix`.
*   **Relations** : `Utilisateur (FK: proprietaire_id)` | `N-1` | `ownership` | Non nullable | `restrict`
*   **États & machine à états** :
    *   **États** : `active` (Active), `pending_review` (En attente), `sold` (Vendue), `archived` (Archivée).
    *   **Transitions** :
        *   `active` <-> `pending_review` (Garde: Par Proprio (mod. majeure), Admin (signalement) ; Effet: Audit)
        *   `active` -> `sold` (Garde: Par Proprio ; Effet: Masquer, audit)
        *   `active` -> `archived` (Garde: Par Proprio (manuelle), Système (expiration) ; Effet: Masquer, audit)
        *   `pending_review` -> `active` (Garde: Par Admin ; Effet: Publier, audit)
        *   `pending_review` -> `archived` (Garde: Par Admin (rejet) ; Effet: Masquer, audit)
*   **Cycle de vie & rétention** :
    *   Création : Par un utilisateur. Statut initial `active` ou `pending_review` (dépendant des règles de modération auto/manuelle).
    *   Mise à jour : Par l'utilisateur (sa propre annonce), ou l'administrateur (modération, statut).
    *   Suppression : Soft delete, ou hard delete par administrateur.
    *   Archivage : Automatique après `date_expiration`, ou manuelle par le propriétaire/administrateur.
    *   Durée de conservation : Annonces `sold` ou `archived` conservées 2 ans, puis anonymisées/supprimées.
*   **Exemples de lignes/objets** :
    ```json
    {
      "id": "a1n2n3o4n5c6e7-8901-2345-6789-0abcdef0123",
      "proprietaire_id": "e4a5b6c7-d8e9-0123-4567-890abcdef012",
      "titre": "Sac à dos de randonnée 50L",
      "description": "Sac à dos Decathlon Quechua, très bon état, idéal pour les randonnées d'une journée.",
      "prix": 45.00,
      "devise": "EUR",
      "categorie": "Équipement Sportif",
      "etat_bien": "occasion",
      "images_url": ["https://cdn.example.com/ads/sac_dos_1.jpg", "https://cdn.example.com/ads/sac_dos_2.jpg"],
      "status": "active",
      "date_creation": "2023-10-27T18:00:00Z",
      "date_mise_a_jour": "2023-10-27T18:00:00Z",
      "date_expiration": "2023-11-27T18:00:00Z"
    }
    ```

#### Entité : ServiceLocal
*   **Description** : Une offre de service local (ex: cours de guitare) publiée par un citoyen ou un professionnel.
*   **Champs** :
    | Nom             | Type logique | Obligatoire | Unicité        | Valeur par défaut | Validation                               | Exemple                                        |
    | :-------------- | :----------- | :---------- | :------------- | :---------------- | :--------------------------------------- | :--------------------------------------------- |
    | `id`            | `uuid`       | Oui         | Oui (PK)       | Généré            | Format UUID                              | `s1e2r3v4i5c6e7-8901-2345-6789-0abcdef0123`   |
    | `proprietaire_id` | `uuid`       | Oui         | Non            | Non applicable    | Référence à `Utilisateur.id`             | `e4a5b6c7-d8e9-0123-4567-890abcdef012`         |
    | `titre`         | `string`     | Oui         | Non            | Non applicable    | Min 5, Max 100 caractères                | `Cours de guitare pour débutants`              |
    | `description`   | `text`       | Oui         | Non            | Non applicable    | Min 10, Max 2000 caractères              | `J'offre des cours de guitare pour tous les niveaux...` |
    | `prix_base`     | `currency`   | Oui         | Non            | Non applicable    | >= 0                                     | `30.00`                                        |
    | `devise`        | `string`     | Oui         | Non            | `EUR`             | Code ISO 4217                            | `USD`                                          |
    | `unite_prix`    | `enum`       | Oui         | Non            | `heure`           | `heure`, `jour`, `forfait`, `prestation` | `heure`                                        |
    | `categorie`     | `string`     | Non         | Non            | Non applicable    | Ex: `musique`, `bricolage`, `cours`      | `Musique`                                      |
    | `images_url`    | `array`      | Non         | Non            | `[]`              | Tableau d'URLs                           | `["url_image1.jpg", "url_image2.jpg"]`         |
    | `status`        | `enum`       | Oui         | Non            | `active`          | `active`, `pending_review`, `archived`   | `active`                                       |
    | `date_creation` | `datetime`   | Oui         | Non            | Maintenant        | Non applicable                           | `2023-10-27T19:00:00Z`                         |
    | `date_mise_a_jour` | `datetime`   | Oui         | Non            | Maintenant        | Non applicable                           | `2023-10-27T19:00:00Z`                         |
    | `lien_lieu_pro` | `uuid`       | Non         | Non            | Non applicable    | Référence à `Lieu.id` (si professionnel) | `p1a2c3e4-f5a6-7b8c-9d0e-1f2a3b4c5d6e`         |
*   **Contraintes** : `prix_base` doit être supérieur ou égal à 0.
*   **Indexation logique** : `proprietaire_id`, `categorie`, `status`, `prix_base`.
*   **Relations** :
    *   `Utilisateur (FK: proprietaire_id)` | `N-1` | `ownership` | Non nullable | `restrict`
    *   `Lieu (FK: lien_lieu_pro)` | `N-1` | `non-ownership` | Nullable | `restrict`
*   **États & machine à états** :
    *   **États** : `active` (Active), `pending_review` (En attente), `archived` (Archivée).
    *   **Transitions** : Similaires à `Annonce`.
*   **Cycle de vie & rétention** : Similaires à `Annonce`.
*   **Exemples de lignes/objets** :
    ```json
    {
      "id": "s1e2r3v4i5c6e7-8901-2345-6789-0abcdef0123",
      "proprietaire_id": "e4a5b6c7-d8e9-0123-4567-890abcdef012",
      "titre": "Cours de pâtisserie à domicile",
      "description": "Apprenez les secrets de la pâtisserie française avec un chef expérimenté, directement chez vous.",
      "prix_base": 50.00,
      "devise": "EUR",
      "unite_prix": "heure",
      "categorie": "Éducation & Loisirs",
      "images_url": ["https://cdn.example.com/services/patisserie1.jpg"],
      "status": "active",
      "date_creation": "2023-10-27T19:00:00Z",
      "date_mise_a_jour": "2023-10-27T19:00:00Z",
      "lien_lieu_pro": null
    }
    ```

#### Entité : Conversation
*   **Description** : Représente un fil de discussion privé entre utilisateurs.
*   **Champs** :
    | Nom                   | Type logique | Obligatoire | Unicité        | Valeur par défaut | Validation               | Exemple                                        |
    | :-------------------- | :----------- | :---------- | :------------- | :---------------- | :----------------------- | :--------------------------------------------- |
    | `id`                  | `uuid`       | Oui         | Oui (PK)       | Généré            | Format UUID              | `c1o2n3v4e5r6s7a-8901-2345-6789-0abcdef0123`   |
    | `createur_id`         | `uuid`       | Oui         | Non            | Non applicable    | Référence à `Utilisateur.id` | `e4a5b6c7-d8e9-0123-4567-890abcdef012`         |
    | `date_creation`       | `datetime`   | Oui         | Non            | Maintenant        | Non applicable           | `2023-10-27T20:00:00Z`                         |
    | `date_derniere_activite` | `datetime` | Oui         | Non            | Maintenant        | Non applicable           | `2023-10-27T20:05:00Z`                         |
    | `sujet`               | `string`     | Non         | Non            | Non applicable    | Max 255 caractères       | `Demande d'informations sur votre annonce`     |
    | `type_conversation`   | `enum`       | Oui         | Non            | `p2p`             | `p2p`, `group`, `system` | `p2p` (Deduction M, pour future évolutivité)   |
*   **Contraintes** : Une conversation doit avoir au moins deux `ParticipantConversation` (déduction H).
*   **Indexation logique** : `createur_id`, `date_derniere_activite` (tri).
*   **Relations** :
    *   `Utilisateur (FK: createur_id)` | `N-1` | `ownership` | Non nullable | `restrict`
    *   `ParticipantConversation (FK: conversation_id)` | `1-N` | `ownership` | Non nullable | `cascade`
    *   `Message (FK: conversation_id)` | `1-N` | `ownership` | Non nullable | `cascade`
*   **États & machine à états** : Non applicable.
*   **Cycle de vie & rétention** :
    *   Création : Lors de la première interaction entre deux utilisateurs (ex: via bouton "Contacter").
    *   Mise à jour : `date_derniere_activite` mise à jour à chaque nouveau message.
    *   Suppression : Soft delete (masquée pour les participants, mais les messages restent) par participant, ou hard delete pour tous les participants si vide ou sur demande explicite et respect des délais légaux.
    *   Archivage : Non applicable.
    *   Durée de conservation : Indéfinie si active, messages conservés 1 an après la suppression logique par tous les participants, puis archivés/supprimés.
*   **Exemples de lignes/objets** :
    ```json
    {
      "id": "c1o2n3v4e5r6s7a-8901-2345-6789-0abcdef0123",
      "createur_id": "e4a5b6c7-d8e9-0123-4567-890abcdef012",
      "date_creation": "2023-10-27T20:00:00Z",
      "date_derniere_activite": "2023-10-27T20:05:00Z",
      "sujet": "Demande d'infos sur le sac à dos de rando",
      "type_conversation": "p2p"
    }
    ```

#### Entité : ParticipantConversation
*   **Description** : Lien entre un utilisateur et une conversation, gérant des propriétés spécifiques au participant (ex: non lus).
*   **Champs** :
    | Nom                 | Type logique | Obligatoire | Unicité        | Valeur par défaut | Validation               | Exemple                                        |
    | :------------------ | :----------- | :---------- | :------------- | :---------------- | :----------------------- | :--------------------------------------------- |
    | `id`                | `uuid`       | Oui         | Oui (PK)       | Généré            | Format UUID              | `pa1r2t3i4c5i6p7-8901-2345-6789-0abcdef0123`   |
    | `conversation_id`   | `uuid`       | Oui         | Oui (composite) | Non applicable    | Référence à `Conversation.id` | `c1o2n3v4e5r6s7a-8901-2345-6789-0abcdef0123`   |
    | `utilisateur_id`    | `uuid`       | Oui         | Oui (composite) | Non applicable    | Référence à `Utilisateur.id` | `e4a5b6c7-d8e9-0123-4567-890abcdef012`         |
    | `date_derniere_lecture` | `datetime` | Non         | Non            | `date_creation`   | Non applicable           | `2023-10-27T20:04:00Z`                         |
    | `est_archive`       | `boolean`    | Oui         | Non            | `false`           | Non applicable           | `false`                                        |
*   **Contraintes** : `(conversation_id, utilisateur_id)` doit être unique.
*   **Indexation logique** : `conversation_id`, `utilisateur_id`.
*   **Relations** :
    *   `Conversation (FK: conversation_id)` | `N-1` | `ownership` | Non nullable | `cascade`
    *   `Utilisateur (FK: utilisateur_id)` | `N-1` | `non-ownership` | Non nullable | `restrict`
*   **États & machine à états** : Non applicable.
*   **Cycle de vie & rétention** : Lié à la `Conversation` parent.
*   **Exemples de lignes/objets** :
    ```json
    {
      "id": "pa1r2t3i4c5i6p7-8901-2345-6789-0abcdef0123",
      "conversation_id": "c1o2n3v4e5r6s7a-8901-2345-6789-0abcdef0123",
      "utilisateur_id": "e4a5b6c7-d8e9-0123-4567-890abcdef012",
      "date_derniere_lecture": "2023-10-27T20:04:00Z",
      "est_archive": false
    }
    ```

#### Entité : Message
*   **Description** : Un message individuel au sein d'une conversation privée.
*   **Champs** :
    | Nom                 | Type logique | Obligatoire | Unicité        | Valeur par défaut | Validation               | Exemple                                        |
    | :------------------ | :----------- | :---------- | :------------- | :---------------- | :----------------------- | :--------------------------------------------- |
    | `id`                | `uuid`       | Oui         | Oui (PK)       | Généré            | Format UUID              | `m1e2s3s4a5g6e7priv-8901-2345-6789-0abcdef0123` |
    | `conversation_id`   | `uuid`       | Oui         | Non            | Non applicable    | Référence à `Conversation.id` | `c1o2n3v4e5r6s7a-8901-2345-6789-0abcdef0123`   |
    | `expediteur_id`     | `uuid`       | Oui         | Non            | Non applicable    | Référence à `Utilisateur.id` | `e4a5b6c7-d8e9-0123-4567-890abcdef012`         |
    | `contenu`           | `text`       | Oui         | Non            | Non applicable    | Min 1, Max 5000 caractères | `Bonjour, le sac est-il toujours disponible ?` |
    | `date_envoi`        | `datetime`   | Oui         | Non            | Maintenant        | Non applicable           | `2023-10-27T20:01:00Z`                         |
    | `date_lecture`      | `datetime`   | Non         | Non            | Non applicable    | Non applicable           | `2023-10-27T20:02:00Z`                         |
*   **Contraintes** : Non applicable.
*   **Indexation logique** : `conversation_id`, `expediteur_id`, `date_envoi`.
*   **Relations** :
    *   `Conversation (FK: conversation_id)` | `N-1` | `ownership` | Non nullable | `cascade`
    *   `Utilisateur (FK: expediteur_id)` | `N-1` | `ownership` | Non nullable | `restrict`
*   **États & machine à états** : Non applicable (la lecture est un flag).
*   **Cycle de vie & rétention** : Lié à la `Conversation` parent.
*   **Exemples de lignes/objets** :
    ```json
    {
      "id": "m1e2s3s4a5g6e7priv-8901-2345-6789-0abcdef0123",
      "conversation_id": "c1o2n3v4e5r6s7a-8901-2345-6789-0abcdef0123",
      "expediteur_id": "e4a5b6c7-d8e9-0123-4567-890abcdef012",
      "contenu": "Bonjour, le sac est-il toujours disponible et peut-on le récupérer ce week-end ?",
      "date_envoi": "2023-10-27T20:01:00Z",
      "date_lecture": "2023-10-27T20:02:00Z"
    }
    ```

#### Entité : Notification
*   **Description** : Une notification destinée à un utilisateur pour l'informer d'un événement.
*   **Champs** :
    | Nom                 | Type logique | Obligatoire | Unicité        | Valeur par défaut | Validation                               | Exemple                                        |
    | :------------------ | :----------- | :---------- | :------------- | :---------------- | :--------------------------------------- | :--------------------------------------------- |
    | `id`                | `uuid`       | Oui         | Oui (PK)       | Généré            | Format UUID                              | `n1o2t3i4f5i6c7a-8901-2345-6789-0abcdef0123`   |
    | `utilisateur_id`    | `uuid`       | Oui         | Non            | Non applicable    | Référence à `Utilisateur.id`             | `e4a5b6c7-d8e9-0123-4567-890abcdef012`         |
    | `type_notification` | `enum`       | Oui         | Non            | Non applicable    | `new_message`, `review_added`, `place_approved`, `booking_confirmed` | `new_message`                                  |
    | `contenu`           | `string`     | Oui         | Non            | Non applicable    | Max 500 caractères                       | `Vous avez un nouveau message de @user2`       |
    | `lien_cible`        | `url`        | Non         | Non            | Non applicable    | URL interne à l'application              | `/messagerie/c1o2n3v4e5r6s7a-...`              |
    | `est_lue`           | `boolean`    | Oui         | Non            | `false`           | Non applicable                           | `true`                                         |
    | `date_creation`     | `datetime`   | Oui         | Non            | Maintenant        | Non applicable                           | `2023-10-27T20:01:00Z`                         |
*   **Contraintes** : Non applicable.
*   **Indexation logique** : `utilisateur_id`, `est_lue` (récupération rapide des notifications non lues), `date_creation`.
*   **Relations** : `Utilisateur (FK: utilisateur_id)` | `N-1` | `ownership` | Non nullable | `restrict`
*   **États & machine à états** : Non applicable (la lecture est un flag).
*   **Cycle de vie & rétention** :
    *   Création : Déclenchée par des événements système (nouveau message, avis, approbation, réservation).
    *   Mise à jour : Marquer comme lue.
    *   Suppression : Soft delete (masquée pour l'utilisateur), ou hard delete après un certain temps (ex: 90 jours).
    *   Archivage : Non applicable.
    *   Durée de conservation : 90 jours.
*   **Exemples de lignes/objets** :
    ```json
    {
      "id": "n1o2t3i4f5i6c7a-8901-2345-6789-0abcdef0123",
      "utilisateur_id": "e4a5b6c7-d8e9-0123-4567-890abcdef012",
      "type_notification": "new_message",
      "contenu": "Vous avez un nouveau message de 'John Doe'.",
      "lien_cible": "/messagerie/c1o2n3v4e5r6s7a-8901-2345-6789-0abcdef0123",
      "est_lue": false,
      "date_creation": "2023-10-27T20:01:00Z"
    }
    ```

#### Entité : Portefeuille
*   **Description** : Le solde de crédit interne d'un utilisateur sur la plateforme.
*   **Champs** :
    | Nom           | Type logique | Obligatoire | Unicité        | Valeur par défaut | Validation               | Exemple        |
    | :------------ | :----------- | :---------- | :------------- | :---------------- | :----------------------- | :------------- |
    | `user_id`     | `uuid`       | Oui         | Oui (PK)       | Non applicable    | Référence à `Utilisateur.id` | `e4a5b6c7-d8e9-0123-4567-890abcdef012`         |
    | `solde`       | `currency`   | Oui         | Non            | `0.00`            | >= 0                     | `120.50`       |
    | `devise`      | `string`     | Oui         | Non            | `EUR`             | Code ISO 4217            | `EUR`          |
    | `date_creation` | `datetime`   | Oui         | Non            | Maintenant        | Non applicable           | `2023-10-27T21:00:00Z`                         |
    | `date_mise_a_jour` | `datetime` | Oui         | Non            | Maintenant        | Non applicable           | `2023-10-27T21:30:00Z`                         |
*   **Contraintes** : `user_id` est clé primaire et étrangère (relation 1-1). `solde` ne peut être négatif.
*   **Indexation logique** : `user_id`.
*   **Relations** :
    *   `Utilisateur (FK: user_id)` | `1-1` | `ownership` | Non nullable | `cascade`
    *   `Transaction (FK: portefeuille_id)` | `1-N` | `ownership` | Non nullable | `cascade`
*   **États & machine à états** : Non applicable.
*   **Cycle de vie & rétention** :
    *   Création : Automatique lors de l'inscription d'un utilisateur (déduction H).
    *   Mise à jour : Via transactions de crédit, transfert, paiement.
    *   Suppression : Liée à la suppression de l'utilisateur (soft/hard).
    *   Archivage : Non applicable.
    *   Durée de conservation : Liée à l'utilisateur.
*   **Exemples de lignes/objets** :
    ```json
    {
      "user_id": "e4a5b6c7-d8e9-0123-4567-890abcdef012",
      "solde": 120.50,
      "devise": "EUR",
      "date_creation": "2023-10-27T21:00:00Z",
      "date_mise_a_jour": "2023-10-27T21:30:00Z"
    }
    ```

#### Entité : Transaction
*   **Description** : Enregistre toutes les opérations financières affectant les portefeuilles.
*   **Champs** :
    | Nom                   | Type logique | Obligatoire | Unicité        | Valeur par défaut | Validation                               | Exemple                                        |
    | :-------------------- | :----------- | :---------- | :------------- | :---------------- | :--------------------------------------- | :--------------------------------------------- |
    | `id`                  | `uuid`       | Oui         | Oui (PK)       | Généré            | Format UUID                              | `t1r2a3n4s5a6c7t-8901-2345-6789-0abcdef0123`   |
    | `portefeuille_id`     | `uuid`       | Oui         | Non            | Non applicable    | Référence à `Portefeuille.user_id`       | `e4a5b6c7-d8e9-0123-4567-890abcdef012`         |
    | `type_transaction`    | `enum`       | Oui         | Non            | Non applicable    | `credit`, `debit`, `transfer_in`, `transfer_out`, `payment`, `commission` | `credit`                                       |
    | `montant`             | `decimal`    | Oui         | Non            | Non applicable    | > 0                                      | `50.00`                                        |
    | `devise`              | `string`     | Oui         | Non            | `EUR`             | Code ISO 4217                            | `EUR`                                          |
    | `date_transaction`    | `datetime`   | Oui         | Non            | Maintenant        | Non applicable                           | `2023-10-27T21:10:00Z`                         |
    | `description`         | `string`     | Non         | Non            | Non applicable    | Max 255 caractères                       | `Chargement du portefeuille via paiement externe` |
    | `reference_externe`   | `string`     | Non         | Oui            | Non applicable    | Identifiant de la transaction externe (ex: Stripe) | `pi_1234567890abcdef`                          |
    | `transaction_parente_id` | `uuid`    | Non         | Non            | Non applicable    | Référence à `Transaction.id` (pour transferts P2P) | `t1r2a3n4s5a6c7t-8901-2345-6789-0abcdef0123`   |
    | `statut`              | `enum`       | Oui         | Non            | `success`         | `pending`, `success`, `failed`           | `success`                                      |
*   **Contraintes** : `montant` doit être positif. Pour les `transfer_in`/`transfer_out`, il doit y avoir une transaction parente correspondante.
*   **Indexation logique** : `portefeuille_id`, `type_transaction`, `date_transaction`, `reference_externe`.
*   **Relations** :
    *   `Portefeuille (FK: portefeuille_id)` | `N-1` | `ownership` | Non nullable | `restrict`
    *   `Transaction (FK: transaction_parente_id)` | `1-N` | `ownership` | Nullable | `restrict`
    *   `CommissionSystème (FK: transaction_id)` | `1-1` | `ownership` | Nullable | `cascade`
*   **États & machine à états** : Non applicable.
*   **Cycle de vie & rétention** :
    *   Création : Automatique lors de chaque modification de portefeuille.
    *   Mise à jour : Rare, pour mettre à jour le statut en cas de transaction asynchrone.
    *   Suppression : Hard delete des transactions liées à un portefeuille supprimé, après un délai légal.
    *   Archivage : Non applicable.
    *   Durée de conservation : 10 ans pour les transactions financières.
*   **Exemples de lignes/objets** :
    ```json
    {
      "id": "t1r2a3n4s5a6c7t-8901-2345-6789-0abcdef0123",
      "portefeuille_id": "e4a5b6c7-d8e9-0123-4567-890abcdef012",
      "type_transaction": "credit",
      "montant": 50.00,
      "devise": "EUR",
      "date_transaction": "2023-10-27T21:10:00Z",
      "description": "Chargement du portefeuille via paiement externe",
      "reference_externe": "ch_xyz_123",
      "transaction_parente_id": null,
      "statut": "success"
    },
    {
      "id": "t1r2a3n4s5a6c7t-8901-2345-6789-0abcdef0124",
      "portefeuille_id": "e4a5b6c7-d8e9-0123-4567-890abcdef012",
      "type_transaction": "transfer_out",
      "montant": 20.00,
      "devise": "EUR",
      "date_transaction": "2023-10-27T21:30:00Z",
      "description": "Transfert à user_id_XYZ",
      "reference_externe": null,
      "transaction_parente_id": "transfer_group_uuid_abc",
      "statut": "success"
    }
    ```

#### Entité : Réservation
*   **Description** : Enregistre une réservation effectuée par un client pour un lieu ou un service.
*   **Champs** :
    | Nom                 | Type logique | Obligatoire | Unicité        | Valeur par défaut | Validation                               | Exemple                                        |
    | :------------------ | :----------- | :---------- | :------------- | :---------------- | :--------------------------------------- | :--------------------------------------------- |
    | `id`                | `uuid`       | Oui         | Oui (PK)       | Généré            | Format UUID                              | `r1e2s3e4r5v6a7t-8901-2345-6789-0abcdef0123`   |
    | `client_id`         | `uuid`       | Oui         | Non            | Non applicable    | Référence à `Utilisateur.id`             | `e4a5b6c7-d8e9-0123-4567-890abcdef012`         |
    | `proprietaire_id`   | `uuid`       | Oui         | Non            | Non applicable    | Référence à `Utilisateur.id`             | `p3r4o5p6r7i8-9012-3456-7890-1234567890ab`     |
    | `lieu_id`           | `uuid`       | Oui         | Non            | Non applicable    | Référence à `Lieu.id` (ou `ServiceLocal.id`) | `p1a2c3e4-f5a6-7b8c-9d0e-1f2a3b4c5d6e`         |
    | `disponibilite_id`  | `uuid`       | Oui         | Non            | Non applicable    | Référence à `Disponibilité.id`           | `d1i2s3p4o5n6i7b-8901-2345-6789-0abcdef0123`   |
    | `date_debut`        | `date`       | Oui         | Non            | Non applicable    | Non applicable                           | `2023-11-10`                                   |
    | `date_fin`          | `date`       | Oui         | Non            | Non applicable    | >= `date_debut`                          | `2023-11-12`                                   |
    | `heure_debut`       | `time`       | Non         | Non            | Non applicable    | Format HH:MM                             | `14:00`                                        |
    | `heure_fin`         | `time`       | Non         | Non            | Non applicable    | Format HH:MM (si `date_fin` est `date_debut`) | `16:00`                                        |
    | `montant_total`     | `currency`   | Oui         | Non            | Non applicable    | > 0                                      | `250.00`                                       |
    | `devise`            | `string`     | Oui         | Non            | `EUR`             | Code ISO 4217                            | `EUR`                                          |
    | `transaction_id`    | `uuid`       | Oui         | Non            | Non applicable    | Référence à `Transaction.id` (débit client) | `t1r2a3n4s5a6c7t-8901-2345-6789-0abcdef0123`   |
    | `status`            | `enum`       | Oui         | Non            | `pending`         | `pending`, `confirmed`, `cancelled`, `completed` | `confirmed`                                    |
    | `date_creation`     | `datetime`   | Oui         | Non            | Maintenant        | Non applicable                           | `2023-10-27T22:00:00Z`                         |
    | `date_mise_a_jour`  | `datetime`   | Oui         | Non            | Maintenant        | Non applicable                           | `2023-10-27T22:00:00Z`                         |
*   **Contraintes** : `date_fin` >= `date_debut`. Le `lieu_id` doit correspondre à une `Disponibilité` ayant cet ID. `transaction_id` doit être une transaction de `payment` réussie.
*   **Indexation logique** : `client_id`, `proprietaire_id`, `lieu_id`, `disponibilite_id`, `status`.
*   **Relations** :
    *   `Utilisateur (FK: client_id)` | `N-1` | `ownership` | Non nullable | `restrict`
    *   `Utilisateur (FK: proprietaire_id)` | `N-1` | `non-ownership` | Non nullable | `restrict`
    *   `Lieu (FK: lieu_id)` | `N-1` | `non-ownership` | Non nullable | `restrict`
    *   `Disponibilité (FK: disponibilite_id)` | `N-1` | `non-ownership` | Non nullable | `restrict`
    *   `Transaction (FK: transaction_id)` | `1-1` | `ownership` | Non nullable | `restrict`
*   **États & machine à états** :
    *   **États** : `pending` (En attente de paiement), `confirmed` (Confirmée), `cancelled` (Annulée), `completed` (Terminée).
    *   **Transitions** :
        *   `pending` -> `confirmed` (Garde: Paiement réussi ; Effet: Débiter client, créditer propriétaire - commission, marquer disponibilité comme réservée, notifier propriétaire/client)
        *   `pending` -> `cancelled` (Garde: Paiement échoué ou annulation client dans délai ; Effet: Libérer disponibilité)
        *   `confirmed` -> `cancelled` (Garde: Annulation client ou propriétaire (avec pénalités/remboursements) ; Effet: Libérer disponibilité, gérer transactions de remboursement/pénalités)
        *   `confirmed` -> `completed` (Garde: Date de fin passée ; Effet: Non applicable)
*   **Cycle de vie & rétention** :
    *   Création : Lors de l'initiation d'une réservation par un client.
    *   Mise à jour : Statut change au fil du processus (paiement, annulation).
    *   Suppression : Hard delete des réservations annulées/terminées après 5 ans.
    *   Archivage : Non applicable.
    *   Durée de conservation : 5 ans.
*   **Exemples de lignes/objets** :
    ```json
    {
      "id": "r1e2s3e4r5v6a7t-8901-2345-6789-0abcdef0123",
      "client_id": "e4a5b6c7-d8e9-0123-4567-890abcdef012",
      "proprietaire_id": "p3r4o5p6r7i8-9012-3456-7890-1234567890ab",
      "lieu_id": "h1e2b3e4-f5a6-7b8c-9d0e-1f2a3b4c5d6e",
      "disponibilite_id": "d1i2s3p4o5n6i7b-8901-2345-6789-0abcdef0123",
      "date_debut": "2023-11-10",
      "date_fin": "2023-11-12",
      "heure_debut": null,
      "heure_fin": null,
      "montant_total": 250.00,
      "devise": "EUR",
      "transaction_id": "tx_res_client_uuid",
      "status": "confirmed",
      "date_creation": "2023-10-27T22:00:00Z",
      "date_mise_a_jour": "2023-10-27T22:05:00Z"
    }
    ```

#### Entité : Disponibilité
*   **Description** : Définit les créneaux ou dates disponibles et leurs prix pour un lieu/service réservable.
*   **Champs** :
    | Nom           | Type logique | Obligatoire | Unicité        | Valeur par défaut | Validation                               | Exemple        |
    | :------------ | :----------- | :---------- | :------------- | :---------------- | :--------------------------------------- | :------------- |
    | `id`          | `uuid`       | Oui         | Oui (PK)       | Généré            | Format UUID                              | `d1i2s3p4o5n6i7b-8901-2345-6789-0abcdef0123`   |
    | `lieu_id`     | `uuid`       | Oui         | Non            | Non applicable    | Référence à `Lieu.id` (ou `ServiceLocal.id`) | `h1e2b3e4-f5a6-7b8c-9d0e-1f2a3b4c5d6e`         |
    | `date_debut`  | `date`       | Oui         | Non            | Non applicable    | Non applicable                           | `2023-11-10`                                   |
    | `date_fin`    | `date`       | Oui         | Non            | Non applicable    | >= `date_debut`                          | `2023-11-10`                                   |
    | `heure_debut` | `time`       | Non         | Non            | Non applicable    | Format HH:MM                             | `09:00`        |
    | `heure_fin`   | `time`       | Non         | Non            | Non applicable    | Format HH:MM (si `date_fin` est `date_debut`) | `17:00`        |
    | `prix`        | `currency`   | Oui         | Non            | Non applicable    | >= 0                                     | `100.00`       |
    | `devise`      | `string`     | Oui         | Non            | `EUR`             | Code ISO 4217                            | `EUR`          |
    | `capacite`    | `integer`    | Oui         | Non            | 1                 | >= 0                                     | `5`            |
    | `reservees`   | `integer`    | Oui         | Non            | 0                 | >= 0, <= `capacite`                      | `2`            |
    | `status`      | `enum`       | Oui         | Non            | `available`       | `available`, `fully_booked`, `disabled`  | `available`    |
    | `date_creation` | `datetime`   | Oui         | Non            | Maintenant        | Non applicable                           | `2023-10-27T23:00:00Z`                         |
    | `date_mise_a_jour` | `datetime` | Oui         | Non            | Maintenant        | Non applicable                           | `2023-10-27T23:00:00Z`                         |
*   **Contraintes** : `date_fin` >= `date_debut`. `reservees` <= `capacite`. `(lieu_id, date_debut, heure_debut, date_fin, heure_fin)` doit être unique (pas de chevauchement de créneaux exacts).
*   **Indexation logique** : `lieu_id`, `date_debut`, `date_fin`, `status`.
*   **Relations** :
    *   `Lieu (FK: lieu_id)` | `N-1` | `ownership` | Non nullable | `cascade`
    *   `Réservation (FK: disponibilite_id)` | `N-1` | `non-ownership` | Non nullable | `restrict`
*   **États & machine à états** :
    *   **États** : `available` (Disponible), `fully_booked` (Complètement réservé), `disabled` (Désactivé par propriétaire).
    *   **Transitions** :
        *   `available` -> `fully_booked` (Garde: `reservees` = `capacite` ; Effet: Non applicable)
        *   `fully_booked` -> `available` (Garde: `reservees` < `capacite` ; Effet: Non applicable)
        *   `any` -> `disabled` (Garde: Par Propriétaire ou Admin ; Effet: Empêcher de nouvelles réservations)
        *   `disabled` -> `available` (Garde: Par Propriétaire ou Admin ; Effet: Rendre à nouveau disponible)
*   **Cycle de vie & rétention** :
    *   Création : Par un propriétaire via le calendrier des disponibilités.
    *   Mise à jour : Par le propriétaire (prix, capacité, désactivation) ou le système (mise à jour `reservees`).
    *   Suppression : Hard delete des disponibilités passées ou désactivées après 2 ans.
    *   Archivage : Non applicable.
    *   Durée de conservation : 2 ans après `date_fin`.
*   **Exemples de lignes/objets** :
    ```json
    {
      "id": "d1i2s3p4o5n6i7b-8901-2345-6789-0abcdef0123",
      "lieu_id": "h1e2b3e4-f5a6-7b8c-9d0e-1f2a3b4c5d6e",
      "date_debut": "2023-11-10",
      "date_fin": "2023-11-12",
      "heure_debut": null,
      "heure_fin": null,
      "prix": 125.00,
      "devise": "EUR",
      "capacite": 10,
      "reservees": 3,
      "status": "available",
      "date_creation": "2023-10-27T23:00:00Z",
      "date_mise_a_jour": "2023-10-27T23:00:00Z"
    }
    ```

#### Entité : CommissionSystème
*   **Description** : Enregistre les commissions prélevées par la plateforme sur les transactions de réservation.
*   **Champs** :
    | Nom             | Type logique | Obligatoire | Unicité        | Valeur par défaut | Validation               | Exemple        |
    | :-------------- | :----------- | :---------- | :------------- | :---------------- | :----------------------- | :------------- |
    | `id`            | `uuid`       | Oui         | Oui (PK)       | Généré            | Format UUID              | `c1o2m3m4i5s6s-8901-2345-6789-0abcdef0123`   |
    | `transaction_id`| `uuid`       | Oui         | Oui (FK)       | Non applicable    | Référence à `Transaction.id` (crédit propriétaire) | `tx_prop_credit_uuid`                          |
    | `reservation_id`| `uuid`       | Oui         | Non            | Non applicable    | Référence à `Réservation.id` | `r1e2s3e4r5v6a7t-8901-2345-6789-0abcdef0123`   |
    | `montant`       | `currency`   | Oui         | Non            | Non applicable    | > 0                      | `25.00`        |
    | `devise`        | `string`     | Oui         | Non            | `EUR`             | Code ISO 4217            | `EUR`          |
    | `taux_commission` | `percentage` | Oui         | Non            | `10.00`           | Entre 0 et 100           | `10.00`        |
    | `date_creation` | `datetime`   | Oui         | Non            | Maintenant        | Non applicable           | `2023-10-28T00:00:00Z`                         |
*   **Contraintes** : `transaction_id` est clé primaire et étrangère (relation 1-1). `montant` doit être positif et doit correspondre au `taux_commission` appliqué au `montant_total` de la `Réservation`.
*   **Indexation logique** : `transaction_id`, `reservation_id`, `date_creation`.
*   **Relations** :
    *   `Transaction (FK: transaction_id)` | `1-1` | `ownership` | Non nullable | `restrict`
    *   `Réservation (FK: reservation_id)` | `N-1` | `non-ownership` | Non nullable | `restrict`
*   **États & machine à états** : Non applicable.
*   **Cycle de vie & rétention** : Lié à la `Transaction` de paiement de la réservation.
*   **Exemples de lignes/objets** :
    ```json
    {
      "id": "c1o2m3m4i5s6s-8901-2345-6789-0abcdef0123",
      "transaction_id": "tx_prop_credit_uuid",
      "reservation_id": "r1e2s3e4r5v6a7t-8901-2345-6789-0abcdef0123",
      "montant": 25.00,
      "devise": "EUR",
      "taux_commission": 10.00,
      "date_creation": "2023-10-28T00:00:00Z"
    }
    ```

#### Entité : JournalAudit
*   **Description** : Enregistre les événements importants pour la sécurité, la modération et la traçabilité.
*   **Champs** :
    | Nom               | Type logique | Obligatoire | Unicité        | Valeur par défaut | Validation               | Exemple                                        |
    | :---------------- | :----------- | :---------- | :------------- | :---------------- | :----------------------- | :--------------------------------------------- |
    | `id`              | `uuid`       | Oui         | Oui (PK)       | Généré            | Format UUID              | `j1o2u3r4n5a6l7a-8901-2345-6789-0abcdef0123`   |
    | `utilisateur_id`  | `uuid`       | Non         | Non            | Non applicable    | Référence à `Utilisateur.id` | `e4a5b6c7-d8e9-0123-4567-890abcdef012`         |
    | `type_evenement`  | `string`     | Oui         | Non            | Non applicable    | Ex: `PLACE_APPROVED`, `USER_BANNED`, `TRANSACTION_FAILED` | `PLACE_APPROVED`                               |
    | `entite_impactee` | `string`     | Oui         | Non            | Non applicable    | Ex: `Lieu`, `Utilisateur`, `Transaction` | `Lieu`                                         |
    | `entite_id`       | `uuid`       | Non         | Non            | Non applicable    | ID de l'entité impactée  | `p1a2c3e4-f5a6-7b8c-9d0e-1f2a3b4c5d6e`         |
    | `details`         | `json`       | Non         | Non            | Non applicable    | Schéma JSON              | `{"old_status": "pending_review", "new_status": "published"}` |
    | `date_evenement`  | `datetime`   | Oui         | Non            | Maintenant        | Non applicable           | `2023-10-28T01:00:00Z`                         |
    | `adresse_ip`      | `string`     | Non         | Non            | Non applicable    | Format IPv4/IPv6         | `192.168.1.1`                                  |
    | `agent_utilisateur` | `text`     | Non         | Non            | Non applicable    | Chaîne complète User-Agent | `Mozilla/5.0 (...)`                            |
*   **Contraintes** : Non applicable.
*   **Indexation logique** : `utilisateur_id`, `type_evenement`, `entite_impactee`, `entite_id`, `date_evenement`.
*   **Relations** : `Utilisateur (FK: utilisateur_id)` | `N-1` | `non-ownership` | Nullable | `set-null`
*   **États & machine à états** : Non applicable.
*   **Cycle de vie & rétention** :
    *   Création : Automatique suite à des actions utilisateur (authentification, soumission, transaction) ou administration (modération, changement de rôle).
    *   Mise à jour : Non applicable.
    *   Suppression : Hard delete après un délai légal (ex: 5-10 ans), avec anonymisation des `utilisateur_id`.
    *   Archivage : Non applicable.
    *   Durée de conservation : 5 à 10 ans selon la sensibilité de l'événement.
*   **Exemples de lignes/objets** :
    ```json
    {
      "id": "j1o2u3r4n5a6l7a-8901-2345-6789-0abcdef0123",
      "utilisateur_id": "a1d2m3i4n5i6s7t-8901-2345-6789-0abcdef012",
      "type_evenement": "PLACE_APPROVED",
      "entite_impactee": "Lieu",
      "entite_id": "p1a2c3e4-f5a6-7b8c-9d0e-1f2a3b4c5d6e",
      "details": {
        "old_status": "pending_review",
        "new_status": "published",
        "reason": "Conforme aux directives"
      },
      "date_evenement": "2023-10-28T01:00:00Z",
      "adresse_ip": "192.168.1.100",
      "agent_utilisateur": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36"
    }
    ```

### 1.3 Relations globales

Voici un schéma textuel simplifié des relations clés, avec la règle de suppression référentielle principale. Sauf indication contraire, les relations sont de type `restrict` ou `set-null` pour éviter la perte accidentelle de données cruciales, `cascade` étant réservé aux entités "children" directes qui n'ont pas de sens sans leur parent.

*   `Utilisateur (id) --1:1--> Portefeuille (user_id)` : `cascade`
*   `Utilisateur (id) --1:N--> Lieu (proprietaire_id)` : `restrict` (si lieu publié)
*   `Utilisateur (id) --1:N--> Article (auteur_id)` : `restrict` (si article publié)
*   `Utilisateur (id) --1:N--> Avis (utilisateur_id)` : `cascade`
*   `Utilisateur (id) --1:N--> Commentaire (utilisateur_id)` : `cascade`
*   `Utilisateur (id) --1:N--> SujetForum (utilisateur_id)` : `cascade`
*   `Utilisateur (id) --1:N--> MessageForum (utilisateur_id)` : `cascade`
*   `Utilisateur (id) --1:N--> Annonce (proprietaire_id)` : `restrict` (si annonce active)
*   `Utilisateur (id) --1:N--> ServiceLocal (proprietaire_id)` : `restrict` (si service actif)
*   `Utilisateur (id) --1:N--> Conversation (createur_id)` : `restrict`
*   `Utilisateur (id) --1:N--> ParticipantConversation (utilisateur_id)` : `cascade`
*   `Utilisateur (id) --1:N--> Message (expediteur_id)` : `restrict`
*   `Utilisateur (id) --1:N--> Notification (utilisateur_id)` : `cascade`
*   `Utilisateur (id) --1:N--> Réservation (client_id)` : `restrict`
*   `Utilisateur (id) --1:N--> JournalAudit (utilisateur_id)` : `set-null`

*   `Catégorie (id) --1:N--> Catégorie (parent_id)` : `restrict`
*   `Catégorie (id) --1:N--> Lieu (category_id)` : `restrict`
*   `Catégorie (id) --1:N--> LienArticleCatégorie (category_id)` : `restrict`
*   `Catégorie (id) --1:N--> SujetForum (category_id)` : `restrict`

*   `Lieu (id) --1:N--> TraductionLieu (place_id)` : `cascade`
*   `Lieu (id) --1:N--> AttributLieu (place_id)` : `cascade`
*   `Lieu (id) --1:1--> DétailsHébergement (place_id)` : `cascade`
*   `Lieu (id) --1:1--> DétailsGastronomie (place_id)` : `cascade`
*   `Lieu (id) --N:M--> LienArticleLieu (place_id)` : `restrict`
*   `Lieu (id) --1:N--> Avis (place_id)` : `cascade`
*   `Lieu (id) --1:N--> Disponibilité (lieu_id)` : `cascade`
*   `Lieu (id) --1:N--> Réservation (lieu_id)` : `restrict` (si réservations actives)
*   `Lieu (id) --1:N--> ServiceLocal (lien_lieu_pro)` : `set-null` (si un lieu pro est supprimé, le service n'est plus lié mais reste)

*   `Article (id) --1:1--> ContenuArticle (article_id)` : `cascade`
*   `Article (id) --1:N--> LienArticleCatégorie (article_id)` : `cascade`
*   `Article (id) --1:N--> LienArticleLieu (article_id)` : `cascade`
*   `Article (id) --1:N--> Commentaire (article_id)` : `cascade`

*   `Avis (id) --1:N--> Avis (parent_review_id)` : `cascade`
*   `Avis (id) --1:N--> SousNotation (avis_id)` : `cascade`

*   `Commentaire (id) --1:N--> Commentaire (parent_comment_id)` : `cascade`

*   `SujetForum (id) --1:N--> MessageForum (sujet_id)` : `cascade`

*   `Conversation (id) --1:N--> ParticipantConversation (conversation_id)` : `cascade`
*   `Conversation (id) --1:N--> Message (conversation_id)` : `cascade`

*   `Portefeuille (user_id) --1:N--> Transaction (portefeuille_id)` : `cascade`

*   `Transaction (id) --1:1--> CommissionSystème (transaction_id)` : `cascade`
*   `Transaction (id) --1:N--> Transaction (transaction_parente_id)` : `restrict`
*   `Transaction (id) --1:1--> Réservation (transaction_id)` : `restrict` (la transaction doit exister pour une résa)

*   `Disponibilité (id) --1:N--> Réservation (disponibilite_id)` : `restrict` (si réservations actives)

*   `Réservation (id) --1:1--> CommissionSystème (reservation_id)` : `restrict`

---

# 2. PERMISSIONS & SÉCURITÉ (AGNOSTIQUE)
### 2.1 Rôles & acteurs

| Rôle/Acteur       | Description                                                 | Portée                                                         | Notes                                                                                                                                                                                                    |
| :---------------- | :---------------------------------------------------------- | :------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Anonyme`         | Visiteur non authentifié.                                   | Lecture des informations publiques.                            | Accès sans authentification.                                                                                                                                                                             |
| `Citoyen`         | Utilisateur authentifié de la plateforme.                   | Lecture publique, écriture/modification de son propre contenu. | Rôle par défaut après inscription.                                                                                                                                                                       |
| `Propriétaire`    | Citoyen qui gère des lieux, annonces ou services.           | Création/modification de ses propres ressources.               | Un `Citoyen` peut devenir `Propriétaire` en soumettant un lieu/service/annonce. N'est pas un rôle distinct dans la table Utilisateur, mais une capacité dérivée. (Déduction M pour flexibilité)            |
| `Auteur`          | Citoyen qui crée et publie du contenu éditorial (articles). | Création/modification de ses propres articles.                 | Un `Citoyen` peut devenir `Auteur` par promotion ou demande. N'est pas un rôle distinct dans la table Utilisateur, mais une capacité dérivée. (Déduction M pour flexibilité)                               |
| `Administrateur`  | Gestionnaire de la plateforme.                              | Accès complet à toutes les données et fonctions de modération. | Rôle privilégié, accordé manuellement.                                                                                                                                                                   |
| `Système`         | Processus automatisés ou services backend.                  | Exécution de tâches critiques, gestion des transactions.      | Non lié à un utilisateur direct. Effectue des opérations comme la création de portefeuille, les mises à jour de statut automatiques, la génération de notifications, la gestion des paiements via intégration. |

### 2.2 Matrice d’autorisations (CRUD+)

**Règles d'ownership** :
*   Un `Citoyen` peut créer, lire, mettre à jour et supprimer (logiquement) ses propres `Avis`, `Commentaires`, `SujetForum`, `MessageForum`, `Annonce`, `ServiceLocal`, `Conversation`, `Message`, `Notification`.
*   Un `Propriétaire` peut créer, lire, mettre à jour (sous conditions), et gérer (soft-delete) ses propres `Lieux`, `Disponibilités`.
*   Un `Auteur` peut créer, lire, mettre à jour (sous conditions), et gérer (soft-delete) ses propres `Articles`.
*   Les `Administrateurs` ont un accès complet, avec des actions spécifiques de `Modération`.

| Entité                 | Action              | Anonyme | Citoyen                                       | Propriétaire                                          | Auteur                                            | Administrateur                                      | Condition                                                 | Justification PRD                                                                                                                                                                                                                                                                                                                                                                                                      |
| :--------------------- | :------------------ | :------ | :-------------------------------------------- | :---------------------------------------------------- | :------------------------------------------------ | :-------------------------------------------------- | :-------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Utilisateur**        | Create (Inscription) | Oui     | Non (auto-promotion après inscription)        | Non applicable                                        | Non applicable                                    | Oui                                                 | Non applicable                                            | WP 0.3: Flux d'authentification complet. Admin pour création manuelle.                                                                                                                                                                                                                                                                                                                                           |
|                        | Read (Profil public) | Oui     | Oui                                           | Oui                                                   | Oui                                               | Oui                                                 | Publié                                                    | WP 0.3: Page de profil public.                                                                                                                                                                                                                                                                                                                                                                           |
|                        | Read (Mon profil)    | Non     | Oui                                           | Oui                                                   | Oui                                               | Oui                                                 | Ownership (lui-même)                                      | WP 0.3: Page de gestion de profil.                                                                                                                                                                                                                                                                                                                                                                           |
|                        | Update (Mon profil)  | Non     | Oui                                           | Oui                                                   | Oui                                               | Oui                                                 | Ownership (lui-même)                                      | WP 0.3: Page de gestion de profil (modification infos, avatar).                                                                                                                                                                                                                                                                                                                                          |
|                        | Update (Rôle/Statut) | Non     | Non                                           | Non                                                   | Non                                               | Oui                                                 | Non applicable                                            | WP 5.1: Gestion des Utilisateurs (modifier les rôles, bannir).                                                                                                                                                                                                                                                                                                                                           |
|                        | Delete (Soft)       | Non     | Conditionnel                                  | Conditionnel                                          | Conditionnel                                      | Oui                                                 | Ownership + Aucun contenu actif lié                       | Déduction M: Permettre à un utilisateur de demander la suppression de son compte. Admin peut toujours le faire.                                                                                                                                                                                                                                                                                                      |
| **Catégorie**          | Create              | Non     | Non                                           | Non                                                   | Non                                               | Oui                                                 | Non applicable                                            | WP 5.1: Gestion de la Taxonomie (CRUD).                                                                                                                                                                                                                                                                                                                                                                  |
|                        | Read (List/Tree)    | Oui     | Oui                                           | Oui                                                   | Oui                                               | Oui                                                 | Publié                                                    | WP 1.1: Page d'accueil, Page Catégorie, RPC get_category_tree().                                                                                                                                                                                                                                                                                                                                   |
|                        | Update              | Non     | Non                                           | Non                                                   | Non                                               | Oui                                                 | Non applicable                                            | WP 5.1: Gestion de la Taxonomie (CRUD).                                                                                                                                                                                                                                                                                                                                                                  |
|                        | Delete              | Non     | Non                                           | Non                                                   | Non                                               | Oui                                                 | Non applicable                                            | WP 5.1: Gestion de la Taxonomie (CRUD).                                                                                                                                                                                                                                                                                                                                                                  |
| **Lieu**               | Create (Submit)     | Non     | Non                                           | Oui                                                   | Non                                               | Oui                                                 | Propriétaire est l'utilisateur courant.                   | WP 1.3: Formulaire SubmitPlaceForm.                                                                                                                                                                                                                                                                                                                                                                      |
|                        | Read (List)         | Oui     | Oui                                           | Oui                                                   | Oui                                               | Oui                                                 | Lieu.status = 'published' (publié), ou Ownership (si status = 'pending_review') | WP 1.1: Page Catégorie (liste de lieux), WP 1.3: /dashboard/mes-etablissements.                                                                                                                                                                                                                                                                                                                  |
|                        | Read (Details)      | Oui     | Oui                                           | Oui                                                   | Oui                                               | Oui                                                 | Lieu.status = 'published' (publié), ou Ownership         | WP 1.2: Page /[lang]/place/[place_slug].                                                                                                                                                                                                                                                                                                                                                                 |
|                        | Update              | Non     | Non                                           | Oui                                                   | Non                                               | Oui                                                 | Ownership (Lieu.proprietaire_id = user.id)                | WP 1.3: /dashboard/mes-etablissements (modifier les lieux approuvés). Admin pour toute modification.                                                                                                                                                                                                                                                                                              |
|                        | Delete (Soft)       | Non     | Non                                           | Oui                                                   | Non                                               | Oui                                                 | Ownership                                                 | Déduction M: Permettre au propriétaire de retirer son lieu de l'annuaire.                                                                                                                                                                                                                                                                                                                        |
|                        | Moderate (Approve/Reject) | Non | Non                                           | Non                                                   | Non                                               | Oui                                                 | Non applicable                                            | WP 5.1: Modération de Contenu (Approuver/rejeter les places).                                                                                                                                                                                                                                                                                                                                    |
| **Article**            | Create              | Non     | Non                                           | Non                                                   | Oui                                               | Oui                                                 | Auteur est l'utilisateur courant.                         | WP 2.1: Éditeur ArticleEditor.                                                                                                                                                                                                                                                                                                                                                                             |
|                        | Read (List)         | Oui     | Oui                                           | Oui                                                   | Oui                                               | Oui                                                 | Article.status = 'published' (public), ou Ownership       | WP 2.2: Portail /magazine, WP 2.1: /dashboard/auteur.                                                                                                                                                                                                                                                                                                                                              |
|                        | Read (Details)      | Oui     | Oui                                           | Oui                                                   | Oui                                               | Oui                                                 | Article.status = 'published' (public), ou Ownership       | WP 2.2: Page /[lang]/magazine/[article_slug].                                                                                                                                                                                                                                                                                                                                                     |
|                        | Update              | Non     | Non                                           | Non                                                   | Oui                                               | Oui                                                 | Ownership (Article.auteur_id = user.id)                   | WP 2.1: Éditeur ArticleEditor. Admin pour toute modification.                                                                                                                                                                                                                                                                                                                                      |
|                        | Delete (Soft)       | Non     | Non                                           | Non                                                   | Oui                                               | Oui                                                 | Ownership                                                 | Déduction M: Permettre à l'auteur d'archiver/supprimer ses articles.                                                                                                                                                                                                                                                                                                                             |
|                        | Moderate            | Non     | Non                                           | Non                                                   | Non                                               | Oui                                                 | Non applicable                                            | WP 5.1: Modération de Contenu.                                                                                                                                                                                                                                                                                                                                                                     |
| **Avis**               | Create              | Non     | Oui                                           | Oui                                                   | Oui                                               | Oui                                                 | Un utilisateur ne peut laisser qu'un avis parent par lieu. | WP 3.1: Composant ReviewsSection (avis avec sous-notations).                                                                                                                                                                                                                                                                                                                                    |
|                        | Read (List)         | Oui     | Oui                                           | Oui                                                   | Oui                                               | Oui                                                 | Avis.est_modere = false OU Ownership                      | WP 3.1: Composant ReviewsSection (sur fiches Place).                                                                                                                                                                                                                                                                                                                                            |
|                        | Update              | Non     | Oui                                           | Conditionnel                                          | Conditionnel                                      | Oui                                                 | Ownership (pour contenu), ou Ownership du lieu (pour réponse propriétaire) | WP 3.1: Propriétaire peut répondre (crée une entrée avec parent_review_id). Auteur/Proprio peut modifier ses propres avis/réponses.                                                                                                                                                                                                                                                              |
|                        | Delete (Soft)       | Non     | Oui                                           | Oui                                                   | Oui                                               | Oui                                                 | Ownership                                                 | Déduction M: L'utilisateur peut supprimer ses propres avis.                                                                                                                                                                                                                                                                                                                                      |
|                        | Moderate            | Non     | Non                                           | Non                                                   | Non                                               | Oui                                                 | Non applicable                                            | WP 5.1: Modérer les avis signalés.                                                                                                                                                                                                                                                                                                                                                               |
| **Commentaire**        | Create              | Non     | Oui                                           | Oui                                                   | Oui                                               | Oui                                                 | Non applicable                                            | WP 3.1: Composant CommentsSection (sur pages Article).                                                                                                                                                                                                                                                                                                                                           |
|                        | Read (List)         | Oui     | Oui                                           | Oui                                                   | Oui                                               | Oui                                                 | Commentaire.est_modere = false OU Ownership               | WP 3.1: Composant CommentsSection (sur pages Article).                                                                                                                                                                                                                                                                                                                                           |
|                        | Update              | Non     | Oui                                           | Oui                                                   | Oui                                               | Oui                                                 | Ownership (pour contenu), ou Ownership de l'article (pour réponse auteur) | WP 3.1: Auteur peut répondre. Auteur/Proprio peut modifier ses propres commentaires/réponses.                                                                                                                                                                                                                                                                                               |
|                        | Delete (Soft)       | Non     | Oui                                           | Oui                                                   | Oui                                               | Oui                                                 | Ownership                                                 | Déduction M: L'utilisateur peut supprimer ses propres commentaires.                                                                                                                                                                                                                                                                                                                              |
|                        | Moderate            | Non     | Non                                           | Non                                                   | Non                                               | Oui                                                 | Non applicable                                            | WP 5.1: Modérer les commentaires signalés.                                                                                                                                                                                                                                                                                                                                                       |
| **SujetForum**         | Create              | Non     | Oui                                           | Oui                                                   | Oui                                               | Oui                                                 | Non applicable                                            | WP 3.2: Un utilisateur peut lancer une discussion.                                                                                                                                                                                                                                                                                                                                               |
|                        | Read (List/Details) | Oui     | Oui                                           | Oui                                                   | Oui                                               | Oui                                                 | Sujet.est_ferme = false OU Ownership                      | WP 3.2: /forum, /[lang]/forum/[category_slug], /[lang]/forum/thread/[thread_id].                                                                                                                                                                                                                                                                                                              |
|                        | Update              | Non     | Oui                                           | Oui                                                   | Oui                                               | Oui                                                 | Ownership (si non fermé)                                  | Déduction M: L'utilisateur peut modifier ses propres sujets. Admin pour gestion.                                                                                                                                                                                                                                                                                                                |
|                        | Delete (Soft)       | Non     | Oui                                           | Oui                                                   | Oui                                               | Oui                                                 | Ownership                                                 | Déduction M: L'utilisateur peut supprimer ses propres sujets.                                                                                                                                                                                                                                                                                                                                    |
|                        | Moderate            | Non     | Non                                           | Non                                                   | Non                                               | Oui                                                 | Non applicable                                            | WP 5.1: Modération de Contenu.                                                                                                                                                                                                                                                                                                                                                                     |
| **MessageForum**       | Create              | Non     | Oui                                           | Oui                                                   | Oui                                               | Oui                                                 | Sujet.est_ferme = false                                   | WP 3.2: ReplyForm.                                                                                                                                                                                                                                                                                                                                                                                 |
|                        | Read (List)         | Oui     | Oui                                           | Oui                                                   | Oui                                               | Oui                                                 | Sujet.est_ferme = false OU Ownership                      | WP 3.2: /[lang]/forum/thread/[thread_id].                                                                                                                                                                                                                                                                                                                                                         |
|                        | Update              | Non     | Oui                                           | Oui                                                   | Oui                                               | Oui                                                 | Ownership                                                 | Déduction M: L'utilisateur peut modifier ses propres messages. Admin pour gestion.                                                                                                                                                                                                                                                                                                              |
|                        | Delete (Soft)       | Non     | Oui                                           | Oui                                                   | Oui                                               | Oui                                                 | Ownership                                                 | Déduction M: L'utilisateur peut supprimer ses propres messages.                                                                                                                                                                                                                                                                                                                                  |
|                        | Moderate            | Non     | Non                                           | Non                                                   | Non                                               | Oui                                                 | Non applicable                                            | WP 5.1: Modération de Contenu.                                                                                                                                                                                                                                                                                                                                                                     |
| **Annonce**            | Create              | Non     | Oui                                           | Oui                                                   | Oui                                               | Oui                                                 | Non applicable                                            | WP 3.3: Formulaires de création dédiés.                                                                                                                                                                                                                                                                                                                                                              |
|                        | Read (List/Details) | Oui     | Oui                                           | Oui                                                   | Oui                                               | Oui                                                 | Annonce.status = 'active' OU Ownership                    | WP 3.3: /annonces.                                                                                                                                                                                                                                                                                                                                                                                 |
|                        | Update              | Non     | Oui                                           | Oui                                                   | Oui                                               | Oui                                                 | Ownership                                                 | WP 3.3: Formulaires protégés. Admin pour gestion.                                                                                                                                                                                                                                                                                                                                                |
|                        | Delete (Soft)       | Non     | Oui                                           | Oui                                                   | Oui                                               | Oui                                                 | Ownership                                                 | Déduction M: L'utilisateur peut supprimer ses propres annonces.                                                                                                                                                                                                                                                                                                                                  |
|                        | Moderate            | Non     | Non                                           | Non                                                   | Non                                               | Oui                                                 | Non applicable                                            | WP 5.1: Modération de Contenu.                                                                                                                                                                                                                                                                                                                                                                     |
| **ServiceLocal**       | Create              | Non     | Oui                                           | Oui                                                   | Oui                                               | Oui                                                 | Non applicable                                            | WP 3.3: Formulaires de création dédiés.                                                                                                                                                                                                                                                                                                                                                              |
|                        | Read (List/Details) | Oui     | Oui                                           | Oui                                                   | Oui                                               | Oui                                                 | Service.status = 'active' OU Ownership                    | WP 3.3: /services.                                                                                                                                                                                                                                                                                                                                                                                 |
|                        | Update              | Non     | Oui                                           | Oui                                                   | Oui                                               | Oui                                                 | Ownership                                                 | WP 3.3: Formulaires protégés. Admin pour gestion.                                                                                                                                                                                                                                                                                                                                                |
|                        | Delete (Soft)       | Non     | Oui                                           | Oui                                                   | Oui                                               | Oui                                                 | Ownership                                                 | Déduction M: L'utilisateur peut supprimer ses propres services.                                                                                                                                                                                                                                                                                                                                  |
|                        | Moderate            | Non     | Non                                           | Non                                                   | Non                                               | Oui                                                 | Non applicable                                            | WP 5.1: Modération de Contenu.                                                                                                                                                                                                                                                                                                                                                                     |
| **Conversation**       | Create (ou Get)     | Non     | Oui                                           | Oui                                                   | Oui                                               | Oui                                                 | Participation à la conversation (pour Get)                | WP 3.4: RPC get_or_create_conversation().                                                                                                                                                                                                                                                                                                                                                        |
|                        | Read (List/Details) | Non     | Oui                                           | Oui                                                   | Oui                                               | Oui                                                 | Participation à la conversation                           | WP 3.4: Interface /messagerie.                                                                                                                                                                                                                                                                                                                                                                   |
|                        | Update              | Non     | Oui                                           | Oui                                                   | Oui                                               | Oui                                                 | Ownership de la conversation (pour archivage par exemple) | Déduction M: archivage de conversation.                                                                                                                                                                                                                                                                                                                                                          |
|                        | Delete (Soft)       | Non     | Oui                                           | Oui                                                   | Oui                                               | Oui                                                 | Ownership (pour soi-même)                                  | Déduction M: L'utilisateur peut "quitter" une conversation.                                                                                                                                                                                                                                                                                                                                      |
| **Message**            | Create              | Non     | Oui                                           | Oui                                                   | Oui                                               | Oui                                                 | Participation à la conversation                           | WP 3.4: Envoyer un message.                                                                                                                                                                                                                                                                                                                                                                        |
|                        | Read (List)         | Non     | Oui                                           | Oui                                                   | Oui                                               | Oui                                                 | Participation à la conversation                           | WP 3.4: Interface /messagerie.                                                                                                                                                                                                                                                                                                                                                                   |
| **Notification**       | Read (List)         | Non     | Oui                                           | Oui                                                   | Oui                                               | Oui                                                 | Ownership                                                 | WP 3.4: NotificationBell (pour les notifs en temps réel).                                                                                                                                                                                                                                                                                                                                        |
|                        | Update (Mark as read) | Non   | Oui                                           | Oui                                                   | Oui                                               | Oui                                                 | Ownership                                                 | Déduction M: Marquer les notifications comme lues.                                                                                                                                                                                                                                                                                                                                                 |
| **Portefeuille**       | Read (Balance/History) | Non  | Oui                                           | Oui                                                   | Oui                                               | Oui                                                 | Ownership                                                 | WP 4.1: Interface /portefeuille.                                                                                                                                                                                                                                                                                                                                                                 |
|                        | Update (Credit)     | Non     | Oui                                           | Oui                                                   | Oui                                               | Oui                                                 | Ownership (via paiement externe)                          | WP 4.1: Edge Function + Webhook Stripe pour ajouter de l'argent.                                                                                                                                                                                                                                                                                                                               |
|                        | Update (Transfer)   | Non     | Oui                                           | Oui                                                   | Oui                                               | Oui                                                 | Ownership (pour émetteur)                                 | WP 4.1: RPC process_internal_transaction.                                                                                                                                                                                                                                                                                                                                                        |
| **Réservation**        | Create              | Non     | Oui                                           | Oui                                                   | Oui                                               | Oui                                                 | Client est l'utilisateur courant.                         | WP 4.2: Widget de réservation.                                                                                                                                                                                                                                                                                                                                                                     |
|                        | Read (List)         | Non     | Oui                                           | Oui                                                   | Oui                                               | Oui                                                 | Ownership (client_id ou proprietaire_id)                  | WP 4.2: Liste les réservations pour le client/propriétaire.                                                                                                                                                                                                                                                                                                                                      |
|                        | Update (Status)     | Non     | Conditionnel                                  | Oui                                                   | Non                                               | Oui                                                 | Ownership du client (annuler sa propre résa) ou Ownership du propriétaire (confirmer/annuler) | WP 4.2: La réservation est confirmée après paiement. Propriétaire peut gérer.                                                                                                                                                                                                                                                                                                                      |
| **Disponibilité**      | Create              | Non     | Non                                           | Oui                                                   | Non                                               | Oui                                                 | Ownership du lieu lié.                                    | WP 4.2: Un propriétaire d'hôtel peut définir ses disponibilités.                                                                                                                                                                                                                                                                                                                               |
|                        | Read (List)         | Oui     | Oui                                           | Oui                                                   | Oui                                               | Oui                                                 | Non applicable (pour affichage public), ou Ownership (pour gestion) | WP 4.2: Widget de réservation (affiche dispos).                                                                                                                                                                                                                                                                                                                                                  |
|                        | Update              | Non     | Non                                           | Oui                                                   | Non                                               | Oui                                                 | Ownership du lieu lié.                                    | WP 4.2: Un propriétaire d'hôtel peut définir ses disponibilités.                                                                                                                                                                                                                                                                                                                               |
| **JournalAudit**       | Read                | Non     | Non                                           | Non                                                   | Non                                               | Oui                                                 | Non applicable                                            | WP 5.1: Dashboard /admin (files de modération).                                                                                                                                                                                                                                                                                                                                                  |

### 2.3 Règles transverses
#### Visibilité des champs
*   **Utilisateur** :
    *   `id_authentification` : Visible uniquement par `Administrateur`.
    *   `email` : Visible par l'utilisateur propriétaire, `Administrateur`. Masqué (partiellement) pour les autres rôles.
    *   `role` : Visible par l'utilisateur propriétaire, `Administrateur`. Non exposé publiquement.
*   **Lieu / Article / Annonce / ServiceLocal** :
    *   `status` : Visible par l'utilisateur propriétaire et `Administrateur`. Non exposé publiquement si `pending_review` ou `rejected` (seulement `published` est visible par `Anonyme`/`Citoyen`).
    *   `proprietaire_id` / `auteur_id` : Peut être exposé pour identifier l'entité propriétaire/auteur, mais pas l'email ou d'autres infos PII.

#### Contrôles d’abus
*   **Fréquence d'actions (Rate Limit)** :
    *   Tentatives de connexion/inscription : Limiter le nombre de tentatives par adresse IP ou identifiant pour prévenir le brute-force.
    *   Soumission de contenu (Lieu, Article, Avis, Commentaire, Annonce, SujetForum, MessageForum) : Limiter la fréquence de soumission par utilisateur pour prévenir le spam.
    *   Envoi de messages privés : Limiter la fréquence d'envoi pour prévenir le spam.
    *   Crédit du portefeuille : Limiter le nombre de tentatives de paiement par période.
*   **Détection de duplication** :
    *   Lieux : Détecter les soumissions de lieux avec des adresses ou noms très similaires.
    *   Articles : Détecter le plagiat ou la republication excessive du même contenu.
*   **Signalement de contenu** : Permettre aux utilisateurs de signaler les contenus inappropriés (avis, commentaires, messages forum, annonces, services, lieux). Ce signalement déclenche un processus de modération pour les `Administrateurs`.

#### Journalisation/audit
*   **Événements à tracer** :
    *   Authentification : Succès/échec de connexion, inscription, réinitialisation de mot de passe, tentatives d'accès non autorisé.
    *   Modification de données sensibles : Changement de rôle utilisateur, bannissement, modification de profil PII (email, mot de passe).
    *   Opérations de modération : Approbation/rejet de lieux/articles, modération d'avis/commentaires.
    *   Transactions financières : Tous les crédits, débits, transferts de portefeuille.
    *   Création/modification/suppression de ressources critiques : Lieux, articles, annonces, services, catégories.
*   **Champs sensibles** : Les champs contenant des données personnelles identifiables (PII) ou des secrets ne doivent pas être journalisés en clair. Par exemple, les adresses IP peuvent être anonymisées après un délai, les emails masqués, les IDs d'authentification externes tronqués.
*   **Protection anti-altération** : Les journaux d'audit doivent être stockés de manière à garantir leur intégrité, idéalement append-only et avec des mécanismes empêchant la modification a posteriori.

#### Confidentialité & données personnelles
*   **Classification PII** :
    *   **Haute sensibilité** : Email, coordonnées téléphoniques, adresse physique, ID d'authentification externe, historique des transactions détaillées.
    *   **Moyenne sensibilité** : Nom d'affichage, bio, avatar_url, username.
    *   **Faible sensibilité** : Contenu public (avis, commentaires, articles, annonces).
*   **Minimisation** : Ne collecter et ne stocker que les données strictement nécessaires aux fonctionnalités (ex: pas de date de naissance si non utilisée).
*   **Consentements requis** :
    *   Consentement à la politique de confidentialité et aux conditions d'utilisation lors de l'inscription.
    *   Consentement explicite pour les communications marketing (s'il y a lieu).
    *   Consentement pour le traitement de certaines données personnelles si nécessaire (ex: localisation précise).
*   **Accès aux données** : Restreindre l'accès aux données personnelles selon le principe du moindre privilège, en utilisant la RLS pour les accès programmatiques et des politiques de sécurité strictes pour les accès administratifs.
*   **Droit à l'oubli / Rectification** : Mettre en place des procédures pour permettre aux utilisateurs de demander la suppression ou la rectification de leurs données personnelles.

---

# 3. OPÉRATIONS LOGIQUES / SURFACE « API » (AGNOSTIQUE)
### Catalogue récapitulatif des opérations

| Opération                                     | Type (R/W) | Entité(s) Impactée(s)           | Entrée (résumé)                          | Sortie (résumé)                                | Permissions             | Idempotent | Notes                                                                                                                              |
| :-------------------------------------------- | :--------- | :------------------------------ | :--------------------------------------- | :--------------------------------------------- | :---------------------- | :--------- | :--------------------------------------------------------------------------------------------------------------------------------- |
| AuthentifierUtilisateur                       | W          | Utilisateur, JournalAudit       | `email`, `mot_de_passe`                  | `token_session`, `user_profile`                | Anonyme                 | Non        | Gère la connexion et génère un jeton.                                                                                              |
| InscrireUtilisateur                           | W          | Utilisateur, Portefeuille, JournalAudit | `username`, `email`, `mot_de_passe`, `langue` | `token_session`, `user_profile`                | Anonyme                 | Non        | Crée un nouveau citoyen et son portefeuille.                                                                                       |
| RéinitialiserMotDePasse                       | W          | Utilisateur, JournalAudit       | `email`                                  | `message_confirmation`                         | Anonyme                 | Non        | Envoie un lien de réinitialisation.                                                                                                |
| AuthentifierOAuth                             | W          | Utilisateur, Portefeuille, JournalAudit | `code_autorisation_oauth`                | `token_session`, `user_profile`                | Anonyme                 | Non        | Gère la connexion/inscription via fournisseur tiers.                                                                               |
| RécupérerProfilUtilisateurPublic              | R          | Utilisateur                     | `username`                               | `user_public_profile`                          | Anonyme                 | Oui        | Affiche les infos publiques d'un utilisateur.                                                                                      |
| MettreÀJourProfilUtilisateur                  | W          | Utilisateur, JournalAudit       | `nom_affichage`, `bio`, `langue`         | `user_profile`                                 | Citoyen (Ownership)     | Oui        | Modifie les informations de profil de l'utilisateur.                                                                               |
| TéléchargerAvatarUtilisateur                  | W          | Utilisateur, Fichiers, JournalAudit | `image_fichier`                          | `avatar_url`                                   | Citoyen (Ownership)     | Non        | Met à jour l'avatar de l'utilisateur.                                                                                              |
| RécupérerArbreCatégories                      | R          | Catégorie                       | `type_categorie`, `langue_code`          | `liste_categories_imbriquées`                  | Anonyme                 | Oui        | Récupère la structure hiérarchique des catégories.                                                                                 |
| ListerSousCatégories                          | R          | Catégorie                       | `parent_id`, `langue_code`               | `liste_categories`                             | Anonyme                 | Oui        | Liste les catégories enfants d'une catégorie donnée.                                                                               |
| ListerLieuxParCatégorie                       | R          | Lieu, TraductionLieu            | `category_slug`, `langue_code`, `pagination`, `filtres`, `tri` | `liste_lieux_paginée`                          | Anonyme                 | Oui        | Affiche les lieux pour une catégorie spécifique.                                                                                   |
| RécupérerDétailsLieu                          | R          | Lieu, TraductionLieu, AttributLieu, DétailsHébergement/Gastronomie | `place_slug`, `langue_code`              | `details_lieu_complets`                        | Anonyme                 | Oui        | Fournit toutes les infos d'un lieu, y compris les détails spécifiques et attributs.                                               |
| SoumettreLieu                                 | W          | Lieu, TraductionLieu, AttributLieu, DétailsSpécifiques, Fichiers, JournalAudit | `data_lieu`, `images`                    | `lieu_id`, `status`                            | Propriétaire            | Non        | Enregistre un nouveau lieu.                                                                                                        |
| MettreÀJourLieu                               | W          | Lieu, TraductionLieu, AttributLieu, DétailsSpécifiques, Fichiers, JournalAudit | `place_id`, `data_lieu_maj`, `images`    | `lieu_id`, `status`                            | Propriétaire (Ownership) | Oui        | Modifie un lieu existant.                                                                                                          |
| ListerLieuxPropriétaire                       | R          | Lieu                            | `utilisateur_id`, `status`, `pagination` | `liste_lieux_propriétaire`                     | Propriétaire (Ownership) | Oui        | Affiche les lieux gérés par un propriétaire.                                                                                       |
| RécupérerStatutLieu                           | R          | Lieu                            | `place_id`                               | `status_lieu`                                  | Propriétaire (Ownership) | Oui        | Retourne le statut d'un lieu (utile pour le dashboard).                                                                            |
| CréerArticle                                  | W          | Article, ContenuArticle, LienArticleCatégorie, LienArticleLieu, Fichiers, JournalAudit | `titre`, `contenu_blocs`, `categories`, `lieux_liés`, `langue` | `article_id`, `status`                         | Auteur (Ownership)      | Non        | Crée un nouvel article.                                                                                                            |
| MettreÀJourArticle                            | W          | Article, ContenuArticle, LienArticleCatégorie, LienArticleLieu, Fichiers, JournalAudit | `article_id`, `data_article_maj`, `contenu_blocs`, `categories`, `lieux_liés` | `article_id`, `status`                         | Auteur (Ownership)      | Oui        | Modifie un article existant.                                                                                                       |
| ChercherLieuxPourArticle                      | R          | Lieu, TraductionLieu            | `terme_recherche`, `langue_code`, `pagination` | `liste_lieux_simplifiée`                       | Auteur                  | Oui        | Recherche de lieux pour intégration dans un article.                                                                               |
| ComparerLieux                                 | R          | Lieu, AttributLieu              | `liste_place_ids`, `liste_attributs`     | `tableau_comparatif_lieux`                     | Auteur                  | Oui        | Génère un tableau comparatif de lieux sur des attributs.                                                                           |
| ListerArticlesAuteur                          | R          | Article                         | `auteur_id`, `status`, `pagination`      | `liste_articles_auteur`                        | Auteur (Ownership)      | Oui        | Affiche les articles d'un auteur.                                                                                                  |
| ListerArticlesParCatégorieMagazine            | R          | Article, LienArticleCatégorie   | `category_slug`, `langue_code`, `pagination` | `liste_articles_paginée`                       | Anonyme                 | Oui        | Liste les articles d'une catégorie magazine.                                                                                       |
| RécupérerDétailsArticle                       | R          | Article, ContenuArticle, LienArticleCatégorie, LienArticleLieu | `article_slug`, `langue_code`            | `details_article_complets`                     | Anonyme                 | Oui        | Fournit le contenu et les métadonnées d'un article.                                                                                |
| ListerArticlesLiésÀLieu                       | R          | Article, LienArticleLieu        | `place_id`, `langue_code`, `pagination`  | `liste_articles_liés_lieu`                     | Anonyme                 | Oui        | Affiche les articles qui mentionnent un lieu donné.                                                                                |
| ListerArticlesLiésÀCatégorie                  | R          | Article, LienArticleCatégorie   | `category_id`, `langue_code`, `pagination` | `liste_articles_liés_catégorie`                | Anonyme                 | Oui        | Affiche les articles liés à une catégorie spécifique (hors magazine principal).                                                    |
| SoumettreAvis                                 | W          | Avis, SousNotation, JournalAudit | `place_id`, `notation_globale`, `contenu`, `sous_notations`, `langue_code` | `avis_id`                                      | Citoyen (Ownership)     | Non        | Crée un nouvel avis avec sous-notations pour un lieu.                                                                              |
| RépondreÀAvis                                 | W          | Avis, JournalAudit              | `parent_review_id`, `contenu`, `langue_code` | `avis_id`                                      | Citoyen (Ownership, ou Propriétaire du lieu) | Non        | Ajoute une réponse à un avis existant.                                                                                             |
| ListerAvisPourLieu                            | R          | Avis, SousNotation, Utilisateur | `place_id`, `pagination`, `tri`          | `liste_avis_paginée`                           | Anonyme                 | Oui        | Affiche les avis pour un lieu, avec les réponses.                                                                                  |
| SoumettreCommentaire                          | W          | Commentaire, JournalAudit       | `article_id`, `contenu`, `langue_code`   | `commentaire_id`                               | Citoyen (Ownership)     | Non        | Crée un nouveau commentaire pour un article.                                                                                       |
| RépondreÀCommentaire                          | W          | Commentaire, JournalAudit       | `parent_comment_id`, `contenu`, `langue_code` | `commentaire_id`                               | Citoyen (Ownership, ou Auteur de l'article)  | Non        | Ajoute une réponse à un commentaire existant.                                                                                      |
| ListerCommentairesPourArticle                 | R          | Commentaire, Utilisateur        | `article_id`, `pagination`, `tri`        | `liste_commentaires_paginée`                   | Anonyme                 | Oui        | Affiche les commentaires pour un article, avec les réponses.                                                                       |
| CréerSujetForum                               | W          | SujetForum, JournalAudit        | `category_id`, `titre`, `contenu_initial`, `langue_code` | `sujet_id`                                     | Citoyen (Ownership)     | Non        | Ouvre une nouvelle discussion dans le forum.                                                                                       |
| RépondreSujetForum                            | W          | MessageForum, SujetForum, JournalAudit | `sujet_id`, `contenu`, `parent_message_id`, `langue_code` | `message_id`                                   | Citoyen (Ownership)     | Non        | Ajoute un message à un sujet de forum existant.                                                                                    |
| ListerCatégoriesForum                         | R          | Catégorie                       | `langue_code`                            | `liste_categories_forum`                       | Anonyme                 | Oui        | Affiche les catégories de forum disponibles.                                                                                       |
| ListerSujetsForum                             | R          | SujetForum, Utilisateur         | `category_slug`, `langue_code`, `pagination`, `tri` | `liste_sujets_forum_paginée`                   | Anonyme                 | Oui        | Affiche les sujets d'une catégorie de forum.                                                                                       |
| RécupérerDétailsSujetForum                    | R          | SujetForum, MessageForum, Utilisateur | `thread_id`                              | `details_sujet_forum`, `liste_messages_paginée` | Anonyme                 | Oui        | Affiche un sujet de forum et ses messages.                                                                                         |
| ListerActivitéForumUtilisateur                | R          | SujetForum, MessageForum        | `user_id`, `pagination`                  | `liste_activite_forum`                         | Citoyen (Ownership ou Admin) | Oui        | Affiche les sujets et messages d'un utilisateur sur le forum.                                                                      |
| CréerAnnonce                                  | W          | Annonce, Fichiers, JournalAudit | `titre`, `description`, `prix`, `categorie`, `etat_bien`, `images` | `annonce_id`                                   | Citoyen (Ownership)     | Non        | Publie une petite annonce.                                                                                                         |
| MettreÀJourAnnonce                            | W          | Annonce, Fichiers, JournalAudit | `annonce_id`, `data_annonce_maj`, `images` | `annonce_id`                                   | Citoyen (Ownership)     | Oui        | Modifie une annonce existante.                                                                                                     |
| ListerAnnonces                                | R          | Annonce, Utilisateur            | `filtres`, `tri`, `pagination`           | `liste_annonces_paginée`                       | Anonyme                 | Oui        | Affiche les annonces disponibles.                                                                                                  |
| CréerServiceLocal                             | W          | ServiceLocal, Fichiers, JournalAudit | `titre`, `description`, `prix_base`, `unite_prix`, `categorie`, `images`, `lien_lieu_pro` | `service_id`                                   | Citoyen (Ownership)     | Non        | Publie une offre de service local.                                                                                                 |
| MettreÀJourServiceLocal                       | W          | ServiceLocal, Fichiers, JournalAudit | `service_id`, `data_service_maj`, `images` | `service_id`                                   | Citoyen (Ownership)     | Oui        | Modifie une offre de service local existante.                                                                                      |
| ListerServicesLocaux                          | R          | ServiceLocal, Utilisateur       | `filtres`, `tri`, `pagination`           | `liste_services_paginée`                       | Anonyme                 | Oui        | Affiche les offres de services locaux.                                                                                             |
| InitierConversationContactAnnonce             | W          | Conversation, ParticipantConversation, Message, JournalAudit | `annonce_id`, `message_initial`          | `conversation_id`                              | Citoyen                 | Non        | Crée une conversation avec l'auteur d'une annonce.                                                                                 |
| RécupérerOuCréerConversation                  | W          | Conversation, ParticipantConversation, JournalAudit | `utilisateur_cible_id`                   | `conversation_id`                              | Citoyen (Ownership)     | Oui        | Obtient une conversation existante ou en crée une nouvelle avec un utilisateur.                                                    |
| EnvoyerMessage                                | W          | Message, Conversation, Notification, JournalAudit | `conversation_id`, `contenu`             | `message_id`                                   | Citoyen (Participant)   | Non        | Envoie un message dans une conversation.                                                                                           |
| ListerConversations                           | R          | Conversation, ParticipantConversation, Utilisateur | `utilisateur_id`                         | `liste_conversations_résumé`                   | Citoyen (Ownership)     | Oui        | Affiche la liste des conversations de l'utilisateur.                                                                               |
| ListerMessagesConversation                    | R          | Message, Utilisateur            | `conversation_id`, `pagination`          | `liste_messages_conversation_paginée`          | Citoyen (Participant)   | Oui        | Affiche les messages d'une conversation.                                                                                           |
| ListerNotificationsUtilisateur                | R          | Notification                    | `utilisateur_id`, `est_lue`, `pagination` | `liste_notifications_paginée`                  | Citoyen (Ownership)     | Oui        | Affiche les notifications de l'utilisateur.                                                                                        |
| MarquerNotificationLue                        | W          | Notification                    | `notification_id`                        | `succès: boolean`                              | Citoyen (Ownership)     | Oui        | Marque une notification comme lue.                                                                                                 |
| CréditerPortefeuille                          | W          | Portefeuille, Transaction, JournalAudit | `utilisateur_id`, `montant`, `reference_externe` | `solde_mis_a_jour`                             | Système (Webhook)       | Oui        | Ajoute des fonds au portefeuille d'un utilisateur.                                                                                 |
| TransférerFonds                               | W          | Portefeuille, Transaction, JournalAudit | `expediteur_id`, `destinataire_id`, `montant` | `solde_expediteur`, `solde_destinataire`       | Citoyen (Ownership)     | Non        | Transfert atomique de fonds entre deux portefeuilles internes.                                                                     |
| RécupérerSoldePortefeuille                    | R          | Portefeuille                    | `utilisateur_id`                         | `solde`, `devise`                              | Citoyen (Ownership)     | Oui        | Affiche le solde actuel du portefeuille.                                                                                           |
| RécupérerHistoriqueTransactions               | R          | Transaction                     | `utilisateur_id`, `pagination`, `filtres` | `historique_transactions_paginé`               | Citoyen (Ownership)     | Oui        | Affiche l'historique des transactions du portefeuille.                                                                             |
| CréerRéservation                              | W          | Réservation, Disponibilité, JournalAudit | `client_id`, `lieu_id`, `disponibilite_id`, `dates`, `montant` | `reservation_id`, `status`                     | Citoyen                 | Non        | Initialise une réservation. Nécessite une confirmation de paiement.                                                                |
| MettreÀJourStatutRéservation                  | W          | Réservation, Disponibilité, JournalAudit | `reservation_id`, `nouveau_status`       | `reservation_id`, `status`                     | Propriétaire (Ownership), Admin | Oui        | Change le statut d'une réservation (ex: Annuler).                                                                                  |
| DéfinirDisponibilités                         | W          | Disponibilité, JournalAudit     | `lieu_id`, `liste_creneaux_disponibles`  | `succès: boolean`                              | Propriétaire (Ownership) | Oui        | Ajoute ou met à jour les disponibilités d'un lieu/service.                                                                         |
| RécupérerDisponibilitésLieu                   | R          | Disponibilité                   | `lieu_id`, `date_debut`, `date_fin`      | `liste_disponibilites`                         | Anonyme                 | Oui        | Affiche les créneaux disponibles pour un lieu/service.                                                                             |
| TraiterPaiementRéservation                    | W          | Réservation, Portefeuille, Transaction, CommissionSystème, Disponibilité, Notification, JournalAudit | `reservation_id`                         | `reservation_id`, `status`                     | Système (RPC interne)   | Non        | Confirme une réservation après paiement réussi (débit client, crédit propriétaire - commission).                                    |
| ListerUtilisateursAdmin                       | R          | Utilisateur                     | `filtres`, `tri`, `pagination`           | `liste_utilisateurs`                           | Administrateur          | Oui        | Affiche tous les utilisateurs avec leurs détails.                                                                                  |
| MettreÀJourRôleUtilisateurAdmin               | W          | Utilisateur, JournalAudit       | `user_id`, `nouveau_role`                | `user_profile`                                 | Administrateur          | Non        | Modifie le rôle d'un utilisateur.                                                                                                  |
| BannirUtilisateurAdmin                        | W          | Utilisateur, JournalAudit       | `user_id`, `raison`                      | `succès: boolean`                              | Administrateur          | Non        | Bannit un utilisateur.                                                                                                             |
| ApprouverLieuAdmin                            | W          | Lieu, Notification, JournalAudit | `place_id`                               | `succès: boolean`                              | Administrateur          | Non        | Approuve un lieu en attente de révision.                                                                                           |
| RejeterLieuAdmin                              | W          | Lieu, Notification, JournalAudit | `place_id`, `raison_rejet`               | `succès: boolean`                              | Administrateur          | Non        | Rejette un lieu en attente de révision.                                                                                            |
| ModérerContenuAdmin                           | W          | Avis, Commentaire, SujetForum, MessageForum, Annonce, ServiceLocal, JournalAudit | `content_id`, `type_contenu`, `action`, `raison` | `succès: boolean`                              | Administrateur          | Non        | Effectue une action de modération sur un contenu (ex: masquer, supprimer).                                                         |
| GérerCatégoriesAdmin                          | W          | Catégorie, JournalAudit         | `category_id` (optionnel), `data_categorie` | `succès: boolean`                              | Administrateur          | Oui        | CRUD sur les catégories.                                                                                                           |
| GérerAttributsAdmin                           | W          | AttributLieu, JournalAudit      | `attribute_id` (optionnel), `data_attribut` | `succès: boolean`                              | Administrateur          | Oui        | CRUD sur les attributs de lieu (définition des clés/types).                                                                        |

### Spécification détaillée des opérations

#### Opération : AuthentifierUtilisateur
*   **Nom canonique** : `AuthentifierUtilisateur`
*   **But** : Permettre à un utilisateur de se connecter avec ses identifiants et obtenir une session.
*   **Entités impactées** : `Utilisateur`, `JournalAudit`
*   **Entrée** (schéma JSON logique) :
    ```json
    {
      "email": "user@example.com",
      "mot_de_passe": "password123"
    }
    ```
    *   `email`: `email`, requis, valide.
    *   `mot_de_passe`: `string`, requis, min 8 caractères.
*   **Sortie** (schéma JSON logique) :
    *   **Succès** :
        ```json
        {
          "token_session": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
          "utilisateur_id": "e4a5b6c7-d8e9-0123-4567-890abcdef012",
          "username": "super_citoyen",
          "nom_affichage": "Super Citoyen",
          "role": "citoyen",
          "avatar_url": "https://cdn.example.com/avatars/super_citoyen.png"
        }
        ```
    *   **Erreur** : `AUTH_INVALID_CREDENTIALS`
*   **Idempotence** : Non
*   **Permissions requises** : `Anonyme`
*   **Effets de bord** : Crée une entrée dans `JournalAudit` pour la connexion. Si succès, génère un jeton de session.
*   **Pagination/tri/filtre** : Non applicable.
*   **Recherche** : Non applicable.
*   **Erreurs** :
    *   `AUTH_INVALID_CREDENTIALS`: Mot de passe ou email incorrect. Cause: Mauvaise saisie ou compte inexistant. Action: Vérifier les identifiants ou utiliser la réinitialisation de mot de passe.
    *   `AUTH_TOO_MANY_ATTEMPTS`: Trop de tentatives de connexion. Cause: Attaque par force brute potentielle. Action: Attendre un certain délai avant de réessayer.

#### Opération : InscrireUtilisateur
*   **Nom canonique** : `InscrireUtilisateur`
*   **But** : Créer un nouveau compte utilisateur et un portefeuille associé.
*   **Entités impactées** : `Utilisateur`, `Portefeuille`, `JournalAudit`
*   **Entrée** (schéma JSON logique) :
    ```json
    {
      "username": "nouveau_citoyen",
      "email": "nouveau@example.com",
      "mot_de_passe": "SecurePassword123!",
      "langue_preferee": "fr"
    }
    ```
    *   `username`: `string`, requis, unique, alphanumérique, min 3, max 50.
    *   `email`: `email`, requis, unique, valide.
    *   `mot_de_passe`: `string`, requis, min 8, complexe (majuscule, minuscule, chiffre, symbole).
    *   `langue_preferee`: `string`, optionnel, défaut `fr`, code ISO 639-1.
*   **Sortie** (schéma JSON logique) :
    *   **Succès** :
        ```json
        {
          "token_session": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
          "utilisateur_id": "nouvel_id_utilisateur_uuid",
          "username": "nouveau_citoyen",
          "nom_affichage": "nouveau_citoyen",
          "role": "citoyen",
          "avatar_url": "url_avatar_par_defaut"
        }
        ```
    *   **Erreur** : `AUTH_USERNAME_TAKEN`, `AUTH_EMAIL_TAKEN`, `VALIDATION_FAILED`
*   **Idempotence** : Non
*   **Permissions requises** : `Anonyme`
*   **Effets de bord** : Crée un `Utilisateur`, un `Portefeuille` associé, une entrée `JournalAudit`. Si succès, génère un jeton de session.
*   **Pagination/tri/filtre** : Non applicable.
*   **Recherche** : Non applicable.
*   **Erreurs** :
    *   `AUTH_USERNAME_TAKEN`: Le nom d'utilisateur est déjà pris. Cause: Conflit d'unicité. Action: Choisir un autre nom d'utilisateur.
    *   `AUTH_EMAIL_TAKEN`: L'adresse email est déjà utilisée. Cause: Conflit d'unicité. Action: Utiliser une autre adresse email ou se connecter.
    *   `VALIDATION_FAILED`: Les données d'entrée sont invalides. Cause: Mot de passe non conforme, format email incorrect. Action: Corriger les champs d'entrée.

#### Opération : RéinitialiserMotDePasse
*   **Nom canonique** : `RéinitialiserMotDePasse`
*   **But** : Initier le processus de réinitialisation du mot de passe pour un utilisateur.
*   **Entités impactées** : `Utilisateur`, `JournalAudit`
*   **Entrée** (schéma JSON logique) :
    ```json
    {
      "email": "user@example.com"
    }
    ```
    *   `email`: `email`, requis, valide.
*   **Sortie** (schéma JSON logique) :
    *   **Succès** :
        ```json
        {
          "message": "Un lien de réinitialisation a été envoyé à votre adresse email (si le compte existe)."
        }
        ```
    *   **Erreur** : `AUTH_EMAIL_NOT_FOUND` (par sécurité, le message peut être générique)
*   **Idempotence** : Non (chaque appel génère un nouveau lien potentiellement)
*   **Permissions requises** : `Anonyme`
*   **Effets de bord** : Envoie un email à l'utilisateur si l'email est valide. Crée une entrée `JournalAudit`.
*   **Pagination/tri/filtre** : Non applicable.
*   **Recherche** : Non applicable.
*   **Erreurs** :
    *   `AUTH_EMAIL_NOT_FOUND`: L'email n'est pas associé à un compte. Cause: Email incorrect. Action: Vérifier l'email.

#### Opération : AuthentifierOAuth
*   **Nom canonique** : `AuthentifierOAuth`
*   **But** : Gérer la connexion ou l'inscription via un fournisseur d'authentification tiers.
*   **Entités impactées** : `Utilisateur`, `Portefeuille`, `JournalAudit`
*   **Entrée** (schéma JSON logique) :
    ```json
    {
      "code_autorisation_oauth": "some_auth_code_from_provider",
      "fournisseur": "google"
    }
    ```
    *   `code_autorisation_oauth`: `string`, requis, code d'autorisation reçu du fournisseur OAuth.
    *   `fournisseur`: `enum`, requis, `google`, `github`, etc.
*   **Sortie** (schéma JSON logique) :
    *   **Succès** : Identique à `AuthentifierUtilisateur`
*   **Idempotence** : Non (chaque code d'autorisation est à usage unique)
*   **Permissions requises** : `Anonyme`
*   **Effets de bord** : Crée un `Utilisateur` et `Portefeuille` si nouveau, met à jour le profil si existant. Crée une entrée `JournalAudit`. Si succès, génère un jeton de session.
*   **Pagination/tri/filtre** : Non applicable.
*   **Recherche** : Non applicable.
*   **Erreurs** :
    *   `AUTH_OAUTH_FAILED`: L'authentification OAuth a échoué. Cause: Code invalide, problème avec le fournisseur. Action: Réessayer ou choisir un autre mode de connexion.
    *   `AUTH_EMAIL_CONFLICT`: L'email du fournisseur OAuth est déjà associé à un compte local. Cause: Conflit d'identités. Action: Se connecter avec le compte local existant et lier le compte OAuth si possible.

#### Opération : RécupérerProfilUtilisateurPublic
*   **Nom canonique** : `RécupérerProfilUtilisateurPublic`
*   **But** : Afficher les informations publiques d'un utilisateur (page profil public).
*   **Entités impactées** : `Utilisateur`
*   **Entrée** (schéma JSON logique) :
    ```json
    {
      "username": "super_citoyen"
    }
    ```
    *   `username`: `string`, requis.
*   **Sortie** (schéma JSON logique) :
    *   **Succès** :
        ```json
        {
          "username": "super_citoyen",
          "nom_affichage": "Super Citoyen",
          "bio": "Explorateur de la ville numérique, aime les pizzerias et le forum de randonnée.",
          "avatar_url": "https://cdn.example.com/avatars/super_citoyen.png",
          "date_inscription": "2023-09-01T14:30:00Z",
          "activite_forum_count": 5
        }
        ```
    *   **Erreur** : `NOT_FOUND`
*   **Idempotence** : Oui
*   **Permissions requises** : `Anonyme`
*   **Effets de bord** : Non applicable.
*   **Pagination/tri/filtre** : Non applicable.
*   **Recherche** : Non applicable.
*   **Erreurs** :
    *   `NOT_FOUND`: Le profil utilisateur n'existe pas. Cause: Mauvais username. Action: Vérifier le nom d'utilisateur.

#### Opération : MettreÀJourProfilUtilisateur
*   **Nom canonique** : `MettreÀJourProfilUtilisateur`
*   **But** : Permettre à un utilisateur de modifier ses informations de profil.
*   **Entités impactées** : `Utilisateur`, `JournalAudit`
*   **Entrée** (schéma JSON logique) :
    ```json
    {
      "utilisateur_id": "e4a5b6c7-d8e9-0123-4567-890abcdef012",
      "nom_affichage": "Mon Nouveau Nom",
      "bio": "Nouvelle bio passionnante.",
      "langue_preferee": "en"
    }
    ```
    *   `utilisateur_id`: `uuid`, requis.
    *   `nom_affichage`: `string`, optionnel, max 100 caractères.
    *   `bio`: `text`, optionnel, max 500 caractères.
    *   `langue_preferee`: `string`, optionnel, code ISO 639-1.
*   **Sortie** (schéma JSON logique) :
    *   **Succès** :
        ```json
        {
          "utilisateur_id": "e4a5b6c7-d8e9-0123-4567-890abcdef012",
          "nom_affichage": "Mon Nouveau Nom",
          "bio": "Nouvelle bio passionnante.",
          "langue_preferee": "en",
          "date_mise_a_jour": "2023-10-27T10:15:00Z"
        }
        ```
    *   **Erreur** : `VALIDATION_FAILED`, `NOT_AUTHORIZED`
*   **Idempotence** : Oui (mettre à jour avec les mêmes données ne change rien)
*   **Permissions requises** : `Citoyen` (ownership)
*   **Effets de bord** : Met à jour l'entité `Utilisateur`, crée une entrée `JournalAudit`.
*   **Pagination/tri/filtre** : Non applicable.
*   **Recherche** : Non applicable.
*   **Erreurs** :
    *   `VALIDATION_FAILED`: Les données d'entrée sont invalides. Cause: Champs non conformes. Action: Corriger les champs.
    *   `NOT_AUTHORIZED`: L'utilisateur n'est pas autorisé à modifier ce profil. Cause: Tentative de modification du profil d'un autre utilisateur. Action: Opération non permise.

#### Opération : TéléchargerAvatarUtilisateur
*   **Nom canonique** : `TéléchargerAvatarUtilisateur`
*   **But** : Permettre à un utilisateur de télécharger et définir une nouvelle image d'avatar.
*   **Entités impactées** : `Utilisateur`, `Fichiers` (stockage logique), `JournalAudit`
*   **Entrée** (schéma JSON logique) :
    ```json
    {
      "utilisateur_id": "e4a5b6c7-d8e9-0123-4567-890abcdef012",
      "fichier_image_base64": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQA..."
    }
    ```
    *   `utilisateur_id`: `uuid`, requis.
    *   `fichier_image_base64`: `string`, requis, contenu de l'image encodé en base64, max taille et format définis. (Deduction M, pour agnostique).
*   **Sortie** (schéma JSON logique) :
    *   **Succès** :
        ```json
        {
          "avatar_url": "https://cdn.example.com/avatars/new_user_avatar.jpg",
          "date_mise_a_jour": "2023-10-27T10:30:00Z"
        }
        ```
    *   **Erreur** : `FILE_UPLOAD_FAILED`, `VALIDATION_FAILED`, `NOT_AUTHORIZED`
*   **Idempotence** : Non (chaque upload est une nouvelle ressource potentiellement)
*   **Permissions requises** : `Citoyen` (ownership)
*   **Effets de bord** : Stocke l'image, met à jour `Utilisateur.avatar_url`, crée une entrée `JournalAudit`.
*   **Pagination/tri/filtre** : Non applicable.
*   **Recherche** : Non applicable.
*   **Erreurs** :
    *   `FILE_UPLOAD_FAILED`: Le téléchargement de l'image a échoué. Cause: Problème de réseau ou de stockage. Action: Réessayer, vérifier la connexion.
    *   `VALIDATION_FAILED`: Le fichier image est invalide (taille, format). Cause: Fichier non conforme. Action: Télécharger une image valide.

#### Opération : RécupérerArbreCatégories
*   **Nom canonique** : `RécupérerArbreCatégories`
*   **But** : Récupérer toutes les catégories organisées de manière hiérarchique pour la navigation.
*   **Entités impactées** : `Catégorie`
*   **Entrée** (schéma JSON logique) :
    ```json
    {
      "type_categorie": "place_category",
      "langue_code": "fr"
    }
    ```
    *   `type_categorie`: `enum`, requis, `place_category`, `magazine_category`, `forum_category`.
    *   `langue_code`: `string`, requis, code ISO 639-1.
*   **Sortie** (schéma JSON logique) :
    *   **Succès** :
        ```json
        [
          {
            "id": "root_id",
            "nom": "Découvrir",
            "slug": "decouvrir",
            "level": 0,
            "children": [
              {
                "id": "child_id_1",
                "nom": "Gastronomie",
                "slug": "gastronomie",
                "level": 1,
                "children": [
                  {
                    "id": "grandchild_id_1",
                    "nom": "Restaurants",
                    "slug": "restaurants",
                    "level": 2,
                    "children": []
                  }
                ]
              }
            ]
          }
        ]
        ```
    *   **Erreur** : `INVALID_INPUT`
*   **Idempotence** : Oui
*   **Permissions requises** : `Anonyme`
*   **Effets de bord** : Non applicable.
*   **Pagination/tri/filtre** : Non applicable.
*   **Recherche** : Non applicable.
*   **Erreurs** :
    *   `INVALID_INPUT`: Le type de catégorie ou la langue est invalide. Cause: Paramètre non reconnu. Action: Utiliser des valeurs valides.

#### Opération : ListerSousCatégories
*   **Nom canonique** : `ListerSousCatégories`
*   **But** : Lister les catégories directement enfants d'une catégorie donnée.
*   **Entités impactées** : `Catégorie`
*   **Entrée** (schéma JSON logique) :
    ```json
    {
      "parent_category_id": "root_id",
      "langue_code": "fr"
    }
    ```
    *   `parent_category_id`: `uuid`, requis.
    *   `langue_code`: `string`, requis, code ISO 639-1.
*   **Sortie** (schéma JSON logique) :
    *   **Succès** :
        ```json
        [
          {
            "id": "child_id_1",
            "nom": "Gastronomie",
            "slug": "gastronomie",
            "icone_url": "https://cdn.example.com/icons/food.svg",
            "level": 1
          },
          {
            "id": "child_id_2",
            "nom": "Se Loger",
            "slug": "se-loger",
            "icone_url": "https://cdn.example.com/icons/bed.svg",
            "level": 1
          }
        ]
        ```
    *   **Erreur** : `NOT_FOUND`
*   **Idempotence** : Oui
*   **Permissions requises** : `Anonyme`
*   **Effets de bord** : Non applicable.
*   **Pagination/tri/filtre** :
    *   Tri : Par `nom` (alphabétique) par défaut.
*   **Recherche** : Non applicable.
*   **Erreurs** :
    *   `NOT_FOUND`: La catégorie parente n'existe pas. Cause: ID invalide. Action: Vérifier l'ID.

#### Opération : ListerLieuxParCatégorie
*   **Nom canonique** : `ListerLieuxParCatégorie`
*   **But** : Afficher une liste paginée et filtrée de lieux appartenant à une catégorie feuille.
*   **Entités impactées** : `Lieu`, `TraductionLieu`
*   **Entrée** (schéma JSON logique) :
    ```json
    {
      "category_slug": "restaurants",
      "langue_code": "fr",
      "page": 1,
      "taille_page": 10,
      "filtres": {
        "prix_max": 50,
        "wifi": true,
        "terrasse": false
      },
      "tri_par": "notation_moyenne",
      "ordre_tri": "desc"
    }
    ```
    *   `category_slug`: `string`, requis.
    *   `langue_code`: `string`, requis.
    *   `page`: `integer`, optionnel, défaut 1.
    *   `taille_page`: `integer`, optionnel, défaut 10, max 50.
    *   `filtres`: `json`, optionnel.
        *   `prix_max`: `decimal`, max.
        *   `wifi`: `boolean`.
        *   `terrasse`: `boolean`.
        *   (Autres attributs dynamiques du Lieu)
    *   `tri_par`: `enum`, optionnel, défaut `nom`, `notation_moyenne`, `distance` (si coordonnées de l'utilisateur fournies, déduction M).
    *   `ordre_tri`: `enum`, optionnel, défaut `asc`, `desc`.
*   **Sortie** (schéma JSON logique) :
    *   **Succès** :
        ```json
        {
          "lieux": [
            {
              "id": "lieu_id_1",
              "nom": "Pizzeria Roma",
              "slug": "pizzeria-roma",
              "image_principale_url": "url_image_pizza.jpg",
              "adresse": "10 Rue de la Paix",
              "notation_moyenne": 4.5,
              "nombre_avis": 120
            }
          ],
          "total_elements": 150,
          "total_pages": 15,
          "page_actuelle": 1
        }
        ```
    *   **Erreur** : `NOT_FOUND`, `INVALID_INPUT`
*   **Idempotence** : Oui
*   **Permissions requises** : `Anonyme`
*   **Effets de bord** : Non applicable.
*   **Pagination/tri/filtre** : Entièrement supporté comme décrit dans l'entrée.
*   **Recherche** : Non applicable (c'est un filtrage par attributs et catégorie).
*   **Erreurs** :
    *   `NOT_FOUND`: La catégorie spécifiée n'existe pas ou n'est pas une catégorie de lieu. Cause: Slug incorrect. Action: Vérifier le slug.
    *   `INVALID_INPUT`: Paramètres de filtrage ou de tri invalides. Cause: Valeurs non reconnues. Action: Corriger les paramètres.

#### Opération : RécupérerDétailsLieu
*   **Nom canonique** : `RécupérerDétailsLieu`
*   **But** : Récupérer toutes les informations d'un lieu spécifique, y compris ses attributs et détails spécifiques (hébergement, gastronomie).
*   **Entités impactées** : `Lieu`, `TraductionLieu`, `AttributLieu`, `DétailsHébergement` (si applicable), `DétailsGastronomie` (si applicable)
*   **Entrée** (schéma JSON logique) :
    ```json
    {
      "place_slug": "pizzeria-roma",
      "langue_code": "fr"
    }
    ```
    *   `place_slug`: `string`, requis.
    *   `langue_code`: `string`, requis.
*   **Sortie** (schéma JSON logique) :
    *   **Succès** :
        ```json
        {
          "id": "lieu_id_1",
          "nom": "Pizzeria Roma",
          "slug": "pizzeria-roma",
          "description": "La meilleure pizza napolitaine en ville...",
          "adresse": "10 Rue de la Paix, 75001 Paris",
          "latitude": 48.8566,
          "longitude": 2.3522,
          "telephone": "+33123456789",
          "email": "contact@pizzeriaroma.com",
          "site_web": "https://pizzeriaroma.com",
          "image_principale_url": "url_image_pizza.jpg",
          "images_galerie_url": ["url_img1.jpg", "url_img2.jpg"],
          "category": {
            "id": "category_id_restaurant",
            "nom": "Restaurants",
            "slug": "restaurants"
          },
          "attributs": [
            {"cle": "wifiDisponible", "valeur": "true", "type_valeur": "boolean"},
            {"cle": "terrasseExterieure", "valeur": "true", "type_valeur": "boolean"}
          ],
          "details_specifiques": {
            "type": "gastronomy",
            "type_cuisine": ["Italienne"],
            "prix_moyen": 25.00,
            "options_diet": ["Végétarien"]
          },
          "notation_moyenne": 4.5,
          "nombre_avis": 120
        }
        ```
    *   **Erreur** : `NOT_FOUND`
*   **Idempotence** : Oui
*   **Permissions requises** : `Anonyme` (si Lieu.status = 'published'), `Propriétaire` (si ownership et peu importe le statut).
*   **Effets de bord** : Non applicable.
*   **Pagination/tri/filtre** : Non applicable.
*   **Recherche** : Non applicable.
*   **Erreurs** :
    *   `NOT_FOUND`: Le lieu spécifié n'existe pas. Cause: Slug incorrect. Action: Vérifier le slug.

#### Opération : SoumettreLieu
*   **Nom canonique** : `SoumettreLieu`
*   **But** : Permettre à un utilisateur de soumettre un nouveau lieu pour révision.
*   **Entités impactées** : `Lieu`, `TraductionLieu`, `AttributLieu`, `DétailsHébergement` (si applicable), `DétailsGastronomie` (si applicable), `Fichiers` (stockage logique), `JournalAudit`
*   **Entrée** (schéma JSON logique) :
    ```json
    {
      "proprietaire_id": "e4a5b6c7-d8e9-0123-4567-890abcdef012",
      "category_id": "category_id_restaurant",
      "langue_code": "fr",
      "nom": "Le Cosy Café",
      "description": "Un charmant café avec une ambiance détendue.",
      "adresse": "5 Rue des Lilas, 75005 Paris",
      "latitude": 48.8450,
      "longitude": 2.3450,
      "telephone": "+33112345678",
      "email": "contact@cosycafe.com",
      "site_web": "https://cosycafe.com",
      "images": [
        {"nom_fichier": "cafe1.jpg", "contenu_base64": "data:image/jpeg;base64,..."},
        {"nom_fichier": "cafe2.jpg", "contenu_base64": "data:image/jpeg;base64,..."}
      ],
      "attributs": [
        {"cle": "wifiDisponible", "valeur": "true", "type_valeur": "boolean"},
        {"cle": "terrasseExterieure", "valeur": "true", "type_valeur": "boolean"}
      ],
      "details_specifiques": {
        "type": "gastronomy",
        "type_cuisine": ["Café", "Pâtisserie"],
        "prix_moyen": 15.00
      }
    }
    ```
    *   `proprietaire_id`: `uuid`, requis, doit correspondre à l'utilisateur authentifié.
    *   `category_id`: `uuid`, requis.
    *   `langue_code`: `string`, requis.
    *   `nom`: `string`, requis.
    *   `description`: `text`, requis.
    *   `adresse`: `string`, requis.
    *   `latitude`, `longitude`: `decimal`, requis.
    *   `telephone`, `email`, `site_web`: `string`/`email`/`url`, optionnels.
    *   `images`: `array` d'objets `image`, optionnel. `nom_fichier`, `contenu_base64`.
    *   `attributs`: `array` d'objets `attribut`, optionnel. `cle`, `valeur`, `type_valeur`.
    *   `details_specifiques`: `json`, optionnel, structure dépend de la catégorie (ex: `DetailsGastronomie`, `DetailsHébergement`).
*   **Sortie** (schéma JSON logique) :
    *   **Succès** :
        ```json
        {
          "place_id": "nouveau_lieu_uuid",
          "status": "pending_review",
          "message": "Lieu soumis avec succès et en attente de révision."
        }
        ```
    *   **Erreur** : `VALIDATION_FAILED`, `NOT_AUTHORIZED`, `DUPLICATE_ENTRY`
*   **Idempotence** : Non
*   **Permissions requises** : `Propriétaire`
*   **Effets de bord** : Crée un `Lieu` (status `pending_review`), `TraductionLieu`, `AttributLieu`, `DétailsHébergement`/`DétailsGastronomie` (si applicable). Stocke les images. Crée une entrée `JournalAudit`.
*   **Pagination/tri/filtre** : Non applicable.
*   **Recherche** : Non applicable.
*   **Erreurs** :
    *   `VALIDATION_FAILED`: Données de soumission invalides. Cause: Champs manquants, formats incorrects. Action: Corriger les données.
    *   `NOT_AUTHORIZED`: L'utilisateur n'est pas autorisé à soumettre un lieu. Cause: Rôle insuffisant. Action: S'assurer d'avoir les permissions requises.
    *   `DUPLICATE_ENTRY`: Un lieu similaire existe déjà. Cause: Entrée similaire (ex: même nom/adresse). Action: Vérifier les lieux existants.

#### Opération : MettreÀJourLieu
*   **Nom canonique** : `MettreÀJourLieu`
*   **But** : Permettre à un propriétaire de modifier un lieu qu'il possède.
*   **Entités impactées** : `Lieu`, `TraductionLieu`, `AttributLieu`, `DétailsHébergement`/`DétailsGastronomie`, `Fichiers`, `JournalAudit`
*   **Entrée** (schéma JSON logique) :
    ```json
    {
      "place_id": "lieu_id_1",
      "proprietaire_id": "e4a5b6c7-d8e9-0123-4567-890abcdef012",
      "langue_code": "fr",
      "nom": "Le Cosy Café (Mis à Jour)",
      "description": "Un café encore plus charmant...",
      "adresse": "5 Rue des Lilas, 75005 Paris",
      "images_a_supprimer": ["url_image_old.jpg"],
      "images_a_ajouter": [
        {"nom_fichier": "new_cafe_image.jpg", "contenu_base64": "data:image/jpeg;base64,... "}
      ],
      "attributs_a_modifier": [
        {"cle": "wifiDisponible", "valeur": "false", "type_valeur": "boolean"}
      ],
      "details_specifiques": {
        "type": "gastronomy",
        "prix_moyen": 18.00
      }
    }
    ```
    *   `place_id`: `uuid`, requis.
    *   `proprietaire_id`: `uuid`, requis (pour vérification d'ownership).
    *   `langue_code`: `string`, requis (pour la traduction concernée).
    *   `nom`, `description`, `adresse`, `latitude`, `longitude`, `telephone`, `email`, `site_web`: optionnels.
    *   `images_a_supprimer`: `array` d'URLs, optionnel.
    *   `images_a_ajouter`: `array` d'objets `image`, optionnel.
    *   `attributs_a_modifier`: `array` d'objets `attribut`, optionnel (pour ajout/maj/suppression).
    *   `details_specifiques`: `json`, optionnel (pour maj partielle).
*   **Sortie** (schéma JSON logique) :
    *   **Succès** :
        ```json
        {
          "place_id": "lieu_id_1",
          "status": "pending_review",
          "message": "Lieu mis à jour. Soumis à nouvelle révision si modifications importantes."
        }
        ```
    *   **Erreur** : `VALIDATION_FAILED`, `NOT_AUTHORIZED`, `NOT_FOUND`
*   **Idempotence** : Oui (si les mêmes modifications sont appliquées, le résultat est le même)
*   **Permissions requises** : `Propriétaire` (ownership), `Administrateur`
*   **Effets de bord** : Met à jour les entités `Lieu`, `TraductionLieu`, `AttributLieu`, `DétailsHébergement`/`DétailsGastronomie`. Gère le stockage des images. Peut changer le `Lieu.status` en `pending_review` si les modifications sont jugées importantes (Déduction M). Crée une entrée `JournalAudit`.
*   **Pagination/tri/filtre** : Non applicable.
*   **Recherche** : Non applicable.
*   **Erreurs** :
    *   `NOT_AUTHORIZED`: L'utilisateur n'est pas le propriétaire du lieu ou n'a pas les droits d'administration. Cause: Tentative de modification non autorisée. Action: Vérifier les permissions.
    *   `NOT_FOUND`: Le lieu spécifié n'existe pas. Cause: ID invalide. Action: Vérifier l'ID.
    *   `VALIDATION_FAILED`: Données de mise à jour invalides. Cause: Formats incorrects, incohérences. Action: Corriger les données.

#### Opération : ListerLieuxPropriétaire
*   **Nom canonique** : `ListerLieuxPropriétaire`
*   **But** : Afficher la liste des lieux qu'un utilisateur possède et gère, avec leur statut.
*   **Entités impactées** : `Lieu`
*   **Entrée** (schéma JSON logique) :
    ```json
    {
      "utilisateur_id": "e4a5b6c7-d8e9-0123-4567-890abcdef012",
      "status": "all",
      "page": 1,
      "taille_page": 10
    }
    ```
    *   `utilisateur_id`: `uuid`, requis, doit correspondre à l'utilisateur authentifié.
    *   `status`: `enum`, optionnel, défaut `all`, `pending_review`, `published`, `rejected`.
    *   `page`: `integer`, optionnel, défaut 1.
    *   `taille_page`: `integer`, optionnel, défaut 10.
*   **Sortie** (schéma JSON logique) :
    *   **Succès** :
        ```json
        {
          "lieux": [
            {
              "id": "lieu_id_1",
              "nom": "Pizzeria Roma",
              "status": "published",
              "date_soumission": "2023-09-01T10:00:00Z",
              "date_mise_a_jour

Expérience cohérente : design system appliqué à toutes les balises et composants

Multilingue complet : fr, en, de, es, ar, zh
