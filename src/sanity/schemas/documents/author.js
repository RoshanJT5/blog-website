// Author document — replaces inline authorName/authorInitials fields on blogPost
// Blog posts reference this document instead of duplicating author info
export default {
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      description: 'Used as a unique identifier for the author.',
      validation: Rule => Rule.required()
    },
    {
      name: 'initials',
      title: 'Initials',
      type: 'string',
      description: 'Two-letter initials for the avatar display (e.g. JD for Jane Doe).',
      validation: Rule =>
        Rule.required().max(3).error('Keep initials to 2–3 characters.')
    },
    {
      name: 'role',
      title: 'Role / Job Title',
      type: 'string',
      description: 'e.g. Founder & Editor, Destinations Writer, Photography Lead',
      validation: Rule => Rule.required()
    },
    {
      name: 'photo',
      title: 'Profile Photo',
      type: 'image',
      options: { hotspot: true }
    },
    {
      name: 'photoAlt',
      title: 'Photo Alt Text',
      type: 'string',
      description: 'Describe the photo for screen readers (e.g. "Jane Doe portrait").'
    },
    {
      name: 'bio',
      title: 'Short Bio',
      type: 'text',
      rows: 3,
      description: 'A brief description shown on author cards and blog posts.'
    },
    {
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [{ type: 'socialLink' }]
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'photo'
    }
  }
};
