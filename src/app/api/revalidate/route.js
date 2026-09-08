import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

// Maps every Sanity document type to the frontend paths it affects.
// When Sanity publishes any document, this route purges exactly the right pages.
const TYPE_TO_PATHS = {
  // Singleton pages
  homePage:      ['/'],
  siteSettings:  ['/', '/about', '/contact', '/blog'],
  aboutPage:     ['/about'],
  contactPage:   ['/contact'],

  // Collections — blog posts revalidate the listing + the specific post
  blogPost:      ['/blog', '/'],
  heroSlide:     ['/'],

  // Author/category changes can affect blog cards and about page
  author:        ['/about', '/blog'],
  category:      ['/blog'],
};

export async function POST(request) {
  const secret = request.nextUrl.searchParams.get('secret');

  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const type  = body?._type;
    const slug  = body?.slug?.current;

    const pathsToRevalidate = new Set();

    // Add all paths mapped to this document type
    if (type && TYPE_TO_PATHS[type]) {
      TYPE_TO_PATHS[type].forEach(p => pathsToRevalidate.add(p));
    }

    // For blog posts also revalidate the individual post page
    if (type === 'blogPost' && slug) {
      pathsToRevalidate.add(`/blog/${slug}`);
    }

    // If we couldn't identify the type, revalidate everything to be safe
    if (pathsToRevalidate.size === 0) {
      pathsToRevalidate.add('/');
      pathsToRevalidate.add('/about');
      pathsToRevalidate.add('/contact');
      pathsToRevalidate.add('/blog');
    }

    for (const path of pathsToRevalidate) {
      revalidatePath(path);
    }

    return NextResponse.json({
      revalidated: true,
      paths: [...pathsToRevalidate],
      now: Date.now(),
    });
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
