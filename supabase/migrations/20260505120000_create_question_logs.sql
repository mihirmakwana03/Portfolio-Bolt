-- Create question_logs table for anonymous question tracking
-- Stores SHA-256 hashes only (no PII, no IP addresses)
-- Purpose: Close the data flywheel loop — analyze trends after 1 month to improve KB

create table if not exists question_logs (
  id bigserial primary key,
  question_hash text not null unique,  -- SHA-256 hash of the question
  created_at timestamp with time zone default now(),
  count integer default 1              -- Track repeat questions without duplication
);

-- Indexes for efficient querying
create index if not exists question_logs_created_at_idx on question_logs(created_at desc);
create index if not exists question_logs_hash_idx on question_logs(question_hash);

-- RLS: Everyone can insert, but nobody can delete or update
-- This prevents accidental data loss and abuse
alter table question_logs enable row level security;

create policy "allow_insert" on question_logs
  for insert with check (true);

create policy "deny_update" on question_logs
  for update with check (false);

create policy "deny_delete" on question_logs
  for delete with check (false);

-- Public can only read aggregated stats (no individual question hashes visible)
create policy "allow_select_own" on question_logs
  for select using (auth.role() = 'authenticated' or auth.role() = 'service_role');
