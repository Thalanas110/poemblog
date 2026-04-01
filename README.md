# Poem Blog

Vite + React + TypeScript poetry blog with Supabase backend integration.

## Local development

1. Install dependencies:

```bash
npm install
```

2. Create a `.env.local` file in the project root:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_or_publishable_key
```

3. Start the app:

```bash
npm run dev
```

## Netlify deployment

This repo is preconfigured for Netlify with `netlify.toml`.

Netlify settings used:

- Build command: `npm run build`
- Publish directory: `dist`
- Node version: `20`
- SPA fallback redirect: all paths route to `index.html`

### Required Netlify environment variables

Set these in Site configuration -> Environment variables:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`

### Deploy steps

1. Push this repository to GitHub.
2. In Netlify, choose "Add new site" -> "Import an existing project".
3. Select this repository.
4. Confirm build settings (they are auto-read from `netlify.toml`).
5. Add the two `VITE_...` environment variables.
6. Deploy.

## Production preview

```bash
npm run build
npm run preview
```