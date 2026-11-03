# GitHub repository and Pages setup

## Upload using the GitHub website

1. On GitHub, choose **New repository** and name it `aviorg-studio`.
2. Choose a visibility level. **Public** lets anyone see the code and the site; private Pages availability depends on account plan and repository settings.
3. On the new repository's **Add file → Upload files**, upload all contents of this folder. Some browsers may not upload hidden folders reliably; the CLI method below is best for preserving `.github` workflows. Do not upload the ZIP file itself as the only repository item.
4. Commit to the `main` branch.
5. Go to **Settings → Pages → Build and deployment** and select **GitHub Actions** as the source.
6. Wait for the **Publish AviOrg Studio to GitHub Pages** action to finish and open the site URL from its run/deployment.

## Upload using Git (recommended)

```bash
cd aviorg-studio-github
git init
git branch -M main
git add .
git commit -m "Initial release: AviOrg Studio Pro 6.1"
git remote add origin https://github.com/YOUR_USERNAME/aviorg-studio.git
git push -u origin main
```

Create the empty remote repository first, or use GitHub CLI if available:

```bash
gh repo create aviorg-studio --public --source=. --remote=origin --push
```

Do not run both upload methods over the same repository unless you reconcile their histories.

## Deployment details

The `pages.yml` workflow builds a **minimal** `dist/` containing only the website and local assets. It uses the official Pages actions, and deploys automatically after pushes to `main` or from the manual workflow trigger. For the URL `/aviorg-studio/`, the app uses relative paths, so it works under the repository path.

## Example URL

After Pages is enabled and a deployment succeeds, a project site typically looks like:

`https://YOUR_USERNAME.github.io/aviorg-studio/`

This is a pattern, **not a live URL** until you create and deploy your GitHub repository.

## Security note

GitHub Pages is not a controlled employee portal. The app runs locally in the visitor's browser, but a public repo exposes its code and any files you check in. Never commit actual employee personal data, confidential project backups or API tokens. Do not embed API keys in `index.html` or JavaScript.
