import { promises as fs } from 'fs';
import path from 'path';
import { Development, JournalArticle } from '@/types';
import type { ImportEntity, ImportMode } from '@/lib/importSpec';

/**
 * Server-side file store for imported content (admin CSV bulk import).
 * Imported items live in `.data/<entity>.json` and are merged at render
 * time with the static baseline data in `src/data/`.
 */

const DATA_DIR = path.join(process.cwd(), '.data');

function storeFile(entity: ImportEntity): string {
  return path.join(DATA_DIR, `${entity}.json`);
}

async function readStore<T>(entity: ImportEntity): Promise<T[]> {
  try {
    const raw = await fs.readFile(storeFile(entity), 'utf-8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as T[]) : [];
  } catch {
    return [];
  }
}

async function writeStore<T>(entity: ImportEntity, items: T[]): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(storeFile(entity), JSON.stringify(items, null, 2), 'utf-8');
}

export async function getImportedDevelopments(): Promise<Development[]> {
  return readStore<Development>('developments');
}

export async function getImportedArticles(): Promise<JournalArticle[]> {
  return readStore<JournalArticle>('articles');
}

export async function saveImportedItems(
  entity: ImportEntity,
  items: (Development | JournalArticle)[],
  mode: ImportMode
): Promise<number> {
  const existing = await readStore<Development | JournalArticle>(entity);
  let result: (Development | JournalArticle)[];

  if (mode === 'upsert') {
    const bySlug = new Map(existing.map((item) => [item.slug, item]));
    for (const item of items) bySlug.set(item.slug, item);
    result = [...bySlug.values()];
  } else {
    // Append: put new items first, but de-duplicate by slug for safety so a
    // concurrent import can never create two entries with the same slug.
    const bySlug = new Map(existing.map((item) => [item.slug, item]));
    for (const item of items) {
      if (bySlug.has(item.slug)) {
        throw new Error(`Duplicate slug: ${item.slug}`);
      }
      bySlug.set(item.slug, item);
    }
    result = Array.from(bySlug.values());
  }

  await writeStore(entity, result);
  return items.length;
}
