import HeroSection      from './HeroSection';
import RichTextSection  from './RichTextSection';
import ImageTextSection from './ImageTextSection';
import CtaSection       from './CtaSection';
import FaqSection       from './FaqSection';
import BlogGridSection  from './BlogGridSection';

// Maps every Sanity section _type to its React component.
// To add a new section type: create the component, add it here, add it to the page schema.
const SECTION_MAP = {
  heroSection:      HeroSection,
  richTextSection:  RichTextSection,
  imageTextSection: ImageTextSection,
  ctaSection:       CtaSection,
  faqSection:       FaqSection,
  blogGridSection:  BlogGridSection,
};

export default function SectionRenderer({ sections = [] }) {
  if (!sections.length) return null;

  return (
    <>
      {sections.map((section, i) => {
        const Component = SECTION_MAP[section._type];

        if (!Component) {
          // Unknown section type — skip silently in production, warn in dev
          if (process.env.NODE_ENV === 'development') {
            console.warn(`SectionRenderer: no component found for section type "${section._type}"`);
          }
          return null;
        }

        return <Component key={section._key || i} section={section} />;
      })}
    </>
  );
}
