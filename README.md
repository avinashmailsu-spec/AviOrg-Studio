<div align="center">
  <img src="assets/brand/logo.svg" alt="AviOrg Studio logo" width="84" />

  # AviOrg Studio
  ### Intelligent Organization Design, Simplified

  **A premium, browser-based organizational chart designer**  
  Create, customize, analyze, and export beautiful organization charts — without installing a complex application.

  **AviOrg Pro 6.1** · **Developed by Avinash Ekka**

  [Explore Features](#features) · [View Screenshots](#application-screenshots) · [Get Started](#get-started) · [Excel & PowerPoint](#excel-and-powerpoint) 
</div>

---

## Application screenshots

### Organization Chart Designer

![AviOrg Studio premium chart editor showing organizational hierarchy, controls, and chart canvas](docs/AviOrg_Studio_Preview.png)

### About & Developer Credits

![AviOrg Studio developer credits and app branding](docs/AviOrg_Credits.png)

The screenshots show the actual AviOrg Studio interface.

## Features

| Module | What you can do |
| --- | --- |
| **Visual Chart Designer** | Create and edit reporting hierarchies; drag and position cards; zoom, focus, align, and arrange your chart. |
| **Premium Design Library** | Choose from **500 design combinations**, customize card styles, palettes, typography, spacing, and connectors. |
| **Excel & CSV Import** | Import employee data in bulk with flexible column mapping, data validation, and a review step before applying changes. |
| **Editable PowerPoint Export** | Produce presentations with native editable PowerPoint shapes and text, including multi-slide organization charts. |
| **Flexible Reporting** | Represent primary and dotted-line managers, position status, departments, and reporting structures. |
| **Workforce Analytics** | Explore position counts, vacancies, FTE, reporting spans, department summaries, and annual position costs. |
| **Scenario Planning** | Save organization snapshots, compare changes, and explore alternative reporting structures. |
| **Smart Imports** | Recover supported AviOrg/legacy Structura presentations, and review *estimated* hierarchy reconstructions from compatible diagrams and text PDFs. |
| **AI-assisted Tools** | Use supported natural-language editing commands, layout checks, and optional locally configured AI services. |
| **Fast Navigation** | Search employees and tools, open the command palette with **Ctrl+K** (or **Cmd+K**), and use focused canvas views. |
| **Portable Projects** | Export charts to PDF, PNG, SVG, and JSON; download CSV/XLSX employee data and re-open saved project backups. |

## Get started

**No installation or account is required** for the standalone edition. AviOrg Studio runs in a modern desktop browser such as Google Chrome or Microsoft Edge.

### Option A — Open the standalone app (easiest)

1. Download the [standalone HTML application](standalone/AviOrg_Studio_Pro_6_1.html) from this repository (use GitHub's **Download raw file** action).
2. Open `AviOrg_Studio_Pro_6_1.html` in **Chrome** or **Edge**.
3. Start with the sample organization, create employee cards, or import an Excel/CSV file.
4. Customize the layout and colors, then export your chart.

The standalone HTML bundles the required application scripts and works offline.

### Option B — Run the website locally

For the modular website edition, download the repository and run a local web server in its directory:

```bash
python -m http.server 8000
```

Open **http://localhost:8000** in your browser. The website edition can also be hosted on a static web server, including GitHub Pages.

## Create your first organization chart

1. **Add people or positions.** Use the editor to create cards, set names and job titles, and select each person's reporting manager.
2. **Or import from Excel.** Open the import/Data Hub tools and upload your completed workbook.
3. **Review reporting relationships.** Confirm manager IDs and correct any validation warnings. Dotted-line managers can be configured separately.
4. **Choose your design.** Apply a template, adjust colors, card spacing, line routing, and typography.
5. **Arrange and explore.** Use zoom, focused views, auto-layout, and the inspector to refine the chart.
6. **Export or save.** Download a PowerPoint, PDF, image, spreadsheet, or JSON backup of the project.

## Excel and PowerPoint

### Import employee data in Excel

Use the ready-made [Excel Import Template](examples/AviOrg_Excel_Import_Template.xlsx) to prepare employee records, reporting relationships, departments, and position details. The import preview helps identify missing managers and other data issues before updating the chart.

### Export a PowerPoint you can edit

Choose **PowerPoint (PPTX)** in the export tools to generate editable chart objects rather than just a picture of the chart. Open the `.pptx` in PowerPoint to adjust shapes, text, and formatting.

See a [sample editable PowerPoint presentation](examples/AviOrg_Editable_Example.pptx).

**Other formats:** PDF, PNG, SVG, XLSX, CSV, and JSON. Supported AviOrg-generated presentations can also retain embedded source data for re-importing into AviOrg Studio. Generic imported diagrams may require manual review.

## Who is it for?

AviOrg Studio is designed for **HR professionals, managers, consultants, business teams, nonprofit organizations, and anyone who needs to present clear reporting structures**. It works for quick team charts, departmental plans, organizational redesigns, and leadership presentations.

## Privacy and limitations

- The standalone editor processes imported employee data in your browser and may store project state in that browser's local storage. **Avoid shared devices for confidential data** and keep regular JSON backups.
- A publicly hosted static page is **not** a private HR portal. Never commit real employee lists, sensitive records, credentials, or confidential organization charts to a public repository.
- AI assistance primarily consists of supported local commands; optional local AI integrations require their own configuration. General-purpose cloud AI is not built in.
- Image/scanned-PDF recognition is not a guaranteed automatic conversion capability. Estimated reporting relationships from external charts should always be verified.
- Live Microsoft 365 synchronization, native Office add-ins, real-time collaboration, SSO, and secure multi-user approvals require a separate authenticated deployment.

## Credits

**AviOrg Studio — Developed by Avinash Ekka**  
*Exploring AI and technology to make everyday work easier, smarter, and more efficient.*

For third-party dependencies see [Third-Party Notices](THIRD_PARTY_NOTICES.md). See [Licensing Information](docs/LICENSING.md) for the project's current licensing status.
