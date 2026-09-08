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
    // Slides are managed directly here — no need to visit a separate document.
    // Each slide can link to an existing blog post via the linkedPost reference.
    {
      name: 'heroTagLine',
      title: 'Default Slide Tag',
      type: 'string',
      group: 'hero',
      description: 'Fallback tag shown when a slide has no individual tag set (e.g. "Featured Story").',
      initialValue: 'Featured Story'
    },
    {
      name: 'heroSlides',
      title: 'Hero Slides',
      type: 'array',
      group: 'hero',
      description: 'Add, remove and reorder homepage hero slides. Each slide can link to a blog post.',
      of: [
        {
          type: 'object',
          name: 'inlineSlide',
          title: 'Slide',
          fields: [
            {
              name: 'tag',
              title: 'Tag / Label',
              type: 'string',
              initialValue: 'Featured Story'
            },
            {
              name: 'title',
              title: 'Slide Title',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'description',
              title: 'Slide Description',
              type: 'text',
              rows: 2
            },
            {
              name: 'image',
              title: 'Background Image',
              type: 'image',
              options: { hotspot: true }
            },
            {
              name: 'buttonText',
              title: 'Button Text',
              type: 'string',
              initialValue: 'Read Full Story'
            },
            {
              name: 'linkedPost',
              title: 'Linked Blog Post',
              type: 'reference',
              to: [{ type: 'blogPost' }],
              description: 'Clicking the button takes the reader to this article.'
            }
          ],
          preview: {
            select: { title: 'title', subtitle: 'tag', media: 'image' },
            prepare({ title, subtitle, media }) {
              return { title: title || 'Untitled Slide', subtitle: subtitle || 'Featured Story', media };
            }
          }
        }
      ],
      // ── The 4 original slides pre-filled so the client can edit immediately ──
      initialValue: [
        {
          _type: 'inlineSlide',
          tag: 'Featured Story',
          title: 'Exploring the Wonders of the Desert Canyons',
          description: 'A journey through sunlit cliffs, endless dunes and the quiet magic of golden hour in the American Southwest.',
          buttonText: 'Read Full Story'
        },
        {
          _type: 'inlineSlide',
          tag: 'Featured Story',
          title: 'Hidden Alpine Lakes Worth the Hike',
          description: 'Beyond the crowded trailheads lie turquoise waters and silence you can only find above 2,000 meters.',
          buttonText: 'Read Full Story'
        },
        {
          _type: 'inlineSlide',
          tag: 'Featured Story',
          title: 'Street Food Trails of Southeast Asia',
          description: 'From smoky night markets to family-run stalls passed down three generations, this is where the real flavor lives.',
          buttonText: 'Read Full Story'
        },
        {
          _type: 'inlineSlide',
          tag: 'Featured Story',
          title: "Coastal Cliffs You've Probably Never Heard Of",
          description: 'Skip the postcard spots — these lesser-known coastlines deliver the same drama with none of the crowds.',
          buttonText: 'Read Full Story'
        }
      ]
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
