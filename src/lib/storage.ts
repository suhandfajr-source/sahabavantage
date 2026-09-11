import { PrivateVisitInquiry } from '@/types';

const STORAGE_KEY_INQUIRIES = 'sve_inquiries_v1';

const initialInquiries: PrivateVisitInquiry[] = [
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
  },
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
  if (typeof window === 'undefined') return initialInquiries;
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

export function saveInquiry(inquiry: Omit<PrivateVisitInquiry, 'id' | 'createdAt' | 'status'>): PrivateVisitInquiry {
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
