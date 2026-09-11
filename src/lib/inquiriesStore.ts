import { promises as fs } from 'fs';
import path from 'path';
import { PrivateVisitInquiry } from '@/types';

/**
 * Server-side file-based store for private visit inquiries.
 * Data lives in `.data/inquiries.json` at the project root so leads
 * persist across requests on self-hosted deployments (dev, VPS, Docker).
 * Swap this module for a real database/CRM integration in production.
 */

const DATA_DIR = path.join(process.cwd(), '.data');
const DATA_FILE = path.join(DATA_DIR, 'inquiries.json');

const seedInquiries: PrivateVisitInquiry[] = [
  {
    id: 'inq-101',
    fullName: 'Bambang Soediro',
    whatsapp: '+6281234567890',
    email: 'bambang.soediro@investama.co.id',
    developmentSlug: 'vantage-residence',
    developmentName: 'Vantage Residence Bogor',
    preferredDate: '2026-03-25',
    preferredTime: '10:00 AM',
    visitorCount: 3,
    message: 'Interested in The Celestial Villa Type 380 with prime mountain view orientation. Requesting private tour.',
    status: 'confirmed',
    createdAt: '2026-03-10T08:30:00Z',
    advisorNotes: 'VIP client, assigned Senior Advisor Hendra.'
  }
];

async function ensureStore(): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.writeFile(DATA_FILE, JSON.stringify(seedInquiries, null, 2), 'utf-8');
  }
}

export async function listInquiries(): Promise<PrivateVisitInquiry[]> {
  try {
    await ensureStore();
    const raw = await fs.readFile(DATA_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as PrivateVisitInquiry[]) : seedInquiries;
  } catch (err) {
    console.error('Failed to read inquiries store', err);
    return seedInquiries;
  }
}

export async function addInquiry(
  payload: Omit<PrivateVisitInquiry, 'id' | 'createdAt' | 'status'>
): Promise<PrivateVisitInquiry> {
  const newInquiry: PrivateVisitInquiry = {
    ...payload,
    id: `inq-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    status: 'pending',
    createdAt: new Date().toISOString()
  };

  const current = await listInquiries();
  const updated = [newInquiry, ...current];
  await fs.writeFile(DATA_FILE, JSON.stringify(updated, null, 2), 'utf-8');
  return newInquiry;
}

export async function patchInquiryStatus(
  id: string,
  status: PrivateVisitInquiry['status'],
  advisorNotes?: string
): Promise<PrivateVisitInquiry | null> {
  const current = await listInquiries();
  let updatedInquiry: PrivateVisitInquiry | null = null;
  const updated = current.map((item) => {
    if (item.id === id) {
      updatedInquiry = {
        ...item,
        status,
        ...(advisorNotes !== undefined ? { advisorNotes } : {})
      };
      return updatedInquiry;
    }
    return item;
  });

  if (!updatedInquiry) return null;

  await fs.writeFile(DATA_FILE, JSON.stringify(updated, null, 2), 'utf-8');
  return updatedInquiry;
}
