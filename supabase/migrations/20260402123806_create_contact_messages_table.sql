/*
  # Create Contact Messages Table

  ## Summary
  Creates a table to store contact form submissions from the portfolio website.

  ## Tables Created
  
  ### `contact_messages`
  Stores all contact form submissions with the following structure:
  - `id` (uuid, primary key) - Unique identifier for each message
  - `name` (text, required) - Name of the person contacting
  - `email` (text, required) - Email address of the sender
  - `subject` (text, required) - Subject line of the message
  - `message` (text, required) - Full message content
  - `ip_address` (text, optional) - IP address for spam prevention
  - `user_agent` (text, optional) - Browser user agent for tracking
  - `status` (text, default: 'new') - Message status (new, read, archived)
  - `created_at` (timestamptz) - Timestamp when message was submitted
  - `read_at` (timestamptz, optional) - Timestamp when message was marked as read

  ## Security
  - RLS is enabled on the table
  - Public users can INSERT (submit contact forms)
  - Only authenticated admins can SELECT, UPDATE, and DELETE
  - Rate limiting should be implemented at application level

  ## Indexes
  - Index on `created_at` for efficient chronological queries
  - Index on `status` for filtering messages
  - Index on `email` for checking repeat submissions

  ## Notes
  - The table allows anonymous submissions (no user authentication required)
  - IP address and user agent are stored for spam prevention
  - Messages default to 'new' status for admin review
*/

-- Create contact_messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text NOT NULL,
  message text NOT NULL,
  ip_address text,
  user_agent text,
  status text DEFAULT 'new' CHECK (status IN ('new', 'read', 'archived')),
  created_at timestamptz DEFAULT now(),
  read_at timestamptz
);

-- Enable Row Level Security
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can insert (submit contact form)
CREATE POLICY "Anyone can submit contact form"
  ON contact_messages
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy: Authenticated users can view all messages (for admin dashboard)
CREATE POLICY "Authenticated users can view all messages"
  ON contact_messages
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Authenticated users can update messages (mark as read, archive)
CREATE POLICY "Authenticated users can update messages"
  ON contact_messages
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policy: Authenticated users can delete messages
CREATE POLICY "Authenticated users can delete messages"
  ON contact_messages
  FOR DELETE
  TO authenticated
  USING (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at 
  ON contact_messages(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_contact_messages_status 
  ON contact_messages(status);

CREATE INDEX IF NOT EXISTS idx_contact_messages_email 
  ON contact_messages(email);
