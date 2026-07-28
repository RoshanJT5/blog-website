import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './src/sanity/schemas';

export default defineConfig({
  name: 'default',
  title: 'Wander & Wayfare CMS',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '3zwfwpwl',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  basePath: '/onlyadmincanaccess',

  plugins: [structureTool()],

  schema: {
    types: schemaTypes,
  },
});
