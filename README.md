# Gut begleitet – Alltagshilfe für Senioren

Website für Gut begleitet – Alltagshilfe und Begleitung für Senioren in Wien.

## Getting Started

```bash
npm install
npm run dev
```

## Pages

| Route | Page |
|-------|------|
| `/` | Home |
| `/ueber-uns` | Über Uns |
| `/leistungen` | Leistungen |
| `/news` | News & Events |
| `/beratung` | Beratung buchen |
| `/kontakt` | Kontakt |

## Adding Content

- **News articles:** Edit `src/data/news.ts`
- **Services:** Edit `src/data/services.ts`
- **Site copy:** Edit `src/data/content.ts`
- **Zoho Bookings:** Hook into `ConsultationForm` via `onSubmit` or `#zoho-bookings-slot`

## Build

```bash
npm run build
npm run preview
```
