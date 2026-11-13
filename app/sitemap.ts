import type { MetadataRoute } from 'next';
import { catalog } from '../data/catalog';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://rocodes.pages.dev';
  return ['', '/codes', '/rankings', '/about', '/privacy', '/terms', '/contact', ...catalog.map(game => '/game/' + game.id)].map(path => ({
    url: base + path,
    changeFrequency: (path.startsWith('/game/') ? 'daily' : 'weekly') as 'daily' | 'weekly',
    priority: path === '' ? 1 : 0.7,
  }));
}
