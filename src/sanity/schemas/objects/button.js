// Reusable CTA / Button object — used across hero sections, banners, page builder sections
export default {
  name: 'button',
  title: 'Button',
  type: 'object',
  fields: [
    {
      name: 'text',
      title: 'Button Text',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'url',
      title: 'Button Link / URL',
      type: 'string',
      description: 'Use a relative path for internal pages (e.g. /blog) or a full URL for external links.',
      validation: Rule => Rule.required()
    },
    {
      name: 'variant',
      title: 'Button Style',
      type: 'string',
      initialValue: 'primary',
      options: {
        list: [
          { title: 'Primary (Dark filled)', value: 'primary' },
          { title: 'Magnetic (Outlined)', value: 'magnetic' }
        ],
        layout: 'radio'
      }
    }
  ],
  preview: {
    select: { title: 'text', subtitle: 'url' }
  }
};
