# Application To-Do List — Gestion de tâches en local

Une application web simple pour **ajouter, organiser et suivre les tâches quotidiennes**.  
Elle fonctionne entièrement **en local**, grâce au **LocalStorage**, sans connexion Internet ni base de données externe.  
Développée en **HTML, CSS et JavaScript** sous **Visual Studio Code**.

## Aperçu du projet

### Interface principale
Affichage des deux sections :
- **Tasks to Add** — liste des tâches à faire  
- **Done!** — liste des tâches terminées  

Chaque tâche affiche sa **catégorie** (selon le niveau d’urgence/importance) et peut être **supprimée** ou **déplacée** d’un clic.


## Prérequis

Avant de lancer le projet, il faut :
- Un **navigateur moderne** (Chrome, Edge, Firefox, etc.)
- Un **éditeur de code** comme Visual Studio Code (recommandé)

Aucune connexion Internet n’est requise, tout fonctionne en local.


## Installation

1. Téléchargez ou clonez ce dépôt.  
2. Placez tous les fichiers suivants **dans le même dossier** :
   ```text
   koren.html
   krassa.css
   kontrol.js
   /images/
   ```
3. Ouvrez le fichier `koren.html` dans votre navigateur.


## Fonctionnalités principales

- **Ajout d’une tâche** avec une catégorie parmi :
  - Urgent et important  
  - Urgent non important  
  - Important non urgent  
  - Ni urgent ni important  
- **Déplacement automatique** d’une tâche dans le bloc *Done!* après un clic  
- **Suppression d’une tâche** via la croix (×)  
- **Sauvegarde automatique** de toutes les tâches dans le **LocalStorage**  
- **Restauration automatique** des listes au rechargement de la page  
- **Avertissements visuels** en cas de saisie vide ou d’erreur de stockage  


## Technologies utilisées

- **HTML5** — structure et squelettes de la page  
- **CSS3** — design et visuel (gradients, ombres, transitions)  
- **JavaScript (ES6)** — logique, gestion des événements, stockage local, affichage dynamique

## 🚀 Déploiement en ligne
L'application est disponible ici 👉 [To-Do List App sur Vercel](https://to-do-list-app-76rd.vercel.app/)

Chaque mise à jour du code sur la branche **`main`** déclenche automatiquement un nouveau déploiement sur **Vercel**.


## Améliorations futures

 - Filtrer les tâches par catégorie
 - Ajouter une date limite / priorité
 - Mode sombre
 - Responsive design
 - Possibilité de ramener un tâche validée dans la liste principale
 - Exporter / importer les tâches au format JSON


 

Développé sous **Visual Studio Code** — 2025  
