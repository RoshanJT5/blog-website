// Image + Text Section — two-column layout matching the .about-grid design pattern
// Maps to frontend component: ImageTextSection
export default {
  name: 'imageTextSection',
  title: 'Image + Text Section',
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
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Supports bold, italic and links.'
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      validation: Rule => Rule.required()
    },
    {
      name: 'imageAlt',
      title: 'Image Alt Text',
      type: 'string',
      validation: Rule => Rule.required().error('Alt text is required for accessibility.')
    },
    {
      name: 'layout',
      title: 'Image Position',
      type: 'string',
      initialValue: 'imageLeft',
      options: {
        list: [
          { title: 'Image Left', value: 'imageLeft' },
          { title: 'Image Right', value: 'imageRight' }
        ],
        layout: 'radio'
      }
    },
    {
      name: 'cta',
      title: 'Button (optional)',
      type: 'button'
    }
  ],
  preview: {
    select: { title: 'heading', media: 'image' },
    prepare({ title, media }) {
      return { title: title || 'Image + Text Section', media };
    }
  }
};
