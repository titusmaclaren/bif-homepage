# Final Manual Launch Checklist

Do these before changing DNS.

## 1. Confirm Vercel environment variables

- Email/SMTP variables are set in Production.
- `CONTACT_FORM_TO` is set correctly.
- Beehiiv variables are set if newsletter signup is enabled.
- Google reviews/API variables are set if Google reviews are enabled.
- Analytics IDs are set only if you want analytics live.

## 2. Test production forms and email

- Submit the contact form on the production Vercel URL.
- Confirm Black Iris receives the enquiry email.
- Confirm the user receives the thank-you email.
- Submit the estimator form.
- Confirm Black Iris receives the estimator email.
- Confirm the prospect receives the estimate email if that feature is enabled.

## 3. Test newsletter signup

- Tick the newsletter checkbox on a real form submission.
- Confirm the test email appears in Beehiiv.

## 4. Test Google reviews

- Open the production Vercel URL.
- Confirm Google reviews load.
- If they do not load, launch with the widget hidden or clearly accept that risk.

## 5. Set up Vercel domains

- Add `blackirisfilms.com` to the Vercel project.
- Add `www.blackirisfilms.com` to the Vercel project.
- Wait for Vercel to show the exact DNS records it wants.

## 6. DNS records safe to change

- Change only the website `A` record for `blackirisfilms.com`.
- Change only the website `CNAME` record for `www.blackirisfilms.com`.
- Use the exact values shown in Vercel.

## 7. DNS records not to touch

- Do not touch Google Workspace `MX` records.
- Do not touch `SPF` TXT records.
- Do not touch `DKIM` TXT records.
- Do not touch `DMARC` TXT records.
- Do not touch Google verification TXT records.
- Do not touch Beehiiv, MailerLite, or other email/marketing TXT records.

## 8. Final browser checks

- Check the homepage on desktop.
- Check the homepage on mobile.
- Check the mobile menu.
- Check `/contact`.
- Check `/estimate`.
- Check `/portfolio`.
- Check `/photography`.
- Check `/the-last-10`.
- Check videos and lightboxes.
- Check there are no obvious broken images.

## 9. Google Search Console

- Verify `blackirisfilms.com`.
- Submit `https://blackirisfilms.com/sitemap.xml`.
- Confirm Google can fetch the sitemap.
