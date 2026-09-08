/**
 * restore-slides.mjs
 *
 * Restores the 4 original hero slider documents that were accidentally deleted.
 * Each slide links to the corresponding blogPost document by slug.
 *
 * Run from the cms-next folder:
 *   node scratch/restore-slides.mjs
 */

import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ─── Read .env.local ──────────────────────────────────────────────────────────
const envPath = path.resolve(__dirname, '../.env.local');
const envContent = fs.readFileSync(envPath, 'utf-8');
const env = {};
envContent.split('\n').forEach(line => {
  const parts = line.split('=');
  if (parts.length >= 2) env[parts[0].trim()] = parts.slice(1).join('=').trim();
});

const projectId = env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset   = env.NEXT_PUBLIC_SANITY_DATASET;
const token     = env.SANITY_WRITE_TOKEN || env.SANITY_API_READ_TOKEN;

if (!token) {
  console.error('❌  No token found in .env.local');
  process.exit(1);
}

const client = createClient({ projectId, dataset, apiVersion: '2023-05-03', useCdn: false, token });

// ─── Upload image helper ──────────────────────────────────────────────────────
async function uploadImage(url, filename) {
  try {
    console.log(`  📥 Uploading: ${filename}`);
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const asset = await client.assets.upload('image', Buffer.from(await res.arrayBuffer()), { filename });
    console.log(`  ✅ Asset: ${asset._id}`);
    return { _type: 'image', asset: { _type: 'reference', _ref: asset._id } };
  } catch (err) {
    console.warn(`  ⚠️  Image upload failed for ${filename}: ${err.message}`);
    return null;
  }
}

// ─── Original 4 slides (exact content from the live site) ────────────────────
const SLIDES = [
  {
    _id:         'hero-slide-desert-canyons',
    tag:         'Featured Story',
    title:       'Exploring the Wonders of the Desert Canyons',
    description: 'A journey through sunlit cliffs, endless dunes and the quiet magic of golden hour in the American Southwest.',
    imageUrl:    'https://images.unsplash.com/photo-1509316785289-025f5b846b35?q=80&w=1600&auto=format&fit=crop',
    imageFile:   'slide-desert-canyons.jpg',
    buttonText:  'Read Full Story',
    postSlug:    'desert-canyons',
    order:       1,
  },
  {
    _id:         'hero-slide-alpine-lakes',
    tag:         'Featured Story',
    title:       'Hidden Alpine Lakes Worth the Hike',
    description: 'Beyond the crowded trailheads lie turquoise waters and silence you can only find above 2,000 meters.',
    imageUrl:    'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=1600&auto=format&fit=crop',
    imageFile:   'slide-alpine-lakes.jpg',
    buttonText:  'Read Full Story',
    postSlug:    'alpine-lakes',
    order:       2,
  },
  {
    _id:         'hero-slide-street-food',
    tag:         'Featured Story',
    title:       'Street Food Trails of Southeast Asia',
    description: 'From smoky night markets to family-run stalls passed down three generations, this is where the real flavor lives.',
    imageUrl:    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1600&auto=format&fit=crop',
    imageFile:   'slide-street-food.jpg',
    buttonText:  'Read Full Story',
    postSlug:    'street-food',
    order:       3,
  },
  {
    _id:         'hero-slide-coastal-cliffs',
    tag:         'Featured Story',
    title:       "Coastal Cliffs You've Probably Never Heard Of",
    description: 'Skip the postcard spots — these lesser-known coastlines deliver the same drama with none of the crowds.',
    imageUrl:    'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1600&auto=format&fit=crop',
    imageFile:   'slide-coastal-cliffs.jpg',
    buttonText:  'Read Full Story',
    postSlug:    'coastal-cliffs',
    order:       4,
  },
];

async function run() {
  console.log('🚀 Restoring hero slides — project:', projectId, '— dataset:', dataset);
  console.log('─'.repeat(60));

  // Look up all blogPost IDs by slug in one query so we can wire up references
  const slugs = SLIDES.map(s => s.postSlug);
  let postMap = {};
  try {
    const posts = await client.fetch(
      `*[_type == "blogPost" && slug.current in $slugs]{ _id, "slug": slug.current }`,
      { slugs }
    );
    posts.forEach(p => { postMap[p.slug] = p._id; });
    console.log(`\n🔗 Found ${posts.length} matching blog post(s) to link slides to.\n`);
  } catch (err) {
    console.warn('⚠️  Could not fetch blog posts for linking:', err.message);
  }

  for (const slide of SLIDES) {
    console.log(`\n➡️  Restoring slide ${slide.order}: "${slide.title}"`);

    const image = await uploadImage(slide.imageUrl, slide.imageFile);

    const doc = {
      _id:         slide._id,
      _type:       'heroSlide',
      tag:         slide.tag,
      title:       slide.title,
      description: slide.description,
      buttonText:  slide.buttonText,
      order:       slide.order,
      mediaType:   'image',
      textAlignment: 'left',
      textColor:   '#ffffff',
      ...(image && { image }),
      // Wire up the reference to the blog post if we found it
      ...(postMap[slide.postSlug] && {
        linkedPost: {
          _type: 'reference',
          _ref:  postMap[slide.postSlug],
        },
      }),
    };

    try {
      await client.createOrReplace(doc);
      console.log(`  ✅ Restored: "${slide.title}"`);
    } catch (err) {
      console.error(`  ❌ Failed to restore "${slide.title}": ${err.message}`);
    }
  }

  console.log('\n' + '─'.repeat(60));
  console.log('✨ All 4 slides restored!');
  console.log('\nNext steps:');
  console.log('  1. Open Sanity Studio → Hero Slides');
  console.log('     You should see all 4 slides with images and linked posts.');
  console.log('  2. Open each slide → click Publish to push it live.');
  console.log('  3. Visit your site — the slider should be back.');
}

run().catch(err => {
  console.error('\n❌ Script failed:', err.message);
  if (err.message.includes('Insufficient permissions') || err.message.includes('403')) {
    console.error('\n💡 Your token is read-only. Add SANITY_WRITE_TOKEN to .env.local.');
    console.error('   Get one at https://www.sanity.io/manage → API → Tokens → Editor role');
  }
  process.exit(1);
});
