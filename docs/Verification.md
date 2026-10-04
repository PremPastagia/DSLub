# Verification - 4 October 2026

Local dummy website acceptance, not production launch certification.

- `npm test`: five tests pass; server prices, stock/quotation rules, invalid/duplicate quantities, permissions and distinct demo customer identities. Log in verification/unit-tests.txt.
- `npm run typecheck`: exit 0. Final `npm run build`: exit 0, Next.js 16.3.8 optimized compilation and TypeScript complete. Compiled server runs locally on 127.0.0.1:3000.
- `node scripts/verify-api.mjs`: exit 0 against dev and compiled server. Proves wrong-origin denial, unsigned checkout denial, inventory price-edit denial, ticket/quote persistence, distinct email ownership isolation, owner-visible requests, customer-visible quote amount, failed-payment stock preservation, concurrent final-unit race with exactly one success, server-derived price, and product archive visibility. Disposable test products are archived; labelled test records remain in demo history.
- Browser: catalogue and cart, unsigned checkout/sign-in, successful customer purchase ORD-BB9D880C, persisted account order/receipt, proprietor sign-in, mobile inventory adjustment with saved notification. API verifies quote/service/role boundaries beyond these browser journeys.
- Visual review: desktop home at 1440x1000; mobile home/dashboard/inventory at viewport 390x844 (document width 375 with scrollbar). After fixing grid min-width, document scroll width equals 375. Tables and module navigation intentionally scroll within their containers. Desktop/mobile proof images in verification/.
- Independent code review: three important demo bugs fixed (refresh failure after saved mutation, stale product editor fields, shared customer IDs); reviewer confirmed fixes and no remaining important blocker within local dummy scope.
- Figma: both owner-requested accounts contain editable brand/component foundations and 14 journey references each. Home screen screenshots reviewed after fixing content heights; mobile header/input width corrected. Remaining workflow references are schematic; no click-through prototype is claimed.
- Printable company checklist: six-page PDF rendered using bundled Poppler and visually reviewed; final handover folder tree and signature evidence appear together. Word source is unrendered because LibreOffice is unavailable; reviewed PDF and editable Markdown are the delivery formats.

SQL migration was reviewed as a scalable schema foundation but was not applied or integration-tested. Real OAuth, payments/webhooks, private uploads, email, shipping/tax rules, staff onboarding, SEO indexing and AI/Tally execution remain production-stage work documented in Design-and-Handover.md. Preview remains noindex and local-only. No more product imagery was generated.
