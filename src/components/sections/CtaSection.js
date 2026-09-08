import Link from 'next/link';

// Matches the .cta-banner pattern used on home, blog, and about pages
export default function CtaSection({ section }) {
  const { heading, description, primaryCta, secondaryCta } = section;

  return (
    <div className="wrap">
      <div className="cta-banner fade-up">
        {heading && <h3>{heading}</h3>}
        {description && <p>{description}</p>}

        <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {primaryCta?.text && primaryCta?.url && (
            <Link
              href={primaryCta.url}
              className={primaryCta.variant === 'magnetic' ? 'btn-magnetic' : 'btn-signup'}
            >
              {primaryCta.text}
            </Link>
          )}
          {secondaryCta?.text && secondaryCta?.url && (
            <Link
              href={secondaryCta.url}
              className={secondaryCta.variant === 'magnetic' ? 'btn-magnetic' : 'btn-signup'}
            >
              {secondaryCta.text}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
