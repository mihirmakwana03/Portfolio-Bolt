import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { question, context } = req.body;
  if (!question || !context) return res.status(400).json({ error: 'missing fields' });

  const systemPrompt = `You are a helpful assistant answering questions about Mihir Makwana, an MSc AI student at Kingston University seeking AI/ML internships. Use ONLY the context provided below. If the context does not contain the answer, say "I don't have that information about Mihir — try asking him directly via the contact form." Be concise (2-3 sentences). Speak about Mihir in third person.

CONTEXT:
${context}`;

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'groq/compound',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: question },
      ],
      temperature: 0.3,
      max_tokens: 300,
    }),
  });

  if (!response.ok) return res.status(500).json({ error: 'LLM call failed' });
  const data = await response.json();
  res.json({ answer: data.choices[0].message.content });
}
