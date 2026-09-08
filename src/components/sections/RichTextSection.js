import { PortableText } from '@portabletext/react';
import { urlFor } from '@/sanity/image';

// Portable Text component map — reuses the same styles as the blog post body (.blog-modal-body)
const portableTextComponents = {
  block: {
    normal: ({ children }) => <p>{children}</p>,
    h2: ({ children }) => <h2>{children}</h2>,
    h3: ({ children }) => <h3>{children}</h3>,
    h4: ({ children }) => <h4>{children}</h4>,
    blockquote: ({ children }) => <blockquote>{children}</blockquote>,
  },
  list: {
    bullet: ({ children }) => <ul>{children}</ul>,
    number: ({ children }) => <ol>{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
  marks: {
    link: ({ children, value }) => (
      <a href={value?.href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }) => {
      const src = value?.asset?._ref
        ? urlFor(value).width(900).url()
        : null;
      if (!src) return null;
      return (
        <figure style={{ margin: '32px 0' }}>
          <img
            src={src}
            alt={value.alt || ''}
            style={{ borderRadius: 'var(--radius)', width: '100%' }}
          />
          {value.caption && (
            <figcaption
              style={{
                textAlign: 'center',
                fontSize: '0.82rem',
                color: 'var(--muted)',
                marginTop: '8px',
              }}
            >
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};

export default function RichTextSection({ section }) {
  const { sectionHeading, content, alignment = 'left' } = section;

  if (!content || content.length === 0) return null;

  return (
    <div className="wrap" style={{ margin: '80px auto' }}>
      {sectionHeading && (
        <div
          className="section-head fade-up"
          style={{ justifyContent: alignment === 'center' ? 'center' : 'flex-start' }}
        >
          <div style={{ textAlign: alignment }}>
            <h2>{sectionHeading}</h2>
          </div>
        </div>
      )}
      <div
        className="blog-modal-body"
        style={{
          padding: 0,
          textAlign: alignment,
          maxWidth: '760px',
          margin: sectionHeading ? '32px auto 0' : '0 auto',
        }}
      >
        <PortableText value={content} components={portableTextComponents} />
      </div>
    </div>
  );
}
