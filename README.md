# Movie Search App

React + TypeScript + Vite application for searching movies through the TMDB API. Data fetching and caching are handled with TanStack Query.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a local environment file based on [.env.example](.env.example):

```bash
cp .env.example .env.local
```

3. Set one of the following credentials in `.env.local`:

- `VITE_TMDB_TOKEN` as the preferred TMDB bearer token
- `VITE_TMDB_API_KEY` as a fallback API key

## Available Scripts

- `npm run dev` starts the Vite development server
- `npm run lint` runs ESLint
- `npm run build` runs the TypeScript build and creates a production bundle in `dist`
- `npm run preview` serves the production build locally

## Deployment Note

Vite is configured with a relative `base` path, so built assets load correctly when the app is hosted from a repository subpath such as GitHub Pages.

GitHub Pages should be configured to deploy from GitHub Actions so the workflow in `.github/workflows/deploy.yml` publishes the built `dist` directory instead of the repository root.

Add `VITE_TMDB_TOKEN` or `VITE_TMDB_API_KEY` as repository secrets in GitHub before running the deployment workflow, otherwise the site will deploy but TMDB requests will fail at runtime.
