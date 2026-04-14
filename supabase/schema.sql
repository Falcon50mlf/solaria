-- Users table
create table if not exists public.users (
  id uuid default gen_random_uuid() primary key,
  privy_did text unique not null,
  email text,
  wallet_address text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Progress table (one row per module completion per user)
create table if not exists public.progress (
  id uuid default gen_random_uuid() primary key,
  privy_did text not null references public.users(privy_did) on delete cascade,
  module_id text not null,
  xp_earned integer not null default 0,
  badge text,
  completed_at timestamptz default now(),
  unique(privy_did, module_id)
);

-- Enable RLS
alter table public.users enable row level security;
alter table public.progress enable row level security;

-- Policies: anyone can insert/update their own row (using anon key + privy_did match)
create policy "Users can insert own row" on public.users
  for insert with check (true);

create policy "Users can update own row" on public.users
  for update using (true);

create policy "Users can read own row" on public.users
  for select using (true);

create policy "Progress insert" on public.progress
  for insert with check (true);

create policy "Progress read" on public.progress
  for select using (true);

-- Index for fast lookups
create index if not exists idx_progress_privy_did on public.progress(privy_did);
create index if not exists idx_users_privy_did on public.users(privy_did);
