// Hero Section — page builder block for the dynamic Page schema
// Maps to frontend component: HeroSection
export default {
  name: 'heroSection',
  title: 'Hero Section',
  type: 'object',
  fields: [
    {
      name: 'tag',
      title: 'Tag / Label',
      type: 'string',
      description: 'Small label above the heading (e.g. "Our Story", "Featured").',
    },
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
      rows: 3
    },
    {
      name: 'image',
      title: 'Background Image',
      type: 'image',
      options: { hotspot: true }
    },
    {
      name: 'primaryCta',
      title: 'Primary Button',
      type: 'button'
    },
    {
      name: 'secondaryCta',
      title: 'Secondary Button (optional)',
      type: 'button'
    },
    {
      name: 'layout',
      title: 'Layout Variant',
      type: 'string',
      initialValue: 'centered',
      options: {
        list: [
          { title: 'Centered', value: 'centered' },
          { title: 'Left Aligned', value: 'left' }
        ],
        layout: 'radio'
      }
    }
  ],
  preview: {
    select: { title: 'heading', subtitle: 'tag' },
    prepare({ title, subtitle }) {
      return { title: title || 'Hero Section', subtitle: subtitle || '' };
    }
  }
};
