# 🚀 Guide de Déploiement - Oliv's Fresh

Ce document explique comment mettre en ligne le site Oliv's Fresh et configurer les services nécessaires.

## 1. Hébergement recommandé
Comme le site est statique (HTML/CSS/JS), vous pouvez l'héberger gratuitement sur :
*   **Firebase Hosting** (recommandé car vous utilisez déjà Firebase)
*   **Netlify**
*   **Vercel**
*   **GitHub Pages**

### Option Firebase Hosting (La plus cohérente)
1. Installez les outils Firebase : `npm install -g firebase-tools`
2. Connectez-vous : `firebase login`
3. Initialisez le projet : `firebase init` (Choisissez Hosting)
4. Déployez : `firebase deploy`

---

## 2. Configuration Firebase (Indispensable)
Pour que l'admin et les images fonctionnent, vous devez configurer ces 3 services dans votre console Firebase :

### 🔐 Authentification
*   Allez dans **Authentication** > **Sign-in method**.
*   Activez le mode **Email/Password**.
*   Ajoutez votre propre compte administrateur (votre email + mot de passe).

### 📁 Firestore (Base de données)
*   Allez dans **Firestore Database**.
*   Vérifiez que les collections `products` et `blog` existent (elles se créeront automatiquement lors du premier ajout via l'admin).
*   **Règles de sécurité recommandées** :
    ```javascript
    rules_version = '2';
    service cloud.firestore {
      match /databases/{database}/documents {
        match /{document=**} {
          allow read: if true;
          allow write: if request.auth != null;
        }
      }
    }
    ```

### 🖼️ Storage (Images)
*   Allez dans **Storage**.
*   Activez le service.
*   **Règles de sécurité recommandées** :
    ```javascript
    service firebase.storage {
      match /b/{bucket}/o {
        match /{allPaths=**} {
          allow read: if true;
          allow write: if request.auth != null;
        }
      }
    }
    ```

---

## 3. SEO & Finalisation
1.  **Domaine** : Si vous achetez `olivsfresh.com`, n'oubliez pas de mettre à jour l'URL dans `sitemap.xml` et `robots.txt`.
2.  **Images** : Vérifiez que toutes les images sont bien présentes dans le dossier `img/`.
3.  **WhatsApp** : Le numéro actuel est le `+226 77 97 39 58`. Si vous changez de numéro, modifiez la variable `phone` dans `js/script.js`.

---

## 4. Maintenance
Pour modifier les produits ou les articles du blog, utilisez simplement la page :
`votre-site.com/admin.html`

Connectez-vous avec les identifiants créés à l'étape 2.1.

---
**Prêt pour le lancement ! 🍏✨**
