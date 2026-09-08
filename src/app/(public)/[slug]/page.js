import { notFound } from 'next/navigation';
import { client } from '@/sanity/client';
import SectionRenderer from '@/components/sections/SectionRenderer';

export const revalidate = 60;

// ─── Reserved slugs — never handled by this dynamic route ────────────────────
// These are real Next.js routes defined as folders alongside this [slug] folder.
// Next.js will always prefer the explicit route, but this guard makes it explicit.
const RESERVED_SLUGS = new Set(['about', 'blog', 'contact']);

// ─── GROQ query — fetches a page document with all section data resolved ──────
const PAGE_QUERY = `
  *[_type == "page" && slug.current == $slug][0]{
    title,
    "slug": slug.current,
    sections[]{
      _type,
      _key,

      // heroSection
      tag, heading, description, image, primaryCta, secondaryCta, layout,

      // richTextSection
      sectionHeading, content, alignment,

      // imageTextSection — heading already covered above; add unique fields
      imageAlt, cta,

      // ctaSection — heading, description, primaryCta, secondaryCta already covered

      // faqSection
      items[]{
        _key, question, answer
      },

      // blogGridSection
      selectionMode, postCount,
      "selectedPosts": selectedPosts[]{
        "_ref": @->._id,
        "_id":  @->._id
      }
    },
    seo
  }
`;

// ─── Static params — pre-render known pages at build time ────────────────────
export async function generateStaticParams() {
  try {
    const pages = await client.fetch(
      `*[_type == "page"]{ "slug": slug.current }`
    );
    return pages
      .filter(p => p.slug && !RESERVED_SLUGS.has(p.slug))
      .map(p => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

// ─── Metadata ────────────────────────────────────────────────────────────────
export async function generateMetadata({ params }) {
  const { slug } = await params;
  try {
    const page = await client.fetch(
      `*[_type == "page" && slug.current == $slug][0]{ title, seo }`,
      { slug }
    );
    if (!page) return { title: 'Page Not Found' };
    return {
      title:       page.seo?.metaTitle       || page.title,
      description: page.seo?.metaDescription || undefined,
    };
  } catch {
    return { title: 'Page Not Found' };
  }
}

// ─── Page component ───────────────────────────────────────────────────────────
export default async function DynamicPage({ params }) {
  const { slug } = await params;

  // Hard-guard: never try to serve a reserved route from here
  if (RESERVED_SLUGS.has(slug)) notFound();

  let page = null;
  try {
    page = await client.fetch(PAGE_QUERY, { slug });
  } catch (error) {
    console.error(`DynamicPage [${slug}]: Sanity fetch failed:`, error.message);
  }

  if (!page) notFound();

  return (
    <>
      {/* Page title banner — matches the .page-hero style used across the site */}
      <section className="page-hero">
        <h1>{page.title}</h1>
      </section>

      {/* Render all sections in order */}
      <SectionRenderer sections={page.sections || []} />
    </>
  );
}
