// Category document — replaces the inline string category field on blogPost
// Matches the existing category values: destination, lifestyle, culinary, culture
export default {
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Category Name',
      type: 'string',
      description: 'Displayed as a tag on blog cards and the filter bar (e.g. "Destination").',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      description: 'Used internally as the filter value (e.g. "destination").',
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description (optional)',
      type: 'text',
      rows: 2,
      description: 'A short description of what this category covers. Not currently displayed on the frontend.'
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'slug.current'
    }
  }
};
