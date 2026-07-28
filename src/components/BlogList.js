'use client';

import { useState } from 'react';
import Link from 'next/link';
import { urlFor } from '@/sanity/image';

export default function BlogList({ initialPosts = [] }) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'destination', 'lifestyle', 'culinary', 'culture'];

  const filteredPosts = selectedCategory === 'all'
    ? initialPosts
    : initialPosts.filter(post => post.category?.toLowerCase() === selectedCategory);

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

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
      <div className="filter-bar">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {capitalize(cat)}
          </button>
        ))}
      </div>

      <div className="blog-grid">
        {filteredPosts.map((post) => (
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

      {filteredPosts.length === 0 && (
        <p style={{ textAlign: 'center', margin: '40px 0', color: 'var(--muted)' }}>
          No articles found in this category.
        </p>
      )}
    </>
  );
}
