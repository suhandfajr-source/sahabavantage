import { NextRequest, NextResponse } from 'next/server';
import { PrivateVisitInquiry } from '@/types';
import { listInquiries, addInquiry, patchInquiryStatus } from '@/lib/inquiriesStore';
import { getDevelopmentBySlugMerged } from '@/lib/content';

/**
 * GET /api/inquiries — list all inquiries. Admin-only (guarded by proxy Basic auth).
 * POST /api/inquiries — public endpoint for private visit form submissions.
 * PATCH /api/inquiries — update inquiry status/notes. Admin-only (guarded by proxy).
 */

const VALID_STATUSES: PrivateVisitInquiry['status'][] = [
  'pending',
  'confirmed',
  'rescheduled',
  'completed',
  'cancelled'
];

function sanitizeString(value: unknown, maxLength: number): string {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, maxLength);
}

export async function GET() {
  try {
    const inquiries = await listInquiries();
    return NextResponse.json({ inquiries });
  } catch (err) {
    console.error('GET /api/inquiries failed', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    const fullName = sanitizeString(body.fullName, 120);
    const whatsapp = sanitizeString(body.whatsapp, 32);
    const email = sanitizeString(body.email, 160);
    const developmentSlug = sanitizeString(body.developmentSlug, 80);
    const preferredDate = sanitizeString(body.preferredDate, 20);
    const preferredTime = sanitizeString(body.preferredTime, 20);

    const errors: string[] = [];
    if (!fullName) errors.push('fullName is required');
    if (!whatsapp) errors.push('whatsapp is required');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('email is invalid');
    if (!developmentSlug) errors.push('developmentSlug is required');
    if (!preferredDate) errors.push('preferredDate is required');
    if (!preferredTime) errors.push('preferredTime is required');

    const visitorCountRaw = Number(body.visitorCount);
    const visitorCount = Number.isFinite(visitorCountRaw)
      ? Math.min(Math.max(Math.trunc(visitorCountRaw), 1), 20)
      : NaN;
    if (!Number.isFinite(visitorCount)) errors.push('visitorCount must be a number');

    if (errors.length > 0) {
      return NextResponse.json({ error: 'Validation failed', details: errors }, { status: 422 });
    }

    const development = await getDevelopmentBySlugMerged(developmentSlug);
    const developmentName = development ? development.name : 'General Consultation';

    const inquiry = await addInquiry({
      fullName,
      whatsapp,
      email,
      developmentSlug,
      developmentName,
      preferredDate,
      preferredTime,
      visitorCount,
      message: sanitizeString(body.message, 1000) || undefined
    });

    return NextResponse.json({ inquiry }, { status: 201 });
  } catch (err) {
    console.error('POST /api/inquiries failed', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    const id = sanitizeString(body.id, 64);
    const status = sanitizeString(body.status, 20) as PrivateVisitInquiry['status'];
    const advisorNotes = body.advisorNotes !== undefined ? sanitizeString(body.advisorNotes, 500) : undefined;

    if (!id) {
      return NextResponse.json({ error: 'id is required' }, { status: 400 });
    }
    if (!VALID_STATUSES.includes(status)) {
      return NextResponse.json(
        { error: `status must be one of: ${VALID_STATUSES.join(', ')}` },
        { status: 422 }
      );
    }

    const updated = await patchInquiryStatus(id, status, advisorNotes);
    if (!updated) {
      return NextResponse.json({ error: 'Inquiry not found' }, { status: 404 });
    }

    return NextResponse.json({ inquiry: updated });
  } catch (err) {
    console.error('PATCH /api/inquiries failed', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
