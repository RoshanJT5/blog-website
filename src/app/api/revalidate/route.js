import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const secret = request.nextUrl.searchParams.get('secret');

  // Verify the secret against our environment variable to prevent unauthorized cache purging
  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const type = body?._type;
    const slug = body?.slug?.current;

    // Revalidate global page caches
    revalidatePath('/');
    revalidatePath('/blog');

    // Revalidate the specific post details page if a blog post changed
    if (type === 'blogPost' && slug) {
      revalidatePath(`/blog/${slug}`);
    }

    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
