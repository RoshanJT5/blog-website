// CTA Banner Section — matches the .cta-banner pattern used on home, blog, and about pages
// Maps to frontend component: CtaSection
export default {
  name: 'ctaSection',
  title: 'CTA Banner Section',
  type: 'object',
  fields: [
    {
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2
    },
    {
      name: 'primaryCta',
      title: 'Primary Button',
      type: 'button',
      validation: Rule => Rule.required()
    },
    {
      name: 'secondaryCta',
      title: 'Secondary Button (optional)',
      type: 'button'
    }
  ],
  preview: {
    select: { title: 'heading' },
    prepare({ title }) {
      return { title: title || 'CTA Banner Section' };
    }
  }
};
