// Server-side API route that proxies contactPage data to the client component.
// This keeps the Sanity token server-side and gives the contact page (a 'use client'
// component) access to CMS-managed content without exposing credentials.
import { NextResponse } from 'next/server';
import { client } from '@/sanity/client';

export const revalidate = 60;

export async function GET() {
  try {
    const data = await client.fetch(`
      *[_type == "contactPage"][0]{
        heroTag,
        heroHeading,
        heroDescription,
        contactPanelHeading,
        contactPanelIntro,
        email,
        phone,
        address,
        businessHours,
        googleMapsUrl
      }
    `);
    if (!data) return NextResponse.json(null);
    return NextResponse.json(data);
  } catch (err) {
    console.error('contact page-data API error:', err.message);
    return NextResponse.json(null, { status: 500 });
  }
}
