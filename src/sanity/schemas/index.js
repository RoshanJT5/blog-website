// ─── Reusable Object Schemas ─────────────────────────────────────────────────
import seo from './objects/seo';
import button from './objects/button';
import imageWithAlt from './objects/imageWithAlt';
import socialLink from './objects/socialLink';
import navigationLink from './objects/navigationLink';

// ─── Page Section Object Schemas ─────────────────────────────────────────────
import heroSection from './objects/sections/heroSection';
import richTextSection from './objects/sections/richTextSection';
import imageTextSection from './objects/sections/imageTextSection';
import ctaSection from './objects/sections/ctaSection';
import faqSection from './objects/sections/faqSection';
import blogGridSection from './objects/sections/blogGridSection';

// ─── Document Schemas ─────────────────────────────────────────────────────────
// Collections (many documents each)
import author from './documents/author';
import category from './documents/category';
import blogPost from './documents/blogPost';
import page from './documents/page';

// Singletons (one document each — enforced via __experimental_actions)
import siteSettings from './documents/siteSettings';
import homePage from './documents/homePage';
import aboutPage from './documents/aboutPage';
import contactPage from './documents/contactPage';

// Legacy — heroSlide is still a separate multi-document collection
import heroSlide from './heroSlide';

// ─── Export ───────────────────────────────────────────────────────────────────
// Object schemas must be registered before document schemas that reference them.
export const schemaTypes = [
  // Objects
  seo,
  button,
  imageWithAlt,
  socialLink,
  navigationLink,

  // Section objects
  heroSection,
  richTextSection,
  imageTextSection,
  ctaSection,
  faqSection,
  blogGridSection,

  // Collections
  author,
  category,
  blogPost,
  heroSlide,
  page,

  // Singletons
  siteSettings,
  homePage,
  aboutPage,
  contactPage,
];
