// FAQ Section — useful for Privacy Policy, Terms, Careers, or any Q&A page
// Maps to frontend component: FaqSection
export default {
  name: 'faqSection',
  title: 'FAQ Section',
  type: 'object',
  fields: [
    {
      name: 'heading',
      title: 'Section Heading',
      type: 'string',
      initialValue: 'Frequently Asked Questions'
    },
    {
      name: 'items',
      title: 'FAQ Items',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'faqItem',
          title: 'FAQ Item',
          fields: [
            {
              name: 'question',
              title: 'Question',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'answer',
              title: 'Answer',
              type: 'text',
              rows: 3,
              validation: Rule => Rule.required()
            }
          ],
          preview: {
            select: { title: 'question' }
          }
        }
      ],
      validation: Rule => Rule.min(1).error('Add at least one FAQ item.')
    }
  ],
  preview: {
    select: { title: 'heading' },
    prepare({ title }) {
      return { title: title || 'FAQ Section' };
    }
  }
};
