import Link from 'next/link';
import { urlFor } from '@/sanity/image';

// Matches the .page-hero pattern used on About, Contact, Blog listing pages.
// If a background image is provided it renders as a full-bleed dark hero with overlay.
// Layout variant "left" keeps text left-aligned; "centered" (default) centres it.
export default function HeroSection({ section }) {
  const {
    tag,
    heading,
    description,
    image,
    primaryCta,
    secondaryCta,
    layout = 'centered',
  } = section;

  const hasImage = image?.asset?._ref;
  const imageUrl = hasImage ? urlFor(image).width(1600).height(700).url() : null;
  const isCentered = layout === 'centered';

  return (
    <section
      className="page-hero"
      style={
        imageUrl
          ? {
              backgroundImage: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(${imageUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              textAlign: isCentered ? 'center' : 'left',
            }
          : { textAlign: isCentered ? 'center' : 'left' }
      }
    >
      {tag && <span className="hero-tag">{tag}</span>}
      {heading && <h1>{heading}</h1>}
      {description && <p>{description}</p>}

      {(primaryCta || secondaryCta) && (
        <div
          style={{
            display: 'flex',
            gap: '14px',
            marginTop: '28px',
            justifyContent: isCentered ? 'center' : 'flex-start',
            flexWrap: 'wrap',
          }}
        >
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
      )}
    </section>
  );
}
