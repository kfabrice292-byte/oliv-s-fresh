# 🔧 Installation de Git pour Windows

## Téléchargement

1. Allez sur : https://git-scm.com/download/win
2. Le téléchargement devrait démarrer automatiquement
3. Exécutez le fichier téléchargé (Git-2.x.x-64-bit.exe)

## Installation

Suivez l'assistant d'installation avec ces paramètres :

1. **Select Components** : Laissez les options par défaut
2. **Choosing the default editor** : Choisissez votre éditeur préféré (ou laissez Vim)
3. **Adjusting your PATH** : Sélectionnez **"Git from the command line and also from 3rd-party software"**
4. **Choosing HTTPS transport** : Laissez **"Use the OpenSSL library"**
5. **Configuring line endings** : Laissez **"Checkout Windows-style, commit Unix-style"**
6. **Configuring terminal emulator** : Laissez **"Use MinTTY"**
7. Cliquez sur **Install**

## Vérification

Après l'installation, ouvrez un **nouveau** PowerShell et tapez :

```powershell
git --version
```

Vous devriez voir : `git version 2.x.x`

## Configuration initiale

```powershell
git config --global user.name "Votre Nom"
git config --global user.email "votre.email@example.com"
```

---

**Une fois Git installé, revenez au fichier GITHUB_DEPLOYMENT.md pour continuer le déploiement !**
