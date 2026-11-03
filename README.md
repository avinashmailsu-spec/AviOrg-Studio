# AviOrg Studio

![AviOrg Studio UI](docs/AviOrg_Studio_Preview.png)

**AviOrg Studio — Intelligent Organization Design**  
**Developed by Avinash Ekka**  
Edition: **AviOrg Pro 6.1**

A browser-based organizational chart studio with a premium canvas, 500 design combinations, Excel imports, editable PowerPoint exports, matrix reporting, organization scenarios and workforce analytics. The core editor works entirely in the browser, without creating an account or installing a server.

> **Data notice:** This is an offline-first, client-side app. Uploaded files and employee records are processed in the browser. The app may also persist chart data in that browser's local storage; do not use shared/public computers for confidential records. A GitHub Pages deployment is a public website, **not** an authenticated or access-controlled HR portal.

## Try it

- **GitHub Pages:** Open the URL shown after the repository's Pages workflow finishes.
- **Local web version:** Open `index.html` in Chrome/Edge, or serve the repository using `python -m http.server 8000` and visit `http://localhost:8000`.
- **Portable offline version:** Open [`standalone/AviOrg_Studio_Pro_6_1.html`](standalone/AviOrg_Studio_Pro_6_1.html) directly in Chrome/Edge. All its CSS/JS is bundled in one file.

### Main features

- Graphical, editable hierarchy designer: drag, style, focus, zoom, align and arrange.
- 500 design combinations and branded export options.
- XLSX and CSV bulk import with mapping, review and validation.
- Editable PowerPoint generation; supported AviOrg/legacy Structura source files can be re-imported.
- First-pass reconstruction for ordinary PowerPoint/Visio and text-based PDF files; heuristics may require corrections.
- Dotted-line reporting, organization change scenarios, workforce FTE/cost summaries, and CSV/PDF/PNG/SVG/JSON exports.
- Searchable command palette (`Ctrl+K` / `Cmd+K`), keyboard navigation and collapsible inspector.
- “Developed by Avinash Ekka” visible in the application sidebar and About/Credits panel.

## Repository structure

```text
aviorg-studio/
├── index.html                  # GitHub Pages entrypoint
├── assets/
│   ├── brand/logo.svg
│   ├── css/                     # Individual CSS source layers
│   ├── js/                      # Core and progressive enhancement scripts
│   └── vendor/                  # Bundled JSZip / PptxGenJS dependencies
├── standalone/                 # Self-contained HTML for offline use
├── examples/                   # Sample Excel, editable PPTX, demo backup
├── docs/                       # Images and implementation notes
├── scripts/                    # Site build / offline bundle builder
├── tests/                      # Validation and Chromium smoke test
└── .github/workflows/          # CI and GitHub Pages deployment
```

## Deploy on GitHub Pages

1. Create a repository named `aviorg-studio` (public if you want everyone to access the site).
2. Upload **the contents of this repository folder** (not the outer ZIP file); retain `.github/workflows/` and other hidden files.
3. Use `main` as your default branch.
4. In **Settings → Pages → Build and deployment → Source**, choose **GitHub Actions**.
5. In **Actions**, open **Publish AviOrg Studio to GitHub Pages** and check the run triggered by the push. Your site URL will appear in the deployment result.

For detailed instructions and command-line options, see [docs/GITHUB_SETUP.md](docs/GITHUB_SETUP.md).

## Development

No npm dependencies or API keys are required to serve the application. The app uses classic browser scripts, in this order: `jszip`, `pptxgen`, `app`, `pro4`, `pro5`, `pro6`, `premium`.

```bash
python -m http.server 8000
python scripts/check_repo.py
python scripts/build_standalone.py
python scripts/build_site.py
```

Run Chromium smoke tests (optional local dev dependency):

```bash
python -m pip install -r requirements-dev.txt
python -m playwright install chromium
python -m unittest discover -s tests -v
```

GitHub Actions runs static validation, a bundled-app Chromium smoke test, and a minimal Pages-build test on push/pull request. **GitHub Pages deployment publishes only** `index.html`, `assets/`, and `.nojekyll` — never the demo backup, docs, or test helpers.

## Important limitations

- Microsoft 365 live synchronization, registered PowerPoint add-ins, shared workspaces, server-side approvals, SSO and hosted generative AI require a separately deployed authenticated backend.
- Local AI commands/optional local models and PDF/diagram import heuristics are not equivalent to guaranteed OCR or hosted AI extraction.
- This website is a *static client-side app*. GitHub Pages provides no server-side identity, HR access controls or encrypted cloud storage. Do not place real employee datasets in the repository.
- Local storage capacity and  browser performance vary by device and chart size. Download regular JSON backups of important projects.

## Author & licensing

**Developed by Avinash Ekka.** See [docs/LICENSING.md](docs/LICENSING.md) for the license decision still to be made and [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) for bundled third-party libraries. Publishing a repository publicly does **not** automatically assign an open-source license.
