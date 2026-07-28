export default {
  name: 'heroSlide',
  title: 'Hero Slide',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'tag',
      title: 'Tag Line',
      type: 'string',
      description: 'e.g., Featured Story',
      initialValue: 'Featured Story'
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.required()
    },
    {
      name: 'image',
      title: 'Slide Image',
      type: 'image',
      options: {
        hotspot: true
      },
      validation: Rule => Rule.required()
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
      description: 'Select the blog post this slide links to.'
    },
    {
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Order of the slide (lower numbers show first)'
    }
  ]
};
