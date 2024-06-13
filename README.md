# Informatisation des Activités de la Division Assurances et Juridique

## Introduction
Cette application vise à rationaliser et automatiser le processus de traitement des chèques au sein de la Division Assurances et Juridique. Elle assure un flux de travail cohérent et transparent pour le traitement des chèques, garantissant ainsi une meilleure gestion des finances de l'entreprise.

## Table des matières
- [Technologies Utilisées](#technologies-utilisées)
- [Installation](#installation)
- [Configuration](#configuration)
  
## Technologies Utilisées
- **TypeScript**: Utilisé pour le développement frontend avec Angular et pour les scripts d'automatisation.
- **Angular**: Framework frontend pour la création d'une interface utilisateur dynamique et réactive.
- **Laravel**: Framework backend PHP pour la gestion des API et des services web.
- **Tailwind CSS**: Framework CSS pour un design moderne et réactif.

## Installation

### Prérequis
- Node.js et npm
- PHP
- Composer
- MySQL ou tout autre SGBD compatible

### Étapes d'installation

1. **Clonez le dépôt**
   ```bash
   git clone https://github.com/votre-repo-name.git
   cd votre-repo
2. **Backend (Laravel)**
    ```bash
    cd backend
   composer install
   cp .env.example .env
   php artisan key:generate
    .env
    ```bash
   php artisan migrate
   php artisan serve
  
3. ** Frontend (Angular) **
   ```bash
   cd frontend
   npm install
   npm start


   
