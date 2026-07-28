import { client } from '@/sanity/client';
import { urlFor } from '@/sanity/image';
import { PortableText } from '@portabletext/react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { FALLBACK_BLOG_DATABASE } from '@/sanity/fallbackData';

export const revalidate = 60; // Refresh cache at most once every 60 seconds

// Generate static paths for all existing posts + fallback posts at build time
export async function generateStaticParams() {
  let posts = [];
  try {
    posts = await client.fetch(`*[_type == "blogPost"]{ "slug": slug.current }`);
  } catch (e) {
    // Ignore error
  }
  const sanitySlugs = posts.map((post) => ({ slug: post.slug }));
  const fallbackSlugs = Object.keys(FALLBACK_BLOG_DATABASE).map((slug) => ({ slug }));
  return [...sanitySlugs, ...fallbackSlugs];
}

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }) {
  const { slug } = await params;
  let post = null;

  try {
    post = await client.fetch(
      `*[_type == "blogPost" && slug.current == $slug][0]{ title, snippet }`,
      { slug }
    );
  } catch (e) {
    // Ignore error
  }

  if (!post) {
    const fallbackPost = FALLBACK_BLOG_DATABASE[slug];
    if (fallbackPost) {
      post = {
        title: fallbackPost.title,
        snippet: fallbackPost.snippet
      };
    }
  }

  if (!post) {
    return {
      title: 'Post Not Found — Wander & Wayfare',
    };
  }

  return {
    title: `${post.title} — Wander & Wayfare`,
    description: post.snippet,
  };
}

// Custom block rendering for portable text elements matching style.css rules
const portableTextComponents = {
  block: {
    h4: ({ children }) => <h4>{children}</h4>,
    blockquote: ({ children }) => <blockquote>{children}</blockquote>,
    normal: ({ children }) => <p>{children}</p>,
  },
  list: {
    bullet: ({ children }) => <ul>{children}</ul>,
    number: ({ children }) => <ol>{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
};

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  let post = null;

  try {
    post = await client.fetch(
      `*[_type == "blogPost" && slug.current == $slug][0]{
        title,
        category,
        date,
        readTime,
        image,
        authorName,
        authorInitials,
        content
      }`,
      { slug }
    );
  } catch (error) {
    // Ignore fetch error
  }

  // If not found in Sanity, load from local fallback database
  if (!post) {
    const fallbackPost = FALLBACK_BLOG_DATABASE[slug];
    if (fallbackPost) {
      post = {
        ...fallbackPost,
        isFallback: true
      };
    }
  }

  if (!post) {
    notFound();
  }

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
    <div className="wrap" style={{ margin: '60px auto', maxWidth: '860px' }}>
      <div 
        className="blog-modal-container" 
        style={{ 
          maxHeight: 'none', 
          boxShadow: '0 20px 40px rgba(0,0,0,0.06)', 
          width: '100%', 
          border: '1px solid rgba(0,0,0,0.06)',
          display: 'block' 
        }}
      >
        <Link 
          href="/blog" 
          className="blog-modal-close" 
          style={{ textDecoration: 'none' }}
          aria-label="Back to blogs"
        >
          &times;
        </Link>
        
        <div className="blog-modal-hero">
          {post.image ? (
            <img 
              className="blog-modal-hero-img" 
              src={urlFor(post.image).width(1200).height(600).url()} 
              alt={post.title} 
            />
          ) : post.imageUrl ? (
            <img 
              className="blog-modal-hero-img" 
              src={post.imageUrl} 
              alt={post.title} 
            />
          ) : null}
          
          <div className="blog-modal-hero-content">
            <span className="hero-tag">{post.category}</span>
            <h2>{post.title}</h2>
            
            <div className="blog-modal-meta-row">
              <div className="blog-modal-author">
                <div className="avatar">{post.authorInitials}</div>
                <div className="blog-modal-author-info">
                  <b className="author-name">{post.authorName}</b>
                </div>
              </div>
              
              <div className="blog-modal-stats">
                <span className="post-date">{formatDate(post.date)}</span>
                <span>&bull;</span>
                <span className="post-readtime">{post.readTime}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="blog-modal-body">
          {post.isFallback ? (
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          ) : (
            <PortableText value={post.content} components={portableTextComponents} />
          )}
        </div>
      </div>
    </div>
  );
}
