-- Allow repeated questions to be stored as separate rows.
-- This keeps the logging model honest: analyze popularity with COUNT(*) later.

alter table question_logs
  drop constraint if exists question_logs_question_hash_key;

alter table question_logs
  drop column if exists count;
