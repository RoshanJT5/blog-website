import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './src/sanity/schemas';

// ─── Singleton document types ─────────────────────────────────────────────────
// These documents should only ever have one instance.
// We hide the "create new" button and pin them to the sidebar as direct links.
const SINGLETONS = [
  { name: 'homePage',     title: 'Home Page' },
  { name: 'aboutPage',    title: 'About Page' },
  { name: 'contactPage',  title: 'Contact Page' },
  { name: 'siteSettings', title: 'Site Settings' },
];

const singletonNames = new Set(SINGLETONS.map(s => s.name));

// ─── Custom Studio structure ──────────────────────────────────────────────────
const structure = (S) =>
  S.list()
    .title('Content')
    .items([

      // — Singleton pages (no list view, direct document link)
      S.listItem()
        .title('🏠 Home Page')
        .id('homePage')
        .child(S.document().schemaType('homePage').documentId('homePage')),

      S.listItem()
        .title('📖 About Page')
        .id('aboutPage')
        .child(S.document().schemaType('aboutPage').documentId('aboutPage')),

      S.listItem()
        .title('✉️ Contact Page')
        .id('contactPage')
        .child(S.document().schemaType('contactPage').documentId('contactPage')),

      S.divider(),

      // — Blog content
      S.listItem()
        .title('📝 Blog Posts')
        .schemaType('blogPost')
        .child(S.documentTypeList('blogPost').title('Blog Posts')),

      S.listItem()
        .title('🎞️ Hero Slides')
        .schemaType('heroSlide')
        .child(S.documentTypeList('heroSlide').title('Hero Slides')),

      S.divider(),

      // — Taxonomy
      S.listItem()
        .title('👤 Authors')
        .schemaType('author')
        .child(S.documentTypeList('author').title('Authors')),

      S.listItem()
        .title('🏷️ Categories')
        .schemaType('category')
        .child(S.documentTypeList('category').title('Categories')),

      S.divider(),

      // — Dynamic pages (client-created pages via page builder)
      S.listItem()
        .title('📄 Custom Pages')
        .schemaType('page')
        .child(S.documentTypeList('page').title('Custom Pages')),

      S.divider(),

      // — Global configuration singleton
      S.listItem()
        .title('⚙️ Site Settings')
        .id('siteSettings')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
    ]);

export default defineConfig({
  name: 'default',
  title: 'Wander & Wayfare CMS',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '3zwfwpwl',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  basePath: '/onlyadmincanaccess',

  plugins: [
    structureTool({ structure }),
  ],

  schema: {
    types: schemaTypes,
    // Hide singleton types from the "create new document" menu
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonNames.has(schemaType)),
  },
});
