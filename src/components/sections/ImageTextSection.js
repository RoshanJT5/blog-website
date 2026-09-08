import Link from 'next/link';
import { urlFor } from '@/sanity/image';
import { PortableText } from '@portabletext/react';

// Matches the .about-grid two-column layout pattern from globals.css
// layout: 'imageLeft' (default) | 'imageRight'
export default function ImageTextSection({ section }) {
  const { heading, description, image, imageAlt, layout = 'imageLeft', cta } = section;

  const imageUrl = image?.asset?._ref
    ? urlFor(image).width(900).height(1125).url()
    : null;

  const isImageRight = layout === 'imageRight';

  const imgEl = imageUrl ? (
    <img
      src={imageUrl}
      alt={imageAlt || heading || ''}
      style={{ borderRadius: 'var(--radius)', aspectRatio: '4/5', objectFit: 'cover', width: '100%' }}
    />
  ) : null;

  const textEl = (
    <div>
      {heading && <h2 style={{ fontSize: '1.9rem', marginBottom: '18px' }}>{heading}</h2>}
      {description && (
        <div style={{ color: '#5a5750', lineHeight: 1.7 }}>
          {Array.isArray(description) ? (
            <PortableText
              value={description}
              components={{ block: { normal: ({ children }) => <p style={{ marginBottom: '16px' }}>{children}</p> } }}
            />
          ) : (
            <p>{description}</p>
          )}
        </div>
      )}
      {cta?.text && cta?.url && (
        <Link
          href={cta.url}
          className={cta.variant === 'magnetic' ? 'btn-magnetic' : 'btn-signup'}
          style={{ marginTop: '24px', display: 'inline-flex' }}
        >
          {cta.text}
        </Link>
      )}
    </div>
  );

  return (
    <div className="wrap">
      <div
        className="about-grid"
        style={{ direction: isImageRight ? 'rtl' : 'ltr' }}
      >
        {/* Reset direction for inner text so it stays LTR */}
        <div style={{ direction: 'ltr' }}>{isImageRight ? textEl : imgEl}</div>
        <div style={{ direction: 'ltr' }}>{isImageRight ? imgEl : textEl}</div>
      </div>
    </div>
  );
}
