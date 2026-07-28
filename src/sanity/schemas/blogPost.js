export default {
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Article Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'isFeatured',
      title: 'Is Featured Story?',
      type: 'boolean',
      description: 'Mark this true to highlight the article at the top of the homepage slider.',
      initialValue: false
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Destination', value: 'destination' },
          { title: 'Lifestyle', value: 'lifestyle' },
          { title: 'Culinary', value: 'culinary' },
          { title: 'Culture', value: 'culture' }
        ]
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'tags',
      title: 'Tags / Keywords',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      },
      description: 'Add keywords to group articles or assist on search filters.'
    },
    {
      name: 'date',
      title: 'Publish Date',
      type: 'date',
      initialValue: () => new Date().toISOString().split('T')[0],
      validation: Rule => Rule.required()
    },
    {
      name: 'readTime',
      title: 'Read Time Description',
      type: 'string',
      description: 'e.g. 5 min read',
      validation: Rule => Rule.required()
    },
    {
      name: 'image',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'authorName',
      title: 'Author Name',
      type: 'string',
      initialValue: 'Jane Doe',
      validation: Rule => Rule.required()
    },
    {
      name: 'authorInitials',
      title: 'Author Initials',
      type: 'string',
      description: 'For avatar text display (e.g. JD)',
      initialValue: 'JD',
      validation: Rule => Rule.required()
    },
    {
      name: 'snippet',
      title: 'Excerpt Snippet',
      type: 'text',
      rows: 2,
      description: 'Used for search list cards preview and SEO description.',
      validation: Rule => Rule.required()
    },
    {
      name: 'content',
      title: 'Main Body Content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H4', value: 'h4' }
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Numbered', value: 'number' }
          ]
        }
      ],
      validation: Rule => Rule.required()
    },
    {
      name: 'seoTitle',
      title: 'SEO Title Override',
      type: 'string',
      description: 'Fine-tune search result title (defaults to Article Title).'
    },
    {
      name: 'seoDescription',
      title: 'SEO Meta Description Override',
      type: 'string',
      description: 'Fine-tune search result description (defaults to Excerpt Snippet).'
    }
  ]
};
