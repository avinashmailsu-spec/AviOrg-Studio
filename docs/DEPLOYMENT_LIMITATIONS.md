# Deployment and capability boundaries

| Capability | GitHub Pages / offline | Needs separate backend/service |
|---|---|---|
| Create and edit chart | Yes | No |
| Excel import/export | Yes | No |
| Editable PPTX export and supported re-import | Yes | No |
| PNG, PDF, SVG, JSON | Yes | No |
| Scenarios and local workforce analytics | Yes | No |
| Local command-based AI suggestions | Yes | No |
| Optional local AI model | Only if user separately runs/configures model | Local model service |
| Live Microsoft 365 Excel synchronization | No | Yes: Microsoft identity, Graph API, permissions |
| PowerPoint task-pane add-in | No | Yes: Office add-in deployment |
| SSO / access roles / review approvals | No | Yes: hosted authentication and storage |
| Cloud backups / collaboration | No | Yes: storage, sync and conflict resolution |

## Publishing caveat

A GitHub Pages site is a static website, not a multi-user SaaS product. Client-side edit history and local storage are tied to a browser/device. Do not commit private employee information into repository examples. Public Pages hosting does not protect employee records from other people who use the same device/browser profile.
