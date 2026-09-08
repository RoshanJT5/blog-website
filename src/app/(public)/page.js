import Link from 'next/link';
import { client } from '@/sanity/client';
import { urlFor } from '@/sanity/image';
import HeroSlider from '@/components/HeroSlider';

export const revalidate = 60;

// ─── Fallback data (used when Sanity is unreachable or fields are empty) ───────
const FALLBACK_HOME = {
  storiesSectionHeading: 'Latest Stories',
  storiesSectionSubheading: 'Fresh perspectives from every corner of the world',
  storiesViewAllLabel: 'View all articles →',
  storiesCount: 6,
  promoCuratedCount: 78,
  promoCuratedLabel: 'Curated stays added this month',
  promoHeading: 'Find your next stay before your next story.',
  promoCta: { text: 'Booking Now →', url: '/contact' },
  promoCoastalText: 'Beyond accommodation, creating memories of a lifetime.',
  newsletterHeading: 'Get stories in your inbox',
  newsletterDescription: 'One email a week. No spam, just the best of the road.',
  newsletterButtonText: 'Subscribe',
  newsletterPlaceholder: 'you@example.com',
};

const FALLBACK_SLIDES = [
  {
    title: 'Exploring the Wonders of the Desert Canyons',
    tag: 'Featured Story',
    description: 'A journey through sunlit cliffs, endless dunes and the quiet magic of golden hour in the American Southwest.',
    image: { _type: 'image', fallbackUrl: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?q=80&w=1600&auto=format&fit=crop' },
    buttonText: 'Read Full Story',
    linkedPost: { slug: 'desert-canyons', authorName: 'Jane Doe', authorInitials: 'JD', readTime: '7 min read' },
  },
  {
    title: 'Hidden Alpine Lakes Worth the Hike',
    tag: 'Featured Story',
    description: 'Beyond the crowded trailheads lie turquoise waters and silence you can only find above 2,000 meters.',
    image: { _type: 'image', fallbackUrl: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=1600&auto=format&fit=crop' },
    buttonText: 'Read Full Story',
    linkedPost: { slug: 'alpine-lakes', authorName: 'Maya Khan', authorInitials: 'MK', readTime: '5 min read' },
  },
  {
    title: 'Street Food Trails of Southeast Asia',
    tag: 'Featured Story',
    description: 'From smoky night markets to family-run stalls passed down three generations, this is where the real flavor lives.',
    image: { _type: 'image', fallbackUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1600&auto=format&fit=crop' },
    buttonText: 'Read Full Story',
    linkedPost: { slug: 'street-food', authorName: 'Liam Park', authorInitials: 'LP', readTime: '6 min read' },
  },
  {
    title: "Coastal Cliffs You've Probably Never Heard Of",
    tag: 'Featured Story',
    description: 'Skip the postcard spots — these lesser-known coastlines deliver the same drama with none of the crowds.',
    image: { _type: 'image', fallbackUrl: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1600&auto=format&fit=crop' },
    buttonText: 'Read Full Story',
    linkedPost: { slug: 'coastal-cliffs', authorName: 'Sara Nunez', authorInitials: 'SN', readTime: '5 min read' },
  },
];

const FALLBACK_POSTS = [
  { title: 'Hidden Alpine Lakes Worth the Hike',      slug: 'alpine-lakes',  category: 'Destination', date: '2026-07-12', readTime: '5 min read', imageUrl: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=900&auto=format&fit=crop', authorName: 'Maya Khan',    authorInitials: 'MK', snippet: 'Beyond the crowded trailheads lie turquoise waters and silence you can only find above 2,000 meters.' },
  { title: 'The Case for Slow Travel in 2026',         slug: 'slow-travel',   category: 'Lifestyle',   date: '2026-07-08', readTime: '4 min read', imageUrl: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=900&auto=format&fit=crop', authorName: 'Rosh Talwar',  authorInitials: 'RT', snippet: 'Fewer stops, longer stays — why unhurried itineraries are quietly becoming the smartest way to see the world.' },
  { title: 'Street Food Trails of Southeast Asia',     slug: 'street-food',   category: 'Culinary',    date: '2026-07-02', readTime: '6 min read', imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=900&auto=format&fit=crop', authorName: 'Liam Park',   authorInitials: 'LP', snippet: 'From smoky night markets to family-run stalls passed down three generations, this is where the real flavor lives.' },
  { title: "Coastal Cliffs You've Probably Never Heard Of", slug: 'coastal-cliffs', category: 'Destination', date: '2026-06-29', readTime: '5 min read', imageUrl: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=900&auto=format&fit=crop', authorName: 'Sara Nunez',  authorInitials: 'SN', snippet: 'Skip the postcard spots — these lesser-known coastlines deliver the same drama with none of the crowds.' },
  { title: 'A Weekend Lost in the Old Town',           slug: 'old-town',      category: 'Culture',     date: '2026-06-24', readTime: '7 min read', imageUrl: 'https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=900&auto=format&fit=crop', authorName: 'Ana Ferreira', authorInitials: 'AF', snippet: 'Cobblestones, courtyard cafes and the kind of architecture that makes you stop mid-sentence.' },
  { title: 'Packing Light: A One-Bag Guide',           slug: 'packing-light', category: 'Lifestyle',   date: '2026-06-18', readTime: '3 min read', imageUrl: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=900&auto=format&fit=crop', authorName: 'Jane Doe',    authorInitials: 'JD', snippet: "Everything we've learned about traveling for a month with nothing but a 35L backpack." },
];

// ─── Metadata (reads from homePage SEO, falls back to siteSettings defaults) ──
export async function generateMetadata() {
  try {
    const data = await client.fetch(
      `*[_type == "homePage"][0]{ seo } | { "title": seo.metaTitle, "description": seo.metaDescription }`
    );
    if (data?.title) return { title: data.title, description: data.description };
    // Fall back to siteSettings defaults
    const settings = await client.fetch(
      `*[_type == "siteSettings"][0]{ defaultMetaTitle, defaultMetaDescription }`
    );
    if (settings?.defaultMetaTitle) return { title: settings.defaultMetaTitle, description: settings.defaultMetaDescription };
  } catch (_) { /* ignore */ }
  return {
    title: 'Wander & Wayfare — Travel & Lifestyle Blog',
    description: "Stories, guides and honest advice for people who'd rather be somewhere else.",
  };
}

export default async function HomePage() {
  // ── Data defaults ─────────────────────────────────────────────────────────
  let home   = FALLBACK_HOME;
  let slides = FALLBACK_SLIDES;
  let posts  = [];

  try {
    // 1. Fetch homePage singleton (new schema)
    const fetchedHome = await client.fetch(`
      *[_type == "homePage"][0]{
        storiesSectionHeading,
        storiesSectionSubheading,
        storiesViewAllLabel,
        storiesCount,
        promoCuratedCount,
        promoCuratedLabel,
        promoHeading,
        promoCta,
        promoCoastalImage,
        promoCoastalText,
        newsletterHeading,
        newsletterDescription,
        newsletterButtonText,
        newsletterPlaceholder
      }
    `);
    if (fetchedHome) home = { ...FALLBACK_HOME, ...fetchedHome };

    // 2. Hero slides
    const fetchedSlides = await client.fetch(`
      *[_type == "heroSlide"] | order(order asc) {
        title, tag, description, image, buttonText,
        "linkedPost": linkedPost-> {
          title, readTime, authorName, authorInitials,
          "slug": slug.current
        }
      }
    `);
    if (fetchedSlides?.length > 0) slides = fetchedSlides;

    // 3. Blog posts — respect the count set in homePage
    const count = home.storiesCount || 6;
    const fetchedPosts = await client.fetch(
      `*[_type == "blogPost"] | order(date desc) [0...$count] {
        title,
        "slug": slug.current,
        "category": select(
          defined(categoryRef) => categoryRef->name,
          category
        ),
        date, readTime, image,
        "authorName": select(
          defined(authorRef) => authorRef->name,
          authorName
        ),
        "authorInitials": select(
          defined(authorRef) => authorRef->initials,
          authorInitials
        ),
        snippet
      }`,
      { count: count - 1 } // GROQ [0...$count] is inclusive, so subtract 1
    );
    if (fetchedPosts?.length > 0) posts = fetchedPosts;
  } catch (error) {
    console.error('HomePage: Sanity fetch failed, using fallbacks:', error.message);
  }

  const displayPosts = posts.length > 0 ? posts : FALLBACK_POSTS;

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
  };

  // Resolve the coastal promo image URL
  const coastalImageUrl = home.promoCoastalImage?.asset?._ref
    ? urlFor(home.promoCoastalImage).width(1400).height(700).url()
    : 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1400&auto=format&fit=crop';

  // Resolve promo CTA — works for both the new button object and legacy string fields
  const promoCtaText = home.promoCta?.text || home.promoButtonText || 'Booking Now →';
  const promoCtaUrl  = home.promoCta?.url  || '/contact';

  return (
    <>
      <HeroSlider slides={slides} />

      <div className="wrap">
        {/* ── Latest Stories ─────────────────────────────────────────────── */}
        <div className="section-head fade-up">
          <div>
            <h2>{home.storiesSectionHeading}</h2>
            <p>{home.storiesSectionSubheading}</p>
          </div>
          <Link href="/blog" className="view-all">
            {home.storiesViewAllLabel}
          </Link>
        </div>

        <div className="blog-grid">
          {displayPosts.map((post) => (
            <Link href={`/blog/${post.slug}`} key={post.slug} className="card fade-up in">
              <article style={{ height: '100%' }}>
                <div className="card-media">
                  <span className="tag-pill">{post.category}</span>
                  {post.image ? (
                    <img src={urlFor(post.image).width(600).height(450).url()} alt={post.title} />
                  ) : post.imageUrl ? (
                    <img src={post.imageUrl} alt={post.title} />
                  ) : null}
                </div>
                <div className="card-meta">
                  <span>{formatDate(post.date)}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
                <h3>{post.title}</h3>
                <p className="snippet">{post.snippet}</p>
                <div className="card-author">
                  <div className="avatar">{post.authorInitials}</div>
                  <span>{post.authorName}</span>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* ── Promo Split ────────────────────────────────────────────────── */}
        <div className="promo-split fade-up">
          <div className="promo-dark">
            <div>
              <span className="counter">{home.promoCuratedCount}</span>
              <p>{home.promoCuratedLabel}</p>
            </div>
            <div>
              <h3>{home.promoHeading}</h3>
              <Link href={promoCtaUrl} className="btn-magnetic">
                {promoCtaText}
              </Link>
            </div>
          </div>
          <div className="promo-coast">
            <img src={coastalImageUrl} alt="Coastal landscape" />
            <div className="promo-coast-text">
              <p>{home.promoCoastalText}</p>
            </div>
          </div>
        </div>

        {/* ── Newsletter CTA Banner ──────────────────────────────────────── */}
        <div className="cta-banner fade-up">
          <h3>{home.newsletterHeading}</h3>
          <p>{home.newsletterDescription}</p>
          <form className="cta-form" data-demo-form="true">
            <input type="email" placeholder={home.newsletterPlaceholder} required />
            <button type="submit">{home.newsletterButtonText}</button>
          </form>
          <div className="form-msg"></div>
        </div>
      </div>
    </>
  );
}
