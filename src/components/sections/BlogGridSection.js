import Link from 'next/link';
import { client } from '@/sanity/client';
import { urlFor } from '@/sanity/image';

// Fetches posts server-side based on selectionMode:
//   'latest'   — most recent N posts
//   'featured' — posts with isFeatured: true
//   'manual'   — posts explicitly selected in the schema
async function fetchPosts(section) {
  const { selectionMode = 'latest', postCount = 3, selectedPosts = [] } = section;

  try {
    if (selectionMode === 'manual' && selectedPosts.length > 0) {
      const ids = selectedPosts.map(p => p._ref || p._id).filter(Boolean);
      return await client.fetch(
        `*[_type == "blogPost" && _id in $ids]{
          title, "slug": slug.current,
          "category": select(defined(categoryRef) => categoryRef->name, category),
          date, readTime, image,
          "authorName": select(defined(authorRef) => authorRef->name, authorName),
          "authorInitials": select(defined(authorRef) => authorRef->initials, authorInitials),
          snippet
        }`,
        { ids }
      );
    }
    if (selectionMode === 'featured') {
      return await client.fetch(
        `*[_type == "blogPost" && isFeatured == true] | order(date desc) [0...$count]{
          title, "slug": slug.current,
          "category": select(defined(categoryRef) => categoryRef->name, category),
          date, readTime, image,
          "authorName": select(defined(authorRef) => authorRef->name, authorName),
          "authorInitials": select(defined(authorRef) => authorRef->initials, authorInitials),
          snippet
        }`,
        { count: postCount - 1 }
      );
    }
    // Default: latest
    return await client.fetch(
      `*[_type == "blogPost"] | order(date desc) [0...$count]{
        title, "slug": slug.current,
        "category": select(defined(categoryRef) => categoryRef->name, category),
        date, readTime, image,
        "authorName": select(defined(authorRef) => authorRef->name, authorName),
        "authorInitials": select(defined(authorRef) => authorRef->initials, authorInitials),
        snippet
      }`,
      { count: postCount - 1 }
    );
  } catch (err) {
    console.error('BlogGridSection fetch error:', err.message);
    return [];
  }
}

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
};

export default async function BlogGridSection({ section }) {
  const { heading } = section;
  const posts = await fetchPosts(section);

  if (!posts.length) return null;

  return (
    <div className="wrap" style={{ margin: '80px auto' }}>
      {heading && (
        <div className="section-head fade-up">
          <div><h2>{heading}</h2></div>
          <Link href="/blog" className="view-all">View all articles →</Link>
        </div>
      )}

      <div className="blog-grid">
        {posts.map((post) => (
          <Link href={`/blog/${post.slug}`} key={post.slug} className="card fade-up in">
            <article style={{ height: '100%' }}>
              <div className="card-media">
                <span className="tag-pill">{post.category}</span>
                {post.image && (
                  <img src={urlFor(post.image).width(600).height(450).url()} alt={post.title} />
                )}
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
    </div>
  );
}
