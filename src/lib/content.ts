import { unstable_cache } from 'next/cache';
import { Development, JournalArticle } from '@/types';
import { developments as baseDevelopments } from '@/data/developments';
import { journalArticles as baseArticles } from '@/data/articles';
import { getImportedDevelopments, getImportedArticles } from '@/lib/contentStore';

/**
 * Merged content accessors (static baseline + admin-imported items).
 * Cached with tags so /api/import can revalidate SSG pages via revalidateTag.
 */

const loadDevelopments = unstable_cache(
  async (): Promise<Development[]> => {
    const imported = await getImportedDevelopments();
    const merged = [...baseDevelopments, ...imported];
    return merged.sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
  },
  ['merged-developments'],
  { tags: ['developments'] }
);

const loadArticles = unstable_cache(
  async (): Promise<JournalArticle[]> => {
    const imported = await getImportedArticles();
    return [...imported, ...baseArticles];
  },
  ['merged-articles'],
  { tags: ['articles'] }
);

export async function getMergedDevelopments(): Promise<Development[]> {
  return loadDevelopments();
}

export async function getMergedArticles(): Promise<JournalArticle[]> {
  return loadArticles();
}

export async function getDevelopmentBySlugMerged(slug: string): Promise<Development | undefined> {
  const all = await loadDevelopments();
  return all.find((d) => d.slug === slug);
}

export async function getArticleBySlugMerged(slug: string): Promise<JournalArticle | undefined> {
  const all = await loadArticles();
  return all.find((a) => a.slug === slug);
}
