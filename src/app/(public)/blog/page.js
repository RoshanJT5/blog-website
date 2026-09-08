import { client } from '@/sanity/client';
import BlogList from '@/components/BlogList';
import { FALLBACK_BLOG_DATABASE } from '@/sanity/fallbackData';

export const revalidate = 60;

const FALLBACK_POSTS = Object.entries(FALLBACK_BLOG_DATABASE).map(([slug, data]) => ({
  slug,
  ...data,
}));

// ─── Metadata — reads from siteSettings defaults if no page-specific SEO ──────
export async function generateMetadata() {
  try {
    const settings = await client.fetch(
      `*[_type == "siteSettings"][0]{ defaultMetaTitle, defaultMetaDescription }`
    );
    return {
      title: 'Blogs — ' + (settings?.defaultMetaTitle?.replace(/ — .+/, '') || 'Wander & Wayfare'),
      description: settings?.defaultMetaDescription
        || 'Stories from every corner of the map. Destinations, lifestyle notes, food trails and culture pieces.',
    };
  } catch (_) {
    return {
      title: 'Blogs — Wander & Wayfare',
      description: 'Stories from every corner of the map. Destinations, lifestyle notes, food trails and culture pieces.',
    };
  }
}

export default async function BlogPage() {
  let posts = [];

  try {
    const fetched = await client.fetch(`
      *[_type == "blogPost"] | order(date desc) {
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
      }
    `);
    if (fetched?.length > 0) posts = fetched;
  } catch (error) {
    console.error('BlogPage: Sanity fetch failed, using fallbacks:', error.message);
  }

  const displayPosts = posts.length > 0 ? posts : FALLBACK_POSTS;

  return (
    <>
      <section className="page-hero">
        <span className="hero-tag">The Journal</span>
        <h1>Stories from every corner of the map</h1>
        <p>Destinations, lifestyle notes, food trails and culture pieces — filtered however you like.</p>
      </section>

      <div className="wrap">
        <BlogList initialPosts={displayPosts} />

        <div className="cta-banner fade-up">
          <h3>Never miss a story</h3>
          <p>Join thousands of readers getting our best travel writing weekly.</p>
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
