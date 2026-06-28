# TODO

## 1. État des lieux

- [x] Faire un état des lieux de l'app → documenté dans `CLAUDE.md`

## 2. Documentation

- [x] Mettre à jour `CLAUDE.md`

## 3. Page cheval

- [x] Ajouter un carrousel d'images sous les infos du cheval, juste avant le
      lien « horselet » (s'affiche uniquement si le cheval a des images de
      galerie `imgs`)

## 4. Admin

- [x] Ajouter un panneau d'administration à l'app (`/[locale]/admin`)
- [x] Authentification sécurisée requise (cookie de session signé httpOnly,
      page non indexée, aucun lien de navigation — il faut connaître le path)
- [x] Permettre à l'utilisateur connecté d'ajouter, modifier, supprimer et
      réordonner n'importe quel cheval

**Contraintes importantes :**

- [x] ⚠️ Interface intuitive et facile à utiliser
- [x] ⚠️ Redimensionner / déplacer la photo de profil avec aperçu avant
      validation (`ImageCropper`)
- [x] ⚠️ Variables d'environnement S3 documentées (voir ci-dessous + `.env.example`)

---

## À faire de ton côté (une seule fois)

1. **Migration BDD** : démarrer la base puis appliquer la migration qui crée la
   table `Horse` :
   ```bash
   docker compose up -d
   corepack pnpm prisma migrate deploy   # ou: corepack pnpm prisma migrate dev
   ```
2. **Importer les chevaux** : se connecter à `/fr/admin`, onglet « Chevaux »,
   bouton « Importer depuis horses.json » (peut être relancé sans risque).
3. **Variables S3** (pour l'upload d'images) à ajouter dans `.env` :
   `S3_REGION`, `S3_BUCKET`, `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY`
   (optionnel : `S3_KEY_PREFIX`, `S3_ENDPOINT`, `NEXT_PUBLIC_CDN_URL`).
   Recommandé aussi : `ADMIN_SESSION_SECRET` (chaîne aléatoire longue).
4. Tester l'upload d'une photo de profil depuis l'admin.

> Tant que la table `Horse` est vide, les pages publiques `/horses` n'affichent
> aucun cheval — d'où l'étape 2 (import).
