# 🚀 Guide de Déploiement GitHub Pages

## Étape 1 : Créer un dépôt GitHub

1. Allez sur [GitHub.com](https://github.com) et connectez-vous
2. Cliquez sur le bouton **"New"** (Nouveau dépôt)
3. Nommez votre dépôt : `olivs-fresh-website` (ou le nom de votre choix)
4. Laissez-le **Public** (obligatoire pour GitHub Pages gratuit)
5. **NE cochez PAS** "Initialize with README" (on a déjà nos fichiers)
6. Cliquez sur **"Create repository"**

---

## Étape 2 : Initialiser Git localement

Ouvrez PowerShell dans le dossier du projet et exécutez :

```powershell
# Initialiser le dépôt Git
git init

# Ajouter tous les fichiers
git add .

# Créer le premier commit
git commit -m "🎉 Initial commit - Oliv's Fresh Website"

# Renommer la branche en 'main'
git branch -M main
```

---

## Étape 3 : Connecter au dépôt GitHub

Remplacez `VOTRE-USERNAME` par votre nom d'utilisateur GitHub :

```powershell
git remote add origin https://github.com/VOTRE-USERNAME/olivs-fresh-website.git
git push -u origin main
```

**Note** : GitHub vous demandera de vous authentifier. Utilisez un **Personal Access Token** si nécessaire.

---

## Étape 4 : Activer GitHub Pages

1. Allez sur votre dépôt GitHub
2. Cliquez sur **Settings** (Paramètres)
3. Dans le menu de gauche, cliquez sur **Pages**
4. Sous **Source**, sélectionnez :
   - **Branch** : `main`
   - **Folder** : `/ (root)`
5. Cliquez sur **Save**

⏳ **Attendez 2-3 minutes**, puis votre site sera disponible à :
```
https://VOTRE-USERNAME.github.io/olivs-fresh-website/
```

---

## Étape 5 : Vérifications importantes

### ✅ Vérifier Firebase
Assurez-vous que votre configuration Firebase dans `js/firebase-init.js` est correcte et que les services sont activés :
- ✅ Authentication (Email/Password)
- ✅ Firestore Database
- ✅ Storage

### ✅ Tester le site
1. Ouvrez l'URL GitHub Pages
2. Testez la navigation
3. Testez l'admin panel : `https://VOTRE-USERNAME.github.io/olivs-fresh-website/admin.html`

---

## 🔄 Mettre à jour le site

Après chaque modification :

```powershell
git add .
git commit -m "Description de vos modifications"
git push
```

Le site se mettra à jour automatiquement en 1-2 minutes.

---

## 🌐 Domaine personnalisé (Optionnel)

Si vous achetez `olivsfresh.com` :

1. Dans **Settings > Pages**, ajoutez votre domaine dans **Custom domain**
2. Configurez les DNS chez votre registrar :
   ```
   Type: CNAME
   Name: www
   Value: VOTRE-USERNAME.github.io
   ```

---

## 🆘 Problèmes courants

### Le site ne s'affiche pas
- Vérifiez que le dépôt est **Public**
- Attendez 5 minutes après l'activation
- Videz le cache du navigateur (Ctrl + F5)

### Les images ne s'affichent pas
- Vérifiez que le dossier `img/` est bien dans le dépôt
- Les chemins doivent être relatifs : `img/produits/...`

### L'admin ne fonctionne pas
- Vérifiez la console Firebase
- Vérifiez les règles de sécurité Firestore et Storage
- Assurez-vous d'avoir créé un compte admin dans Authentication

---

**Votre site est maintenant en ligne ! 🎉🍏**
