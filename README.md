# Bilal School Management System — PWA starter

A bilingual (English / Afaan Oromo) installable Progressive Web App for Bilal School, Grades 1–12.

## Included
- Student registration and list, with Grade 1–12 selection
- Teacher records
- Daily attendance
- Exam marks and simple letter-grade calculation
- Fee payment records
- CSV exports and JSON backup/restore
- English / Afaan Oromo interface
- PWA manifest, service worker, install prompt, offline app shell

## Run locally
A PWA needs to be served over `localhost` or HTTPS (opening `index.html` directly will not enable installation).

With Python installed:
```bash
python -m http.server 8000
```
Then open `http://localhost:8000`.

Or use VS Code Live Server.

## Publish online
1. Upload the project contents to a GitHub repository.
2. Enable GitHub Pages (Settings → Pages → Deploy from branch).
3. Open the HTTPS Pages URL on Android Chrome.
4. Use the browser menu → **Install app** or **Add to Home screen**.

## Important data limitation
This first starter build stores records in browser localStorage on the current device. The records are not shared or synchronized across teachers, administrators, or phones. Do not use it as the school's production student database yet.

For a real multi-user school system, deploy a secured backend and database, enable authentication and role permissions, backups, and HTTPS. A Node.js/MySQL backend setup outline is included in `backend/README.md`.

## Production checklist
- Admin / teacher / accountant login and role permissions
- Server-side database (MySQL)
- Secure password hashing and HTTPS
- Student/parent access controls
- Automated database backups
- Privacy policy and consent process
- Test restore and disaster recovery
