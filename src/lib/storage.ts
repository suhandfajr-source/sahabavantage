import { PrivateVisitInquiry } from '@/types';

const STORAGE_KEY_INQUIRIES = 'sve_inquiries_v1';

/**
 * Client-side inquiry helpers.
 *
 * Primary path: submit/read via the /api/inquiries route handler so leads
 * reach the sales team through the server-side store.
 * Fallback path: localStorage — keeps the UI functional offline or when the
 * API is unavailable (e.g. static hosting without the API layer).
 */

const initialInquiries: PrivateVisitInquiry[] = [
  {
    id: 'inq-102',
    fullName: 'Clarissa Haris',
    whatsapp: '+6281987654321',
    email: 'clarissa.haris@gmail.com',
    developmentSlug: 'the-grand-vantage',
    developmentName: 'The Grand Vantage Jakarta',
    preferredDate: '2026-03-28',
    preferredTime: '02:30 PM',
    visitorCount: 2,
    message: 'Seeking information on subterranean car gallery specs and payment schedules.',
    status: 'pending',
    createdAt: '2026-03-11T02:15:00Z'
  }
];

export function getInquiries(): PrivateVisitInquiry[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY_INQUIRIES);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_INQUIRIES, JSON.stringify(initialInquiries));
      return initialInquiries;
    }
    return JSON.parse(raw);
  } catch {
    return initialInquiries;
  }
}

function saveInquiryLocal(inquiry: Omit<PrivateVisitInquiry, 'id' | 'createdAt' | 'status'>): PrivateVisitInquiry {
  const newInquiry: PrivateVisitInquiry = {
    ...inquiry,
    id: `inq-${Date.now()}`,
    status: 'pending',
    createdAt: new Date().toISOString()
  };

  if (typeof window !== 'undefined') {
    try {
      const current = getInquiries();
      const updated = [newInquiry, ...current];
      localStorage.setItem(STORAGE_KEY_INQUIRIES, JSON.stringify(updated));
    } catch (err) {
      console.error('Failed to save inquiry to storage', err);
    }
  }

  return newInquiry;
}

export function updateInquiryStatus(id: string, status: PrivateVisitInquiry['status'], advisorNotes?: string): void {
  if (typeof window === 'undefined') return;
  try {
    const current = getInquiries();
    const updated = current.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          status,
          ...(advisorNotes !== undefined ? { advisorNotes } : {})
        };
      }
      return item;
    });
    localStorage.setItem(STORAGE_KEY_INQUIRIES, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to update inquiry status', err);
  }
}

/** Submit an inquiry through the API, falling back to localStorage. */
export async function submitInquiry(
  inquiry: Omit<PrivateVisitInquiry, 'id' | 'createdAt' | 'status'>
): Promise<{ inquiry: PrivateVisitInquiry; source: 'api' | 'local' }> {
  if (typeof window !== 'undefined') {
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inquiry)
      });
      if (res.ok) {
        const data = await res.json();
        if (data?.inquiry) {
          return { inquiry: data.inquiry as PrivateVisitInquiry, source: 'api' };
        }
      } else {
        console.error('Inquiry API rejected submission', res.status);
      }
    } catch (err) {
      console.error('Inquiry API unavailable, falling back to local storage', err);
    }
  }
  return { inquiry: saveInquiryLocal(inquiry), source: 'local' };
}

/** Load inquiries from the API (merged with any local-only entries), or localStorage on failure. */
export async function fetchInquiries(): Promise<PrivateVisitInquiry[]> {
  const local = getInquiries();
  if (typeof window === 'undefined') return local;

  try {
    const res = await fetch('/api/inquiries', { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data?.inquiries)) {
        const remote = data.inquiries as PrivateVisitInquiry[];
        const remoteIds = new Set(remote.map((item) => item.id));
        const localOnly = local.filter((item) => !remoteIds.has(item.id));
        return [...localOnly, ...remote];
      }
    }
  } catch (err) {
    console.error('Inquiry API unavailable, using local storage', err);
  }
  return local;
}

/** Update inquiry status through the API; falls back to localStorage. */
export async function patchInquiry(
  id: string,
  status: PrivateVisitInquiry['status'],
  advisorNotes?: string
): Promise<boolean> {
  if (typeof window !== 'undefined') {
    try {
      const res = await fetch('/api/inquiries', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status, advisorNotes })
      });
      if (res.ok) return true;
      console.error('Inquiry API rejected status update', res.status);
    } catch (err) {
      console.error('Inquiry API unavailable, updating locally', err);
    }
  }
  updateInquiryStatus(id, status, advisorNotes);
  return false;
}
