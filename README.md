# Black Iris Films website

This is the canonical repository for the Black Iris Films website. It combines the former homepage, services, stories, photography, and estimator repositories into one Next.js application and one Vercel deployment.

## Local development

```bash
npm ci
npm run dev
```

Open `http://localhost:3000`.

Copy `.env.example` to `.env.local` when testing integrations. The site and estimator fallback can build without secrets, but email, reviews, AI estimates, lead capture, and report delivery require their corresponding environment variables.

## Main route groups

- `/` and standard pages: native Next.js App Router pages
- `/estimate`: video quote estimator and its API routes
- Service slugs such as `/corporate-video-production-sydney`: imported static service pages
- `/stories`, `/case-studies`, `/the-last-10`, and `/the-social-media-theory-of-everything`: imported story microsites
- `/photography`: imported photography gallery

Static microsite files live under `public/`; URL-preserving rewrites and shared security headers live in `next.config.ts`.

## Verification

```bash
npm run build
```

The production Vercel project should point at this repository root with the Next.js framework preset.
