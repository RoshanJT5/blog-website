// Reusable image object that enforces alt text — used across team cards, about page, sections
export default {
  name: 'imageWithAlt',
  title: 'Image',
  type: 'object',
  fields: [
    {
      name: 'asset',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      validation: Rule => Rule.required()
    },
    {
      name: 'alt',
      title: 'Alt Text',
      type: 'string',
      description: 'Describe the image for screen readers and SEO (e.g. "Team on a coastal trip").',
      validation: Rule => Rule.required().error('Alt text is required for accessibility.')
    }
  ],
  preview: {
    select: { title: 'alt', media: 'asset' }
  }
};
