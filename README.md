MediFlow-AI — Quick hosting & preview

This is a static demo of MediFlow-AI (HTML/CSS/JS). Use these steps to preview locally and publish quickly.

Local preview (quick):

Python 3 built-in server:

```bash
python -m http.server 8000
```

Then open http://localhost:8000 in your browser.

GitHub Pages (recommended for quick sharing):

1. Create a new GitHub repository and push this project.
2. In repository Settings → Pages, select branch `main` (or `gh-pages`) and save. If using `main`, put files in `/` or `/docs`.
3. Wait a minute — your site will be available at `https://<your-username>.github.io/<repo-name>/`.

Netlify (drag & drop, or connect repo):

- For the fastest share: go to https://app.netlify.com/drop and drop the project folder — Netlify will host it and provide a public URL.
- Or connect your GitHub repo and enable continuous deploys.

Notes & recommendations:

- Ensure all links use relative paths (they already do). If you use a subpath on GitHub Pages, update `base` tags if needed.
- To show the demo offline on your laptop, use the Python server above and open `dashboard.html`.

If you want, I can:
- Create a small `package.json` and an `npm` script for preview.
- Add a GitHub Actions workflow to automatically publish to `gh-pages` on push.
This repo includes a GitHub Actions workflow to auto-deploy the site to GitHub Pages when you push to the `main` branch.

Quick steps to publish:

1. Create a GitHub repository and push this project to the `main` branch.
2. Make sure the repo Settings → Pages has "GitHub Actions" allowed (Pages permissions).
3. The workflow `.github/workflows/deploy-gh-pages.yml` will run on push and publish the site.
4. Wait a minute and open `https://<your-username>.github.io/<repo-name>/` (or check the Pages status in Settings).

If you'd like, I can also add a GitHub Actions workflow that commits to the `gh-pages` branch (alternative approach), or add a `package.json` with a `preview` script. Which would you prefer?