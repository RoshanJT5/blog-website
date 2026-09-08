import Link from 'next/link';
import { client } from '@/sanity/client';
import { urlFor } from '@/sanity/image';
import { PortableText } from '@portabletext/react';

export const revalidate = 60;

// ─── Fallback data — mirrors the original hardcoded content ───────────────────
const FALLBACK = {
  heroTag: 'Our Story',
  heroHeading: "Written by people who'd rather be traveling",
  heroDescription: "Wander & Wayfare started as a shared notes doc between three friends. It's now a small, independent publication read in over 40 countries.",

  storyImageUrl: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=900&auto=format&fit=crop',
  storyImageAlt: 'Team on a coastal trip',
  storyHeading: 'Honest writing, no sponsored fluff',
  storyBodyHtml: [
    "We started Wander & Wayfare in 2021 because we were tired of listicles that read like ads. Every piece we publish is written by someone who actually went there, paid their own way, and came back with something worth saying.",
    "Today we're a small team of writers, photographers and editors spread across four continents, publishing new stories every week — no affiliate-stuffed itineraries, no fake five-star reviews.",
    "Just the kind of travel writing we always wanted to read ourselves.",
  ],

  stats: [
    { value: '420+', label: 'Stories published' },
    { value: '63',   label: 'Countries covered' },
    { value: '180K', label: 'Monthly readers'   },
    { value: '5',    label: 'Years running'     },
  ],

  teamSectionHeading: 'The people behind the stories',
  teamSectionSubheading: 'A small team, scattered across the world',
  teamMembers: [
    { name: 'Jane Doe',   role: 'Founder & Editor',    initials: 'JD', photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=500&auto=format&fit=crop', photoAlt: 'Jane Doe portrait'   },
    { name: 'Maya Khan',  role: 'Destinations Writer',  initials: 'MK', photoUrl: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?q=80&w=500&auto=format&fit=crop', photoAlt: 'Maya Khan portrait'  },
    { name: 'Liam Park',  role: 'Culinary Editor',      initials: 'LP', photoUrl: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=500&auto=format&fit=crop', photoAlt: 'Liam Park portrait'  },
    { name: 'Sara Nunez', role: 'Photography Lead',     initials: 'SN', photoUrl: 'https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?q=80&w=500&auto=format&fit=crop', photoAlt: 'Sara Nunez portrait' },
  ],

  ctaHeading: 'Want to write for us?',
  ctaDescription: "We're always looking for new voices with real stories to tell.",
  ctaButton: { text: 'Get in touch →', url: '/contact' },
};

// ─── Portable Text renderer for the story body ────────────────────────────────
const storyComponents = {
  block: {
    normal: ({ children }) => <p>{children}</p>,
  },
};

// ─── Metadata ────────────────────────────────────────────────────────────────
export async function generateMetadata() {
  try {
    const data = await client.fetch(
      `*[_type == "aboutPage"][0]{ "title": seo.metaTitle, "description": seo.metaDescription }`
    );
    if (data?.title) return { title: data.title, description: data.description };
  } catch (_) { /* ignore */ }
  return {
    title: 'About Us — Wander & Wayfare',
    description: "Wander & Wayfare started as a shared notes doc between three friends. It's now a small, independent publication read in over 40 countries.",
  };
}

export default async function AboutPage() {
  let page = null;

  try {
    page = await client.fetch(`
      *[_type == "aboutPage"][0]{
        heroTag, heroHeading, heroDescription,
        storyImage, storyImageAlt, storyHeading, storyContent,
        stats,
        teamSectionHeading, teamSectionSubheading,
        "teamMembers": teamMembers[]-> {
          name, role, initials, photo, photoAlt
        },
        ctaHeading, ctaDescription, ctaButton
      }
    `);
  } catch (error) {
    console.error('AboutPage: Sanity fetch failed, using fallbacks:', error.message);
  }

  // ── Resolve values — Sanity data takes priority, fallback fills any gaps ──
  const heroTag         = page?.heroTag         ?? FALLBACK.heroTag;
  const heroHeading     = page?.heroHeading     ?? FALLBACK.heroHeading;
  const heroDescription = page?.heroDescription ?? FALLBACK.heroDescription;

  const storyImageUrl = page?.storyImage?.asset?._ref
    ? urlFor(page.storyImage).width(900).height(1125).url()
    : FALLBACK.storyImageUrl;
  const storyImageAlt  = page?.storyImageAlt  ?? FALLBACK.storyImageAlt;
  const storyHeading   = page?.storyHeading   ?? FALLBACK.storyHeading;
  const storyContent   = page?.storyContent;   // portable text array or undefined

  const stats               = page?.stats?.length         ? page.stats               : FALLBACK.stats;
  const teamSectionHeading  = page?.teamSectionHeading    ?? FALLBACK.teamSectionHeading;
  const teamSectionSubheading = page?.teamSectionSubheading ?? FALLBACK.teamSectionSubheading;
  const teamMembers         = page?.teamMembers?.length   ? page.teamMembers         : FALLBACK.teamMembers;

  const ctaHeading     = page?.ctaHeading     ?? FALLBACK.ctaHeading;
  const ctaDescription = page?.ctaDescription ?? FALLBACK.ctaDescription;
  const ctaButton      = page?.ctaButton      ?? FALLBACK.ctaButton;

  return (
    <>
      {/* ── Page Hero ──────────────────────────────────────────────────────── */}
      <section className="page-hero">
        <span className="hero-tag">{heroTag}</span>
        <h1>{heroHeading}</h1>
        <p>{heroDescription}</p>
      </section>

      <div className="wrap">
        {/* ── Story Section (image + text) ───────────────────────────────── */}
        <div className="about-grid">
          <img src={storyImageUrl} alt={storyImageAlt} />
          <div>
            <h2>{storyHeading}</h2>
            {storyContent?.length > 0 ? (
              <PortableText value={storyContent} components={storyComponents} />
            ) : (
              FALLBACK.storyBodyHtml.map((para, i) => <p key={i}>{para}</p>)
            )}
          </div>
        </div>

        {/* ── Stats Row ──────────────────────────────────────────────────── */}
        <div className="stats-row fade-up">
          {stats.map((stat, i) => (
            <div className="stat" key={stat._key || i}>
              <b>{stat.value}</b>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>

        {/* ── Team Grid ──────────────────────────────────────────────────── */}
        <div className="section-head fade-up">
          <div>
            <h2>{teamSectionHeading}</h2>
            <p>{teamSectionSubheading}</p>
          </div>
        </div>

        <div className="team-grid">
          {teamMembers.map((member, i) => {
            // Support both Sanity reference-resolved members and fallback plain objects
            const photoUrl = member.photo?.asset?._ref
              ? urlFor(member.photo).width(500).height(500).url()
              : member.photoUrl || '';
            const alt = member.photoAlt || `${member.name} portrait`;

            return (
              <div className="team-card fade-up" key={member._id || i}>
                {photoUrl && <img src={photoUrl} alt={alt} />}
                <h4>{member.name}</h4>
                <span>{member.role}</span>
              </div>
            );
          })}
        </div>

        {/* ── CTA Banner ─────────────────────────────────────────────────── */}
        <div className="cta-banner fade-up">
          <h3>{ctaHeading}</h3>
          <p>{ctaDescription}</p>
          <Link
            href={ctaButton?.url || '/contact'}
            className="btn-magnetic"
            style={{ display: 'inline-flex', margin: '0 auto' }}
          >
            {ctaButton?.text || 'Get in touch →'}
          </Link>
        </div>
      </div>
    </>
  );
}
