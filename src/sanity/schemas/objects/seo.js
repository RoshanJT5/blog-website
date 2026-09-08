// Reusable SEO object — used by homePage, aboutPage, contactPage, page, blogPost
export default {
  name: 'seo',
  title: 'SEO Settings',
  type: 'object',
  fields: [
    {
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description: 'Overrides the page title in search results. Recommended: 50–60 characters.',
      validation: Rule => Rule.max(60).warning('Keep the meta title under 60 characters for best results.')
    },
    {
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: 'Short description shown in search results. Recommended: 120–160 characters.',
      validation: Rule => Rule.max(160).warning('Keep the meta description under 160 characters.')
    },
    {
      name: 'ogImage',
      title: 'Social Share Image (Open Graph)',
      type: 'image',
      description: 'Image shown when this page is shared on social media. Ideal size: 1200×630px.',
      options: { hotspot: true }
    }
  ]
};
