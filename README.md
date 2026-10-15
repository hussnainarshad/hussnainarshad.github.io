# Hussnain Arshad — Portfolio

Static portfolio site for GitHub Pages. No build step.

## Local preview

```bash
cd portfolio
python3 -m http.server 8080
```

Open http://localhost:8080

## Deploy to GitHub Pages

### Option A — user site (`username.github.io`)

1. Create a public repo named `YOUR_USERNAME.github.io`
2. Push the contents of this `portfolio/` folder to the repo root (not the parent folder)
3. In **Settings → Pages**, set source to **Deploy from a branch**, branch `main`, folder `/ (root)`
4. Site URL: `https://YOUR_USERNAME.github.io`

```bash
cd portfolio
git init
git add .
git commit -m "Add portfolio site"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_USERNAME.github.io.git
git push -u origin main
```

### Option B — project site

1. Push this folder (or the whole project) to any public repo
2. Enable Pages on `main` with folder `/` or `/docs` (if you move files there)
3. Site URL: `https://YOUR_USERNAME.github.io/REPO_NAME/`

If the site is not at the domain root, leave asset paths relative (they already are).

## Customize

| What | Where |
|------|--------|
| Avatar mark | `assets/avatar.svg` |
| Resume PDF | `assets/Hussnain_Arshad_Resume.pdf` |
| Copy / sections | `index.html` |
| Look & motion | `styles.css`, `main.js` |

GitHub profile: https://github.com/hussnainarshad
