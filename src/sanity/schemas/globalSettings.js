export default {
  name: 'globalSettings',
  title: 'Global Settings',
  type: 'document',
  // Make this a singleton document so only one instance can be created
  __experimental_actions: ['update', 'publish'], 
  fields: [
    {
      name: 'title',
      title: 'Website Title',
      type: 'string',
      initialValue: 'Wander & Wayfare — Travel & Lifestyle Blog',
      validation: Rule => Rule.required()
    },
    {
      name: 'logoText',
      title: 'Logo Text (Main)',
      type: 'string',
      initialValue: 'Wander',
      validation: Rule => Rule.required()
    },
    {
      name: 'logoHighlight',
      title: 'Logo Highlight Text',
      type: 'string',
      description: 'e.g. & Wayfare',
      initialValue: '&Wayfare',
      validation: Rule => Rule.required()
    },
    {
      name: 'footerDescription',
      title: 'Footer Description',
      type: 'text',
      rows: 3,
      initialValue: 'Stories, guides and honest advice for people who\'d rather be somewhere else. Independently written, always ad-free of nonsense.'
    },
    {
      name: 'curatedStaysCount',
      title: 'Curated Stays Count',
      type: 'number',
      description: 'The number displayed in the promo block (e.g. 78)',
      initialValue: 78
    },
    {
      name: 'curatedStaysLabel',
      title: 'Curated Stays Label',
      type: 'string',
      initialValue: 'Curated stays added this month'
    },
    {
      name: 'promoHeader',
      title: 'Promo Header',
      type: 'string',
      initialValue: 'Find your next stay before your next story.'
    },
    {
      name: 'promoButtonText',
      title: 'Promo Button Text',
      type: 'string',
      initialValue: 'Booking Now →'
    },
    {
      name: 'promoCoastText',
      title: 'Promo Coast Parallax Text',
      type: 'string',
      initialValue: 'Beyond accommodation, creating memories of a lifetime.'
    }
  ]
};
