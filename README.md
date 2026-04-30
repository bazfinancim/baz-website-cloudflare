# 🌐 BAZ-F — MAIN WEBSITE (Cloudflare Pages Version)

## ⚠️ חשוב — זה CLONE בלבד
- **האתר הראשי הפעיל:** `avi-website-frankfurt` על Render → baz-f.co.il
- **הrepo הזה:** גרסה מותאמת ל-Cloudflare Pages (static export)
- **Backup הקפוא:** branch `backup-main-2026-05-01` בrepo `avi-website`

## שינויים מהגרסה המקורית
1. `next.config.js` — הוסף `output: 'export'`
2. `ContactForm.tsx` — שולח ל-Formspree במקום `/api/contact`

## Deploy ל-Cloudflare Pages
- Build command: `npm run build`
- Output directory: `out`
- Node version: 18
