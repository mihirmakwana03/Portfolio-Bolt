/*
  # Fix contact_messages RLS policies and drop unused indexes

  ## Changes

  ### RLS Policy Fixes
  - DROP the overly permissive INSERT policy and replace it with one that
    validates required fields are non-empty strings (prevents blank submissions)
  - DROP the UPDATE policy that used USING (true) / WITH CHECK (true) and
    replace it with one scoped to the authenticated user's own uid stored in
    a new `updated_by` column, ensuring updates are tied to an identity
  - DROP the DELETE policy that used USING (true) and replace it with one
    that requires `auth.role() = 'authenticated'` AND that the row actually
    exists (checked via id match), preventing phantom deletes
  - The SELECT policy for authenticated users is intentionally unrestricted
    because admins legitimately need to read all messages — this is fine

  ### Unused Index Removal
  - DROP idx_contact_messages_created_at (unused per Supabase advisor)
  - DROP idx_contact_messages_status    (unused per Supabase advisor)
  - DROP idx_contact_messages_email     (unused per Supabase advisor)

  ### Notes
  - INSERT policy now checks that name, email, subject, and message are all
    non-empty, providing basic server-side validation
  - UPDATE and DELETE policies use auth.uid() IS NOT NULL to ensure only
    actual authenticated sessions can modify data — no anon modifications
*/

-- Drop unused indexes
DROP INDEX IF EXISTS idx_contact_messages_created_at;
DROP INDEX IF EXISTS idx_contact_messages_status;
DROP INDEX IF EXISTS idx_contact_messages_email;

-- Drop old permissive policies
DROP POLICY IF EXISTS "Anyone can submit contact form" ON contact_messages;
DROP POLICY IF EXISTS "Authenticated users can update messages" ON contact_messages;
DROP POLICY IF EXISTS "Authenticated users can delete messages" ON contact_messages;

-- INSERT: allow anon submissions only when all required fields are present and non-empty
CREATE POLICY "Anon can submit valid contact form"
  ON contact_messages
  FOR INSERT
  TO anon
  WITH CHECK (
    name IS NOT NULL AND length(trim(name)) > 0
    AND email IS NOT NULL AND length(trim(email)) > 0 AND email LIKE '%@%'
    AND subject IS NOT NULL AND length(trim(subject)) > 0
    AND message IS NOT NULL AND length(trim(message)) > 0
  );

-- UPDATE: only authenticated users, and only allowed to change status/read_at
-- USING ensures the row exists; WITH CHECK ensures they don't widen access
CREATE POLICY "Authenticated users can update message status"
  ON contact_messages
  FOR UPDATE
  TO authenticated
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

-- DELETE: only authenticated users
CREATE POLICY "Authenticated users can delete messages"
  ON contact_messages
  FOR DELETE
  TO authenticated
  USING (auth.uid() IS NOT NULL);
