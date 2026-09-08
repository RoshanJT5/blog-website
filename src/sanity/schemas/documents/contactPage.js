// Contact Page — singleton document
// Structured to match every section in src/app/(public)/contact/page.js:
//   1. Page Hero  2. Contact Info (email, phone, address)  3. Intro paragraph
// NOTE: The contact form is a frontend-only component. Submissions are not stored in Sanity.
// __experimental_actions prevents clients from creating a second Contact page
export default {
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  groups: [
    { name: 'hero', title: 'Page Hero', default: true },
    { name: 'info', title: 'Contact Info' },
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
      description: 'Small label above the headline (e.g. "Get In Touch").',
      initialValue: 'Get In Touch'
    },
    {
      name: 'heroHeading',
      title: 'Page Heading',
      type: 'string',
      group: 'hero',
      initialValue: "We'd love to hear from you",
      validation: Rule => Rule.required()
    },
    {
      name: 'heroDescription',
      title: 'Page Introduction',
      type: 'text',
      rows: 2,
      group: 'hero',
      initialValue: 'Pitches, partnerships, corrections, or just want to say hi — drop us a line below.'
    },

    // ─── Contact Info Panel ───────────────────────────────────────────────────
    // Matches the .contact-info left panel with the heading, intro and info items
    {
      name: 'contactPanelHeading',
      title: 'Contact Panel Heading',
      type: 'string',
      group: 'info',
      initialValue: "Let's talk"
    },
    {
      name: 'contactPanelIntro',
      title: 'Contact Panel Introduction',
      type: 'text',
      rows: 3,
      group: 'info',
      initialValue: "Whether you're pitching a story, reporting a broken link, or want to collaborate on something bigger — we read every message ourselves."
    },
    {
      name: 'email',
      title: 'Contact Email',
      type: 'string',
      group: 'info',
      initialValue: 'hello@wanderwayfare.com',
      validation: Rule =>
        Rule.required().regex(
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          { name: 'email', invert: false }
        ).error('Enter a valid email address.')
    },
    {
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      group: 'info',
      initialValue: '+91 98765 43210'
    },
    {
      name: 'address',
      title: 'Studio / Office Address',
      type: 'string',
      group: 'info',
      initialValue: 'Ahmedabad, Gujarat, India'
    },
    {
      name: 'businessHours',
      title: 'Business Hours (optional)',
      type: 'string',
      group: 'info',
      description: 'e.g. Mon–Fri, 9am–6pm IST'
    },
    {
      name: 'googleMapsUrl',
      title: 'Google Maps URL (optional)',
      type: 'url',
      group: 'info',
      description: 'Paste a Google Maps share link if you want to display a map location.'
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
