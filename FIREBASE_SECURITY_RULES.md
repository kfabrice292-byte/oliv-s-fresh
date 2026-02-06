# 🔐 Règles de Sécurité Firebase - Oliv's Fresh

Ce fichier contient les règles de sécurité à configurer dans votre console Firebase.

---

## 📋 Firestore Database Rules

### Accès à la console
1. Allez sur [Firebase Console](https://console.firebase.google.com/)
2. Sélectionnez votre projet : **olivsfresh**
3. Menu latéral > **Firestore Database**
4. Onglet **Règles** (Rules)

### Règles à copier-coller

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Règle générale : lecture publique, écriture authentifiée
    match /{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Collection products
    match /products/{productId} {
      allow read: if true;
      allow create, update, delete: if request.auth != null;
    }
    
    // Collection blog
    match /blog/{postId} {
      allow read: if true;
      allow create, update, delete: if request.auth != null;
    }
  }
}
```

### Explication
- **`allow read: if true`** : Tout le monde peut lire les produits et articles (nécessaire pour afficher le site)
- **`allow write: if request.auth != null`** : Seuls les utilisateurs authentifiés peuvent modifier (protection de l'admin)

### Publier les règles
1. Copiez les règles ci-dessus
2. Collez dans l'éditeur Firebase
3. Cliquez sur **Publier** (Publish)

---

## 🖼️ Storage Rules

### Accès à la console
1. Allez sur [Firebase Console](https://console.firebase.google.com/)
2. Sélectionnez votre projet : **olivsfresh**
3. Menu latéral > **Storage**
4. Onglet **Règles** (Rules)

### Règles à copier-coller

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Règle générale : lecture publique, écriture authentifiée
    match /{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Dossier products
    match /products/{fileName} {
      allow read: if true;
      allow write: if request.auth != null 
                   && request.resource.size < 5 * 1024 * 1024  // Max 5MB
                   && request.resource.contentType.matches('image/.*');  // Images uniquement
    }
    
    // Dossier blog
    match /blog/{fileName} {
      allow read: if true;
      allow write: if request.auth != null 
                   && request.resource.size < 5 * 1024 * 1024  // Max 5MB
                   && request.resource.contentType.matches('image/.*');  // Images uniquement
    }
  }
}
```

### Explication
- **`allow read: if true`** : Tout le monde peut voir les images
- **`allow write: if request.auth != null`** : Seuls les admins connectés peuvent uploader
- **`size < 5 * 1024 * 1024`** : Limite de 5 MB par image
- **`contentType.matches('image/.*')`** : Accepte uniquement les images

### Publier les règles
1. Copiez les règles ci-dessus
2. Collez dans l'éditeur Firebase
3. Cliquez sur **Publier** (Publish)

---

## 🔑 Authentication Setup

### Activer Email/Password

1. Allez sur [Firebase Console](https://console.firebase.google.com/)
2. Sélectionnez votre projet : **olivsfresh**
3. Menu latéral > **Authentication**
4. Onglet **Sign-in method**
5. Cliquez sur **Email/Password**
6. Activez le premier bouton (Email/Password)
7. Cliquez sur **Enregistrer** (Save)

### Créer un compte administrateur

1. Onglet **Users**
2. Cliquez sur **Add user**
3. Entrez :
   - **Email** : votre-email@example.com
   - **Password** : un mot de passe sécurisé (min. 6 caractères)
4. Cliquez sur **Add user**

**⚠️ IMPORTANT :** Notez bien ces identifiants, vous en aurez besoin pour vous connecter à l'admin !

---

## ✅ Vérification de la configuration

### Test Firestore
1. Allez dans **Firestore Database** > **Données**
2. Vous devriez voir (ou pouvoir créer) :
   - Collection `products`
   - Collection `blog`

### Test Storage
1. Allez dans **Storage** > **Fichiers**
2. Vous devriez pouvoir créer des dossiers :
   - `products/`
   - `blog/`

### Test Authentication
1. Allez dans **Authentication** > **Users**
2. Vous devriez voir votre compte admin créé

---

## 🧪 Tester les règles

### Test 1 : Lecture publique (doit fonctionner)
Ouvrez votre site et vérifiez que :
- ✅ Les produits s'affichent sur la boutique
- ✅ Les articles s'affichent sur le blog
- ✅ Les images se chargent

### Test 2 : Écriture sans authentification (doit échouer)
Ouvrez la console du navigateur (F12) et tapez :
```javascript
firebase.firestore().collection('products').add({test: 'test'})
```
**Résultat attendu :** Erreur "Permission denied"

### Test 3 : Écriture avec authentification (doit fonctionner)
1. Allez sur `votre-site.com/admin.html`
2. Connectez-vous avec votre compte admin
3. Essayez d'ajouter un produit
**Résultat attendu :** Le produit est ajouté avec succès

---

## 🚨 Problèmes courants

### "Missing or insufficient permissions"
**Cause :** Les règles Firestore ne sont pas correctement configurées
**Solution :** Vérifiez et republiez les règles Firestore

### "User does not have permission to access this object"
**Cause :** Les règles Storage ne sont pas correctement configurées
**Solution :** Vérifiez et republiez les règles Storage

### "The email address is badly formatted"
**Cause :** Email invalide lors de la création du compte
**Solution :** Utilisez un email valide (ex: admin@olivsfresh.com)

### "The password must be 6 characters long or more"
**Cause :** Mot de passe trop court
**Solution :** Utilisez au moins 6 caractères

---

## 🔒 Règles de sécurité avancées (Optionnel)

Si vous voulez restreindre davantage l'accès, voici des règles plus strictes :

### Firestore - Restriction par email

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read: if true;
      allow write: if request.auth != null 
                   && request.auth.token.email == 'admin@olivsfresh.com';
    }
  }
}
```

### Storage - Restriction par taille et type

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null 
                   && request.resource.size < 2 * 1024 * 1024  // Max 2MB
                   && request.resource.contentType.matches('image/(jpeg|png|webp)');  // JPEG, PNG, WebP uniquement
    }
  }
}
```

---

## 📊 Monitoring

### Surveiller l'utilisation

1. **Firestore** > **Utilisation** : Voir le nombre de lectures/écritures
2. **Storage** > **Utilisation** : Voir l'espace utilisé
3. **Authentication** > **Utilisation** : Voir le nombre d'authentifications

### Quotas gratuits Firebase

- **Firestore** : 50 000 lectures/jour, 20 000 écritures/jour
- **Storage** : 5 GB stockage, 1 GB téléchargement/jour
- **Authentication** : Illimité

**Note :** Ces quotas sont largement suffisants pour un site vitrine comme Oliv's Fresh.

---

## 🎯 Récapitulatif

### Checklist de configuration

- [ ] Firestore Database créé
- [ ] Règles Firestore publiées
- [ ] Storage activé
- [ ] Règles Storage publiées
- [ ] Authentication Email/Password activé
- [ ] Compte admin créé
- [ ] Tests effectués (lecture publique, écriture authentifiée)

---

**Configuration terminée ! Votre Firebase est maintenant sécurisé et prêt à l'emploi ! 🔐✨**
