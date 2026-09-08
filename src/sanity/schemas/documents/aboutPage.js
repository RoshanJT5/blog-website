// About Page — singleton document
// Structured to match every section in src/app/(public)/about/page.js:
//   1. Page Hero  2. Image + Text (story)  3. Stats Row  4. Team Grid  5. CTA Banner
// __experimental_actions prevents clients from creating a second About page
export default {
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  groups: [
    { name: 'hero', title: 'Page Hero', default: true },
    { name: 'story', title: 'Story Section' },
    { name: 'stats', title: 'Stats Row' },
    { name: 'team', title: 'Team' },
    { name: 'cta', title: 'CTA Banner' },
    { name: 'seo', title: 'SEO' }
  ],
  fields: [

    // ─── Page Hero ────────────────────────────────────────────────────────────
    // Matches the <section className="page-hero"> block
    {
      name: 'heroTag',
      title: 'Hero Tag',
      type: 'string',
      group: 'hero',
      description: 'Small label above the headline (e.g. "Our Story").',
      initialValue: 'Our Story'
    },
    {
      name: 'heroHeading',
      title: 'Page Heading',
      type: 'string',
      group: 'hero',
      initialValue: "Written by people who'd rather be traveling",
      validation: Rule => Rule.required()
    },
    {
      name: 'heroDescription',
      title: 'Page Introduction',
      type: 'text',
      rows: 2,
      group: 'hero',
      initialValue: "Wander & Wayfare started as a shared notes doc between three friends. It's now a small, independent publication read in over 40 countries."
    },

    // ─── Story Section (Image + Text two-column) ──────────────────────────────
    // Matches the .about-grid layout: image left, text right
    {
      name: 'storyImage',
      title: 'Story Image',
      type: 'image',
      group: 'story',
      options: { hotspot: true }
    },
    {
      name: 'storyImageAlt',
      title: 'Story Image Alt Text',
      type: 'string',
      group: 'story',
      initialValue: 'Team on a coastal trip',
      validation: Rule => Rule.required().error('Alt text is required for accessibility.')
    },
    {
      name: 'storyHeading',
      title: 'Story Heading',
      type: 'string',
      group: 'story',
      initialValue: 'Honest writing, no sponsored fluff',
      validation: Rule => Rule.required()
    },
    {
      name: 'storyContent',
      title: 'Story Body',
      type: 'array',
      group: 'story',
      of: [{ type: 'block' }],
      description: 'The multi-paragraph story text displayed beside the image.'
    },

    // ─── Stats Row ────────────────────────────────────────────────────────────
    // Matches the .stats-row section with 4 stat blocks
    {
      name: 'stats',
      title: 'Stats',
      type: 'array',
      group: 'stats',
      of: [
        {
          type: 'object',
          name: 'statItem',
          title: 'Stat',
          fields: [
            {
              name: 'value',
              title: 'Value',
              type: 'string',
              description: 'The large display number or text (e.g. "420+", "180K").',
              validation: Rule => Rule.required()
            },
            {
              name: 'label',
              title: 'Label',
              type: 'string',
              description: 'Description below the value (e.g. "Stories published").',
              validation: Rule => Rule.required()
            }
          ],
          preview: {
            select: { title: 'value', subtitle: 'label' }
          }
        }
      ],
      initialValue: [
        { _type: 'statItem', value: '420+', label: 'Stories published' },
        { _type: 'statItem', value: '63', label: 'Countries covered' },
        { _type: 'statItem', value: '180K', label: 'Monthly readers' },
        { _type: 'statItem', value: '5', label: 'Years running' }
      ]
    },

    // ─── Team Section ─────────────────────────────────────────────────────────
    // Matches the .team-grid with photo cards
    {
      name: 'teamSectionHeading',
      title: 'Team Section Heading',
      type: 'string',
      group: 'team',
      initialValue: 'The people behind the stories'
    },
    {
      name: 'teamSectionSubheading',
      title: 'Team Section Subheading',
      type: 'string',
      group: 'team',
      initialValue: 'A small team, scattered across the world'
    },
    {
      name: 'teamMembers',
      title: 'Team Members',
      type: 'array',
      group: 'team',
      of: [{ type: 'reference', to: [{ type: 'author' }] }],
      description: 'Select team members to display on the About page. Order matters.'
    },

    // ─── CTA Banner ───────────────────────────────────────────────────────────
    // Matches the .cta-banner at the bottom: "Want to write for us?"
    {
      name: 'ctaHeading',
      title: 'CTA Heading',
      type: 'string',
      group: 'cta',
      initialValue: 'Want to write for us?'
    },
    {
      name: 'ctaDescription',
      title: 'CTA Description',
      type: 'string',
      group: 'cta',
      initialValue: "We're always looking for new voices with real stories to tell."
    },
    {
      name: 'ctaButton',
      title: 'CTA Button',
      type: 'button',
      group: 'cta'
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
