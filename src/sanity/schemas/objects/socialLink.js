// Reusable social media link object — used in siteSettings and author schemas
export default {
  name: 'socialLink',
  title: 'Social Link',
  type: 'object',
  fields: [
    {
      name: 'platform',
      title: 'Platform',
      type: 'string',
      options: {
        list: [
          { title: 'Instagram', value: 'instagram' },
          { title: 'X (Twitter)', value: 'twitter' },
          { title: 'Pinterest', value: 'pinterest' },
          { title: 'Facebook', value: 'facebook' },
          { title: 'LinkedIn', value: 'linkedin' },
          { title: 'YouTube', value: 'youtube' },
          { title: 'TikTok', value: 'tiktok' }
        ]
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'url',
      title: 'Profile URL',
      type: 'url',
      validation: Rule => Rule.required().uri({ scheme: ['http', 'https'] })
    }
  ],
  preview: {
    select: { title: 'platform', subtitle: 'url' }
  }
};
