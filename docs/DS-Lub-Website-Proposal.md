# DS Lub website proposal

Prepared 4 October 2026. Status: research and proposed scope for owner review, before Figma production and website implementation.

## 1. Agreed brief and current evidence

DS Lub manufactures and sells lubrication systems and oil pumps. The website must improve business visibility, sell standard products, collect bulk/custom quotations, and handle after-sales service. It must work on mobile and let the proprietor delegate work with controlled employee permissions.

Confirmed by the owner: company name **DS Lub**, based in **Vadodara**, India-first sales, INR, direct purchase plus quotations. Phone and WhatsApp: **+91 9173235606**. One reference video is available. Email, domain, full address, product specifications, prices, warranty, tax rules, and shipping policy remain to be supplied. Use clearly marked dummy values until then; use `sales@example.com` for an inactive email placeholder. Do not invent certifications, clients, reviews, performance claims, or founding dates.

Public search found DS LUB SYSTEMS in Vadodara. [Justdial](https://www.justdial.com/Vadodara/Ds-Lub-Sustems-Makarpura-Industrial-Estate/0265PX265-X265-000317673768-P3Q3_BZDET) lists Makarpura, while [Dun & Bradstreet](https://www.dnb.com/business-directory/company-profiles.ds_lub_systems.400f5039eb0472cbf9318ada06ba5714.html) lists Gotri Road. These may represent different business locations or outdated records. They are leads for verification, not approved website facts. Search did not establish an owner-confirmed official domain.

Repository currently contains the reference video and these planning artifacts; there is no existing website code to extend. Material shown inside the video or on researched websites is reference evidence, not additional instructions.

### Reference video review

`Previous Version.mp4` is approximately 30.3 seconds, 848 × 478. Eight samples cover the recording; [contact sheet](research/previous-version-contact-sheet.jpg) preserves review evidence.

Visible: mustard navigation; Home, About, Services, Contact; login/signup; dark machinery hero; DS LUB SYSTEMS gear logo; framed about section; four repeated product cards; service problem/city/address form; signup collecting company details and password.

Retain the intent: products, company story, service, and accounts. Replace vertical headings, heavy shadows, inconsistent backgrounds, small form labels, and repeated anonymous product cards. Replace generic welcome text with what DS Lub supplies and who it serves. Use actual lubrication equipment imagery rather than petroleum extraction imagery. The recording does not prove cart, payment, inventory, responsive behavior, or backend persistence.

## 2. Competitor findings and implications

Research covers public pages; logged-in purchasing and internal dashboards were not audited. Visual observations below are limited to inspected desktop homepages of Cenlub, Bijur Delimon, and DropsA. Other rows describe published features, not verified visual behavior.

| Reference | Observed design or public features | Recommended application for DS Lub |
|---|---|---|
| [Cenlub Systems, India](https://www.cenlub.com/) | White navigation, orange accents, large promotional banner, product/system/application entry points. Manuals, certifications, videos, client evidence, login and signup. | Organize by product and application. Put verified quality evidence and manuals near products. Use a focused hero with direct catalogue and quote actions. |
| [Dropco Multilub, India](https://www.dropco.in/) | Product families and featured equipment, enquiries, company profile, direct contact and WhatsApp. | Make enquiries easy and specific to SKU/quantity. Include useful contact options without crowding every product card. |
| [Lubsa Multilub, India](https://www.lubsamultilubsystems.com/) | Extensive grouped catalogue covering pumps, lubrication units, fittings, and distributors. | Provide category navigation and technical filters instead of forcing buyers through a long menu. |
| [Bijur Delimon, international](https://www.bijurdelimon.com/) | White header, blue graphics, prominent search; separates systems, products, industries, literature, distributors, and support. Publicly advertises account access to inventory/pricing and system quotation. | Combine a searchable shop with engineering guidance, datasheets, customer accounts, and custom quote requests. |
| [DropsA, international](https://www.dropsa.com/en) | Blue/white branding, product hero with technical drawings, industry and lubricant navigation, component catalogue, case studies, assistance and calculator links. | Use restrained engineering graphics, application pages, and product selection guidance. Keep calculators for a later validated release. |
| [Groeneveld-BEKA, international](https://www.groeneveld-beka.com/en/) | Product and market segmentation; lubrication, oil management, support and contact routes. | Connect products to supported industry applications and after-sales support. |
| [Graco, international](https://www.graco.com/us/en/in-plant-manufacturing/products/lubrication.html) | Equipment families, product education/video, customer service and distributor purchase routes. | Add installation resources and clear support routes. Do not assume every industrial product should be self-serve checkout. |
| [Bosch Rexroth Store, manufacturing benchmark](https://www.boschrexroth.com/en/ch/service-and-support/buy/rexroth-store/) | Search/filter, comparison, technical documents/CAD, personal prices and lead times, order/invoice visibility. | Show compatibility, compare specifications, display stock/lead time, and give customers order and invoice history. |

Inference from these examples: buyers need help selecting compatible equipment as well as buying it. Recommended model is **public technical catalogue + direct shop + quotation workflow + service portal**. Not every competitor exposes every feature publicly, and these examples do not establish a market ranking.

## 3. Platform options

1. **WooCommerce with extensions:** lower initial setup effort for conventional ecommerce. Fine for a small catalogue; staff workflows, quotations and service tracking may depend on several plugins and need integration maintenance.
2. **Custom Next.js application with managed PostgreSQL — recommended:** one coherent storefront, customer portal and staff dashboard. More initial implementation work, but clearer ownership of permissions, service workflows, and product attributes.
3. **Hosted storefront plus separate operations tools:** fast conventional shop setup, but custom inventory and service workflows can become fragmented and app subscriptions can accumulate.

Start with one modular application and one database. No microservices, Kubernetes, or separate search cluster at this stage. Revisit architecture only when usage or workflow complexity warrants it.

Suggested stack: Next.js and TypeScript; accessible reusable UI components; managed Supabase PostgreSQL, Auth and object storage; Razorpay hosted checkout for India; a transactional email provider; managed application hosting. Final provider selection depends on commercial-use terms, reliability, backups and current pricing, reviewed before purchase. No paid accounts or external production resources have been created.

Official capability references: [Next.js project structure](https://nextjs.org/docs/app/getting-started/project-structure), [Supabase Google login](https://supabase.com/docs/guides/auth/social-login/auth-google), [Supabase row-level security](https://supabase.com/docs/guides/database/postgres/row-level-security), and [Razorpay web integration](https://razorpay.com/docs/payments/payment-gateway/web-integration/standard/integration-steps/).

## 4. Visual direction and Figma deliverables

Recommended direction: precise industrial engineering, with a light catalogue and controlled dark sections. Keep technical information easy to scan; use subtle grid lines and dimension-style callouts as decoration, not invented measurements.

| Token | Proposed value/use |
|---|---|
| Navy | `#102A43`, headings, footer, selected dark hero areas |
| White | `#FFFFFF`, catalogue cards and content |
| Steel | `#52616B`, secondary text; `#F3F6F8`, surfaces |
| Amber | `#E7A32E`, limited highlights; navy text on amber actions |
| Success/error | Green/red paired with text and icons, never color alone |
| Typography | Clear sans-serif body, strong headings; monospace only for SKU/spec labels |

Verify contrast in final combinations. Use consistent spacing, modest corners, crisp line icons, generous whitespace, and restrained motion. Avoid auto-playing hero video, oversized navigation, ornamental gauges, and aggressive pop-ups. Respect reduced-motion settings.

Proposed hero copy: **“Lubrication systems built for industrial machinery.”** Supporting text explains oil pumps, lubrication units and application support. Primary action: **Explore products**. Secondary: **Request a quotation**. No unverified reliability percentages or “best company” claims.

Figma stage will produce an editable file containing foundations, reusable components, desktop and mobile layouts, and linked flows. Layouts cover public pages, catalogue/detail, cart/checkout, authentication, customer portal, inventory, orders, quotations, tickets, and staff permissions. Include empty, loading, error, success, low-stock, out-of-stock, payment-failed and permission-denied states. Design reference widths: 1440, 768 and 390 px; implementation must also work at intermediate widths and 320 px.

Generate concept images after scope review: industrial hero, consistent demo product renders, and service illustration. Mark synthetic product renders as demo visuals; do not represent them as real DS Lub equipment. Real product photography, approved technical drawings and installation photos replace them before launch. Keep asset metadata and replacement locations in one manifest. Use the visual concepts to establish direction, then use editable Figma components and semantic website code rather than placing a screenshot over the page.

## 5. Public pages and buyer experience

**Home:** clear offering, main categories, selected products, application examples, engineering/service process, verified trust evidence, quotation prompt, and contact footer.

**About:** owner-approved company story, manufacturing capabilities, quality process, real workshop photos, service coverage and genuine certifications where available.

**Products:** catalogue grid/list; search by name/model/SKU; filters for category, oil/grease compatibility, system type, pressure, flow, reservoir, voltage, price and stock where meaningful. Filters depend on applicable attributes, preserve their URL state, and support a mobile filter drawer. Show units explicitly. Product cards display image, model, essential specs, stock/lead time, price or “Request price,” and purchase/quote actions.

**Product detail:** image gallery, model/variants, price with tax explanation, quantity, availability, lead time, application/compatibility notes, specification table, dimensions, datasheets, warranty, shipping, related spares and support. Compare up to three products with differences emphasized. Quote-only items never show a misleading Add to cart action.

**Services:** installation, commissioning, repair, troubleshooting and maintenance only where DS Lub actually offers them. Start a tracked request; existing customers can select purchased equipment. Allow enquiry about older/offline purchases with evidence and manual validation.

**Contact:** clickable phone and WhatsApp using confirmed number; owner-confirmed email with `mailto:`; enquiry form; verified address/map and hours when available. WhatsApp opens a conversation but does not imply automated WhatsApp messaging is configured. Save submitted enquiries to the dashboard; email is a notification channel, not the only record.

**Additional useful pages:** industry applications, resource/download library, quotation form, FAQ, and owner-reviewed shipping/returns/warranty/privacy/terms pages. Add case studies only when genuine evidence is supplied. Keep careers, dealer portals, IoT monitoring, AI chatbot and engineering calculators for later releases.

### Core flows

- Standard purchase: browse publicly, choose compatible variant, add to cart, sign in before checkout, confirm address/invoice details, review tax/shipping and pay. After login, restore cart and intended destination.
- Bulk/custom purchase: build quote basket, add quantity, company and application requirements, optionally attach drawings, submit, track reference number, receive approved quotation. Accepted quotes convert into orders with server-side price and stock revalidation.
- Service: choose order item or manually registered equipment, describe issue, attach photos, provide site/contact details, submit, receive ticket number, track responses. Do not promise warranty coverage before staff validation.
- Customer account: orders, invoice downloads, saved addresses, quotations, registered equipment, service tickets and profile. Customers see only their records.

Account signup supports Google and email/password, verification, reset and session expiry. Collect company/GST details during checkout or quotation when needed, not as mandatory friction before browsing. Never let customers choose staff privileges.

## 6. Proprietor, employee and customer access

These are business access categories, not three disconnected databases. Each employee has their own account and an owner-controlled permission set. No shared staff password.

| Role template | Access |
|---|---|
| Proprietor | All business operations, staff invitations/permissions, settings, reports, price approvals, refunds and audit history |
| Operations manager | Catalogue, orders, inventory and assigned operational reports; restricted financial/settings powers unless explicitly delegated |
| Sales employee | Enquiries, quotations, customer/order details needed for sales; discounts within owner-defined limits |
| Inventory employee | Stock receipt/adjustment, locations, availability, picking and dispatch; no cost/margin or refund access by default |
| Service employee | Assigned tickets, equipment details and customer contact needed for service; no unrelated customer or financial access |
| Customer | Own orders, quotations, addresses and tickets |

Permissions are granular beneath these templates. Enforce every permission on the server and in database access policies; hiding buttons is insufficient. Require stronger authentication for staff, log consequential changes, revoke access promptly when staff leave, and reserve ownership transfer/security settings for the proprietor.

Admin dashboard includes product/category/variant editing; add and archive products; prices and quote-only flags; images/specs/documents; inventory; orders/payments/refunds; quotations; tickets/assignments; enquiries; staff permissions; business content/contact settings; basic sales/stock/service reports; CSV import/export. Product archiving preserves historic orders.

Inventory first release covers finished products and spares: on-hand, reserved and available stock, low-stock thresholds, receipts, adjustments with reasons, dispatch, returns, and movement history. Model locations now while presenting one primary store initially. Raw materials, bill of materials, production work orders, supplier procurement and accounting integration are later modules, not implied by a finished-goods stock count.

## 7. Scalable data and payment design

Use normalized business entities with stable IDs, foreign keys and constraints. Keep products separate from sellable SKU variants. A variant owns price, stock behavior and commercial options. Add category-specific attribute definitions with units, types and validation; use flexible metadata for uncommon extras, not for core stock or financial fields.

Planned entity groups:

- Identity: profiles, staff memberships, roles, permissions, role assignments, customer companies and addresses.
- Catalogue: categories, products, variants, attributes/values, product media, documents and application links.
- Commerce: carts/items, quotations/items/revisions, orders/items, payment attempts/events, refunds, shipments and invoices.
- Inventory: locations, stock balances, reservations and immutable stock movements.
- Service: registered equipment, tickets, assignments, status history, messages and private attachments.
- Operations: enquiries, content pages, settings, audit events and notification outbox/delivery attempts.

Store money as integer minor units with currency, never floating-point totals. Order and quotation items snapshot product descriptions, unit prices and tax amounts so later catalogue edits do not rewrite history. Use migrations, reproducible seeds and versioned attribute changes. Index SKUs, slugs, ownership keys, relation keys and common status/date queries. Paginate lists, use managed connection pooling, and cache public catalogue content while invalidating affected entries after edits.

Inventory availability is on-hand minus active reservations. Checkout reserves stock atomically; reservations expire or release on cancellation. Concurrent attempts to buy the final unit must not oversell. Payment capture and fulfilment are distinct states. A late successful payment after stock reservation expiry requires reconciliation and staff action rather than silently overselling.

Razorpay is the proposed India gateway, subject to merchant onboarding and suitability. The server calculates totals and creates gateway orders. Use hosted checkout; keep secrets server-side. Verify checkout signatures and [webhook signatures](https://razorpay.com/docs/webhooks/validate-test/). Deduplicate events, tolerate delayed/out-of-order notifications, and reconcile unresolved payments. Only verified server evidence marks an order paid. Never trust a browser success screen or user-supplied price. Do not store card credentials. Refund permissions, cancellation policy and stock restoration need explicit workflow checks.

Save service/enquiry submissions before sending notifications. Use an outbox with retries and delivery status so email outages do not lose requests. Keep service uploads private with restricted access, size/type validation and expiring links. Include backups, restore checks, monitoring and useful error reports before production.

## 8. Proposed code structure

```text
src/
  app/
    (public)/       home, about, products, services, contact, resources
    (auth)/         sign-in, signup, recovery, provider callback
    (customer)/     account, orders, quotes, equipment, tickets
    (staff)/        dashboard, catalogue, inventory, sales, service, team
    api/            webhooks and external integration endpoints
  features/
    catalogue/     product types, validation, queries, components
    cart/
    checkout/
    orders/
    quotations/
    inventory/
    service/
    identity/
    content/
  components/      shared UI, navigation, forms, feedback
  server/          permission checks, repositories, transactions, integrations
  lib/             configuration, formatting, shared validation
  styles/          design tokens and global styles
supabase/
  migrations/
  seed/
public/
  images/demo/
tests/
  integration/
  e2e/
docs/
  design/
  research/
```

Routes assemble feature modules; business rules remain out of presentation components. Use a data adapter for dummy fixtures and a real adapter for persistence, sharing domain contracts. Avoid constructing a generic plugin framework in anticipation of unknown features. Confirm exact filenames and tests in the implementation plan after this proposal is reviewed.

## 9. SEO and search/AI visibility

Prioritize brand discoverability, relevant product searches and qualified leads. Generic “oil pumps” spans many industries; target DS Lub's actual lubrication applications instead of unrelated engine/fuel pump traffic.

Launch foundation: crawlable public content, unique page titles/descriptions, product/category URLs, internal linking, canonical URLs, XML sitemap, robots rules, optimized images, responsive pages, accessible text and appropriate Product/Offer, Breadcrumb and Organization/LocalBusiness structured data matching visible verified content. Do not publish fictional prices, ratings or certifications in structured data.

Verify Google Business Profile and Search Console. Make name/address/phone consistent across DS Lub's website and business listings. Publish owner-reviewed product selection guides, installation/maintenance explanations, troubleshooting answers, and real application case studies. Add location pages only for actual operations/service coverage, not hundreds of duplicate keyword pages. Redirect old URLs if an existing domain is being replaced.

Keep dummy preview private or access-protected and `noindex`; omit fake reviews and demo offers from public search feeds. Account, cart, checkout and dashboard routes should not be indexed. Robots directives alone are not access control.

No developer can guarantee first position or make Google AI declare DS Lub “best.” [Google's guidance](https://developers.google.com/search/docs/appearance/ai-features) states that normal SEO practices apply to AI Overviews/AI Mode, with no special schema or AI files required and no guarantee of inclusion. Aim for accurate, useful, attributable technical content and stronger brand evidence.

Measure branded and relevant non-branded impressions/clicks, qualified enquiries, quotation acceptance, checkout completion and service resolution. Review indexing first, then conversion problems. Set growth targets after obtaining a baseline; do not invent current traffic or promise a ranking deadline.

## 10. Phases and acceptance gates

**Phase 1 — research and owner review (this deliverable).** Review business model, scope, visual direction and assumptions. Decide policies that affect later implementation. No production website, Figma file, or generated design image is claimed in this phase.

**Phase 2 — visual design.** Create Figma foundations and desktop/mobile flows plus generated demo imagery. Acceptance: all requested pages and key dashboard flows are covered, component/state inventory exists, and the owner can assess the actual visual direction.

**Phase 3 — complete dummy-data prototype.** Build public pages, catalogue, comparisons, cart, simulated checkout, quote/service submissions, customer account and staff views with fictional linked data. Seed 18 distinct demo products across six provisional categories: oil pumps, grease pumps, lubrication units, distributors, controllers, and fittings/spares. Include price/quote-only, variants, low stock and out of stock; linked orders, quotations, service tickets and staff roles. Seed prices/specs are illustrative, not engineering guidance.

Acceptance: browse/filter/detail work, cart survives refresh and login flow, sign-in is required before purchase, demo orders/tickets/quotes are visible in the corresponding dashboard, permitted product/stock edits persist within the demo, and restricted role views are understandable. Any simulated authentication/payment/notification is explicitly labelled; demo role switching proves UX only, not production authorization. Provide a safe reset. No real payments, customer messages or business claims from demo actions.

**Phase 4 — persistent backend and integrations.** Add database migrations/policies, real auth and Google OAuth, staff invitations, stock transactions, gateway test mode, email queue and upload storage. Acceptance: unauthorized requests fail at server/database boundaries; customers cannot access another customer's records; checkout uses current server prices; the final unit cannot sell twice; duplicate/invalid payment events cannot produce duplicate orders; saved service tickets survive failed email delivery; owner can revoke staff access.

**Phase 5 — original content and launch.** Replace dummy data/images, confirm policies, configure verified domain/email and merchant account, migrate approved data, test backup restore, measure performance, and complete launch review. Acceptance: real order/payment/refund checks follow an owner-approved test plan, contact links work, no public demo claims remain, required metadata is validated, and production records/notifications reach staff.

Responsive/accessibility target: usable at 320–1440 px, keyboard navigation, visible focus, labelled inputs, useful inline errors, readable tables, appropriately sized tap targets, and accessible dialogs. Performance target on representative production traffic: LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1 at the 75th percentile. Before real traffic exists, lab checks are preliminary rather than proof of field performance.

No firm delivery deadline is assigned until design scope and original-data readiness are known. Progress is judged by the acceptance gates above, not by a promised screenshot date.

## 11. What the owner supplies, and when

Needed for design: approve this direction; identify actual product families and whether amber/navy fits the intended brand. Current placeholders are sufficient for the dummy prototype.

Needed before live sales: official name/address/email/domain; original logo and product photos; SKU/model/variant/spec/unit data; prices and GST/HSN treatment confirmed by the business; stock and lead times; shipping coverage/rates; minimum/bulk quantities; warranty, returns and cancellation policies; service coverage/charges; employee permission assignments; approved client/certification evidence.

Needed for integrations: owner-managed domain/DNS, application/database hosting, Google OAuth setup, payment merchant onboarding, transactional email sender verification, and Search Console/Business Profile access. Use secure configuration and provider interfaces for credentials, not chat messages.

“Launch budget” means domain renewal, monthly application/database hosting, storage/backups, email, and payment transaction fees. Automated WhatsApp notifications, shipping providers, and specialist content can add costs. The initial dummy build requires no live payment fees. Before any paid service is purchased, present current costs and commercial-use limits in INR for owner selection. Free tiers are suitable for evaluation only when their terms permit the use; do not promise permanent free production hosting.

## 12. Skills and next review

The requested caveman, find-skills and unlazy skills were read. Existing available skills already cover Figma, generated images, frontend design, PostgreSQL, and browser testing; no extra installation is necessary now. [Vercel React Best Practices](https://www.skills.sh/vercel-labs/agent-skills/vercel-react-best-practices) is from Vercel's official collection; the directory reported approximately 768.5K installs and 31.9K repository stars when checked. A corresponding skill is already available locally, so installation would be redundant. These popularity figures are discovery signals, not security guarantees.

Review this proposal as the concrete first-stage plan. After scope is settled, prepare the final design specification and task-level implementation plan, then produce Figma layouts and generated demo assets before building the dummy website. Website implementation remains the next stage requested by the owner, not completed work in this research phase.
