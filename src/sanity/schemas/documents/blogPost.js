// Blog Post document — updated version of the original blogPost schema
// BACKWARD-COMPATIBLE: keeps authorName, authorInitials, category (string) as legacy fields
// New posts should use the author reference and category reference fields instead
export default {
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'meta', title: 'Organisation' },
    { name: 'seo', title: 'SEO' }
  ],
  fields: [

    // ─── Basic Information ───────────────────────────────────────────────────
    {
      name: 'title',
      title: 'Article Title',
      type: 'string',
      group: 'content',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      group: 'content',
      options: { source: 'title', maxLength: 96 },
      validation: Rule => Rule.required()
    },
    {
      name: 'snippet',
      title: 'Excerpt / Snippet',
      type: 'text',
      rows: 2,
      group: 'content',
      description: 'Shown on blog cards and used as the default SEO description.',
      validation: Rule => Rule.required()
    },
    {
      name: 'image',
      title: 'Cover Image',
      type: 'image',
      group: 'content',
      options: { hotspot: true },
      validation: Rule => Rule.required()
    },
    {
      name: 'imageAlt',
      title: 'Cover Image Alt Text',
      type: 'string',
      group: 'content',
      description: 'Describe the image for screen readers and SEO.',
      validation: Rule => Rule.required().error('Alt text is required for accessibility.')
    },

    // ─── Main Body Content ───────────────────────────────────────────────────
    {
      name: 'content',
      title: 'Main Body Content',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H4', value: 'h4' },
            { title: 'Blockquote', value: 'blockquote' }
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Numbered', value: 'number' }
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' }
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [{ name: 'href', type: 'url', title: 'URL' }]
              }
            ]
          }
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'caption',
              title: 'Caption (optional)',
              type: 'string'
            }
          ]
        }
      ],
      validation: Rule => Rule.required()
    },

    // ─── Organisation ────────────────────────────────────────────────────────
    {
      name: 'authorRef',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }],
      group: 'meta',
      description: 'Link to an Author document. Preferred over the legacy name fields below.'
    },
    {
      name: 'categoryRef',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      group: 'meta',
      description: 'Link to a Category document. Preferred over the legacy category string below.'
    },
    {
      name: 'tags',
      title: 'Tags / Keywords',
      type: 'array',
      group: 'meta',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      description: 'Add keywords to group articles or assist search filters.'
    },
    {
      name: 'date',
      title: 'Publish Date',
      type: 'date',
      group: 'meta',
      initialValue: () => new Date().toISOString().split('T')[0],
      validation: Rule => Rule.required()
    },
    {
      name: 'readTime',
      title: 'Read Time',
      type: 'string',
      group: 'meta',
      description: 'e.g. 5 min read',
      validation: Rule => Rule.required()
    },
    {
      name: 'isFeatured',
      title: 'Featured Story?',
      type: 'boolean',
      group: 'meta',
      description: 'Mark true to highlight this article in the homepage hero slider.',
      initialValue: false
    },
    {
      name: 'relatedPosts',
      title: 'Related Posts (optional)',
      type: 'array',
      group: 'meta',
      of: [{ type: 'reference', to: [{ type: 'blogPost' }] }],
      validation: Rule => Rule.max(3).warning('Keep related posts to 3 or fewer.')
    },

    // ─── Legacy fields — kept for backward compatibility with existing posts ──
    {
      name: 'authorName',
      title: 'Author Name (Legacy)',
      type: 'string',
      group: 'meta',
      description: '⚠ Legacy field. Use the Author reference above for new posts.',
      initialValue: 'Jane Doe'
    },
    {
      name: 'authorInitials',
      title: 'Author Initials (Legacy)',
      type: 'string',
      group: 'meta',
      description: '⚠ Legacy field. Used for the avatar display (e.g. JD).',
      initialValue: 'JD'
    },
    {
      name: 'category',
      title: 'Category (Legacy)',
      type: 'string',
      group: 'meta',
      description: '⚠ Legacy field. Use the Category reference above for new posts.',
      options: {
        list: [
          { title: 'Destination', value: 'destination' },
          { title: 'Lifestyle', value: 'lifestyle' },
          { title: 'Culinary', value: 'culinary' },
          { title: 'Culture', value: 'culture' }
        ]
      }
    },

    // ─── SEO ─────────────────────────────────────────────────────────────────
    {
      name: 'seo',
      title: 'SEO Settings',
      type: 'seo',
      group: 'seo',
      description: 'Overrides the default title and description in search results.'
    }
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'date',
      media: 'image'
    }
  }
};
