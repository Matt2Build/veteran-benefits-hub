create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$;

create table if not exists public.state_benefits (
  id text primary key,
  state_slug text not null,
  category text not null,
  category_group text not null,
  question text not null,
  summary text not null,
  detail_md text not null,
  status text not null check (status in ('full', 'partial', 'none', 'conditional')),
  disability_threshold text,
  source_label text,
  source_url text,
  verified_date date,
  published boolean not null default false,
  featured_in_comparison boolean not null default false,
  created_at timestamptz not null default timezone('utc'::text, now()),
  updated_at timestamptz not null default timezone('utc'::text, now())
);

create index if not exists state_benefits_state_slug_idx on public.state_benefits (state_slug);
create index if not exists state_benefits_category_idx on public.state_benefits (category);
create index if not exists state_benefits_published_idx on public.state_benefits (published);

drop trigger if exists set_state_benefits_updated_at on public.state_benefits;

create trigger set_state_benefits_updated_at
before update on public.state_benefits
for each row
execute function public.set_updated_at();

alter table public.state_benefits enable row level security;

create policy "published benefits are public"
on public.state_benefits
for select
using (published = true);

create policy "authenticated editors can read all benefits"
on public.state_benefits
for select
to authenticated
using (true);

create policy "authenticated editors can update benefits"
on public.state_benefits
for update
to authenticated
using (true)
with check (true);

create policy "authenticated editors can insert benefits"
on public.state_benefits
for insert
to authenticated
with check (true);
