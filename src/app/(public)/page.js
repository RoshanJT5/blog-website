import Link from 'next/link';
import { client } from '@/sanity/client';
import { urlFor } from '@/sanity/image';
import HeroSlider from '@/components/HeroSlider';

export const revalidate = 60; // Refresh cache at most once every 60 seconds

// Fallback data matching static HTML assets
const FALLBACK_SETTINGS = {
  title: 'Wander & Wayfare — Travel & Lifestyle Blog',
  logoText: 'Wander',
  logoHighlight: '&Wayfare',
  footerDescription: 'Stories, guides and honest advice for people who\'d rather be somewhere else. Independently written, always ad-free of nonsense.',
  curatedStaysCount: 78,
  curatedStaysLabel: 'Curated stays added this month',
  promoHeader: 'Find your next stay before your next story.',
  promoButtonText: 'Booking Now →',
  promoCoastText: 'Beyond accommodation, creating memories of a lifetime.',
};

const FALLBACK_SLIDES = [
  {
    title: 'Exploring the Wonders of the Desert Canyons',
    tag: 'Featured Story',
    description: 'A journey through sunlit cliffs, endless dunes and the quiet magic of golden hour in the American Southwest.',
    image: {
      _type: 'image',
      fallbackUrl: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?q=80&w=1600&auto=format&fit=crop'
    },
    buttonText: 'Read Full Story',
    linkedPost: { slug: 'desert-canyons', authorName: 'Jane Doe', authorInitials: 'JD', readTime: '7 min read' }
  },
  {
    title: 'Hidden Alpine Lakes Worth the Hike',
    tag: 'Featured Story',
    description: 'Beyond the crowded trailheads lie turquoise waters and silence you can only find above 2,000 meters.',
    image: {
      _type: 'image',
      fallbackUrl: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=1600&auto=format&fit=crop'
    },
    buttonText: 'Read Full Story',
    linkedPost: { slug: 'alpine-lakes', authorName: 'Maya Khan', authorInitials: 'MK', readTime: '5 min read' }
  },
  {
    title: 'Street Food Trails of Southeast Asia',
    tag: 'Featured Story',
    description: 'From smoky night markets to family-run stalls passed down three generations, this is where the real flavor lives.',
    image: {
      _type: 'image',
      fallbackUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1600&auto=format&fit=crop'
    },
    buttonText: 'Read Full Story',
    linkedPost: { slug: 'street-food', authorName: 'Liam Park', authorInitials: 'LP', readTime: '6 min read' }
  },
  {
    title: 'Coastal Cliffs You\'ve Probably Never Heard Of',
    tag: 'Featured Story',
    description: 'Skip the postcard spots — these lesser-known coastlines deliver the same drama with none of the crowds.',
    image: {
      _type: 'image',
      fallbackUrl: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1600&auto=format&fit=crop'
    },
    buttonText: 'Read Full Story',
    linkedPost: { slug: 'coastal-cliffs', authorName: 'Sara Nunez', authorInitials: 'SN', readTime: '5 min read' }
  }
];

const FALLBACK_POSTS = [
  {
    title: 'Hidden Alpine Lakes Worth the Hike',
    slug: 'alpine-lakes',
    category: 'Destination',
    date: '2026-07-12',
    readTime: '5 min read',
    imageUrl: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=900&auto=format&fit=crop',
    authorName: 'Maya Khan',
    authorInitials: 'MK',
    snippet: 'Beyond the crowded trailheads lie turquoise waters and silence you can only find above 2,000 meters.'
  },
  {
    title: 'The Case for Slow Travel in 2026',
    slug: 'slow-travel',
    category: 'Lifestyle',
    date: '2026-07-08',
    readTime: '4 min read',
    imageUrl: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=900&auto=format&fit=crop',
    authorName: 'Rosh Talwar',
    authorInitials: 'RT',
    snippet: 'Fewer stops, longer stays — why unhurried itineraries are quietly becoming the smartest way to see the world.'
  },
  {
    title: 'Street Food Trails of Southeast Asia',
    slug: 'street-food',
    category: 'Culinary',
    date: '2026-07-02',
    readTime: '6 min read',
    imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=900&auto=format&fit=crop',
    authorName: 'Liam Park',
    authorInitials: 'LP',
    snippet: 'From smoky night markets to family-run stalls passed down three generations, this is where the real flavor lives.'
  },
  {
    title: 'Coastal Cliffs You\'ve Probably Never Heard Of',
    slug: 'coastal-cliffs',
    category: 'Destination',
    date: '2026-06-29',
    readTime: '5 min read',
    imageUrl: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=900&auto=format&fit=crop',
    authorName: 'Sara Nunez',
    authorInitials: 'SN',
    snippet: 'Skip the postcard spots — these lesser-known coastlines deliver the same drama with none of the crowds.'
  },
  {
    title: 'A Weekend Lost in the Old Town',
    slug: 'old-town',
    category: 'Culture',
    date: '2026-06-24',
    readTime: '7 min read',
    imageUrl: 'https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=900&auto=format&fit=crop',
    authorName: 'Ana Ferreira',
    authorInitials: 'AF',
    snippet: 'Cobblestones, courtyard cafes and the kind of architecture that makes you stop mid-sentence.'
  },
  {
    title: 'Packing Light: A One-Bag Guide',
    slug: 'packing-light',
    category: 'Lifestyle',
    date: '2026-06-18',
    readTime: '3 min read',
    imageUrl: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=900&auto=format&fit=crop',
    authorName: 'Jane Doe',
    authorInitials: 'JD',
    snippet: 'Everything we\'ve learned about traveling for a month with nothing but a 35L backpack.'
  }
];

export async function generateMetadata() {
  let settings;
  try {
    settings = await client.fetch(`*[_type == "globalSettings"][0]{ title, description }`);
  } catch (e) {
    // Ignore error
  }
  return {
    title: settings?.title || FALLBACK_SETTINGS.title,
    description: settings?.description || FALLBACK_SETTINGS.footerDescription,
  };
}

export default async function HomePage() {
  let settings = FALLBACK_SETTINGS;
  let slides = FALLBACK_SLIDES;
  let posts = [];

  try {
    // 1. Fetch Global Settings
    const fetchedSettings = await client.fetch(`*[_type == "globalSettings"][0]`);
    if (fetchedSettings) settings = { ...FALLBACK_SETTINGS, ...fetchedSettings };

    // 2. Fetch Slides
    const fetchedSlides = await client.fetch(
      `*[_type == "heroSlide"] | order(order asc) {
        title,
        tag,
        description,
        image,
        buttonText,
        "linkedPost": linkedPost-> {
          title,
          readTime,
          authorName,
          authorInitials,
          "slug": slug.current
        }
      }`
    );
    if (fetchedSlides && fetchedSlides.length > 0) slides = fetchedSlides;

    // 3. Fetch Posts
    const fetchedPosts = await client.fetch(
      `*[_type == "blogPost"] | order(date desc) [0...6] {
        title,
        "slug": slug.current,
        category,
        date,
        readTime,
        image,
        authorName,
        authorInitials,
        snippet
      }`
    );
    if (fetchedPosts && fetchedPosts.length > 0) posts = fetchedPosts;
  } catch (error) {
    console.error('Failed to fetch from Sanity, using fallbacks:', error.message);
  }

  // Use fallback posts if database returned empty
  const displayPosts = posts.length > 0 ? posts : FALLBACK_POSTS;

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    });
  };

  return (
    <>
      <HeroSlider slides={slides} />

      <div className="wrap">
        <div className="section-head fade-up">
          <div>
            <h2>Latest Stories</h2>
            <p>Fresh perspectives from every corner of the world</p>
          </div>
          <Link href="/blog" className="view-all">
            View all articles →
          </Link>
        </div>

        <div className="blog-grid">
          {displayPosts.map((post) => (
            <Link href={`/blog/${post.slug}`} key={post.slug} className="card fade-up in">
              <article style={{ height: '100%' }}>
                <div className="card-media">
                  <span className="tag-pill">{post.category}</span>
                  {post.image ? (
                    <img
                      src={urlFor(post.image).width(600).height(450).url()}
                      alt={post.title}
                    />
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

        <div className="promo-split fade-up">
          <div className="promo-dark">
            <div>
              <span className="counter">{settings.curatedStaysCount}</span>
              <p>{settings.curatedStaysLabel}</p>
            </div>
            <div>
              <h3>{settings.promoHeader}</h3>
              <Link href="/contact" className="btn-magnetic">
                {settings.promoButtonText}
              </Link>
            </div>
          </div>
          <div className="promo-coast">
            <img
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1400&auto=format&fit=crop"
              alt="Coastal landscape"
            />
            <div className="promo-coast-text">
              <p>{settings.promoCoastText}</p>
            </div>
          </div>
        </div>

        <div className="cta-banner fade-up">
          <h3>Get stories in your inbox</h3>
          <p>One email a week. No spam, just the best of the road.</p>
          <form className="cta-form" data-demo-form="true">
            <input type="email" placeholder="you@example.com" required />
            <button type="submit">Subscribe</button>
          </form>
          <div className="form-msg"></div>
        </div>
      </div>
    </>
  );
}
