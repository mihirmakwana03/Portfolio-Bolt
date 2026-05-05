export const config = { runtime: 'edge' };

/**
 * Anonymous question logging endpoint
 * Stores SHA-256 hashes of unique questions (no IP, no PII)
 * This creates a flywheel: track what users ask → improve KB after 1 month
 */
export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  const { questionHash } = await req.json();
  if (!questionHash || typeof questionHash !== 'string') {
    return new Response('Missing or invalid questionHash', { status: 400 });
  }

  try {
    // Log to Supabase (if env vars set)
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      // Logging not configured, silently succeed
      return new Response(JSON.stringify({ logged: false }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const res = await fetch(`${supabaseUrl}/rest/v1/question_logs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
      },
      body: JSON.stringify({
        question_hash: questionHash,
        created_at: new Date().toISOString(),
      }),
    });

    if (!res.ok) {
      console.error('Supabase logging failed:', res.statusText);
      // Don't fail the request if logging fails
    }

    return new Response(JSON.stringify({ logged: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Question logging error:', err);
    // Silently fail logging errors; this endpoint should not break user experience
    return new Response(JSON.stringify({ logged: false }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
