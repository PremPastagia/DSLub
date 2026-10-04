# DS Lub dummy website implementation plan

Approved scope: DS-Lub-Website-Proposal.md, plus the owner's request on 4 October 2026 for a company evidence checklist and future workflow automation integration points. Execute inline to minimize coordination latency. The owner explicitly approved proceeding; no additional planning approval is required.

## Deliverables and file responsibilities

1. `src/features/catalogue/seed.ts`, `src/features/commerce/domain.ts`, `src/server/store.ts`: typed catalogue and transaction rules with file persistence for local demo only. Test last-unit inventory, permissions, price tampering, and quote/ticket ownership.
2. `src/app`, `src/components`, `src/features/*`: responsive Next.js storefront, products/details, cart/checkout, quotation/service/contact, customer and staff dashboards. Shared UI and styles; server enforces demo session permissions. Test integrated customer/staff flows through the running app.
3. `docs/Company-Data-Checklist.*`: practical owner questionnaire and evidence handover checklist, including original images and future email/Tally workflow requirements.
4. `docs/Automation-Architecture.md`, dashboard automation panel: workflow drafts, approval and audit UX, typed integration contracts. No live inbox or accounting mutation until separately configured and authorized.
5. `supabase/migrations`: future production schema foundation and access model; not presented as a deployed database. `README.md`: run, demo behavior, migration handover and remaining live integrations.
6. Figma files in both connected accounts: editable design reference screens; generated hero image persisted and optimized in `public/images/demo`.

## Review focus

- Out-of-stock and quote-only products cannot be purchased; never trust client prices.
- Customer records and staff scopes are checked at the server boundary.
- Cart survives refresh; failed checkout does not clear it.
- Local demo persistence is serialized and atomic within one Node process; unsuitable for multi-instance production.
- Future automation drafts cannot send messages, post accounting vouchers or change inventory without approval.

## Verification

Write domain tests first; observe failures before implementing rules. Run test suite, TypeScript check, production build, browser journey and mobile layout review. Record evidence in GATES.md. Keep payment/Google/email/Tally simulations visible. No publication or paid resource purchase in this stage.
