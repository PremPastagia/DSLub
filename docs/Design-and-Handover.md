# DS Lub design and implementation handover

Approved prototype scope: India, INR, standard product purchase plus bulk/custom quotes. Public brand DS Lub, Vadodara. Phone and WhatsApp +91 9173235606. Full address and email await owner originals.

## Design files

- Primary account: https://www.figma.com/design/dwaLRxL1MshYhZkwyFaK3p
- Test account: https://www.figma.com/design/U1RQljnhwJxrEE76lhAVup

Both contain an editable brand foundation, product/input components, reused library button instances, eleven desktop journey references and three mobile references. Home/catalogue/product layouts are detailed visual references. Remaining pages are editable workflow references rather than pixel-exact replicas of all running pages; the website is the working interaction prototype. The capture reference was replaced with component-based layouts. Hero and mobile sizing were visually checked. Figma is not wired with click-through prototype transitions or Code Connect mappings.

Navy, white and amber establish a technical visual style. Manrope headings and IBM Plex Sans body are used. Original photographs, logo, claims, certificates and approved technical copy replace explicitly labelled dummy content.

## Image inventory

One previously generated concept equipment image is reused in the hero and catalogue, labelled as a concept. `public/images/demo/hero-original.png` preserves it; `hero.webp` and `pump.webp` are optimized derivatives. No additional product image was generated after the owner's instruction. The original prompt described a photorealistic industrial oil lubrication pump assembly with transparent oil reservoir, black motor, pressure gauge, amber oil, stainless fittings and navy workshop background. These details are illustrative, not specifications of a DS Lub model.

## Backend transition

The running dummy site persists records in `.data/demo.json` through one-process serialized transactions. It validates staff permissions, server catalogue prices, quantities and stock. It is deliberately local and not a production deployment.

The unexecuted Supabase/PostgreSQL migration provides relationships for users, staff roles, category/product/variant/SKU, flexible attributes, media, stock locations/balances/movements/reservations, orders/items, verified payment events, requests, workflows, outbox and audit. RLS defaults deny private access; narrowly scoped public catalogue and customer-owned reads are supplied. Staff writes and checkout must use reviewed transactional server functions and permission policies, with automated RLS tests before deployment. Do not apply the migration directly to an existing database without review and a tested backup/migration plan.

Next production work: real Google/email authentication and staff invitation/revocation; private uploads; gateway server orders, signed webhook verification, reservation expiry and idempotency; shipping/GST/accounting rules; email sender verification; notifications; backups/monitoring; privacy/terms approvals. Agent workflows are disconnected drafts. See Automation-Architecture.md for evidence, approval, deduplication and Tally contracts.

## SEO transition

Semantic page headings, responsive pages and distinct route metadata are included. Preview pages intentionally use noindex. At production launch, replace demo copy, connect approved domain, publish verified Product/Organization structured data and sitemap, enable indexing, reconcile business listings, and connect Search Console/Google Business Profile. Maintain accurate product data and original technical resources. Search rankings and AI recommendations cannot be guaranteed.

## Owner handover

Complete Company-Data-Checklist.md or the printable six-page PDF in output/pdf. It covers identity, models/variants, pricing/stock, image-to-SKU mapping, performance evidence, policies, service, permissions, SEO proof, technical setup and email/Tally automation. DOCX source also exists but was not visually verified because this Windows environment has no LibreOffice renderer; use the reviewed PDF or editable Markdown as the delivered checklist.
