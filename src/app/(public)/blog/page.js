import { client } from '@/sanity/client';
import BlogList from '@/components/BlogList';

export const revalidate = 60; // Refresh cache at most once every 60 seconds (revalidated instantly on webhook publish)

export const metadata = {
  title: 'Blogs — Wander & Wayfare',
  description: 'Stories from every corner of the map. Destinations, lifestyle notes, food trails and culture pieces.',
};


import { FALLBACK_BLOG_DATABASE } from '@/sanity/fallbackData';

const FALLBACK_POSTS = Object.entries(FALLBACK_BLOG_DATABASE).map(([slug, data]) => ({
  slug,
  ...data
}));

export default async function BlogPage() {
  let posts = [];
  try {
    const fetchedPosts = await client.fetch(`*[_type == "blogPost"] | order(date desc) {
      title,
      "slug": slug.current,
      category,
      date,
      readTime,
      image,
      authorName,
      authorInitials,
      snippet
    }`);
    if (fetchedPosts && fetchedPosts.length > 0) {
      posts = fetchedPosts;
    }
  } catch (error) {
    console.error('Failed to fetch blog posts from Sanity, using fallbacks:', error.message);
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
