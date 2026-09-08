/**
 * seed-content.mjs
 *
 * Seeds the Sanity dataset with all existing website content so clients can
 * find and edit real data immediately — no blank fields.
 *
 * Seeds:
 *   • siteSettings  (singleton)
 *   • homePage      (singleton)
 *   • aboutPage     (singleton)
 *   • contactPage   (singleton)
 *   • author        (4 documents: Jane Doe, Maya Khan, Liam Park, Sara Nunez)
 *   • category      (4 documents: Destination, Lifestyle, Culinary, Culture)
 *
 * Run from the cms-next folder:
 *   node scratch/seed-content.mjs
 *
 * ⚠️  Requires a WRITE token in .env.local:
 *   SANITY_WRITE_TOKEN=sk...
 *
 *   Get one at: https://www.sanity.io/manage
 *   → Your project → API → Tokens → Add API Token → Editor role
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
  if (parts.length >= 2) {
    env[parts[0].trim()] = parts.slice(1).join('=').trim();
  }
});

const projectId = env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset  = env.NEXT_PUBLIC_SANITY_DATASET;
// Prefer a dedicated write token; fall back to the read token (will fail on writes)
const token = env.SANITY_WRITE_TOKEN || env.SANITY_API_READ_TOKEN;

if (!token) {
  console.error('❌  No token found in .env.local. Add SANITY_WRITE_TOKEN=sk...');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2023-05-03',
  useCdn: false,
  token,
});

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Download an image URL and upload it to Sanity, returning a Sanity image object */
async function uploadImage(url, filename) {
  try {
    console.log(`  📥 Uploading image: ${filename}...`);
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buffer = await res.arrayBuffer();
    const asset = await client.assets.upload('image', Buffer.from(buffer), { filename });
    console.log(`  ✅ Uploaded: ${asset._id}`);
    return { _type: 'image', asset: { _type: 'reference', _ref: asset._id } };
  } catch (err) {
    console.warn(`  ⚠️  Could not upload ${filename}: ${err.message}. Field left empty.`);
    return undefined;
  }
}

/** Create a portable-text block from a plain string */
function block(text, style = 'normal') {
  return {
    _type: 'block',
    _key: Math.random().toString(36).slice(2, 9),
    style,
    children: [
      { _type: 'span', _key: Math.random().toString(36).slice(2, 9), text, marks: [] },
    ],
    markDefs: [],
  };
}

/** Upsert — create the document if it doesn't exist, patch if it does */
async function upsert(doc) {
  await client.createOrReplace(doc);
  console.log(`  ✅ Seeded: ${doc._type} — ${doc._id}`);
}

// ─── 1. Authors ───────────────────────────────────────────────────────────────
async function seedAuthors() {
  console.log('\n👤 Seeding authors...');

  const authors = [
    {
      _id: 'author-jane-doe',
      name: 'Jane Doe',
      slug: 'jane-doe',
      initials: 'JD',
      role: 'Founder & Editor',
      photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=500&auto=format&fit=crop',
      photoFilename: 'author-jane-doe.jpg',
      photoAlt: 'Jane Doe portrait',
      bio: 'Jane co-founded Wander & Wayfare in 2021. She writes about slow travel, independent adventures, and the kind of places that don\'t show up on listicles.',
    },
    {
      _id: 'author-maya-khan',
      name: 'Maya Khan',
      slug: 'maya-khan',
      initials: 'MK',
      role: 'Destinations Writer',
      photoUrl: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?q=80&w=500&auto=format&fit=crop',
      photoFilename: 'author-maya-khan.jpg',
      photoAlt: 'Maya Khan portrait',
      bio: 'Maya covers off-the-beaten-path destinations across Europe and Asia. She has a particular weakness for alpine landscapes and tiny guesthouses.',
    },
    {
      _id: 'author-liam-park',
      name: 'Liam Park',
      slug: 'liam-park',
      initials: 'LP',
      role: 'Culinary Editor',
      photoUrl: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=500&auto=format&fit=crop',
      photoFilename: 'author-liam-park.jpg',
      photoAlt: 'Liam Park portrait',
      bio: 'Liam eats his way through every city he visits. He has sampled street food in 38 countries and is convinced the best meal is always at a plastic stool.',
    },
    {
      _id: 'author-sara-nunez',
      name: 'Sara Nunez',
      slug: 'sara-nunez',
      initials: 'SN',
      role: 'Photography Lead',
      photoUrl: 'https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?q=80&w=500&auto=format&fit=crop',
      photoFilename: 'author-sara-nunez.jpg',
      photoAlt: 'Sara Nunez portrait',
      bio: 'Sara documents coastlines, cliff edges, and communities most photographers overlook. Her images have appeared in six travel publications.',
    },
  ];

  for (const a of authors) {
    const photo = await uploadImage(a.photoUrl, a.photoFilename);
    await upsert({
      _id: a._id,
      _type: 'author',
      name: a.name,
      slug: { _type: 'slug', current: a.slug },
      initials: a.initials,
      role: a.role,
      ...(photo && { photo }),
      photoAlt: a.photoAlt,
      bio: a.bio,
      socialLinks: [],
    });
  }
}

// ─── 2. Categories ────────────────────────────────────────────────────────────
async function seedCategories() {
  console.log('\n🏷️  Seeding categories...');

  const categories = [
    { _id: 'category-destination', name: 'Destination', slug: 'destination', description: 'Places to visit around the world — from hidden valleys to iconic cities.' },
    { _id: 'category-lifestyle',   name: 'Lifestyle',   slug: 'lifestyle',   description: 'Travel philosophy, packing tips, slow travel, and mindful adventures.' },
    { _id: 'category-culinary',    name: 'Culinary',    slug: 'culinary',    description: 'Food trails, street markets, and the stories behind every dish.' },
    { _id: 'category-culture',     name: 'Culture',     slug: 'culture',     description: 'Art, architecture, history, and the people who make a place unique.' },
  ];

  for (const c of categories) {
    await upsert({
      _id: c._id,
      _type: 'category',
      name: c.name,
      slug: { _type: 'slug', current: c.slug },
      description: c.description,
    });
  }
}

// ─── 3. Site Settings ─────────────────────────────────────────────────────────
async function seedSiteSettings() {
  console.log('\n⚙️  Seeding Site Settings...');

  await upsert({
    _id: 'siteSettings',
    _type: 'siteSettings',
    siteName: 'Wander & Wayfare',
    logoText: 'Wander',
    logoHighlight: '&Wayfare',
    accentColor: '#c98a4b',

    // Header nav — matches the existing Header.js links
    navLinks: [
      { _type: 'navigationLink', _key: 'nav-home',    label: 'Home',     url: '/',        openInNewTab: false },
      { _type: 'navigationLink', _key: 'nav-blog',    label: 'Blogs',    url: '/blog',    openInNewTab: false },
      { _type: 'navigationLink', _key: 'nav-about',   label: 'About Us', url: '/about',   openInNewTab: false },
      { _type: 'navigationLink', _key: 'nav-contact', label: 'Contact',  url: '/contact', openInNewTab: false },
    ],
    headerCta: {
      _type: 'button',
      text: 'Sign Up',
      url: '/contact',
      variant: 'primary',
    },

    // Footer — matches Footer.js
    footerDescription: "Stories, guides and honest advice for people who'd rather be somewhere else. Independently written, always ad-free of nonsense.",
    footerAboutLinks: [
      { _type: 'navigationLink', _key: 'fab-story', label: 'Our Story',   url: '/about', openInNewTab: false },
      { _type: 'navigationLink', _key: 'fab-team',  label: 'The Team',    url: '/about', openInNewTab: false },
      { _type: 'navigationLink', _key: 'fab-blog',  label: 'All Articles',url: '/blog',  openInNewTab: false },
    ],
    footerSupportLinks: [
      { _type: 'navigationLink', _key: 'fsl-contact', label: 'Contact Us',     url: '/contact',        openInNewTab: false },
      { _type: 'navigationLink', _key: 'fsl-faqs',    label: 'FAQs',           url: '/contact',        openInNewTab: false },
      { _type: 'navigationLink', _key: 'fsl-privacy', label: 'Privacy Policy', url: '/privacy-policy', openInNewTab: false },
    ],
    socialLinks: [
      { _type: 'socialLink', _key: 'sl-ig', platform: 'instagram', url: 'https://instagram.com' },
      { _type: 'socialLink', _key: 'sl-tw', platform: 'twitter',   url: 'https://x.com' },
      { _type: 'socialLink', _key: 'sl-pi', platform: 'pinterest', url: 'https://pinterest.com' },
    ],
    copyrightText: '© 2026 Wander & Wayfare. All rights reserved.',

    // Promo block fields (kept here for backward compat alongside homePage schema)
    curatedStaysCount: 78,
    curatedStaysLabel: 'Curated stays added this month',
    promoHeader: 'Find your next stay before your next story.',
    promoButtonText: 'Booking Now →',
    promoCoastText: 'Beyond accommodation, creating memories of a lifetime.',

    // SEO defaults
    defaultMetaTitle: 'Wander & Wayfare — Travel & Lifestyle Blog',
    defaultMetaDescription: "Stories, guides and honest advice for people who'd rather be somewhere else. Independently written, always ad-free of nonsense.",
  });
}

// ─── 4. Home Page ─────────────────────────────────────────────────────────────
async function seedHomePage() {
  console.log('\n🏠 Seeding Home Page...');

  const coastalImage = await uploadImage(
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1400&auto=format&fit=crop',
    'home-promo-coastal.jpg'
  );

  await upsert({
    _id: 'homePage',
    _type: 'homePage',

    // Hero slider section
    heroTagLine: 'Featured Story',

    // Latest Stories section — matches the "Latest Stories" block on homepage
    storiesSectionHeading: 'Latest Stories',
    storiesSectionSubheading: 'Fresh perspectives from every corner of the world',
    storiesViewAllLabel: 'View all articles →',
    storiesCount: 6,

    // Promo split block — matches the .promo-split section
    promoCuratedCount: 78,
    promoCuratedLabel: 'Curated stays added this month',
    promoHeading: 'Find your next stay before your next story.',
    promoCta: {
      _type: 'button',
      text: 'Booking Now →',
      url: '/contact',
      variant: 'magnetic',
    },
    ...(coastalImage && { promoCoastalImage: coastalImage }),
    promoCoastalText: 'Beyond accommodation, creating memories of a lifetime.',

    // Newsletter CTA banner — matches the .cta-banner at the bottom
    newsletterHeading: 'Get stories in your inbox',
    newsletterDescription: 'One email a week. No spam, just the best of the road.',
    newsletterButtonText: 'Subscribe',
    newsletterPlaceholder: 'you@example.com',

    // SEO
    seo: {
      _type: 'seo',
      metaTitle: 'Wander & Wayfare — Travel & Lifestyle Blog',
      metaDescription: "Stories, guides and honest advice for people who'd rather be somewhere else. Independently written, always ad-free of nonsense.",
    },
  });
}

// ─── 5. About Page ────────────────────────────────────────────────────────────
async function seedAboutPage() {
  console.log('\n📖 Seeding About Page...');

  const storyImage = await uploadImage(
    'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=900&auto=format&fit=crop',
    'about-story.jpg'
  );

  await upsert({
    _id: 'aboutPage',
    _type: 'aboutPage',

    // Page hero — matches <section className="page-hero">
    heroTag: 'Our Story',
    heroHeading: "Written by people who'd rather be traveling",
    heroDescription: "Wander & Wayfare started as a shared notes doc between three friends. It's now a small, independent publication read in over 40 countries.",

    // Story section — matches .about-grid (image left, text right)
    ...(storyImage && { storyImage }),
    storyImageAlt: 'Team on a coastal trip',
    storyHeading: 'Honest writing, no sponsored fluff',
    storyContent: [
      block('We started Wander & Wayfare in 2021 because we were tired of listicles that read like ads. Every piece we publish is written by someone who actually went there, paid their own way, and came back with something worth saying.'),
      block("Today we're a small team of writers, photographers and editors spread across four continents, publishing new stories every week — no affiliate-stuffed itineraries, no fake five-star reviews."),
      block('Just the kind of travel writing we always wanted to read ourselves.'),
    ],

    // Stats row — matches .stats-row
    stats: [
      { _type: 'statItem', _key: 'stat-stories',   value: '420+', label: 'Stories published' },
      { _type: 'statItem', _key: 'stat-countries', value: '63',   label: 'Countries covered' },
      { _type: 'statItem', _key: 'stat-readers',   value: '180K', label: 'Monthly readers' },
      { _type: 'statItem', _key: 'stat-years',     value: '5',    label: 'Years running' },
    ],

    // Team section — matches .team-grid
    teamSectionHeading: 'The people behind the stories',
    teamSectionSubheading: 'A small team, scattered across the world',
    // References the 4 author documents we seed above
    teamMembers: [
      { _type: 'reference', _key: 'tm-jane', _ref: 'author-jane-doe'   },
      { _type: 'reference', _key: 'tm-maya', _ref: 'author-maya-khan'  },
      { _type: 'reference', _key: 'tm-liam', _ref: 'author-liam-park'  },
      { _type: 'reference', _key: 'tm-sara', _ref: 'author-sara-nunez' },
    ],

    // CTA banner — matches .cta-banner "Want to write for us?"
    ctaHeading: 'Want to write for us?',
    ctaDescription: "We're always looking for new voices with real stories to tell.",
    ctaButton: {
      _type: 'button',
      text: 'Get in touch →',
      url: '/contact',
      variant: 'magnetic',
    },

    // SEO
    seo: {
      _type: 'seo',
      metaTitle: 'About Us — Wander & Wayfare',
      metaDescription: "Wander & Wayfare started as a shared notes doc between three friends. It's now a small, independent publication read in over 40 countries.",
    },
  });
}

// ─── 6. Contact Page ──────────────────────────────────────────────────────────
async function seedContactPage() {
  console.log('\n✉️  Seeding Contact Page...');

  await upsert({
    _id: 'contactPage',
    _type: 'contactPage',

    // Page hero — matches <section className="page-hero">
    heroTag: 'Get In Touch',
    heroHeading: "We'd love to hear from you",
    heroDescription: 'Pitches, partnerships, corrections, or just want to say hi — drop us a line below.',

    // Contact info panel — matches .contact-info
    contactPanelHeading: "Let's talk",
    contactPanelIntro: "Whether you're pitching a story, reporting a broken link, or want to collaborate on something bigger — we read every message ourselves.",
    email: 'hello@wanderwayfare.com',
    phone: '+91 98765 43210',
    address: 'Ahmedabad, Gujarat, India',
    businessHours: 'Mon–Fri, 9am–6pm IST',

    // SEO
    seo: {
      _type: 'seo',
      metaTitle: 'Contact — Wander & Wayfare',
      metaDescription: 'Get in touch with the Wander & Wayfare team for pitches, partnerships, corrections, or collaborations.',
    },
  });
}

// ─── Run ──────────────────────────────────────────────────────────────────────
async function run() {
  console.log('🚀 Seeding Sanity dataset:', dataset, '— project:', projectId);
  console.log('─'.repeat(60));

  // Authors and categories first because pages reference them
  await seedAuthors();
  await seedCategories();
  await seedSiteSettings();
  await seedHomePage();
  await seedAboutPage();
  await seedContactPage();

  console.log('\n' + '─'.repeat(60));
  console.log('✨ All content seeded successfully!');
  console.log('\nNext steps:');
  console.log('  1. Open Sanity Studio: https://blog-website-nu-sepia.vercel.app/onlyadmincanaccess');
  console.log('  2. Check Home Page, About Page, Contact Page — data should be pre-filled.');
  console.log('  3. Check Authors and Categories in the sidebar.');
  console.log('  4. Publish each document so changes go live on the frontend.');
}

run().catch(err => {
  console.error('\n❌ Seed script failed:', err.message);
  if (err.message.includes('Insufficient permissions') || err.message.includes('403')) {
    console.error('\n💡 Fix: Your token is read-only. Add a write token to .env.local:');
    console.error('   SANITY_WRITE_TOKEN=sk...');
    console.error('   Get one at https://www.sanity.io/manage → API → Tokens → Editor role');
  }
  process.exit(1);
});
