-- Production foundation only. Not yet applied or certified by this demo.
-- Apply to a dedicated Supabase project, verify policies and add transaction RPCs before launch.
begin;
create table public.profiles (
 id uuid primary key references auth.users(id) on delete cascade,
 display_name text not null,
 created_at timestamptz not null default now()
);
create table public.staff_memberships (
 user_id uuid primary key references public.profiles(id),
 role text not null check (role in ('owner','sales','inventory','service')),
 active boolean not null default true
);
create table public.categories (
 id bigint generated always as identity primary key,
 name text not null unique,
 slug text not null unique
);
create table public.products (
 id bigint generated always as identity primary key,
 category_id bigint not null references public.categories(id),
 name text not null,
 slug text not null unique,
 description text not null default '',
 active boolean not null default true,
 created_at timestamptz not null default now()
);
create index products_category_idx on public.products(category_id);
create table public.product_variants (
 id bigint generated always as identity primary key,
 product_id bigint not null references public.products(id),
 sku text not null unique,
 price_minor bigint not null check(price_minor>=0),
 currency text not null default 'INR' check(char_length(currency)=3),
 quote_only boolean not null default false,
 attributes jsonb not null default '{}'
);
create index variants_product_idx on public.product_variants(product_id);
create table public.attribute_definitions (
 id bigint generated always as identity primary key,
 category_id bigint not null references public.categories(id),
 name text not null,
 value_type text not null check(value_type in ('text','number','boolean','option')),
 unit text,
 required boolean not null default false,
 unique(category_id,name)
);
create table public.media_assets (
 id bigint generated always as identity primary key,
 product_id bigint references public.products(id),
 storage_path text not null,
 alt_text text not null,
 kind text not null check(kind in ('image','datasheet','drawing','manual')),
 approved boolean not null default false
);
create index media_product_idx on public.media_assets(product_id);
create table public.stock_locations (
 id bigint generated always as identity primary key,
 name text not null unique
);
create table public.stock_balances (
 variant_id bigint not null references public.product_variants(id),
 location_id bigint not null references public.stock_locations(id),
 on_hand integer not null default 0 check(on_hand>=0),
 reserved integer not null default 0 check(reserved>=0 and reserved<=on_hand),
 low_threshold integer not null default 3 check(low_threshold>=0),
 primary key(variant_id,location_id)
);
create table public.orders (
 id bigint generated always as identity primary key,
 customer_id uuid not null references public.profiles(id),
 reference text not null unique,
 status text not null default 'pending_payment',
 currency text not null default 'INR',
 subtotal_minor bigint not null check(subtotal_minor>=0),
 tax_minor bigint not null check(tax_minor>=0),
 shipping_minor bigint not null check(shipping_minor>=0),
 total_minor bigint not null check(total_minor=subtotal_minor+tax_minor+shipping_minor),
 delivery_snapshot jsonb not null,
 created_at timestamptz not null default now()
);
create index orders_customer_date_idx on public.orders(customer_id,created_at desc);
create table public.order_items (
 id bigint generated always as identity primary key,
 order_id bigint not null references public.orders(id),
 variant_id bigint not null references public.product_variants(id),
 sku_snapshot text not null,
 name_snapshot text not null,
 quantity integer not null check(quantity>0),
 price_minor bigint not null check(price_minor>=0)
);
create index order_items_order_idx on public.order_items(order_id);
create index order_items_variant_idx on public.order_items(variant_id);
create table public.stock_reservations (
 id bigint generated always as identity primary key,
 order_id bigint not null references public.orders(id),
 variant_id bigint not null,
 location_id bigint not null,
 quantity integer not null check(quantity>0),
 expires_at timestamptz not null,
 state text not null check(state in ('active','consumed','released','expired')),
 foreign key(variant_id,location_id) references public.stock_balances(variant_id,location_id)
);
create index reservations_order_idx on public.stock_reservations(order_id);
create index reservations_active_expiry_idx on public.stock_reservations(expires_at) where state='active';
create table public.stock_movements (
 id bigint generated always as identity primary key,
 variant_id bigint not null,
 location_id bigint not null,
 delta integer not null check(delta<>0),
 reason text not null,
 actor_id uuid references public.profiles(id),
 order_id bigint references public.orders(id),
 created_at timestamptz not null default now(),
 foreign key(variant_id,location_id) references public.stock_balances(variant_id,location_id)
);
create index movements_variant_date_idx on public.stock_movements(variant_id,created_at desc);
create index movements_actor_idx on public.stock_movements(actor_id);
create index movements_order_idx on public.stock_movements(order_id);
create table public.payment_events (
 id bigint generated always as identity primary key,
 order_id bigint references public.orders(id),
 provider_event_id text not null unique,
 provider_payment_id text,
 verified boolean not null default false,
 processed_at timestamptz,
 payload_private jsonb not null,
 created_at timestamptz not null default now()
);
create index payments_order_idx on public.payment_events(order_id);
create table public.requests (
 id bigint generated always as identity primary key,
 customer_id uuid references public.profiles(id),
 kind text not null check(kind in ('quote','service','enquiry')),
 reference text not null unique,
 subject text not null,
 detail text not null,
 contact_private jsonb not null default '{}',
 status text not null default 'new',
 assigned_to uuid references public.profiles(id),
 approved_total_minor bigint check(approved_total_minor>=0),
 created_at timestamptz not null default now()
);
create index requests_customer_idx on public.requests(customer_id,created_at desc);
create index requests_assigned_idx on public.requests(assigned_to,status);
create table public.workflow_definitions (
 id bigint generated always as identity primary key,
 name text not null,
 version integer not null check(version>0),
 trigger_event text not null,
 capabilities jsonb not null default '[]',
 approval_policy jsonb not null default '{}',
 enabled boolean not null default false
);
create table public.workflow_runs (
 id bigint generated always as identity primary key,
 definition_id bigint not null references public.workflow_definitions(id),
 definition_version integer not null,
 idempotency_key text not null unique,
 state text not null check(state in ('received','extracting','needs_review','approved','executing','completed','failed','rejected')),
 evidence_private jsonb not null default '[]',
 proposed_action jsonb,
 approved_action_hash text,
 approved_by uuid references public.profiles(id),
 approved_at timestamptz,
 attempts integer not null default 0 check(attempts>=0),
 created_at timestamptz not null default now()
);
create index runs_definition_idx on public.workflow_runs(definition_id,state);
create index runs_approver_idx on public.workflow_runs(approved_by);
create table public.outbox_events (
 id bigint generated always as identity primary key,
 event_type text not null,
 payload_private jsonb not null,
 dedupe_key text not null unique,
 attempts integer not null default 0,
 available_at timestamptz not null default now(),
 delivered_at timestamptz
);
create index outbox_pending_idx on public.outbox_events(available_at) where delivered_at is null;
create table public.audit_events (
 id bigint generated always as identity primary key,
 actor_id uuid references public.profiles(id),
 action text not null,
 entity_type text not null,
 entity_id text not null,
 changes_private jsonb not null default '{}',
 created_at timestamptz not null default now()
);
create index audit_actor_date_idx on public.audit_events(actor_id,created_at desc);

-- Default-deny all tables. Only public catalogue and customer read policies are granted below.
do $$ declare t text; begin
 foreach t in array array['profiles','staff_memberships','categories','products','product_variants','attribute_definitions','media_assets','stock_locations','stock_balances','orders','order_items','stock_reservations','stock_movements','payment_events','requests','workflow_definitions','workflow_runs','outbox_events','audit_events'] loop
 execute format('alter table public.%I enable row level security',t);
 end loop;
end $$;
create policy profile_self_read on public.profiles for select to authenticated using(id=(select auth.uid()));
create policy categories_public_read on public.categories for select to anon,authenticated using(true);
create policy products_public_read on public.products for select to anon,authenticated using(active);
create policy variants_public_read on public.product_variants for select to anon,authenticated using(exists(select 1 from public.products p where p.id=product_id and p.active));
create policy attributes_public_read on public.attribute_definitions for select to anon,authenticated using(true);
create policy media_public_read on public.media_assets for select to anon,authenticated using(approved and exists(select 1 from public.products p where p.id=product_id and p.active));
create policy orders_customer_read on public.orders for select to authenticated using(customer_id=(select auth.uid()));
create policy order_items_customer_read on public.order_items for select to authenticated using(exists(select 1 from public.orders o where o.id=order_id and o.customer_id=(select auth.uid())));
create policy requests_customer_read on public.requests for select to authenticated using(customer_id=(select auth.uid()));
-- Server-side staff writes require explicit scoped authorization and tested policies/RPCs.
-- Never expose service-role credentials. Users cannot edit their own staff memberships.
commit;
