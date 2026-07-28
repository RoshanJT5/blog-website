export default {
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: Rule => Rule.required()
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
      name: 'date',
      title: 'Publish Date',
      type: 'date',
      validation: Rule => Rule.required()
    },
    {
      name: 'readTime',
      title: 'Read Time',
      type: 'string',
      description: 'e.g., 5 min read',
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
      validation: Rule => Rule.required()
    },
    {
      name: 'authorInitials',
      title: 'Author Initials',
      type: 'string',
      description: 'e.g., JD',
      validation: Rule => Rule.required()
    },
    {
      name: 'snippet',
      title: 'Short Snippet',
      type: 'text',
      rows: 2,
      description: 'Shown on the blog grid cards',
      validation: Rule => Rule.max(160)
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H1', value: 'h1' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'Quote', value: 'blockquote' }
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Numbered', value: 'number' }
          ]
        }
      ],
      validation: Rule => Rule.required()
    }
  ],
  preview: {
    select: {
      title: 'title',
      author: 'authorName',
      media: 'image'
    },
    prepare(selection) {
      const { title, author, media } = selection;
      return {
        title: title,
        subtitle: `by ${author || 'Unknown'}`,
        media: media
      };
    }
  }
};
