# Website analytics

The production site uses Black Iris Films GA4 property `386190650`, web stream
`5485874443`, measurement ID `G-TNKCFGXD6C`. The property uses Australia/Sydney
time and AUD. Set `NEXT_PUBLIC_GA_MEASUREMENT_ID` in the production Vercel
environment; leave `NEXT_PUBLIC_GTM_ID` unset for this direct GA4 setup.

## Conversion definitions

| Business action | GA4 key event | Counting |
| --- | --- | --- |
| Completed quote quiz with an accepted result | `quiz_complete` | Once per event |
| Successfully delivered contact enquiry, including AI imagery and The Last $10 | `generate_lead` | Once per event |
| Click on an email contact link | `email_click` | Once per session |
| Click on a telephone contact link | `phone_click` | Once per session |

Email and phone events measure intent, not a sent email or connected call.
No monetary conversion value is assigned. Historical `Get_Quote` and `purchase`
settings are preserved; this implementation does not emit those events.

Quiz server fallbacks count when the API accepts the submission and returns an
estimate. Failed requests and honeypot responses do not count. Contact events
require explicit server acceptance after mail delivery. Newsletter checkbox
intent is never reported as a confirmed subscription.

Supporting events include `form_start`, `form_error`, `estimate_start`,
`estimate_complete`, `estimate_email_sent`, `report_request`, `quote_cta_click`,
`case_study_click`, `booking_outbound_click`, `file_download`, and video actions.
These are not configured as new key events.

## Shared implementation

`/analytics.js` serves the production-gated runtime to the React shell and 25
standalone HTML pages. Development and preview environments do not load Google
tracking. React and static forms use `window.bifAnalytics.trackEvent`; early
events wait in `window.bifAnalyticsQueue`.

The runtime sends manual page views for initial loads, client navigation and
browser back, and updates the page context for later events. Keep GA4 Enhanced
Measurement automatic page views/history changes and other overlapping
automatic events disabled to prevent duplicate events. GTM, if configured in
future, takes precedence and requires its own reviewed tags/triggers.

Names, email addresses, phone numbers, messages and quiz answers are not sent
as analytics parameters. URLs and referrers are sanitized; only screened UTM
campaign parameters are retained. Advertising personalization and Google
signals are disabled. Browser Do Not Track and Global Privacy Control suppress
the Google script. Ad blockers and visitor privacy choices can reduce counts.

The report form uses a short-lived HTTP-only receipt for normal refresh
deduplication. It is supporting telemetry, not an exactly-once transaction
ledger. Its email provider setup is independent of the conversion goals above.

## Verification

Run:

```text
node --test scripts/test-analytics-runtime.mjs
node scripts/test-conversion-events.mjs
npm run build
```

The test suites execute the runtime, actual transpiled React components and
estimate API with mocked external dependencies. They cover acceptance/rejection,
honeypots, server fallback, privacy filtering, queues, click classification and
SPA attribution. They do not send enquiry emails or prove provider delivery.

After a production deploy, verify `/analytics.js` contains the intended public
ID, the CSP permits the Google tag and collection endpoints, and GA4 Realtime
receives browser events. Check key-event settings separately from event receipt.
Standard GA4 reports can lag behind Realtime.
