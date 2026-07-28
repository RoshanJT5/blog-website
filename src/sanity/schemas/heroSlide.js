export default {
  name: 'heroSlide',
  title: 'Hero Slide',
  type: 'document',
  fields: [
    {
      name: 'tag',
      title: 'Tag Line',
      type: 'string',
      initialValue: 'Featured Story'
    },
    {
      name: 'title',
      title: 'Slide Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Slide Description',
      type: 'text',
      rows: 2
    },
    {
      name: 'mediaType',
      title: 'Media Type',
      type: 'string',
      initialValue: 'image',
      options: {
        list: [
          { title: 'Image', value: 'image' },
          { title: 'Video', value: 'video' }
        ],
        layout: 'radio'
      }
    },
    {
      name: 'image',
      title: 'Background Image',
      type: 'image',
      options: {
        hotspot: true
      },
      hidden: ({ parent }) => parent?.mediaType === 'video'
    },
    {
      name: 'videoUrl',
      title: 'Background Video URL',
      type: 'url',
      description: 'Link to direct .mp4 file or YouTube/Vimeo video stream',
      hidden: ({ parent }) => parent?.mediaType !== 'video'
    },
    {
      name: 'textAlignment',
      title: 'Text Alignment',
      type: 'string',
      initialValue: 'left',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Center', value: 'center' },
          { title: 'Right', value: 'right' }
        ],
        layout: 'dropdown'
      }
    },
    {
      name: 'textColor',
      title: 'Font Color Override',
      type: 'string',
      description: 'Hex code for custom font color (e.g. #ffffff)',
      initialValue: '#ffffff',
      validation: Rule => Rule.regex(/^#[0-9A-Fa-f]{6}$/).error('Must be a valid Hex color code')
    },
    {
      name: 'linkedPost',
      title: 'Linked Blog Post',
      type: 'reference',
      to: [{ type: 'blogPost' }],
      description: 'Clicking the slide button redirects the user to this article.'
    },
    {
      name: 'order',
      title: 'Slide Order',
      type: 'number',
      description: 'Display priority index (e.g. 1, 2, 3)'
    }
  ]
};
