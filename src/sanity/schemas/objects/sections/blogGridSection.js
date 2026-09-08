// Blog Grid Section — embeds a blog listing inside a dynamic page
// Maps to frontend component: BlogGridSection
export default {
  name: 'blogGridSection',
  title: 'Blog Grid Section',
  type: 'object',
  fields: [
    {
      name: 'heading',
      title: 'Section Heading',
      type: 'string',
      initialValue: 'Latest Stories'
    },
    {
      name: 'selectionMode',
      title: 'Post Selection Mode',
      type: 'string',
      initialValue: 'latest',
      options: {
        list: [
          { title: 'Latest Posts (automatic)', value: 'latest' },
          { title: 'Featured Posts (automatic)', value: 'featured' },
          { title: 'Manually Selected Posts', value: 'manual' }
        ],
        layout: 'radio'
      }
    },
    {
      name: 'postCount',
      title: 'Number of Posts to Show',
      type: 'number',
      initialValue: 3,
      description: 'Used when selection mode is "Latest" or "Featured".',
      validation: Rule => Rule.min(1).max(12)
    },
    {
      name: 'selectedPosts',
      title: 'Selected Posts',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'blogPost' }] }],
      description: 'Only used when selection mode is "Manually Selected Posts".',
      hidden: ({ parent }) => parent?.selectionMode !== 'manual'
    }
  ],
  preview: {
    select: { title: 'heading', mode: 'selectionMode' },
    prepare({ title, mode }) {
      return { title: title || 'Blog Grid Section', subtitle: mode };
    }
  }
};
