# Launch QA

QA date: 2026-06-17

Scope: Local production build of the Black Iris Films Next.js site, tested at `http://localhost:3112` after running `npm.cmd run build` and `npm.cmd run start -- --port 3112`.

This is a final pre-launch QA pass, not a live DNS/email cutover test. Anything that depends on the live Vercel production domain, DNS, Google Workspace, Search Console, or real email delivery still needs a final manual check after deployment.

## Passed

| Check | Result | Notes |
| --- | --- | --- |
| Production build passes | Passed | `npm.cmd run build` completed successfully. |
| No obvious browser console errors | Passed | Browser sweep of key pages found no console errors on `/`, `/portfolio`, `/contact`, `/estimate`, `/services`, `/photography`, `/ai-powered-content-studio-v2`, `/the-last-10`, `/brand-film-production-sydney`, and `/case-studies`. |
| All main pages load | Passed | Main App Router pages, imported static pages, service pages, sitemap, robots file, and a blog post returned expected status codes. |
| Mobile navigation works | Passed | At a mobile viewport, the menu opens, changes to "Close menu", exposes service/work/about/contact links, and shows `aria-expanded="true"`. |
| Contact form validation works | Passed | `/api/contact` rejects invalid email with a clear message. Honeypot submission returns success without sending email. |
| All CTAs work at route level | Passed | Internal CTA targets resolve locally. `/estimate`, `/contact`, `/portfolio`, case studies, service pages and other internal destinations return valid responses. |
| All internal links work | Passed | Checked 73 internal links found across the main route set. No local 4xx responses found. |
| Video/lightbox opens | Passed | Portfolio lightbox opens and loads a Vimeo player iframe. Contact page and selected service/static pages also show Vimeo iframe embeds. |
| Metadata exists for main pages | Passed with one exception | Main App Router pages have title, description, canonical, Open Graph and Twitter metadata. See failed section for `/services`. |
| Sitemap works | Passed | `/sitemap.xml` returns `200` and contains `https://blackirisfilms.com` URLs. |
| Robots file works | Passed | `/robots.txt` returns `200`, allows production crawling, blocks `/api/`, and points to the sitemap. |
| Production is indexable | Passed | Local production-like output has no `X-Robots-Tag` noindex header, and `robots.txt` allows crawling. |
| Preview/staging noindex is configured | Passed by code review | `app/robots.ts`, `app/lib/seo.ts`, and `next.config.ts` include preview/staging noindex logic when `VERCEL_ENV` is set and not `production`. |
| Security headers are present | Passed | Homepage response includes `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `Content-Security-Policy`, and `Strict-Transport-Security`. |
| No obvious secrets exposed | Passed | Secret-pattern scan found environment variable reads only, not committed real keys. Only `.env.example` is present in the repo root. |
| 404 page exists | Passed | A made-up route returned `404`, and `app/not-found.tsx` contains a custom branded 404 page. |
| Old URL redirects are implemented or documented | Passed | Redirects are present in `next.config.ts`; common old paths such as `/copy-of-home-2`, `/home`, `/about`, `/contact-us`, `/blog`, `/faq`, `/ai-imagery`, old service booking URLs, and old blog patterns redirect locally. Next emits these permanent redirects as HTTP `308`, which is Next's permanent redirect status. |
| README contains basic instructions | Passed | `README.md` includes `npm ci`, `npm run dev`, local URL, `.env.example` note, `npm run build`, and Vercel deployment notes. |

## Failed

| Check | Result | What failed | Why it matters |
| --- | --- | --- | --- |
| No broken images | Failed | Browser QA found broken image sources on the homepage from `https://vumbnail.com/...`, one empty/broken image on `/photography`, and broken images on `/the-last-10` including `/assets/anim-father-child.jpg`, `/assets/anim-wallet.jpg`, and `/assets/anim-notification.jpg`. | Broken images make the site look unfinished and can hurt trust right at launch. |
| Complete metadata on every main/static page | Failed | `/services` has a title, canonical, Open Graph and Twitter metadata, but no normal meta description. | Search engines and social tools get less useful page context for the services index. |
| Large media not loaded unnecessarily | Failed / needs optimisation | `public/assets/dacxi-first-deal-bg.mp4` is 53.75 MB and is referenced by `/financial-video-production-sydney` with `autoplay muted loop playsinline preload="metadata"`. | It is not loaded on every page, but it is too large for a service-page background video and may hurt mobile performance. |

## Needs Manual Check

| Check | Why manual |
| --- | --- |
| Real contact form email delivery | Local QA safely tested validation and honeypot handling, but did not send live email. Test on Vercel production after SMTP env vars are set. |
| Estimator lead/email flow | Needs production env vars and a real production test submission. |
| Google reviews widget | Needs production Google Business Profile env vars and live API access. |
| Beehiiv/newsletter subscription | Needs production Beehiiv env vars and a real test subscriber. |
| Google Search Console verification | Must be checked after live DNS points to the Vercel site. |
| DNS redirects for `www`, `.com.au`, and `titusmaclaren.com` | App redirects exist, but domains must be added to Vercel and pointed at the project for host redirects to work. |
| Preview/staging noindex on Vercel | Code is configured, but verify a real Vercel preview deployment returns `X-Robots-Tag: noindex, nofollow` and/or noindex metadata. |
| Production SSL and canonical redirects | Must be checked on the real domain after DNS cutover. |
| Real mobile device test | Browser viewport test passed, but a real phone check is still worthwhile for nav, video, forms and Google reviews. |
| Live video playback | Vimeo iframes appear correctly locally, but production playback should be checked on the real domain after CSP and DNS are live. |
| External file downloads | The report PDF and media kit ZIP exist as linked downloads, but download UX should be checked manually on production. |

## Recommended Next Actions

1. Fix broken images before launch:
   - Replace or remove the broken homepage `vumbnail.com` thumbnails.
   - Fix the empty/broken image on `/photography`.
   - Add or correct the missing `/assets/anim-father-child.jpg`, `/assets/anim-wallet.jpg`, and `/assets/anim-notification.jpg` references on `/the-last-10`.

2. Add a meta description to `/services`.

3. Compress or replace `public/assets/dacxi-first-deal-bg.mp4`.
   - Current size: 53.75 MB.
   - It should be much smaller for a looping background video, or replaced with a poster/lazy-loaded lighter asset.

4. Deploy to Vercel preview and manually verify:
   - Homepage
   - Portfolio
   - Contact
   - Estimate
   - Services
   - AI Powered Content Studio
   - Photography
   - The Last $10
   - Sitemap and robots
   - Preview noindex header

5. After production DNS cutover, test:
   - `https://blackirisfilms.com`
   - `https://www.blackirisfilms.com`
   - SSL lock
   - Canonical redirects
   - Contact form email
   - Estimator email
   - Beehiiv subscription
   - Google reviews
   - Search Console verification

## Evidence Notes

- Build command: `npm.cmd run build`
- Local server: `npm.cmd run start -- --port 3112`
- Main routes tested returned `200`.
- Missing route tested returned `404`.
- Internal links checked: 73.
- Browser pages checked for console errors and broken images:
  - `/`
  - `/portfolio`
  - `/contact`
  - `/estimate`
  - `/services`
  - `/photography`
  - `/ai-powered-content-studio-v2`
  - `/the-last-10`
  - `/brand-film-production-sydney`
  - `/case-studies`
