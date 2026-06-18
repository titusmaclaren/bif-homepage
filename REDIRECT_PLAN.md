# Redirect Plan: Wix to Next.js

This plan is for moving the old Wix site to the new Next.js site at:

`https://blackirisfilms.com`

No new redirects have been implemented yet. This file is the planning step only.

## What This Project Uses

This site uses the Next.js App Router. Most redirects should be implemented in `next.config.ts` using the `async redirects()` function.

The project also uses rewrites in `next.config.ts` to serve imported static HTML pages, such as legacy services pages, stories pages, case studies, photography, and the AI powered content studio page. A rewrite keeps the visitor on the same URL while serving an internal HTML file. A redirect sends the visitor and Google to a different URL.

## Current New Site URLs

These are the public page URLs currently available or intentionally served by the new site.

### Main Next.js Pages

| New URL | Notes |
| --- | --- |
| `https://blackirisfilms.com/` | Homepage |
| `https://blackirisfilms.com/contact` | Contact page |
| `https://blackirisfilms.com/estimate` | Estimator |
| `https://blackirisfilms.com/learn` | Blog/learning index |
| `https://blackirisfilms.com/partner-with-us` | Partner page |
| `https://blackirisfilms.com/portfolio` | Portfolio page |
| `https://blackirisfilms.com/privacy-policy` | Privacy policy |
| `https://blackirisfilms.com/why-black-iris-films` | Why Black Iris Films page |

### Imported Static Pages Served Through Next.js

| New URL | Notes |
| --- | --- |
| `https://blackirisfilms.com/services` | Services landing page |
| `https://blackirisfilms.com/services/thank-you` | Services form thank-you page |
| `https://blackirisfilms.com/animated-video-production-sydney` | Service page |
| `https://blackirisfilms.com/brand-film-production-sydney` | Service page |
| `https://blackirisfilms.com/corporate-video-production-sydney` | Service page |
| `https://blackirisfilms.com/explainer-video-production-sydney` | Service page |
| `https://blackirisfilms.com/financial-video-production-sydney` | Service page |
| `https://blackirisfilms.com/higher-education-video-production-sydney` | Service page |
| `https://blackirisfilms.com/linkedin-video-production-sydney` | Service page |
| `https://blackirisfilms.com/startup-video-production-sydney` | Service page |
| `https://blackirisfilms.com/tech-video-production-sydney` | Service page |
| `https://blackirisfilms.com/stories` | Stories landing page |
| `https://blackirisfilms.com/the-social-media-theory-of-everything` | Report landing page |
| `https://blackirisfilms.com/report-thank-you` | Report download thank-you page |
| `https://blackirisfilms.com/case-studies` | Case studies index |
| `https://blackirisfilms.com/case-studies/amplitel` | Case study |
| `https://blackirisfilms.com/case-studies/dacxi-chain` | Case study |
| `https://blackirisfilms.com/case-studies/mary-technology` | Case study |
| `https://blackirisfilms.com/ai-powered-content-studio-v2` | AI powered content studio |
| `https://blackirisfilms.com/the-last-10` | Mastercard spec ad page |
| `https://blackirisfilms.com/the-last-10/contact` | Mastercard spec ad contact page |
| `https://blackirisfilms.com/the-social-media-theory-of-everything/media-kit` | Media kit |
| `https://blackirisfilms.com/the-social-media-theory-of-everything/9389162002` | Private/supporting report page |
| `https://blackirisfilms.com/photography` | Photography page |

### Blog Post Pages

| New URL |
| --- |
| `https://blackirisfilms.com/post/10-benefits-of-corporate-charity-partnerships` |
| `https://blackirisfilms.com/post/10-benefits-of-philanthropy-videos-to-business` |
| `https://blackirisfilms.com/post/10-ideas-for-social-media-videos` |
| `https://blackirisfilms.com/post/10-important-interview-questions-for-client-testimonials` |
| `https://blackirisfilms.com/post/10-ways-to-make-the-world-a-better-place-with-video-marketing` |
| `https://blackirisfilms.com/post/3-smart-strategies-to-make-your-marketing-videos-more-purposeful` |
| `https://blackirisfilms.com/post/5-different-types-of-explainer-videos` |
| `https://blackirisfilms.com/post/5-ways-to-get-comfortable-on-camera-without-hiring-a-coach` |
| `https://blackirisfilms.com/post/adding-authenticity-to-your-video-marketing` |
| `https://blackirisfilms.com/post/an-agency-guide-to-video-marketing-metrics` |
| `https://blackirisfilms.com/post/b2b-video-marketing-engaging-the-millennial-decision-makers` |
| `https://blackirisfilms.com/post/can-t-get-a-camera-crew-to-your-staff-in-time-for-a-shoot-here-s-3-solutions` |
| `https://blackirisfilms.com/post/capture-engage-convert-a-video-marketing-agency-s-blueprint-for-b2b-success` |
| `https://blackirisfilms.com/post/choosing-the-right-aspect-ratio-for-social-media-videos` |
| `https://blackirisfilms.com/post/client-testimonial-videos-when-where-how` |
| `https://blackirisfilms.com/post/diy-video-for-business-train-yourself-with-your-smartphone` |
| `https://blackirisfilms.com/post/emotional-video-marketing-sydney` |
| `https://blackirisfilms.com/post/employee-turnover-ruining-videos-here-s-1-smart-way-to-fix-it` |
| `https://blackirisfilms.com/post/how-8k-in-video-marketing-earned-a-brand-up-to-34m-roi` |
| `https://blackirisfilms.com/post/how-a-video-marketing-agency-unlocks-the-power-of-wit-and-originality-in-b2b-marketing` |
| `https://blackirisfilms.com/post/how-not-to-look-like-an-a-hole-in-your-marketing-videos` |
| `https://blackirisfilms.com/post/how-to-create-a-landing-page-video-that-drives-sales` |
| `https://blackirisfilms.com/post/how-to-get-the-feels-into-your-videos` |
| `https://blackirisfilms.com/post/how-to-hook-your-viewers-in-the-first-3-seconds` |
| `https://blackirisfilms.com/post/how-to-make-an-impact-with-your-marketing-videos` |
| `https://blackirisfilms.com/post/how-to-make-your-video-headline-and-thumbnail-work-together-in-b2b-marketing` |
| `https://blackirisfilms.com/post/how-to-structure-a-video-for-your-business` |
| `https://blackirisfilms.com/post/how-to-use-facebook-instant-experience-videos-as-a-funnel` |
| `https://blackirisfilms.com/post/mastering-viewer-engagement-video-marketing-agency-insights` |
| `https://blackirisfilms.com/post/maximizing-business-impact-the-strategic-edge-of-video-marketing` |
| `https://blackirisfilms.com/post/sell-the-lifestyle-not-the-product` |
| `https://blackirisfilms.com/post/social-media-video-production-a-comprehensive-guide-to-captivate-and-convert-prospects` |
| `https://blackirisfilms.com/post/starting-with-audience-needs-value-exchange-and-buyer-s-journey` |
| `https://blackirisfilms.com/post/striking-the-perfect-duration-in-your-b2b-video-marketing-strategy` |
| `https://blackirisfilms.com/post/the-art-of-visual-storytelling` |
| `https://blackirisfilms.com/post/the-power-of-the-1-minute-video` |
| `https://blackirisfilms.com/post/unlock-the-potential-of-tiktok-a-comprehensive-guide-from-a-top-video-marketing-agency` |
| `https://blackirisfilms.com/post/unveiling-the-secrets-of-targeted-video-marketing` |
| `https://blackirisfilms.com/post/video-marketing-desktop-vs-mobile-a-comparative-insight` |
| `https://blackirisfilms.com/post/why-emotionally-connected-customers-spend-2-more` |
| `https://blackirisfilms.com/post/why-use-video` |
| `https://blackirisfilms.com/post/why-you-should-be-using-text-in-your-marketing-videos` |
| `https://blackirisfilms.com/post/why-you-should-create-a-hook-snippet-of-your-marketing-videos` |
| `https://blackirisfilms.com/post/why-you-should-embrace-vertical-aspect-ratios-for-videos` |

### Support URLs

These are not normal marketing pages, but they should keep working.

| URL | Notes |
| --- | --- |
| `https://blackirisfilms.com/sitemap.xml` | Search engine sitemap |
| `https://blackirisfilms.com/robots.txt` | Search engine crawl rules |
| `https://blackirisfilms.com/rss.xml` | Blog RSS feed |

## Known Old Wix URL Redirects Already Planned

These redirects already exist in `next.config.ts`. They should remain as 301 permanent redirects unless you want to change the destination.

| Old Wix URL/path | New Next.js URL/path | Redirect type | Why |
| --- | --- | --- | --- |
| `/copy-of-home-2` | `/` | 301 permanent | Old duplicate homepage should consolidate to the homepage. |
| `/faq` | `/#faq` | 301 permanent | Old FAQ URL should point to the FAQ section on the homepage. |
| `/ai-imagery` | `/ai-powered-content-studio-v2` | 301 permanent | Old AI imagery page has been replaced by the AI powered content studio page. |
| `/bondi-to-coogee-walk-in-one-minute` | `/stories` | 301 permanent | Old story page does not currently have a direct matching page in the new site. |
| `/how-aie-succeeded-through-covid-19` | `/stories` | 301 permanent | Old story page does not currently have a direct matching page in the new site. |
| `/service-page/meeting-creative-brainstorm` | `/contact` | 301 permanent | Old booking page should now send people to contact. |
| `/service-page/phone-call-creative-brainstorm` | `/contact` | 301 permanent | Old booking page should now send people to contact. |

## Old Wix URLs Still Needed

I cannot safely list every old Wix URL from the codebase alone. To finish the migration properly, we need the old URLs from Wix, Google Search Console, Google Analytics, Google Ads, email campaigns, backlinks, or any important bookmarks.

Please fill in this table with any old Wix URLs that are not already covered above.

| Old Wix URL/path | Best new destination | 301 permanent? | Priority | Notes |
| --- | --- | --- | --- | --- |
| `/old-wix-path-here` | `/new-nextjs-path-here` | Yes/No | High/Medium/Low | Add where this old URL came from, such as Search Console, Wix, ad, email, or known backlink. |
| `/old-blog-path-here` | `/post/matching-new-blog-slug` | Yes | High if indexed or linked | Use the closest matching blog post if there is one. |
| `/old-service-path-here` | `/matching-service-page` | Yes | High if indexed or linked | Use the closest matching service page. |
| `/old-case-study-path-here` | `/case-studies` or `/case-studies/matching-case-study` | Yes | Medium/High | Use a direct match if available. |
| `/old-contact-path-here` | `/contact` | Yes | High | Any old contact or booking page should usually point to contact. |

## Likely Wix URLs To Check

These are not confirmed redirects. They are the kinds of URLs I would specifically look for in Wix/Search Console before launch.

| Possible old Wix path | Likely new destination | Confirm before adding |
| --- | --- | --- |
| `/home` | `/` | Yes |
| `/about` | `/why-black-iris-films` | Yes |
| `/contact-us` | `/contact` | Yes |
| `/contact-us-1` | `/contact` | Yes |
| `/blog` | `/learn` | Yes |
| `/post/...` | `/post/...` | Match each old blog URL individually. |
| `/services/...` | `/services` or a matching service page | Match each old service URL individually. |
| `/portfolio/...` | `/portfolio` | Use a direct project page only if one exists. |

## 301 Redirect Recommendations

Use 301 permanent redirects for:

- Any old Wix URL that has a clear replacement on the new site.
- Old homepage duplicates that should consolidate to `/`.
- Old contact, booking, or enquiry pages that should now go to `/contact`.
- Old service pages that map to a current service page.
- Old blog URLs that map to an equivalent current blog post.
- Old campaign URLs that are permanently replaced by a new page.
- Domain canonicalisation, such as forcing one preferred host.

Be careful with 301 redirects for:

- Thank-you pages, because those are usually only meant to appear after a form submission.
- Private, hidden, or campaign-only pages.
- Old pages with no close replacement. If they have no value, a proper `404` or `410` may be better than sending visitors to an unrelated page.
- Old assets such as PDFs, images, or video files. These should only be redirected if people or search engines are still hitting them.

## Domain Redirect Recommendations

The preferred public domain should be:

`https://blackirisfilms.com`

You also mentioned these domains should redirect to the main site:

- `https://www.blackirisfilms.com`
- `https://blackirisfilms.com.au`
- `https://www.blackirisfilms.com.au`
- `https://titusmaclaren.com`
- `https://www.titusmaclaren.com`

For domain-level redirects, the safest approach is usually Vercel domain settings plus DNS:

1. Add each domain to the same Vercel project or to a lightweight redirect project.
2. Choose one canonical domain, preferably `blackirisfilms.com`.
3. Configure the other domains to redirect permanently to the canonical domain.
4. Keep email DNS records separate and do not touch Google Workspace MX records, SPF, DKIM, DMARC, MailerLite, beehiiv, or verification TXT records unless they are clearly web-only records.

If Vercel needs host-based redirects inside the app, those can also be added in `next.config.ts`, but DNS and Vercel domain settings should be checked first.

## How Redirects Should Be Implemented

Because this is a Next.js project, normal page redirects should go in `next.config.ts`:

```ts
async redirects() {
  return [
    {
      source: "/old-wix-path",
      destination: "/new-nextjs-path",
      permanent: true,
    },
  ];
}
```

Plain English version:

- `source` is the old Wix path people or Google might visit.
- `destination` is the new page they should land on.
- `permanent: true` creates a 301 redirect, which tells Google the move is permanent.
- Exact redirects should be listed before any broader pattern redirects.
- Redirects should be tested locally and on a Vercel preview before changing DNS.

After this plan is approved, the implementation step should be:

1. Add the approved redirects to `next.config.ts`.
2. Run `npm.cmd run build`.
3. Test the most important redirects locally.
4. Deploy to Vercel preview.
5. Test the redirects on preview.
6. Merge/deploy to production.
7. Change only the web DNS records once production looks correct.
8. Re-test SSL, canonical domain redirects, forms, estimator emails, Google reviews, sitemap, robots, and Search Console.
