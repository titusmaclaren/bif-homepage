# Black Iris Films Production Readiness Audit

Audit date: 2026-06-17

Scope: Next.js website in this repository, including the main App Router pages, API routes, imported static pages in `public/`, configuration, metadata, forms, redirects, sitemap, and build health.

Build result: `npm.cmd run build` completed successfully.

Build verification update:
- `2026-06-17`: Ran `npm.cmd run build` again using npm, which is the correct package manager for this repo because it has `package-lock.json`.
- Result: the production build completed successfully.
- Fixes made for build errors: none. There were no build errors to fix.
- `2026-06-17`: After the form safety work, ran `npm.cmd run build` again.
- Result: the production build completed successfully.
- `2026-06-17`: After the SEO and social-sharing baseline work, ran `npm.cmd run build` again.
- Result: the production build completed successfully and generated `robots.txt`, `sitemap.xml`, and 62 App Router pages/routes.
- `2026-06-17`: After adding production security headers, ran `npm.cmd run build` again.
- Result: the production build completed successfully.
- `2026-06-17`: After the minimal performance optimisation pass, ran `npm.cmd run build` again.
- Result: the production build completed successfully.
- `2026-06-17`: After the practical accessibility pass, ran `npm.cmd run build` again.
- Result: the production build completed successfully.
- `2026-06-17`: After implementing the Wix-to-Next.js redirect set from `REDIRECT_PLAN.md`, ran `npm.cmd run build` again.
- Result: the production build completed successfully.
- `2026-06-17`: After adding the clean analytics setup, ran `npm.cmd run build` again.
- Result: the production build completed successfully.

## Quick answers

- Router: This site uses the Next.js App Router. The main files are in `app/`, including `app/layout.tsx`, `app/page.tsx`, and API routes under `app/api/`. There is no `pages/` router directory.
- Metadata: There is good basic global metadata in `app/layout.tsx`, but several pages and imported static HTML pages need stronger social sharing metadata.
- Sitemap: There is a sitemap at `app/sitemap.ts`.
- Robots: There is a robots file at `app/robots.ts`.
- Secrets: I did not find obvious committed secret values. `.env.example` now uses placeholders only and no `NEXT_PUBLIC_` variables are currently used.
- Contact form: The form works structurally, but the public API routes need abuse protection before launch.
- Security headers: A practical production header set has been added in `next.config.ts`.
- Preview indexing: Preview and staging builds are protected with noindex metadata and an `X-Robots-Tag` header when Vercel sets `VERCEL_ENV` to anything other than `production`.
- Redirects: The approved Wix-to-Next.js redirect set from `REDIRECT_PLAN.md` has been implemented in `next.config.ts`. A full Wix/Search Console URL export is still recommended after launch to catch any old URLs not listed in the plan.
- Accessibility: Forms are mostly sound, but there are obvious keyboard and focus issues in interactive video/lightbox areas.
- Analytics: A production-only Google Analytics/GTM-ready setup has been added. No analytics scripts load unless the relevant public Vercel environment variable is configured.

## Secrets audit update

Date: 2026-06-17

What was checked:
- Environment files in the repo.
- Environment variable usage in `app/`, `components/`, and `lib/`.
- Hardcoded API-key-shaped strings, private keys, webhook URLs, database URLs, SMTP credentials, tokens, and common provider secrets.
- `NEXT_PUBLIC_` usage.
- `.gitignore` environment file rules.

Result:
- No real committed `.env` files were found. The only env file in the repo is `.env.example`.
- No obvious committed API keys, SMTP passwords, database URLs, private keys, or OAuth refresh tokens were found.
- No `NEXT_PUBLIC_` variables were found. That is good because anything starting with `NEXT_PUBLIC_` is visible in the browser.
- `.gitignore` already excludes `.env*` and explicitly allows `.env.example`, which is the right pattern.
- `.env.example` has been updated to use placeholders only and to match the variables the current code actually reads.

Safe to expose publicly:
- Public website URLs such as `https://www.blackirisfilms.com`.
- Public contact details intentionally shown on the site, such as `info@blackirisfilms.com`.
- Non-secret IDs can sometimes be public, but this project does not currently need any browser-visible env variables, so they should stay unprefixed unless there is a clear reason to expose them.

Must remain server-only:
- `SMTP_USER`
- `SMTP_PASS`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_SECURE`
- `SMTP_FROM`
- `CONTACT_FORM_TO`
- `BEEHIIV_API_KEY`
- `BEEHIIV_PUBLICATION_ID`
- `BEEHIIV_SEND_WELCOME_EMAIL`
- `BIF_ANTHROPIC_API_KEY`
- `ANTHROPIC_API_KEY`
- `LEAD_WEBHOOK_URL`
- `GOOGLE_BUSINESS_ACCOUNT_ID`
- `GOOGLE_BUSINESS_LOCATION_ID`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `GOOGLE_REFRESH_TOKEN`
- `MAILERLITE_API_KEY`
- `MAILERLITE_REPORT_GROUP_ID`
- `MAILERLITE_GROUP_ID`
- `WIX_API_KEY`
- `WIX_SITE_ID`
- `WIX_NEWSLETTER_LABEL_KEYS`

Documented caution:
- Fixed: `public/the-last-10/contact.html` previously used a third-party `formsubmit.co` form URL. It now posts to the site's own `/api/contact` endpoint. The page still displays a direct `mailto:` contact address, which is public contact information rather than a credential.
- `app/api/email-estimate/route.ts` uses `titus@blackirisfilms.com` as a hardcoded reply-to address. This is not a secret, but it is a personal-looking business address. Consider moving it to an env variable later if you want all routing addresses managed in Vercel.

## Contact form safety update

Date: 2026-06-17

What changed:
- Added shared server-side request safety helpers in `lib/requestSecurity.ts`.
- Added basic IP-based rate limiting to:
  - `app/api/contact/route.ts`
  - `app/api/estimate/route.ts`
  - `app/api/email-estimate/route.ts`
  - `app/api/report-download/route.ts`
- Added stricter server-side validation and length checks for names, emails, phone numbers, company names, estimator briefs, and free-text messages.
- Kept user input safely handled before email output by continuing to escape HTML in `app/api/contact/route.ts`.
- Added or confirmed honeypot fields for:
  - `app/components/ContactForm.tsx`
  - `app/components/AiImageryContactForm.tsx`
  - `components/steps/DetailsStep.tsx`
  - `public/legacy/stories/the-social-media-theory-of-everything.html`
  - `public/the-last-10/contact.html`
- Added browser-side length limits to the main contact form, estimator brief, report form, and The Last $10 contact form.
- Changed `public/the-last-10/contact.html` so its form no longer posts to `formsubmit.co`; it now submits JSON to the site's own `/api/contact` endpoint.
- Updated `.env.example` with comments explaining what production values need to be added in Vercel.

Local tests run:
- `/api/contact` rejects invalid email with a clear message.
- `/api/contact` accepts honeypot submissions silently without sending email.
- `/api/contact` rejects oversized messages.
- `/api/estimate` rejects invalid estimator email with a clear error in the response.
- `npm.cmd run build` completed successfully.

Still needed in Vercel:
- Add real production values for `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`, and `CONTACT_FORM_TO`, otherwise contact emails and acknowledgement emails will not send.
- Add `BEEHIIV_API_KEY`, `BEEHIIV_PUBLICATION_ID`, and optionally `BEEHIIV_SEND_WELCOME_EMAIL`, otherwise newsletter checkboxes will not create Beehiiv subscribers.
- Add `BIF_ANTHROPIC_API_KEY` or `ANTHROPIC_API_KEY`, otherwise the estimator will use its fallback pricing response.
- Add `LEAD_WEBHOOK_URL` if estimator submissions should still be captured in the lead sheet/webhook.
- Add `MAILERLITE_API_KEY` and `MAILERLITE_REPORT_GROUP_ID` if the Social Media Theory of Everything report form should keep triggering MailerLite delivery.
- Keep `WIX_API_KEY`, `WIX_SITE_ID`, and `WIX_NEWSLETTER_LABEL_KEYS` only if the legacy Wix newsletter/contact integration is still needed for the report form.

Remaining note:
- The new rate limiting is intentionally minimal and in-memory. It reduces basic spam, but because serverless instances can reset or scale, a durable rate limiter such as Upstash/Vercel KV would be stronger later.

## SEO and social-sharing update

Date: 2026-06-17

What changed:
- Added shared SEO settings in `app/lib/seo.ts`.
- Updated the global App Router metadata in `app/layout.tsx` to use `https://blackirisfilms.com`, the requested default title, the requested default description, favicon/app icon metadata, Open Graph defaults, Twitter card defaults, and production/preview robots rules.
- Added or improved page-specific metadata for:
  - `app/page.tsx`
  - `app/contact/page.tsx`
  - `app/estimate/page.tsx`
  - `app/portfolio/page.tsx`
  - `app/learn/page.tsx`
  - `app/why-black-iris-films/page.tsx`
  - `app/partner-with-us/page.tsx`
  - `app/privacy-policy/page.tsx`
  - `app/ai-imagery/page.tsx`
  - `app/post/[slug]/page.tsx`
- Updated blog post metadata so canonical URLs and social images resolve to the apex domain.
- Updated `app/sitemap.ts` and `app/rss.xml/route.ts` to use `https://blackirisfilms.com`.
- Added `app/robots.ts` using the Next.js App Router convention.
- Added an `X-Robots-Tag: noindex, nofollow` header for Vercel preview/staging deployments in `next.config.ts`.
- Added missing generic Open Graph and Twitter card tags to imported static HTML pages where they were missing.
- Normalised static page canonical and social URLs from `https://www.blackirisfilms.com` to `https://blackirisfilms.com`.

Indexing behaviour:
- Production builds are indexable.
- Vercel preview/staging builds are noindexed when `VERCEL_ENV` is set to anything other than `production`.
- `robots.txt` now allows production crawling and points search engines to `https://blackirisfilms.com/sitemap.xml`.

Manual review before launch:
- Confirm whether the canonical live domain should be exactly `https://blackirisfilms.com` or whether you still want `https://www.blackirisfilms.com` as canonical. This update follows the requested apex domain.
- Review the default social image: `https://blackirisfilms.com/assets/hero-brand-generated.png`. It is now the fallback image for many pages, but a custom branded 1200 x 630 social image would be stronger.
- Review the page titles and descriptions for the main commercial pages, especially `/`, `/portfolio`, `/estimate`, `/contact`, `/why-black-iris-films`, and `/ai-powered-content-studio-v2`.
- Review imported static pages such as service pages, photography, case studies, The Last $10, and the AI Powered Content Studio page. They now have baseline sharing tags, but their social images are mostly generic.
- Review whether `/the-last-10` should be indexed. The current SEO baseline keeps production pages indexable, but the earlier audit noted this page may need real privacy protection if it is confidential.
- Check Google Search Console after launch to make sure the submitted sitemap uses the same canonical domain as Vercel and DNS.

## Security headers update

Date: 2026-06-17

What changed:
- Added a practical production security header set in `next.config.ts`.
- Added `X-Content-Type-Options: nosniff` so browsers do not guess file types.
- Added `Referrer-Policy: strict-origin-when-cross-origin` so other websites receive less URL detail from visitors leaving this site.
- Added `Permissions-Policy` to turn off browser features this marketing site does not use, including camera, microphone, location, payment, USB and motion sensors.
- Added a Content Security Policy that allows the services the site actually uses: the site itself, Vimeo embeds/API JSONP, YouTube embeds, Google Fonts on imported static pages, Wix-hosted legacy images, Vimeo/YouTube thumbnails, and Google profile images.
- Added `Strict-Transport-Security: max-age=31536000`. This is safe for production HTTPS custom-domain use, but does not include subdomains or preload yet, which keeps it reversible while DNS and redirects settle.
- Kept the existing `X-Frame-Options: DENY` header.
- Kept preview/staging noindex protection inside the same header block.

Why the CSP is not ultra-strict:
The site still has imported static HTML pages that use inline scripts and inline styles, and the homepage hero loads Vimeo data through a Vimeo JSONP script. Because of that, the CSP still allows inline scripts/styles and `https://vimeo.com` for scripts. Removing those allowances would likely break real pages before launch.

Testing completed:
- `npm.cmd run build` completed successfully.
- Started the production build locally with `next start` on `http://localhost:3106`.
- Confirmed the new headers are sent on `/`, `/portfolio`, `/contact`, `/brand-film-production-sydney`, and `/ai-powered-content-studio-v2`.
- Loaded those pages in the browser and found no CSP warnings or errors in the console.
- Opened a portfolio video lightbox and confirmed it created a Vimeo player iframe without CSP warnings.

Still needs manual testing after deployment:
- Click several video lightboxes on the live production domain, including homepage, portfolio and imported service pages.
- Submit contact, estimator, report download and newsletter forms on production once the final Vercel environment variables are set.
- Check the Google reviews widget on production, especially profile images.
- Watch the production browser console for any CSP warnings after analytics or marketing scripts are added.
- If Google Analytics, Google Tag Manager, Vercel Analytics or any new third-party scripts are added later, update the CSP intentionally rather than weakening it broadly.

## Performance optimisation update

Date: 2026-06-17

What changed:
- Added Vimeo thumbnail hosts to `next.config.ts` so portfolio thumbnails can use the Next.js image optimizer.
- Converted key thumbnail/card images to `next/image` in:
  - `app/portfolio/PortfolioExplorer.tsx`
  - `app/portfolio/ServiceCarousel.tsx`
  - `app/components/PortfolioIntro.tsx`
  - `app/components/ServicesGrid.tsx`
  - `app/components/ContentSystem.tsx`
  - `app/components/BlogCard.tsx`
  - `app/components/BlogPostLayout.tsx`
  - `app/components/VideoLightbox.tsx`
- Added better image sizing hints so the browser requests more appropriate image sizes and avoids some layout shifting.
- Reduced homepage hero thumbnail pressure by keeping live Vimeo feed thumbnails at a smaller size, marking the generated hero images as lower-priority, and avoiding the extra live Vimeo thumbnail refresh on mobile and reduced-motion devices.
- Reduced mobile hero work by rendering fewer spherical hero bands on compact screens while preserving the same cinematic treatment.
- Stopped the hero animation and cursor parallax for users who prefer reduced motion.
- Stopped automatic movement in the service carousel and process steps for users who prefer reduced motion.
- Delayed the sticky quiz image until the sticky quiz is actually shown.

Why it matters:
These are low-risk changes that reduce unnecessary image work, improve lazy loading, reduce mobile animation cost, and lower the chance of layout shifts without redesigning the site.

Testing completed:
- `npm.cmd run build` completed successfully after the changes.
- Started the production build locally on `http://localhost:3108`.
- Smoke-tested `/`, `/portfolio`, and `/post/why-emotionally-connected-customers-spend-2-more` in the browser.
- Result: the pages loaded, no broken images were detected, and no relevant image/Next.js/CSP browser warnings appeared.

Still needs manual testing:
- Check the homepage hero on desktop and mobile to make sure the reduced thumbnail count on mobile still feels cinematic.
- Click portfolio and homepage video thumbnails to make sure the lightbox still opens correctly.
- Check the portfolio page filters and service carousel.
- Check a blog post hero image and the Learn page cards.
- Check production Core Web Vitals after deployment, especially LCP on the homepage and portfolio page.
- The very large 53 MB `public/assets/dacxi-first-deal-bg.mp4` file still exists. It should be compressed or replaced in a later pass because changing/compressing source media is a bigger visual-risk task.

## Accessibility update

Date: 2026-06-17

What changed:
- Improved the shared navigation in `app/components/Nav.tsx` so desktop dropdown buttons expose `aria-expanded` and `aria-controls`, and the mobile menu button has clearer open/close labels.
- Improved the shared video lightbox in `app/components/VideoLightbox.tsx` so focus moves to the close button when a video opens, returns to the trigger when closed, and the dialog has a reliable accessible title/description.
- Made homepage hero video tiles keyboard-operable in `app/components/Hero.tsx` by adding button semantics, keyboard activation with Enter/Space, and visible focus styling.
- Added a stronger reduced-motion fallback in `app/globals.css` and kept the cinematic look for users who have not requested reduced motion.
- Improved testimonial cards in `app/components/InTheirWords.tsx` so keyboard users can activate them with Enter/Space and screen readers receive expanded/collapsed state.
- Changed contact form error messages in `app/components/ContactForm.tsx` and `app/components/AiImageryContactForm.tsx` to use `role="alert"` when something goes wrong.
- Improved estimator fields in `components/steps/BriefStep.tsx` and `components/steps/DetailsStep.tsx` with a hidden label, required state, invalid state, and helper text.
- Fixed the imported `/the-last-10` static page so the password overlay no longer creates a second `h1`, and the password input has a label.

Testing completed:
- `npm.cmd run build` completed successfully.
- Checked key App Router pages and major imported static pages for obvious `h1` count problems.
- Started the production build locally on `http://localhost:3108`.
- Browser smoke-tested `/portfolio`: confirmed one `h1`, nav buttons expose menu state, and opening a video lightbox focuses the close button with a labelled dialog.

Still needs manual testing:
- Keyboard-tab through the homepage, portfolio page, contact page, estimator, and imported service pages on the deployed domain.
- Test mobile navigation on a real phone or browser device emulation.
- Open and close several video lightboxes with keyboard only.
- Check imported static pages, especially photography and service pages, for any older inline-script interactions that still need deeper accessibility work.
- Run a proper automated accessibility report later, such as axe or Lighthouse, once the launch build is stable.

## Redirect implementation update

Date: 2026-06-17

What changed:
- Implemented permanent 301 redirects in `next.config.ts` for the confirmed old Wix paths listed in `REDIRECT_PLAN.md`.
- Added permanent redirects for likely old Wix homepage/contact/about/blog paths:
  - `/home` to `/`
  - `/about` to `/why-black-iris-films`
  - `/contact-us` and `/contact-us-1` to `/contact`
  - `/blog` to `/learn`
- Kept the already-planned permanent redirects for:
  - `/copy-of-home-2` to `/`
  - `/faq` to `/#faq`
  - `/ai-imagery` to `/ai-powered-content-studio-v2`
  - `/bondi-to-coogee-walk-in-one-minute` to `/stories`
  - `/how-aie-succeeded-through-covid-19` to `/stories`
  - the two old creative brainstorm booking URLs to `/contact`
- Added a broader permanent redirect from `/service-page/:path*` to `/contact`, because old Wix service booking pages should now send enquiries to the main contact page.
- Added old blog-pattern redirects:
  - `/blog/:slug` to `/post/:slug`
  - `/single-post/:slug` to `/post/:slug`
- Added host-based permanent redirects so these alternate domains point to the canonical apex domain while preserving the path:
  - `www.blackirisfilms.com`
  - `blackirisfilms.com.au`
  - `www.blackirisfilms.com.au`
  - `titusmaclaren.com`
  - `www.titusmaclaren.com`

Why it matters:
These redirects preserve as much SEO and referral value as possible by sending old Wix URLs to the closest relevant new page instead of dumping everything onto the homepage.

Testing completed:
- `npm.cmd run build` completed successfully.
- Checked `.next/routes-manifest.json` and confirmed the new redirect rules were registered by Next.js.

Still needed:
- After deployment, test the most important redirects on the live domain.
- Export old indexed URLs from Wix, Google Search Console, Google Analytics, Google Ads, email campaigns, and any backlink reports. Add exact redirects for any valuable old URLs not already covered.
- Confirm the alternate domains are added to Vercel and pointed at the project. Host-based redirects only work for domains that reach the Vercel deployment.

## Analytics setup update

Date: 2026-06-17

What was checked:
- Searched the codebase for Google Analytics, Google Tag Manager, Vercel Analytics, Meta Pixel, LinkedIn Insight Tag, Hotjar, Clarity, Plausible, Fathom, PostHog, `gtag`, `dataLayer`, `fbq`, and `lintrk`.
- Checked `package.json` for analytics packages.

Result:
- No existing analytics scripts or analytics packages were found.
- No Meta Pixel, LinkedIn Insight Tag, Hotjar, Clarity, PostHog, Plausible, Fathom, or Vercel Analytics package was installed.

What changed:
- Added `app/components/AnalyticsScripts.tsx`.
- Added `app/components/AnalyticsEvents.tsx`.
- Added `app/lib/analytics.ts`.
- Updated `app/layout.tsx` so analytics scripts and event tracking are included in the App Router shell.
- Updated `next.config.ts` so the Content Security Policy only allows Google Analytics/GTM sources when analytics env vars are configured.
- Updated `.env.example` with placeholder public analytics IDs.

How it works:
- Analytics only loads on Vercel production deployments, where `VERCEL_ENV` is `production`.
- Local development and Vercel preview deployments do not load analytics scripts.
- If `NEXT_PUBLIC_GTM_ID` is set, the site loads Google Tag Manager.
- If `NEXT_PUBLIC_GTM_ID` is not set but `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set, the site loads Google Analytics 4 directly.
- If both are set, the site loads GTM only to avoid duplicate GA pageviews.
- No invasive tracking pixels were added.

Events now tracked:
- `contact_form_submission` after a successful contact form submission.
- `quote_cta_click` when someone clicks an internal link to `/estimate`.
- `view_reel_click` when someone opens a reel video from the homepage hero.
- `case_study_click` when someone clicks an internal case study link.
- `video_lightbox_open` whenever the shared video lightbox opens.

Files involved:
- `app/components/AnalyticsScripts.tsx`
- `app/components/AnalyticsEvents.tsx`
- `app/lib/analytics.ts`
- `app/layout.tsx`
- `app/components/ContactForm.tsx`
- `app/components/AiImageryContactForm.tsx`
- `app/components/Hero.tsx`
- `app/components/VideoLightbox.tsx`
- `next.config.ts`
- `.env.example`

Still needed in Vercel:
- Add `NEXT_PUBLIC_GTM_ID` if you want to manage GA4 and future marketing tags through Google Tag Manager.
- Or add `NEXT_PUBLIC_GA_MEASUREMENT_ID` if you only want simple direct Google Analytics 4.
- Do not add both unless GA4 is managed inside GTM and you are happy for this site to ignore the direct GA variable.

Important limitation:
- This setup covers the App Router pages and shared React lightbox/forms. Imported static HTML pages served directly from `public/` do not automatically receive the App Router analytics shell. If those pages need full event tracking later, add a small shared static analytics script to the imported HTML shell after the main launch is stable.

Testing completed:
- `npm.cmd run build` completed successfully.

## Critical before launch

### 1. The confidential Mastercard page is not actually private

What the issue is:
`/the-last-10` is included as a public static page. It has a password gate in browser JavaScript, which means the password check can be seen and bypassed by anyone who views the page source or downloaded files. It is also included in the sitemap.

Why it matters:
If this page is meant to be private, it is currently not production-safe. Search engines can discover it, and technically curious visitors can bypass the gate.

Files involved:
- `public/the-last-10/index.html`
- `app/sitemap.ts`
- `next.config.ts`

Safest recommended fix:
Move this page behind real server-side protection before launch, or remove it from the public site until it can be protected properly. At minimum, remove it from `app/sitemap.ts`, add `noindex`, and do not keep the password check in client-side HTML or JavaScript.

### 2. Mostly fixed: public forms and email endpoints needed abuse protection

What the issue is:
The contact, estimator, report download, and estimate email endpoints can trigger outgoing email, newsletter subscriptions, lead capture, or paid AI/API calls. They needed stronger server-side validation, honeypots, message limits, and basic rate limiting.

Why it matters:
Once the site is live, bots can spam the business inbox, send repeated acknowledgement emails, submit fake newsletter contacts, or run up AI/API usage.

Files involved:
- `app/api/contact/route.ts`
- `app/api/estimate/route.ts`
- `app/api/email-estimate/route.ts`
- `app/api/report-download/route.ts`
- `app/components/ContactForm.tsx`
- `app/components/AiImageryContactForm.tsx`
- `components/Estimator.tsx`
- `lib/requestSecurity.ts`

Safest recommended fix:
Completed as a minimal production-safe pass. The remaining stronger option is to replace the in-memory rate limiter with a durable service such as Upstash/Vercel KV, and optionally add Turnstile if spam becomes a problem.

### 3. Preview and staging builds can be indexed by Google

What the issue is:
There is no robots file and no preview-domain `noindex` rule. Vercel preview URLs can therefore be crawled if discovered.

Why it matters:
Google can index unfinished previews, duplicate content, test pages, or old copy before the production site is ready.

Files involved:
- Missing `app/robots.ts`
- Missing `middleware.ts` or `proxy.ts`
- `app/sitemap.ts`

Safest recommended fix:
Add `app/robots.ts` for production crawling rules. Add middleware/proxy logic or headers so any non-production hostname, especially Vercel preview URLs, sends `X-Robots-Tag: noindex, nofollow`. Keep production `www.blackirisfilms.com` indexable.

### 4. Fixed: the environment variable example was out of date

What the issue is:
`.env.example` referenced old Resend variables, but the current code uses SMTP and Beehiiv variables. It was missing several values needed for production email and newsletter behaviour.

Why it matters:
This makes deployments easier to misconfigure. A future production build could appear healthy but silently fail to send contact emails, acknowledgement emails, or newsletter subscriptions.

Files involved:
- `.env.example`
- `lib/email.ts`
- `lib/beehiiv.ts`
- `app/api/contact/route.ts`
- `app/api/report-download/route.ts`
- `app/api/email-estimate/route.ts`

Safest recommended fix:
Completed in the secrets audit. `.env.example` now lists the variables the code currently reads, with placeholder values only.

### 5. Some visible text has character encoding corruption

What the issue is:
Some text contains corrupted characters from a bad UTF-8 conversion. This appears in the global metadata title template, the navigation, and the privacy policy.

Why it matters:
It looks unprofessional in the live site and can also affect SEO titles, browser tabs, and social previews.

Files involved:
- `app/layout.tsx`
- `app/components/Nav.tsx`
- `app/privacy-policy/page.tsx`
- `README.md`

Safest recommended fix:
Replace the corrupted characters with normal UTF-8 text or plain ASCII. After that, run a search for common corruption strings such as `Â`, `â`, and `ï` before launch.

## Important soon after launch

### 1. SEO and social sharing metadata is only partly complete

What the issue is:
The site has good global metadata in `app/layout.tsx`, and several App Router pages have page titles and descriptions. However, many pages do not have page-specific Open Graph and Twitter metadata. The imported static service pages have titles, descriptions, and canonicals, but most do not have strong social images.

Why it matters:
Pages may look generic or wrong when shared on LinkedIn, Facebook, Slack, or messages. Search engines also get less page-specific context.

Files involved:
- `app/layout.tsx`
- `app/page.tsx`
- `app/contact/page.tsx`
- `app/estimate/page.tsx`
- `app/portfolio/page.tsx`
- `app/why-black-iris-films/page.tsx`
- `app/partner-with-us/page.tsx`
- `app/privacy-policy/page.tsx`
- `app/ai-imagery/page.tsx`
- `public/legacy/services/*.html`
- `public/photography/index.html`
- `public/the-last-10/index.html`
- `public/ai-powered-content-studio-v2/index.html`

Safest recommended fix:
Add page-specific Open Graph and Twitter metadata for the main commercial pages. Add absolute social images for imported static pages. Fix the global title template corruption in `app/layout.tsx` as part of the same pass.

### 2. Fixed: production security headers were incomplete

What the issue is:
The site previously only set `X-Frame-Options: DENY` and `X-Content-Type-Options: nosniff`. It did not set stronger production headers such as Content Security Policy, HSTS, Referrer Policy, or Permissions Policy.

Why it matters:
Security headers reduce common browser-level risks and help protect the site if a third-party script, iframe, or injected asset behaves unexpectedly.

Files involved:
- `next.config.ts`

Safest recommended fix:
Completed as a practical launch-safe pass in `next.config.ts`. Keep the CSP under review when adding analytics, marketing tools, or new third-party embeds.

### 3. Partly fixed: the site ships a lot of heavy media

What the issue is:
The public assets folder is large, and one background video is over 50 MB. Several images are multiple megabytes. The homepage hero also builds a heavy animated video mosaic and fetches Vimeo data from the browser.

Why it matters:
Large media can make the site feel slow, especially on mobile or slower internet. It can also hurt Core Web Vitals and ad/SEO performance.

Files involved:
- `public/assets/dacxi-first-deal-bg.mp4`
- `public/assets/*`
- `public/media-kit-assets/*`
- `public/the-social-media-theory-of-everything/*`
- `app/components/Hero.tsx`
- `app/components/PortfolioIntro.tsx`
- `app/components/ServicesGrid.tsx`
- `app/components/BlogCard.tsx`
- `app/components/BlogPostLayout.tsx`

Safest recommended fix:
Partly completed as a minimal pass. Several key images now use `next/image`, the homepage hero does less mobile/reduced-motion work, and the hidden sticky quiz image is delayed until needed. Still compress or replace the 53 MB background video, review the remaining large static PNGs, and use production Core Web Vitals to decide the next round of optimisation.

### 4. Fonts can be made lighter and more consistent

What the issue is:
The main app uses local OTF font files, while some imported static pages load Google Fonts separately. OTF files are usually heavier than WOFF2 for web use.

Why it matters:
Fonts affect first load speed and visual consistency. Multiple font systems can make the site slower and less consistent.

Files involved:
- `app/layout.tsx`
- `app/fonts/*`
- `public/legacy/services/*.html`
- `public/photography/index.html`
- `public/ai-powered-content-studio-v2/index.html`
- `public/the-last-10/index.html`

Safest recommended fix:
Convert the main local fonts to WOFF2. Over time, update imported static pages so they use the same font approach as the Next.js app.

### 5. The Google reviews API is open to any website

What the issue is:
`/api/google-reviews` sends `Access-Control-Allow-Origin: *`. This means any other website can call the endpoint from a browser.

Why it matters:
It does not expose private credentials, but it can let other sites use your endpoint and burn API/cache resources.

Files involved:
- `app/api/google-reviews/route.ts`

Safest recommended fix:
If the reviews widget is only used on this site, remove the wide-open CORS header or restrict it to the production domain.

### 6. Sitemap dates are not stable

What the issue is:
The sitemap uses `new Date()` for many pages, so every build says those pages were modified today.

Why it matters:
Search engines use sitemap dates as hints. Constantly changing dates can make the sitemap less trustworthy.

Files involved:
- `app/sitemap.ts`

Safest recommended fix:
Use real content update dates where available. For static pages, use a fixed date and update it only when the page meaningfully changes.

### 7. Mostly fixed: redirect coverage should still be checked against Wix and Search Console

What the issue is:
The approved redirect set from `REDIRECT_PLAN.md` has been implemented, including known Wix paths, likely old home/about/contact/blog paths, old blog-pattern aliases, and alternate-domain canonical redirects. But there has not yet been a full check against every indexed Wix URL from Search Console or Wix analytics.

Why it matters:
Missing redirects can cause 404s, lose SEO value, and break old links from emails, social posts, or Google.

Files involved:
- `next.config.ts`

Safest recommended fix:
Next step is to export or list old Wix URLs from Wix, Google Search Console, and analytics. Add exact redirects for any old URL that currently receives traffic or has backlinks and is not already covered.

### 8. Some public support files can be crawled directly

What the issue is:
The `public/` folder includes static snippets and helper HTML files that are not meant to be standalone pages.

Why it matters:
Search engines or users can access these files directly. They may look broken or unfinished if indexed.

Files involved:
- `public/legacy/services/service-header-footer-snippets.html`
- `public/legacy/services/service-pricing-callout-snippet.html`
- `public/legacy/services/service-social-proof-snippet.html`
- `public/thank-you.html`

Safest recommended fix:
Move non-page snippets out of `public/`, or add noindex handling for these paths.

### 9. The privacy policy needs a production review

What the issue is:
The privacy policy has visible encoding corruption and may not fully describe the current production stack, including Beehiiv, SMTP email, MailerLite if still used, Wix if still used, Anthropic estimator processing, Google reviews, and analytics/marketing tools.

Why it matters:
Privacy copy should match what the live site actually collects and where submissions are sent.

Files involved:
- `app/privacy-policy/page.tsx`
- `app/api/contact/route.ts`
- `app/api/estimate/route.ts`
- `app/api/report-download/route.ts`
- `lib/beehiiv.ts`
- `lib/email.ts`
- `lib/mailerlite.ts`
- `lib/wix.ts`

Safest recommended fix:
Clean the corrupted characters first, then review the policy in plain English against the actual integrations used in production. Get legal review if needed.

## Nice to have later

### 1. Improve keyboard accessibility in interactive video areas

What the issue is:
Some video and lightbox interactions are mouse-first. The homepage hero video tiles are clickable visual elements, and the lightbox does not appear to have a full focus trap/focus return flow. Some expandable testimonial cards are focusable but should be checked for Enter/Space keyboard support.

Why it matters:
Keyboard users and screen reader users may not be able to use parts of the portfolio experience properly.

Files involved:
- `app/components/Hero.tsx`
- `app/components/VideoLightbox.tsx`
- `app/components/InTheirWords.tsx`
- `app/components/Nav.tsx`

Safest recommended fix:
Use real buttons or links for interactive items, add clear labels, support Enter and Space, trap focus inside modals, and return focus when a modal closes.

### 2. Make motion reduction consistent

What the issue is:
Some animated components respect reduced-motion preferences, but the whole site has not been checked consistently.

Why it matters:
Large animations can be uncomfortable for some users and can also feel heavy on slower devices.

Files involved:
- `app/components/Hero.tsx`
- `app/components/PortfolioIntro.tsx`
- `app/components/ClientsStrip.tsx`
- `app/components/Testimonials.tsx`
- `app/components/ProcessSteps.tsx`
- `app/components/ServiceCarousel.tsx`

Safest recommended fix:
Audit all animation-heavy components and make sure they respect `prefers-reduced-motion`.

### 3. Convert more images to the Next.js image pipeline

What the issue is:
Many components use normal `<img>` tags rather than Next.js image optimization.

Why it matters:
Next.js image handling can improve resizing, lazy loading, and format delivery when used carefully.

Files involved:
- `app/components/Hero.tsx`
- `app/components/PortfolioIntro.tsx`
- `app/components/ServicesGrid.tsx`
- `app/components/BlogCard.tsx`
- `app/components/BlogPostLayout.tsx`
- `next.config.ts`

Safest recommended fix:
Convert high-impact images first, especially above-the-fold and repeated card images. Add any required remote image host patterns to `next.config.ts`.

### 4. Add automated quality checks

What the issue is:
The project builds cleanly, but there is no obvious production audit script for linting, accessibility, or Lighthouse-style checks.

Why it matters:
Automated checks catch regressions before production, especially when multiple agents or contributors are editing the repo.

Files involved:
- `package.json`
- Missing lint/accessibility/performance scripts

Safest recommended fix:
Add a simple pre-launch checklist script, such as build plus lint plus a small Playwright smoke test. Later, add Lighthouse or axe checks for key pages.

### 5. Add richer structured data

What the issue is:
Some pages have metadata, but the main commercial pages could use more structured data for the business, services, portfolio, and articles.

Why it matters:
Structured data can help search engines understand the business and pages more clearly. It is not a magic SEO fix, but it is useful polish.

Files involved:
- `app/layout.tsx`
- `app/page.tsx`
- `app/portfolio/page.tsx`
- `app/contact/page.tsx`
- `app/post/[slug]/page.tsx`
- `public/legacy/services/*.html`

Safest recommended fix:
Add LocalBusiness/Organization schema globally, Article schema for posts, and Service schema for key service pages where appropriate.

### 6. Gradually replace imported static HTML pages with Next.js pages

What the issue is:
Several important pages are currently served as imported static HTML through rewrites.

Why it matters:
Static HTML works, but it makes shared metadata, headers, styling, accessibility, analytics, and future edits harder to manage.

Files involved:
- `next.config.ts`
- `public/legacy/services/*.html`
- `public/photography/index.html`
- `public/ai-powered-content-studio-v2/index.html`
- `public/the-last-10/index.html`

Safest recommended fix:
Leave them in place for launch if they are visually working, then migrate the highest-value pages into App Router pages over time.
