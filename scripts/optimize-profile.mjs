/**
 * Regenerates optimized profile WebP/JPEG (800×800) and public favicon from the best available source.
 */
import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { mkdirSync, existsSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const publicDir = join(root, 'public');

const candidates = [
  join(root, 'src/assets/IMG_0858.jpeg'),
  join(root, 'src/assets/profile-800.jpg'),
];
const src = candidates.find((p) => existsSync(p));

if (!src) {
  console.error('No source image; add a JPEG under src/assets or restore IMG_0858.jpeg.');
  process.exit(1);
}

if (!existsSync(publicDir)) {
  mkdirSync(publicDir, { recursive: true });
}

const resizeOpts = { fit: 'cover', position: 'attention' };

await sharp(src)
  .resize(800, 800, resizeOpts)
  .webp({ quality: 85 })
  .toFile(join(root, 'src/assets/profile-800.webp'));

await sharp(src)
  .resize(800, 800, resizeOpts)
  .jpeg({ quality: 85, mozjpeg: true })
  .toFile(join(root, 'src/assets/profile-800.jpg'));

await sharp(src)
  .resize(48, 48, resizeOpts)
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(join(publicDir, 'favicon.jpg'));

console.log('Wrote profile-800.webp, profile-800.jpg, public/favicon.jpg');
