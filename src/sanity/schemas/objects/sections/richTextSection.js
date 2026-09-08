// Rich Text Section — page builder block for long-form editorial content
// Maps to frontend component: RichTextSection
export default {
  name: 'richTextSection',
  title: 'Rich Text Section',
  type: 'object',
  fields: [
    {
      name: 'sectionHeading',
      title: 'Section Heading (optional)',
      type: 'string'
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
            { title: 'Heading 2', value: 'h2' },
            { title: 'Heading 3', value: 'h3' },
            { title: 'Heading 4', value: 'h4' },
            { title: 'Blockquote', value: 'blockquote' }
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Numbered', value: 'number' }
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
              { title: 'Underline', value: 'underline' }
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  { name: 'href', type: 'url', title: 'URL' }
                ]
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
    {
      name: 'alignment',
      title: 'Text Alignment',
      type: 'string',
      initialValue: 'left',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Center', value: 'center' }
        ],
        layout: 'radio'
      }
    }
  ],
  preview: {
    select: { title: 'sectionHeading' },
    prepare({ title }) {
      return { title: title || 'Rich Text Section' };
    }
  }
};
