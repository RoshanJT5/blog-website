// Generic Page — dynamic page builder document (NOT a singleton)
// Clients can create unlimited pages: Privacy Policy, Terms, Careers, Services, etc.
// Each page is built by adding, removing, and reordering predefined section blocks.
//
// Frontend rendering:
//   Map each section._type to a React component:
//     heroSection      → <HeroSection />
//     richTextSection  → <RichTextSection />
//     imageTextSection → <ImageTextSection />
//     ctaSection       → <CtaSection />
//     faqSection       → <FaqSection />
//     blogGridSection  → <BlogGridSection />
export default {
  name: 'page',
  title: 'Page',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'seo', title: 'SEO' }
  ],
  fields: [

    // ─── Page Identity ────────────────────────────────────────────────────────
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
      group: 'content',
      description: 'Used as the browser tab title and the internal name in Sanity Studio.',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Page URL Slug',
      type: 'slug',
      group: 'content',
      options: { source: 'title', maxLength: 96 },
      description: 'The URL path for this page (e.g. /privacy-policy → slug: privacy-policy).',
      validation: Rule => Rule.required()
    },

    // ─── Page Builder ─────────────────────────────────────────────────────────
    // Clients add, reorder, and remove sections here.
    // Each section has a _type that maps to a frontend component.
    {
      name: 'sections',
      title: 'Page Sections',
      type: 'array',
      group: 'content',
      description: 'Build the page by adding sections below. You can drag to reorder them.',
      of: [
        {
          type: 'heroSection',
          title: 'Hero Section'
        },
        {
          type: 'richTextSection',
          title: 'Rich Text Section'
        },
        {
          type: 'imageTextSection',
          title: 'Image + Text Section'
        },
        {
          type: 'ctaSection',
          title: 'CTA Banner'
        },
        {
          type: 'faqSection',
          title: 'FAQ Section'
        },
        {
          type: 'blogGridSection',
          title: 'Blog Grid'
        }
      ]
    },

    // ─── SEO ─────────────────────────────────────────────────────────────────
    {
      name: 'seo',
      title: 'SEO Settings',
      type: 'seo',
      group: 'seo'
    }
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'slug.current'
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Untitled Page',
        subtitle: subtitle ? `/${subtitle}` : 'No slug set'
      };
    }
  }
};
