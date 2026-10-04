# DS Lub demo website

Responsive Next.js storefront and operations workspace with dummy products and persistent local records.

## Run

Requires Node.js 20.9 or later.

```powershell
npm install
npm run dev
```

Open http://127.0.0.1:3000. Production compilation: `npm run build`; local production preview: `npm start`. Checks: `npm test` and `npm run typecheck`.

## What works

Public home/about/catalogue/product/services/contact/resources pages; category/search/stock filters; product comparison; cart saved in localStorage; server-priced simulated checkout; customer orders/receipts, quotes and service history; saved enquiries; staff role permissions; add/edit/archive catalogue; stock edits with audit reasons; order/ticket/quote status; quotation amount; demo employee records; disconnected automation drafts and activity log.

18 initial products, 6 categories. All product images reuse the concept image already generated; no further product imagery is generated. Specifications, prices, tax and service descriptions are illustrative.

## Demo boundaries

Sign-in intentionally lets visitors choose a demo role. This is not production authentication or a security credential. Cookies are HTTP-only and server actions check role/ownership, but any local visitor can select the proprietor demo role. Do not expose this server to the public. Google login, password signup/reset, payment gateway, email notifications, private uploads, shipping rates, tax invoices and Tally/agent integrations are not connected. Receipt downloads are labelled demo receipts, not tax invoices.

Data lives in `.data/demo.json`, ignored by Git. Writes are queued and replaced atomically within one Node process. This adapter is for a local prototype only; it is not a scalable production database and must not run across multiple instances. SQL foundation in `supabase/migrations` is an unexecuted handover starting point, not a verified live backend. The production implementation must add transactional stock reservations, payment idempotency/reconciliation, real user provisioning, uploads, staff invitations/revocation and policy tests.

Set `DS_LUB_DEMO=false` to block demo mutation endpoints; this does not configure production integrations. Every route has noindex headers/metadata. Noindex is not access control. Keep previews local or behind authentication.

## Structure

`src/features/catalogue`: typed product and seed data. `src/features/commerce`: transaction validation and permissions. `src/server`: demo persistence. `src/app/api`: server actions/state boundaries. `src/features/public`, `account`, `requests`, `dashboard`: page views by feature. `src/components`: shared shell, state context and controls. `src/app/globals.css`: responsive design tokens/styles. `docs`: proposal, build plan, checklist, automation architecture and verification. `public/images/demo`: original generated asset plus optimized WebP derivatives. `tests`: transaction and permission checks.

The UI shell assembles page components from feature folders. Route metadata and catalogue data should come from the production repository adapter when that stage starts.

Owner confirmed DS Lub, Vadodara, phone/WhatsApp +91 9173235606. Email/full address remain unpublished placeholders. See Company-Data-Checklist.md for original content handover.

