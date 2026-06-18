# Final Launch Summary

Date: 2026-06-17

This summary is based on:

- `PRODUCTION_AUDIT.md`
- `LAUNCH_QA.md`
- `REDIRECT_PLAN.md`
- `DNS_AND_EMAIL_LAUNCH_CHECKLIST.md`
- Final pre-launch cleanup work completed on 2026-06-17

Overall verdict: the remaining code-side launch blockers from the previous summary have been fixed or safely mitigated. I would still treat the site as ready for final launch only after the manual production checks are completed, especially live form/email tests, DNS checks, and a real browser pass on the deployed domain.

## Fixed

### Broken homepage portfolio thumbnails

What changed:
The site no longer uses `vumbnail.com` thumbnails in the portfolio data. The broken external thumbnail references were replaced with existing local site assets.

Files changed:

- `app/data/portfolio.ts`
- `next.config.ts`

Notes:

- Dell Pro Plus Earbuds now uses `/assets/hero-tech.jpg` as a safe launch placeholder.
- AIE Learn from the Experts now uses `/assets/thumb-aie-tvc.jpg`.
- Street Growth now uses `/assets/hero-corporate.jpg` as a safe launch placeholder.
- Avalanche joins the Dacxi Platform now uses `/assets/thumb-842154532.jpg` as a safe Dacxi/finance placeholder.
- The unused `vumbnail.com` remote image allow-list entry was removed from `next.config.ts`.

Still worth improving later:
Replace the placeholder thumbnails with exact project thumbnails when better creative assets are available.

### `/photography` broken or empty image

What changed:
The hidden gallery viewer image now starts with a harmless transparent placeholder instead of having an empty `src`.

File changed:

- `public/photography/index.html`

Why this is safe:
The image is hidden until the gallery opens. This does not change the visual design, but it stops QA tools and browsers from treating the hidden viewer image as broken.

### `/the-last-10` missing images

What changed:
The page image references now use absolute `/the-last-10/assets/...` paths instead of `./assets/...`.

File changed:

- `public/the-last-10/index.html`

Why this was needed:
The assets already existed, but when the page is served at `/the-last-10`, relative `./assets/...` paths can resolve as `/assets/...`, which breaks the images. The absolute page-folder paths remove that ambiguity.

### `/the-last-10` privacy behaviour

What changed:
The client-side password gate was removed.

File changed:

- `public/the-last-10/index.html`

Current behaviour:
`/the-last-10` is public. It is included in the public site and should be treated as indexable public content unless Titus decides otherwise.

Important:
If this page ever needs to be private, it needs real server-side protection or it should be removed/noindexed. A browser-only password gate is not security.

### `/services` metadata

What changed:
The services page now has a normal meta description, and the Open Graph/Twitter descriptions match it.

File changed:

- `public/legacy/services/index.html`

Description added:

`Video production, corporate video, branded content, photography and AI-powered content services from Black Iris Films, a Sydney video production agency.`

### Large Dacxi video loading

What changed:
The original 53 MB Dacxi MP4 was converted into a short web-optimized background loop. The page now shows a matching poster image first and only attaches/loads the optimized video when the section is near the viewport.

Files changed:

- `public/legacy/services/financial-video-production-sydney.html`
- `public/assets/dacxi-first-deal-bg-web.mp4`
- `public/assets/dacxi-first-deal-bg-poster.jpg`

Why this is safe:
The section still keeps its cinematic background video behaviour for modern browsers, but the full MP4 is not forced into the initial page load.

Details:

- Original source: `public/assets/dacxi-first-deal-bg.mp4`, about 53.8 MB.
- New web file: `public/assets/dacxi-first-deal-bg-web.mp4`, about 2.1 MB.
- Poster image: `public/assets/dacxi-first-deal-bg-poster.jpg`, about 58 KB.
- The original source file remains in the repo as a master asset, but the page now uses the optimized web file.

### Text corruption and privacy copy

What changed:
The visible mojibake/encoding corruption found in the app/public files was cleaned up. The privacy policy was also updated so it no longer talks about ecommerce orders, payment processing, shipping, or order confirmations.

File changed:

- `app/privacy-policy/page.tsx`

Important:
This is not legal advice. Titus should still review the privacy policy before launch, especially because the site may use contact forms, estimator emails, Beehiiv, analytics, Google reviews, and downloadable reports.

## Still needs manual check before launch

- Submit a real contact form on the production deployment and confirm the business receives the email.
- Submit a real estimator enquiry and confirm both the business notification and prospect-facing email behaviour.
- Test a newsletter opt-in and confirm the person is added to Beehiiv.
- Confirm Google reviews work on the production domain if that feature is expected to be live.
- Open the deployed production site in a browser and check the homepage, `/portfolio`, `/photography`, `/the-last-10`, `/services`, `/financial-video-production-sydney`, `/contact`, and `/estimate`.
- Confirm the Dacxi background video still plays when you scroll to that section on a normal browser connection.
- Review the privacy policy text. It is cleaner now, but it still needs owner/legal review.
- Confirm all required production environment variables are set in Vercel.
- Confirm the final domain setup in Vercel before changing DNS.
- Follow `DNS_AND_EMAIL_LAUNCH_CHECKLIST.md` and change only website DNS records, not Google Workspace mail records.
- Verify Search Console after the domain is live.

## Safe to do after launch

- Replace the temporary local thumbnail placeholders with exact project thumbnails.
- Remove or archive the original 53 MB Dacxi source MP4 later if you no longer want master media files in the repo.
- Replace basic in-memory rate limiting with durable production rate limiting.
- Tighten the Google reviews API CORS from `*` to the production domain if possible.
- Make sitemap `lastModified` dates stable instead of using the current build date everywhere.
- Add richer social share images for key pages.
- Add structured data for LocalBusiness, Organization, services, and videos.
- Convert imported static HTML pages into normal App Router pages over time.
- Move or noindex public support snippets that are useful for development but should not be crawled as site pages.
- Add automated link, image, and form smoke tests.
- Continue accessibility improvements after final content and imagery are locked.

## Manual tasks Titus needs to do outside the codebase

### Vercel

- Confirm the production deployment is connected to the correct GitHub repo and branch.
- Confirm all required production environment variables are set in Vercel.
- Add `blackirisfilms.com` and `www.blackirisfilms.com` to the Vercel project.
- Decide the canonical domain. The current checklist recommends `https://blackirisfilms.com` as canonical, with `www` redirecting to it.
- Add analytics IDs only if you want analytics live:
  - `NEXT_PUBLIC_GTM_ID`, or
  - `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- Test the production deployment before changing DNS.

### DNS and domains

- In Wix DNS, change only the website records needed for Vercel.
- Do not touch Google Workspace MX records.
- Do not touch SPF, DKIM, DMARC, Google verification, Beehiiv, MailerLite, or other TXT records unless you know exactly why.
- Confirm `blackirisfilms.com.au` redirects to `blackirisfilms.com`.
- Confirm `titusmaclaren.com` redirects to `blackirisfilms.com`.
- After DNS changes, check both `blackirisfilms.com` and `www.blackirisfilms.com` in a browser.
- Confirm HTTPS/SSL works after Vercel finishes provisioning the certificates.

### Email

- Send a test email to the business address.
- Reply from the business address.
- Submit a contact form on the live site.
- Submit an estimator enquiry on the live site.
- Confirm the business receives the notification email.
- Confirm the user receives any expected confirmation or estimate email.
- Confirm Beehiiv receives newsletter opt-ins when the checkbox is selected.

### Search and indexing

- Verify the final domain in Google Search Console.
- Submit the new sitemap.
- Check that production is indexable.
- Check that preview/staging deployments are noindexed.
- Export old Wix URLs from Wix, Google Search Console, analytics, or any available crawl tool.
- Fill the placeholder redirect table in `REDIRECT_PLAN.md` for any old URLs that are not already covered.

## Remaining risks explained in plain English

- The production build can pass even if live services are misconfigured. Forms, emails, Beehiiv, Google reviews, and analytics still need real production tests.
- The optimized Dacxi video should still be checked in a live browser to confirm the 10-second loop feels natural.
- `/the-last-10` is public. That is intentional for now. If it needs to be private later, it needs real protection.
- Some thumbnail replacements are safe placeholders, not perfect creative matches.
- DNS changes can break email if the wrong records are edited. Only web A/CNAME records should change for Vercel.
- The redirect plan still has unknown old Wix URLs. Known redirects are implemented, but any old Wix URL that has not been discovered cannot be protected yet.
- Some imported static pages may not have the same level of metadata, maintainability, or accessibility polish as native App Router pages.

## Final production build result

Passed on 2026-06-17.

Command run:

```bash
npm.cmd run build
```

Result:

- Next.js production build completed successfully.
- TypeScript completed successfully.
- 62 static pages were generated.
- API routes were detected as dynamic server routes.
- No build errors were reported.
