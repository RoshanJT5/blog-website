import Studio from './Studio';

// Disable default HTML layout rendering for the admin panel (so it takes the full screen)
export const dynamic = 'force-dynamic';

export default function StudioPage() {
  return <Studio />;
}
