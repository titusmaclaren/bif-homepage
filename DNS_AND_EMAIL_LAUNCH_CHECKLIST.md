# DNS and Email Launch Checklist

Domain: `blackirisfilms.com`

Current setup:
- Domain bought through GoDaddy.
- DNS has been managed through Wix.
- Email is Google Workspace.
- New website is a Next.js site, likely deployed through Vercel.

This checklist is written for launch day. The main rule is simple:

Only change the web records needed for the website. Do not touch email records unless you know exactly why.

## 1. Before Changing Anything

- Take screenshots of the current DNS records in Wix.
- Export or copy the current DNS records into a safe place.
- Confirm where DNS is actually managed right now. If the nameservers still point to Wix, make the DNS changes in Wix, not GoDaddy.
- Confirm the Vercel project has the production site deployed and working on its Vercel preview/production URL.
- Confirm both `blackirisfilms.com` and `www.blackirisfilms.com` have been added to the Vercel project.
- Decide which domain is the main one:
  - Recommended: `https://blackirisfilms.com`
  - Redirect: `https://www.blackirisfilms.com` to `https://blackirisfilms.com`
- Lower the TTL for the website records ahead of launch if Wix allows it. A short TTL such as 60 seconds makes the cutover easier.

## 2. Website DNS Records Needed for Vercel

In Wix DNS, change only the records that control the website.

Typical Vercel setup:

| Host/name | Type | Value | Purpose |
| --- | --- | --- | --- |
| `@` | `A` | `76.76.21.21` | Sends `blackirisfilms.com` to Vercel. |
| `www` | `CNAME` | Use the exact value shown in Vercel | Sends `www.blackirisfilms.com` to Vercel. |

Important:
- Vercel sometimes gives a project-specific CNAME value. Use the exact value Vercel shows in the domain setup screen.
- Remove or replace old Wix website records for `@` and `www` if they conflict.
- Do not remove email records.
- Do not change nameservers during this launch unless there is a very deliberate reason.

## 3. Google Workspace MX Records: Do Not Remove

MX records control incoming email. These are separate from website records.

For Google Workspace, the current Google-recommended MX setup is:

| Host/name | Type | Priority | Value |
| --- | --- | --- | --- |
| `@` | `MX` | `1` | `smtp.google.com` |

You may also see the older Google Workspace MX records, such as:

| Priority | Value |
| --- | --- |
| `1` | `ASPMX.L.GOOGLE.COM` |
| `5` | `ALT1.ASPMX.L.GOOGLE.COM` |
| `5` | `ALT2.ASPMX.L.GOOGLE.COM` |
| `10` | `ALT3.ASPMX.L.GOOGLE.COM` |
| `10` | `ALT4.ASPMX.L.GOOGLE.COM` |

Do not delete working Google Workspace MX records during the website launch. If email is currently working, leave MX records alone unless you are intentionally updating Google Workspace email settings.

## 4. SPF Record Check

SPF is a TXT record that helps prove which services are allowed to send email for `blackirisfilms.com`.

Check for a TXT record on `@` that starts with:

```txt
v=spf1
```

If Google Workspace is the only service sending email for the domain, the basic Google SPF record is:

```txt
v=spf1 include:_spf.google.com ~all
```

If other services send email as `blackirisfilms.com`, such as MailerLite, beehiiv, Wix, an SMTP provider, or another marketing tool, the SPF record may need extra `include:` parts.

Important:
- There should only be one SPF TXT record for the main domain.
- Do not create a second SPF record.
- If the current SPF record already includes Google and other real senders, do not replace it blindly.
- If unsure, leave SPF alone and document what is there.

## 5. DKIM Record Check

DKIM is another email authentication record. It helps prove outgoing email really came from the domain.

For Google Workspace, DKIM is usually a TXT record with a name like:

```txt
google._domainkey
```

The value usually starts with:

```txt
v=DKIM1
```

Checklist:
- In Google Admin, check Gmail authentication/DKIM for `blackirisfilms.com`.
- Confirm DKIM is turned on.
- Confirm the matching DKIM TXT record still exists in Wix DNS.
- Do not delete any TXT record that looks like `google._domainkey`.

## 6. DMARC Record Check

DMARC tells receiving mail servers what to do if a message fails SPF/DKIM checks.

Look for a TXT record named:

```txt
_dmarc
```

It should start with:

```txt
v=DMARC1
```

A gentle starting DMARC record often looks like this:

```txt
v=DMARC1; p=none; rua=mailto:dmarc@blackirisfilms.com
```

Important:
- Do not jump straight to `p=reject` unless email authentication has been checked properly.
- DMARC should be added only after SPF and/or DKIM are working.
- If a DMARC record already exists, do not replace it casually.

## 7. Google Search Console Verification

Search Console verification is usually a TXT record.

It often looks like:

```txt
google-site-verification=...
```

Checklist:
- Do not delete existing Google verification TXT records.
- After launch, open Google Search Console and check that `blackirisfilms.com` is still verified.
- Submit or inspect the sitemap:

```txt
https://blackirisfilms.com/sitemap.xml
```

- Use URL inspection for:
  - `https://blackirisfilms.com`
  - `https://www.blackirisfilms.com`
  - A service page
  - A blog post
  - The contact page

## 8. Domain Redirect Choice: WWW vs Non-WWW

Recommended choice:

```txt
Main domain: https://blackirisfilms.com
Redirect: https://www.blackirisfilms.com -> https://blackirisfilms.com
```

Why:
- It is shorter and cleaner.
- The current site metadata has been set up around `https://blackirisfilms.com`.
- The Next.js redirect setup already expects the apex/non-www domain to be canonical.

Launch check:
- `https://blackirisfilms.com` should load the site.
- `https://www.blackirisfilms.com` should redirect to `https://blackirisfilms.com`.
- `http://blackirisfilms.com` should redirect to HTTPS.
- `http://www.blackirisfilms.com` should redirect to HTTPS and then the main domain.

## 9. How to Check the Site Works After DNS Changes

Wait a few minutes, then check:

- Open `https://blackirisfilms.com`.
- Open `https://www.blackirisfilms.com`.
- Confirm the browser shows a secure lock/HTTPS.
- Confirm the homepage loads.
- Confirm the logo, images, videos and fonts load.
- Open the portfolio page.
- Open a video lightbox.
- Open a service page.
- Open the contact page.
- Submit a safe test contact form.
- Submit a safe test estimator enquiry.
- Check the 404 page by visiting a made-up URL.
- Check the sitemap:

```txt
https://blackirisfilms.com/sitemap.xml
```

- Check the robots file:

```txt
https://blackirisfilms.com/robots.txt
```

DNS can take time to settle. Vercel says DNS changes can commonly take 24-48 hours to fully propagate.

## 10. How to Check Email Still Works After DNS Changes

Do this after the website DNS change:

- Send an email from a personal Gmail account to `info@blackirisfilms.com`.
- Send an email from a non-Google account if possible, such as Outlook/iCloud.
- Reply from `info@blackirisfilms.com` back to the sender.
- Check that the reply lands in the inbox, not spam.
- Send an email from the website contact form.
- Confirm the internal notification email arrives.
- Confirm the user acknowledgement email arrives.
- Check Google Admin or Gmail headers later if anything looks suspicious.

If email stops working:

- Do not keep changing random DNS records.
- Check MX first.
- Check SPF/DKIM/DMARC second.
- Check whether nameservers changed by accident.
- Use Google Admin Toolbox Dig to inspect live DNS records.

## 11. What Not to Touch

Do not touch these unless you know exactly why:

- Nameservers.
- Google Workspace MX records.
- SPF TXT record.
- DKIM TXT records, especially `google._domainkey`.
- DMARC TXT record at `_dmarc`.
- Google Search Console verification TXT records.
- Google Workspace verification TXT records.
- MailerLite or beehiiv verification records.
- Any TXT record that starts with `google-site-verification=`.
- Any TXT record that starts with `v=spf1`.
- Any TXT record that starts with `v=DKIM1`.
- Any TXT record that starts with `v=DMARC1`.
- Any CNAME/TXT record used for email provider verification.
- Any records for subdomains you are not actively moving.

## 12. Safe Launch Order

1. Confirm the Vercel production deployment works.
2. Add `blackirisfilms.com` and `www.blackirisfilms.com` to the Vercel project.
3. Screenshot/export current Wix DNS.
4. Confirm Google Workspace email currently works.
5. Change only the website records in Wix DNS:
   - `@` website record to Vercel.
   - `www` website record to Vercel.
6. Leave MX, SPF, DKIM, DMARC and verification TXT records alone.
7. Wait for DNS to update.
8. Test the website.
9. Test email sending and receiving.
10. Check Search Console verification and sitemap.
11. Keep Wix available briefly as a rollback option.

## 13. Useful Official References

- Vercel DNS/domain guidance: https://vercel.com/docs/domains/working-with-dns
- Google Workspace MX records: https://support.google.com/a/answer/174125
- Google Workspace SPF setup: https://support.google.com/a/answer/33786
- Google Workspace DKIM setup: https://support.google.com/a/answer/174124
- Google Workspace DMARC setup: https://knowledge.workspace.google.com/admin/security/set-up-dmarc
