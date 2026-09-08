// Reusable navigation link object — used in siteSettings header/footer nav arrays
export default {
  name: 'navigationLink',
  title: 'Navigation Link',
  type: 'object',
  fields: [
    {
      name: 'label',
      title: 'Link Label',
      type: 'string',
      description: 'Text shown in the navigation (e.g. "About Us").',
      validation: Rule => Rule.required()
    },
    {
      name: 'url',
      title: 'Link URL',
      type: 'string',
      description: 'Use a relative path for internal pages (e.g. /about) or a full URL for external links.',
      validation: Rule => Rule.required()
    },
    {
      name: 'openInNewTab',
      title: 'Open in New Tab?',
      type: 'boolean',
      initialValue: false
    }
  ],
  preview: {
    select: { title: 'label', subtitle: 'url' }
  }
};
