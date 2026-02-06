# 🌐 Déploiement Manuel sur GitHub (Sans Git)

Cette méthode ne nécessite pas d'installer Git. Vous utiliserez uniquement l'interface web de GitHub.

---

## Étape 1 : Créer un dépôt GitHub

1. Allez sur [GitHub.com](https://github.com) et connectez-vous (créez un compte si nécessaire)
2. Cliquez sur le bouton **"+"** en haut à droite, puis **"New repository"**
3. Remplissez les informations :
   - **Repository name** : `olivs-fresh-website`
   - **Description** : "Site web Oliv's Fresh - Fruits et légumes frais"
   - **Public** (obligatoire pour GitHub Pages gratuit)
   - ✅ Cochez **"Add a README file"**
4. Cliquez sur **"Create repository"**

---

## Étape 2 : Uploader les fichiers

### Méthode A : Upload par glisser-déposer

1. Sur la page de votre dépôt, cliquez sur **"Add file"** > **"Upload files"**
2. Ouvrez l'explorateur Windows et allez dans : `C:\Users\USER\Downloads\Oliv's\site-olivs-fresh`
3. **Sélectionnez TOUS les fichiers et dossiers** (Ctrl+A) SAUF :
   - `.git` (si présent)
   - `node_modules` (si présent)
4. **Glissez-déposez** tous les fichiers dans la zone de GitHub
5. Attendez que tous les fichiers soient uploadés (cela peut prendre quelques minutes)
6. En bas, dans "Commit changes", écrivez : `Initial commit - Site Oliv's Fresh`
7. Cliquez sur **"Commit changes"**

### Méthode B : Upload par ZIP (Si trop de fichiers)

1. Compressez le dossier `site-olivs-fresh` en ZIP
2. Extrayez le ZIP directement sur GitHub en utilisant l'upload

---

## Étape 3 : Activer GitHub Pages

1. Sur votre dépôt, cliquez sur **"Settings"** (Paramètres)
2. Dans le menu de gauche, cliquez sur **"Pages"**
3. Sous **"Source"**, sélectionnez :
   - **Branch** : `main` (ou `master`)
   - **Folder** : `/ (root)`
4. Cliquez sur **"Save"**

⏳ **Attendez 2-5 minutes**

---

## Étape 4 : Accéder à votre site

Votre site sera disponible à l'adresse :

```
https://VOTRE-USERNAME.github.io/olivs-fresh-website/
```

Remplacez `VOTRE-USERNAME` par votre nom d'utilisateur GitHub.

---

## 🔄 Mettre à jour le site

Pour modifier votre site après le déploiement :

1. Allez sur votre dépôt GitHub
2. Naviguez jusqu'au fichier à modifier
3. Cliquez sur l'icône **crayon** (Edit)
4. Faites vos modifications
5. Cliquez sur **"Commit changes"**
6. Le site se mettra à jour automatiquement en 1-2 minutes

**OU**

1. Cliquez sur **"Add file"** > **"Upload files"**
2. Uploadez les fichiers modifiés (ils remplaceront les anciens)

---

## ✅ Vérifications

### Vérifier que tous les fichiers sont présents :

Votre dépôt doit contenir :
- ✅ `index.html`
- ✅ `admin.html`
- ✅ `boutique.html`
- ✅ `blog.html`
- ✅ `blog-details.html`
- ✅ Dossier `css/`
- ✅ Dossier `js/`
- ✅ Dossier `img/`
- ✅ `robots.txt`
- ✅ `sitemap.xml`
- ✅ `README.md`

### Tester le site :

1. Ouvrez l'URL GitHub Pages
2. Testez la navigation entre les pages
3. Vérifiez que les images s'affichent
4. Testez l'admin : `https://VOTRE-USERNAME.github.io/olivs-fresh-website/admin.html`

---

## 🌐 Domaine personnalisé (Optionnel)

Si vous achetez `olivsfresh.com` :

1. Dans **Settings > Pages**, section **"Custom domain"**
2. Entrez : `www.olivsfresh.com`
3. Cliquez sur **"Save"**
4. Configurez les DNS chez votre registrar de domaine :
   ```
   Type: CNAME
   Name: www
   Value: VOTRE-USERNAME.github.io
   ```

---

## 🆘 Problèmes courants

### Le site affiche une erreur 404
- Vérifiez que le fichier `index.html` est bien à la racine du dépôt
- Attendez 5 minutes et videz le cache (Ctrl + F5)

### Les images ne s'affichent pas
- Vérifiez que le dossier `img/` est bien uploadé
- Les chemins doivent être relatifs : `img/produits/...`

### L'admin ne fonctionne pas
- Vérifiez votre configuration Firebase
- Assurez-vous que les règles de sécurité sont correctes
- Créez un compte admin dans Firebase Authentication

---

**Votre site est maintenant en ligne ! 🎉🍏**

**Avantage de cette méthode** : Simple et rapide, pas besoin d'installer Git
**Inconvénient** : Moins pratique pour les mises à jour fréquentes
