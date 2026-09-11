import { Development, JournalArticle } from '@/types';
import { toCsv } from '@/lib/csv';

/**
 * Shared CSV import specification for the admin console.
 * Used by: template generation (client), preview validation (client),
 * and authoritative validation (server /api/import).
 */

export type ImportEntity = 'developments' | 'articles';
export type ImportMode = 'append' | 'upsert';

export interface ColumnSpec {
  header: string;
  example: string;
  required?: boolean;
  validate?: (value: string) => string | null;
}

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const URL_RE = /^https?:\/\/\S+$/;

export const IMPORT_ENTITIES: Record<
  ImportEntity,
  { label: string; columns: ColumnSpec[] }
> = {
  developments: {
    label: 'Developments',
    columns: [
      {
        header: 'slug',
        example: 'vantage-heights',
        required: true,
        validate: (v) =>
          !SLUG_RE.test(v) ? 'slug hanya boleh huruf kecil, angka, dan tanda hubung' : null
      },
      { header: 'name', example: 'Vantage Heights', required: true },
      { header: 'tagline', example: 'Designed for Life in Balance.' },
      {
        header: 'shortDescription',
        example: '18 hillside residences with panoramic city views.'
      },
      {
        header: 'fullStory',
        example: 'A full narrative paragraph. Bisa multi-baris selama berada dalam tanda kutip.'
      },
      {
        header: 'category',
        example: 'residential',
        required: true,
        validate: (v) =>
          !['residential', 'commercial', 'estate'].includes(v)
            ? 'harus residential | commercial | estate'
            : null
      },
      {
        header: 'status',
        example: 'active',
        required: true,
        validate: (v) =>
          !['active', 'upcoming', 'completed'].includes(v)
            ? 'harus active | upcoming | completed'
            : null
      },
      {
        header: 'featured',
        example: 'false',
        validate: (v) =>
          !['true', 'false'].includes(v.toLowerCase()) ? 'harus true | false' : null
      },
      {
        header: 'order',
        example: '4',
        validate: (v) => (Number.isFinite(Number(v)) ? null : 'harus angka')
      },
      { header: 'city', example: 'Bogor', required: true },
      { header: 'province', example: 'West Java' },
      { header: 'country', example: 'Indonesia' },
      { header: 'address', example: 'Jl. Contoh No. 1, Bogor' },
      {
        header: 'heroImage',
        example: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200',
        required: true,
        validate: (v) => (!URL_RE.test(v) ? 'harus URL https:// yang valid' : null)
      },
      {
        header: 'totalUnits',
        example: '18',
        validate: (v) => (Number.isFinite(Number(v)) ? null : 'harus angka')
      },
      { header: 'completionYear', example: '2027' },
      { header: 'greenAreaPercentage', example: '60%' },
      { header: 'siteArea', example: '3.2 Hectares' },
      { header: 'seoTitle', example: 'Vantage Heights Bogor | Exclusive Residences' },
      { header: 'seoDescription', example: 'Meta description untuk mesin pencari.' },
      { header: 'seoKeywords', example: 'vantage heights, bogor luxury home' }
    ]
  },
  articles: {
    label: 'Journal Articles',
    columns: [
      {
        header: 'slug',
        example: 'the-art-of-quiet-living',
        required: true,
        validate: (v) =>
          !SLUG_RE.test(v) ? 'slug hanya boleh huruf kecil, angka, dan tanda hubung' : null
      },
      { header: 'title', example: 'The Art of Quiet Living', required: true },
      { header: 'excerpt', example: 'Ringkasan artikel satu-dua kalimat.', required: true },
      {
        header: 'content',
        example: 'Isi artikel lengkap. Bisa multi-baris selama berada dalam tanda kutip.',
        required: true
      },
      { header: 'authorName', example: 'Ir. Farhan Sahab', required: true },
      { header: 'authorRole', example: 'Principal Architect' },
      {
        header: 'authorAvatar',
        example: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200',
        validate: (v) => (!URL_RE.test(v) ? 'harus URL https:// yang valid' : null)
      },
      {
        header: 'coverImage',
        example: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200',
        required: true,
        validate: (v) => (!URL_RE.test(v) ? 'harus URL https:// yang valid' : null)
      },
      {
        header: 'category',
        example: 'Architecture',
        required: true,
        validate: (v) =>
          !['Architecture', 'Property Insight', 'Lifestyle', 'Development Update', 'Company News'].includes(v)
            ? 'harus Architecture | Property Insight | Lifestyle | Development Update | Company News'
            : null
      },
      {
        header: 'publishedAt',
        example: '2026-01-15',
        required: true,
        validate: (v) => (Number.isNaN(Date.parse(v)) ? 'harus tanggal valid (YYYY-MM-DD)' : null)
      },
      { header: 'readTime', example: '6 min read' },
      {
        header: 'featured',
        example: 'false',
        validate: (v) =>
          !['true', 'false'].includes(v.toLowerCase()) ? 'harus true | false' : null
      },
      { header: 'tags', example: 'architecture; lifestyle; design' },
      { header: 'pullQuote', example: 'Kutipan menonjol untuk artikel.' }
    ]
  }
};

export interface RowValidationResult {
  row: number;
  errors: Record<string, string>;
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
void slugify;

export function recordToDevelopment(record: Record<string, string>): Development {
  const slug = record['slug'];
  return {
    id: `imp-${slug}`,
    slug,
    name: record['name'] || slug,
    tagline: record['tagline'] || '',
    shortDescription: record['shortDescription'] || '',
    fullStory: record['fullStory'] || record['shortDescription'] || '',
    location: {
      city: record['city'] || '',
      province: record['province'] || '',
      country: record['country'] || 'Indonesia',
      address: record['address'] || record['city'] || '',
      coordinates: {
        lat: Number(record['lat']) || 0,
        lng: Number(record['lng']) || 0
      },
      nearbyLandmarks: []
    },
    heroImage: record['heroImage'],
    category: (record['category'] as Development['category']) || 'residential',
    status: (record['status'] as Development['status']) || 'upcoming',
    featured: (record['featured'] || 'false').toLowerCase() === 'true',
    order: Number(record['order']) || 99,
    stats: {
      totalUnits: Number(record['totalUnits']) || 0,
      completionYear: record['completionYear'] || '-',
      greenAreaPercentage: record['greenAreaPercentage'] || '-',
      siteArea: record['siteArea'] || '-'
    },
    highlights: [],
    lifestyle: [],
    gallery: [],
    specifications: [],
    unitTypes: [],
    masterplanLots: [],
    masterplanImage: record['heroImage'] || '',
    seo: {
      title: record['seoTitle'] || `${record['name'] || slug} | Sahaba Vantage Estates`,
      description: record['seoDescription'] || record['shortDescription'] || '',
      keywords: (record['seoKeywords'] || '')
        .split(/[,;]/)
        .map((k) => k.trim())
        .filter(Boolean)
    }
  };
}

export function recordToArticle(record: Record<string, string>): JournalArticle {
  const slug = record['slug'];
  const publishedAt = new Date(record['publishedAt']).toISOString();
  return {
    id: `imp-${slug}`,
    slug,
    title: record['title'] || slug,
    excerpt: record['excerpt'] || '',
    content: record['content'] || '',
    author: {
      name: record['authorName'] || 'Sahaba Vantage Editorial',
      role: record['authorRole'] || 'Editorial Team',
      avatar: record['authorAvatar'] || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200'
    },
    coverImage: record['coverImage'],
    category: (record['category'] as JournalArticle['category']) || 'Architecture',
    publishedAt,
    readTime: record['readTime'] || '5 min read',
    featured: (record['featured'] || 'false').toLowerCase() === 'true',
    tags: (record['tags'] || '')
      .split(/[;,]/)
      .map((t) => t.trim())
      .filter(Boolean),
    pullQuote: record['pullQuote'] || undefined,
    gallery: []
  };
}

/**
 * Validate a single record. `existingSlugs` contains slugs already present
 * (from merged site data) used for duplicate detection.
 */
export function validateRecord(
  entity: ImportEntity,
  record: Record<string, string>,
  existingSlugs: Set<string>,
  mode: ImportMode
): Record<string, string> {
  const errors: Record<string, string> = {};
  const columns = IMPORT_ENTITIES[entity].columns;

  for (const col of columns) {
    const value = (record[col.header] ?? '').trim();
    if (col.required && !value) {
      errors[col.header] = 'wajib diisi';
      continue;
    }
    if (value && col.validate) {
      const err = col.validate(value);
      if (err) errors[col.header] = err;
    }
  }

  if (mode === 'append' && !errors['slug'] && existingSlugs.has(record['slug'])) {
    errors['slug'] = 'slug sudah dipakai (gunakan mode Update/Upsert untuk menimpa)';
  }

  return errors;
}

export function buildTemplateCsv(entity: ImportEntity): string {
  const columns = IMPORT_ENTITIES[entity].columns;
  return toCsv([columns.map((c) => c.header), columns.map((c) => c.example)]);
}
