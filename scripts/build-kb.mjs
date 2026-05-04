import { pipeline, env } from '@xenova/transformers';
import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

// Ensure consistent behavior: allow caching but prefer remote models
env.allowLocalModels = false;

const KNOWLEDGE_DIR = './knowledge';
const OUTPUT = './public/kb.json';

function normalizeTitle(title) {
  return title.replace(/^#{1,6}\s+/, '').trim();
}

// Split a markdown file into chunks at ## headings
function chunkMarkdown(text, source) {
  const sections = text.split(/^## /m).filter(Boolean);
  return sections
    .map((s, i) => {
    const lines = s.split('\n');
    const title = normalizeTitle(lines[0]);
    const body = lines.slice(1).join('\n').trim();
    return {
      id: `${source}-${i}`,
      source,
      title,
      text: body ? `${title}\n\n${body}` : title,
    };
    })
    .filter((chunk) => chunk.text.trim().length > 0);
}

console.log('Loading embedding model (one-time download ~25MB)...');
const embedder = await pipeline(
  'feature-extraction',
  'Xenova/all-MiniLM-L6-v2',
);

const files = readdirSync(KNOWLEDGE_DIR).filter((f) => f.endsWith('.md'));
const allChunks = [];
for (const file of files) {
  const text = readFileSync(join(KNOWLEDGE_DIR, file), 'utf8');
  allChunks.push(...chunkMarkdown(text, file));
}

console.log(`Embedding ${allChunks.length} chunks...`);
for (const chunk of allChunks) {
  const out = await embedder(chunk.text, { pooling: 'mean', normalize: true });
  chunk.embedding = Array.from(out.data);
}

writeFileSync(OUTPUT, JSON.stringify({ chunks: allChunks }));
console.log(`Wrote ${allChunks.length} chunks → ${OUTPUT}`);