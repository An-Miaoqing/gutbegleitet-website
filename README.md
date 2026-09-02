# gutbegleitet-website

## Project Overview

CareOS Website is the public-facing website for **Gut begleitet – Verein für Alltagshilfe für Senioren**.

The website allows visitors to:

- browse available services
- read information about the association
- request appointments
- submit booking requests to the CareOS backend

This project is built with React, TypeScript, and Vite. It communicates with the CareOS REST API for booking submission.

## CareOS Ecosystem

```text
                CareOS Ecosystem

         ┌───────────────────────┐
         │   careos-website      │
         │   React + Vite        │
         └──────────┬────────────┘
                    │ REST API
                    ▼
         ┌───────────────────────┐
         │   careos-backend      │
         │   Express + Prisma    │
         └──────────┬────────────┘
                    │
                    ▼
         ┌───────────────────────┐
         │ Supabase PostgreSQL   │
         └───────────────────────┘

         Documentation:
         careos-docs (Obsidian)
```

## Technology Stack

- React
- TypeScript
- Vite
- React Router
- Fetch API
- CSS
- Node.js

## Current MVP Status

- ✅ Website completed
- ✅ Booking API connected
- ✅ Database connected through the CareOS backend
- ✅ Booking creation works end-to-end
- 🚧 Internal dashboard in development
- 🚧 Authentication pending
- 🚧 Employee app pending

## Related Projects

- `careos-backend`: Express + Prisma backend for the CareOS API.
- `careos-docs`: Obsidian documentation for product, workflows, architecture, and database design.

This repository only contains the public website. Backend code, database schema, migrations, and server-side API logic live in `careos-backend`.

## Features

- Responsive website
- Public booking workflow
- Multi-step booking form
- Temporary static service catalog used by the booking UI
- Form validation
- Booking submission to the CareOS backend
- Success page after booking submission
- Error handling for validation and server failures
- Loading state during booking submission
- Public pages for home, services, news, about, contact, legal notice, and privacy policy

## Architecture

```text
Browser
  ↓
React Components
  ↓
API Layer
  ↓
CareOS Backend
  ↓
Prisma
  ↓
Supabase
```

UI components never communicate directly with the database. Database access is handled by the CareOS backend through Prisma and Supabase PostgreSQL.

Frontend API calls should go through small reusable modules in `src/api/`. UI components should focus on rendering, state, validation, and user interaction.

## Deployment Architecture

```text
Browser
  ↓
Vercel
  ↓
CareOS API (Node.js)
  ↓
Supabase PostgreSQL
```

## Project Structure

```text
careos-website/
├── public/
├── src/
│   ├── api/
│   ├── components/
│   ├── data/
│   ├── pages/
│   ├── types/
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── index.html
├── package.json
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

- `public/`: static images, logo, favicon, and public assets served by Vite.
- `src/api/`: reusable API clients for backend communication.
- `src/components/`: shared presentational components such as layout, header, footer, cards, and forms.
- `src/data/`: static website content, services, and news data.
- `src/pages/`: route-level page components.
- `src/types/`: shared TypeScript types.
- `src/App.tsx`: React Router route definitions.
- `src/main.tsx`: React application entry point.
- `src/index.css`: global styling.

## API Integration

The website currently uses the CareOS backend for booking creation.

### `POST /api/bookings`

Used by the public booking form to submit appointment requests.

The request is sent from:

```text
src/api/booking.ts
```

The booking page builds a backend-compatible payload and calls the API layer instead of calling `fetch()` directly inside the component.

### `GET /api/services`

Available in the CareOS backend for retrieving active services. The booking page currently supports backend booking submission. Dynamic loading of services from `GET /api/services` is the next planned enhancement, replacing the temporary static service list.

### Future frontend API integrations

- `GET /api/services`
- `GET /api/availability`
- Customer login
- Booking status

## Environment

Create a `.env` file for local frontend configuration.

```env
VITE_API_URL=http://localhost:3000
```

- `VITE_API_URL`: Base URL for the CareOS backend API. Use `http://localhost:3000` for local development and the deployed API URL in production.

Vite only exposes environment variables prefixed with `VITE_` to browser code.

## Local Development

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Booking Flow

```text
User selects appointment
  ↓
User selects service
  ↓
User selects duration
  ↓
User enters personal information
  ↓
Frontend validation
  ↓
POST /api/bookings
  ↓
Backend creates booking
  ↓
Success page
```

The current booking workflow is implemented in:

```text
src/pages/BookingPage.tsx
```

The backend request is handled by:

```text
src/api/booking.ts
```

## Coding Conventions

- Components should stay presentational whenever possible.
- API requests belong in `src/api/`.
- Avoid business logic inside UI components.
- Use TypeScript everywhere.
- Keep styling consistent with the existing design system.
- Reuse components where appropriate.
- Keep route-level page components in `src/pages/`.
- Keep static content in `src/data/` unless it is loaded from the backend.
- Do not access the database from frontend code.

## Current Features

- Responsive public website
- Home page
- About page
- Services page
- News page
- Contact page
- Legal notice page
- Privacy policy page
- Multi-step booking page
- Temporary static booking service selection
- Date and time selection UI
- Duration selection
- Contact and address form
- Privacy consent checkbox
- Frontend validation
- Booking API submission
- Friendly server error message
- Submit loading state
- Success confirmation state

## Roadmap

- Authentication
- Customer portal
- Employee portal
- Multi-language support
- Online payment
- Calendar availability from the backend
- Dynamic service loading from `GET /api/services`
- Email confirmation
- Accessibility improvements
- Deployment environment configuration
- Automated tests

## License

ISC
