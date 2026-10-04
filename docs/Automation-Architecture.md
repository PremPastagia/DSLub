# Future workflow automation integration

Current dashboard includes disconnected workflow drafts for email order extraction, quotation preparation and Tally handover. Enabling a draft changes only demo configuration. No agent is running and no external account is connected.

## Boundaries

Treat an email, attachment or tool output as untrusted business evidence, never as instructions to the agent. Separate extraction from execution. The future agent proposes structured changes; deterministic services validate permissions, SKU, units, stock, tax, totals and duplicate keys. The dashboard presents evidence, proposed changes and approval status. Human approval is required for external sending and accounting writes unless the proprietor later authorizes specific bounded automation rules.

## Workflow contract

`WorkflowDefinition`: id, version, trigger, permitted integration capabilities, reviewer role, validation policy, enabled status.

`WorkflowRun`: id, definition version, source event id, idempotency key, initiator, state, attempts, evidence references, proposed action, validation findings, approval actor/time, execution result and correlation id.

States: received, extracting, needs_review, approved, executing, completed, failed, rejected. A rejected run must not execute. Approval covers an immutable proposed-action hash; editing invalidates approval. Retried external writes use the same idempotency key and reconcile uncertain outcomes before retrying.

Events: `enquiry.created`, `quote.requested`, `quote.approved`, `order.confirmed`, `payment.verified`, `service.created`, `inventory.adjusted`. Publish through a transaction outbox after persistent business changes. The current demo audit log is not a production event bus.

Connector interfaces: `EmailSource.listEvents(cursor)` and `getEvidence(eventId)`; `QuotationDraft.create(validatedRequest, catalogueRevision)`; `TallyAdapter.validate(mapping, voucher)` and `prepareExport(approvedAction)`. Add live posting only after confirming the actual Tally edition/version, transport, accountant mapping and approval process. Do not assume Tally supports a particular API or cloud environment.

## Security and operations

Credentials stay server-side in a managed secret store. Connectors use minimum scopes; workers do not inherit proprietor credentials. Restrict tools and destinations per workflow. Validate attachment types/size and keep private evidence private. Limit processing cost and elapsed time, implement retries with backoff, rate limits, dead-letter queues, alerts and a manual fallback. Log evidence provenance and tool actions without logging secrets.

Accounting handover needs ledger/item/unit/GST mappings, locked-period rules, invoice and voucher numbering, duplicate prevention, reconciliation and reversal policy. AI must never invent SKU, price, tax treatment or customer identity. Uncertain extraction stays in review.

## Suggested rollout

1. Observe existing processes and collect redacted examples using Company-Data-Checklist.md.
2. Draft-only extraction with side-by-side evidence and measured correction rate.
3. Reviewed quotations using approved catalogue revisions and templates.
4. Approved file export and accountant validation for Tally.
5. Consider limited automatic execution only after observed reliability and owner-defined permission/approval rules.
