// Home Page — singleton document
// Structured to match every editable section in src/app/(public)/page.js
// __experimental_actions prevents clients from creating a second Home Page
export default {
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  groups: [
    { name: 'hero', title: 'Hero Slider', default: true },
    { name: 'latestStories', title: 'Latest Stories Section' },
    { name: 'promo', title: 'Promo Block' },
    { name: 'newsletter', title: 'Newsletter Banner' },
    { name: 'seo', title: 'SEO' }
  ],
  fields: [

    // ─── Hero Slider ──────────────────────────────────────────────────────────
    // The actual slides are managed as separate heroSlide documents.
    // This field lets the client control the section heading label only.
    {
      name: 'heroTagLine',
      title: 'Hero Tag Line',
      type: 'string',
      group: 'hero',
      description: 'Small label shown above each slide title (e.g. "Featured Story").',
      initialValue: 'Featured Story'
    },

    // ─── Latest Stories Section ───────────────────────────────────────────────
    {
      name: 'storiesSectionHeading',
      title: 'Section Heading',
      type: 'string',
      group: 'latestStories',
      initialValue: 'Latest Stories',
      validation: Rule => Rule.required()
    },
    {
      name: 'storiesSectionSubheading',
      title: 'Section Subheading',
      type: 'string',
      group: 'latestStories',
      initialValue: 'Fresh perspectives from every corner of the world'
    },
    {
      name: 'storiesViewAllLabel',
      title: '"View All" Link Text',
      type: 'string',
      group: 'latestStories',
      initialValue: 'View all articles →'
    },
    {
      name: 'storiesCount',
      title: 'Number of Posts to Display',
      type: 'number',
      group: 'latestStories',
      initialValue: 6,
      description: 'How many latest blog posts to show on the homepage grid.',
      validation: Rule => Rule.min(1).max(12)
    },

    // ─── Promo Split Block ────────────────────────────────────────────────────
    // Matches the .promo-split section with the dark counter block + coastal image
    {
      name: 'promoCuratedCount',
      title: 'Curated Stays Count',
      type: 'number',
      group: 'promo',
      description: 'Large number shown in the dark promo block (e.g. 78).',
      initialValue: 78
    },
    {
      name: 'promoCuratedLabel',
      title: 'Curated Stays Label',
      type: 'string',
      group: 'promo',
      initialValue: 'Curated stays added this month'
    },
    {
      name: 'promoHeading',
      title: 'Promo Heading',
      type: 'string',
      group: 'promo',
      initialValue: 'Find your next stay before your next story.'
    },
    {
      name: 'promoCta',
      title: 'Promo Button',
      type: 'button',
      group: 'promo'
    },
    {
      name: 'promoCoastalImage',
      title: 'Coastal / Right Panel Image',
      type: 'image',
      group: 'promo',
      options: { hotspot: true },
      description: 'The right-panel image in the promo split block.'
    },
    {
      name: 'promoCoastalText',
      title: 'Coastal Panel Caption',
      type: 'string',
      group: 'promo',
      initialValue: 'Beyond accommodation, creating memories of a lifetime.'
    },

    // ─── Newsletter CTA Banner ────────────────────────────────────────────────
    // Matches the .cta-banner at the bottom of the homepage
    {
      name: 'newsletterHeading',
      title: 'Newsletter Heading',
      type: 'string',
      group: 'newsletter',
      initialValue: 'Get stories in your inbox'
    },
    {
      name: 'newsletterDescription',
      title: 'Newsletter Description',
      type: 'string',
      group: 'newsletter',
      initialValue: 'One email a week. No spam, just the best of the road.'
    },
    {
      name: 'newsletterButtonText',
      title: 'Subscribe Button Text',
      type: 'string',
      group: 'newsletter',
      initialValue: 'Subscribe'
    },
    {
      name: 'newsletterPlaceholder',
      title: 'Email Input Placeholder',
      type: 'string',
      group: 'newsletter',
      initialValue: 'you@example.com'
    },

    // ─── SEO ─────────────────────────────────────────────────────────────────
    {
      name: 'seo',
      title: 'SEO Settings',
      type: 'seo',
      group: 'seo'
    }
  ]
};
