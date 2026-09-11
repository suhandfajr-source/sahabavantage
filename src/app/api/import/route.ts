import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import { Development, JournalArticle } from '@/types';
import {
  validateRecord,
  recordToDevelopment,
  recordToArticle,
  type ImportEntity,
  type ImportMode
} from '@/lib/importSpec';
import { developments as baseDevelopments } from '@/data/developments';
import { journalArticles as baseArticles } from '@/data/articles';
import { getImportedDevelopments, getImportedArticles, saveImportedItems } from '@/lib/contentStore';

/**
 * POST /api/import — bulk import CSV rows (admin-only, guarded by proxy).
 * Body: { entity: 'developments' | 'articles', mode: 'append' | 'upsert', rows: Record<string,string>[] }
 */

const VALID_ENTITIES: ImportEntity[] = ['developments', 'articles'];
const VALID_MODES: ImportMode[] = ['append', 'upsert'];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    const entity = body.entity as ImportEntity;
    const mode = (body.mode as ImportMode) || 'append';
    const rows = body.rows as Record<string, string>[];

    if (!VALID_ENTITIES.includes(entity)) {
      return NextResponse.json(
        { error: `entity must be one of: ${VALID_ENTITIES.join(', ')}` },
        { status: 400 }
      );
    }
    if (!VALID_MODES.includes(mode)) {
      return NextResponse.json({ error: 'mode must be append | upsert' }, { status: 400 });
    }
    if (!Array.isArray(rows) || rows.length === 0) {
      return NextResponse.json({ error: 'rows must be a non-empty array' }, { status: 422 });
    }
    if (rows.length > 500) {
      return NextResponse.json({ error: 'maksimal 500 baris per import' }, { status: 422 });
    }

    // Existing slugs for duplicate detection — read FRESH from the store
    // (the tagged render cache may serve stale data briefly after an import)
    const [baseDevs, importedDevs, baseArts, importedArts] = await Promise.all([
      Promise.resolve(baseDevelopments),
      getImportedDevelopments(),
      Promise.resolve(baseArticles),
      getImportedArticles()
    ]);
    const existingSlugs = new Set<string>(
      entity === 'developments'
        ? [...baseDevs, ...importedDevs].map((item) => item.slug)
        : [...baseArts, ...importedArts].map((item) => item.slug)
    );

    const rowErrors: { row: number; errors: Record<string, string> }[] = [];
    const validItems: (Development | JournalArticle)[] = [];

    rows.forEach((record, idx) => {
      const errors = validateRecord(entity, record, existingSlugs, mode);
      if (Object.keys(errors).length > 0) {
        rowErrors.push({ row: idx + 1, errors });
        return;
      }
      validItems.push(entity === 'developments' ? recordToDevelopment(record) : recordToArticle(record));
    });

    if (rowErrors.length > 0 || validItems.length === 0) {
      return NextResponse.json(
        { imported: 0, failed: rowErrors.length, errors: rowErrors },
        { status: 422 }
      );
    }

    const imported = await saveImportedItems(entity, validItems, mode);

    // Regenerate SSG pages that display this entity
    revalidateTag(entity === 'developments' ? 'developments' : 'articles', 'max');

    return NextResponse.json({ imported, failed: 0 }, { status: 201 });
  } catch (err) {
    console.error('POST /api/import failed', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
