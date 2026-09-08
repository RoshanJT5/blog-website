// Site Settings — singleton document for global site configuration
// Replaces and extends the old globalSettings schema
// __experimental_actions restricts to update+publish only (no create/delete) — singleton behaviour
export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  groups: [
    { name: 'general', title: 'General', default: true },
    { name: 'header', title: 'Header' },
    { name: 'footer', title: 'Footer' },
    { name: 'seo', title: 'SEO Defaults' }
  ],
  fields: [

    // ─── General ─────────────────────────────────────────────────────────────
    {
      name: 'siteName',
      title: 'Website Name',
      type: 'string',
      group: 'general',
      initialValue: 'Wander & Wayfare',
      validation: Rule => Rule.required()
    },
    {
      name: 'logoText',
      title: 'Logo Text (Main Part)',
      type: 'string',
      group: 'general',
      description: 'The first part of the logo wordmark (e.g. "Wander").',
      initialValue: 'Wander',
      validation: Rule => Rule.required()
    },
    {
      name: 'logoHighlight',
      title: 'Logo Highlight Text',
      type: 'string',
      group: 'general',
      description: 'The accented part of the logo (e.g. "&Wayfare").',
      initialValue: '&Wayfare',
      validation: Rule => Rule.required()
    },
    {
      name: 'accentColor',
      title: 'Primary Accent Color',
      type: 'string',
      group: 'general',
      description: 'Hex color code used as the site accent (e.g. #c98a4b).',
      initialValue: '#c98a4b',
      validation: Rule =>
        Rule.regex(/^#[0-9A-Fa-f]{6}$/).error('Must be a valid 6-digit hex color (e.g. #c98a4b).')
    },

    // ─── Header ───────────────────────────────────────────────────────────────
    {
      name: 'navLinks',
      title: 'Navigation Links',
      type: 'array',
      group: 'header',
      of: [{ type: 'navigationLink' }],
      description: 'Links shown in the main header navigation.'
    },
    {
      name: 'headerCta',
      title: 'Header CTA Button (optional)',
      type: 'button',
      group: 'header',
      description: 'The "Sign Up" style button in the top-right of the header.'
    },

    // ─── Footer ───────────────────────────────────────────────────────────────
    {
      name: 'footerDescription',
      title: 'Footer Description',
      type: 'text',
      group: 'footer',
      rows: 3,
      initialValue: "Stories, guides and honest advice for people who'd rather be somewhere else. Independently written, always ad-free of nonsense."
    },
    {
      name: 'footerAboutLinks',
      title: 'Footer "About" Column Links',
      type: 'array',
      group: 'footer',
      of: [{ type: 'navigationLink' }]
    },
    {
      name: 'footerSupportLinks',
      title: 'Footer "Support" Column Links',
      type: 'array',
      group: 'footer',
      of: [{ type: 'navigationLink' }]
    },
    {
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'array',
      group: 'footer',
      of: [{ type: 'socialLink' }],
      description: 'Shown as icons in the footer. Currently: Instagram (IG), X, Pinterest (P).'
    },
    {
      name: 'copyrightText',
      title: 'Copyright Text',
      type: 'string',
      group: 'footer',
      initialValue: '© 2026 Wander & Wayfare. All rights reserved.'
    },

    // ─── Homepage Promo Block (was in globalSettings) ─────────────────────────
    {
      name: 'curatedStaysCount',
      title: 'Promo — Curated Stays Count',
      type: 'number',
      group: 'general',
      description: 'The large number displayed in the homepage promo block (e.g. 78).',
      initialValue: 78
    },
    {
      name: 'curatedStaysLabel',
      title: 'Promo — Curated Stays Label',
      type: 'string',
      group: 'general',
      initialValue: 'Curated stays added this month'
    },
    {
      name: 'promoHeader',
      title: 'Promo — Heading',
      type: 'string',
      group: 'general',
      initialValue: 'Find your next stay before your next story.'
    },
    {
      name: 'promoButtonText',
      title: 'Promo — Button Text',
      type: 'string',
      group: 'general',
      initialValue: 'Booking Now →'
    },
    {
      name: 'promoCoastText',
      title: 'Promo — Coastal Parallax Text',
      type: 'string',
      group: 'general',
      initialValue: 'Beyond accommodation, creating memories of a lifetime.'
    },

    // ─── SEO Defaults ─────────────────────────────────────────────────────────
    {
      name: 'defaultMetaTitle',
      title: 'Default Meta Title',
      type: 'string',
      group: 'seo',
      description: 'Fallback title used when a page has no SEO title set.',
      initialValue: 'Wander & Wayfare — Travel & Lifestyle Blog',
      validation: Rule => Rule.max(60).warning('Keep under 60 characters.')
    },
    {
      name: 'defaultMetaDescription',
      title: 'Default Meta Description',
      type: 'text',
      group: 'seo',
      rows: 3,
      description: 'Fallback description used when a page has no SEO description set.',
      initialValue: "Stories, guides and honest advice for people who'd rather be somewhere else.",
      validation: Rule => Rule.max(160).warning('Keep under 160 characters.')
    },
    {
      name: 'defaultOgImage',
      title: 'Default Social Share Image',
      type: 'image',
      group: 'seo',
      options: { hotspot: true },
      description: 'Fallback image used when sharing pages that have no specific OG image. Ideal: 1200×630px.'
    }
  ]
};
