# 🚀 Déploiement sur GitHub - Guide Complet

## 📊 Quelle méthode choisir ?

| Critère | Avec Git | Sans Git (Manuel) |
|---------|----------|-------------------|
| **Difficulté** | Moyenne | Facile |
| **Installation requise** | Oui (Git) | Non |
| **Temps initial** | 10-15 min | 5-10 min |
| **Mises à jour** | Rapide (1 commande) | Lent (upload manuel) |
| **Recommandé pour** | Développeurs | Débutants |

---

## 🎯 Recommandation

### ✅ **Méthode recommandée : SANS GIT (Manuel)**

Pour un premier déploiement rapide, utilisez la méthode manuelle.

**👉 Suivez le guide : `GITHUB_MANUAL_DEPLOYMENT.md`**

---

## 📚 Guides disponibles

### 1️⃣ **GITHUB_MANUAL_DEPLOYMENT.md** ⭐ RECOMMANDÉ
   - Déploiement via l'interface web GitHub
   - Aucune installation nécessaire
   - Parfait pour débuter

### 2️⃣ **INSTALL_GIT.md**
   - Installation de Git sur Windows
   - À utiliser si vous voulez la méthode avec Git

### 3️⃣ **GITHUB_DEPLOYMENT.md**
   - Déploiement avec Git en ligne de commande
   - Pour utilisateurs avancés

### 4️⃣ **DEPLOYMENT_GUIDE.md**
   - Guide général (Firebase, Netlify, etc.)
   - Options alternatives à GitHub Pages

---

## 🚀 Démarrage rapide (Méthode manuelle)

### Étape 1 : Créer un compte GitHub
- Allez sur [github.com](https://github.com)
- Cliquez sur "Sign up"
- Créez votre compte gratuit

### Étape 2 : Créer un dépôt
- Cliquez sur "+" > "New repository"
- Nom : `olivs-fresh-website`
- Public ✅
- Add README ✅
- "Create repository"

### Étape 3 : Uploader les fichiers
- "Add file" > "Upload files"
- Sélectionnez TOUS les fichiers du dossier `site-olivs-fresh`
- Glissez-déposez dans GitHub
- "Commit changes"

### Étape 4 : Activer GitHub Pages
- Settings > Pages
- Source : `main` branch, `/ (root)` folder
- Save

### Étape 5 : Accéder au site
- Attendez 2-5 minutes
- Votre site : `https://VOTRE-USERNAME.github.io/olivs-fresh-website/`

---

## ✅ Checklist avant déploiement

- [ ] Tous les fichiers sont dans le dossier `site-olivs-fresh`
- [ ] Firebase est configuré (Authentication, Firestore, Storage)
- [ ] Les images sont dans le dossier `img/`
- [ ] Le fichier `js/firebase-init.js` contient votre config Firebase
- [ ] Vous avez créé un compte admin dans Firebase Authentication

---

## 🔧 Configuration Firebase (Important !)

Avant que l'admin fonctionne, configurez Firebase :

### 1. Authentication
- Console Firebase > Authentication > Sign-in method
- Activez "Email/Password"
- Ajoutez votre compte admin

### 2. Firestore Database
- Console Firebase > Firestore Database
- Créez la base de données
- Règles de sécurité :
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

### 3. Storage
- Console Firebase > Storage
- Activez le service
- Règles de sécurité :
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

## 🆘 Besoin d'aide ?

### Problèmes courants

**Le site ne s'affiche pas**
- Vérifiez que le dépôt est Public
- Attendez 5 minutes
- Videz le cache (Ctrl + F5)

**Les images ne s'affichent pas**
- Vérifiez que le dossier `img/` est bien uploadé
- Vérifiez les chemins dans le code

**L'admin ne fonctionne pas**
- Vérifiez la configuration Firebase
- Vérifiez les règles de sécurité
- Créez un compte admin

---

## 📞 Contact

Pour toute question, consultez :
- [Documentation GitHub Pages](https://pages.github.com/)
- [Documentation Firebase](https://firebase.google.com/docs)

---

**Bon déploiement ! 🎉🍏**
