#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

// Dynamic import to avoid bundling issues when this file is executed in environments
// that don't have @xenova/transformers installed globally.
const { pipeline } = await import('@xenova/transformers');

const kbPath = path.resolve('./public/kb.json');
if (!fs.existsSync(kbPath)) {
  console.error('Missing public/kb.json — run `npm run build:kb` first.');
  process.exit(2);
}

const kb = JSON.parse(fs.readFileSync(kbPath, 'utf8'));
const question = process.argv[2] || 'Is Mihir open to internships?';

function cosine(a, b) {
  let s = 0;
  for (let i = 0; i < a.length; i++) s += a[i] * b[i];
  return s;
}

async function main() {
  console.log('Embedding question:', question);
  const embedder = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
  const q = await embedder(question, { pooling: 'mean', normalize: true });
  const qVec = Array.from(q.data);

  const ranked = kb.chunks
    .map((c) => ({ ...c, score: cosine(qVec, c.embedding) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  console.log('\nTop 3 matching chunks:');
  ranked.forEach((c, i) => {
    console.log(`\n${i + 1}. [${c.source}] ${c.title || c.id} — score=${c.score.toFixed(4)}`);
    console.log(c.text.slice(0, 300).replace(/\n/g, ' ') + (c.text.length > 300 ? '…' : ''));
  });

  const context = ranked.map((c) => c.text).join('\n\n---\n\n');

  if (!process.env.GROQ_API_KEY) {
    console.log('\nGROQ_API_KEY not set — skipping LLM call.');
    console.log('To run the full end-to-end test, set the environment variable and re-run:');
    console.log('\n  GROQ_API_KEY=sk-... npm run test:e2e\n');
    return;
  }

  console.log('\nCalling Groq LLM with top-3 context...');

  const systemPrompt = `You are a helpful assistant answering questions about Mihir Makwana, an MSc AI student at Kingston University seeking AI/ML internships. Use ONLY the context provided below. If the context does not contain the answer, say "I don't have that information about Mihir — try asking him directly via the contact form." Be concise (2-3 sentences). Speak about Mihir in third person.

CONTEXT:
${context}`;

  const payload = {
    model: 'groq/compound',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: question },
    ],
    temperature: 0.3,
    max_tokens: 300,
  };

  const resp = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
    },
    body: JSON.stringify(payload),
  });

  if (!resp.ok) {
    console.error('LLM call failed:', resp.status, await resp.text());
    process.exit(3);
  }

  const data = await resp.json();
  console.log('\nLLM answer:\n');
  console.log(data.choices?.[0]?.message?.content || JSON.stringify(data, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
