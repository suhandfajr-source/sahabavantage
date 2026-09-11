import type { MetadataRoute } from 'next';
import { getAllDevelopments } from '@/data/developments';
import { getAllArticles } from '@/data/articles';

const BASE_URL = 'https://sahabavantage.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE_URL}/developments`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/journal`, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE_URL}/about`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/philosophy`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/contact`, changeFrequency: 'monthly', priority: 0.8 }
  ];

  const developmentRoutes: MetadataRoute.Sitemap = getAllDevelopments().map((dev) => ({
    url: `${BASE_URL}/developments/${dev.slug}`,
    changeFrequency: 'weekly',
    priority: 0.9
  }));

  const articleRoutes: MetadataRoute.Sitemap = getAllArticles().map((article) => ({
    url: `${BASE_URL}/journal/${article.slug}`,
    lastModified: new Date(article.publishedAt),
    changeFrequency: 'monthly',
    priority: 0.6
  }));

  return [...staticRoutes, ...developmentRoutes, ...articleRoutes];
}
