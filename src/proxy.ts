import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { timingSafeEqual } from 'crypto';

/**
 * Next.js 16 proxy (replaces the deprecated middleware convention).
 *
 * Protects the admin console and admin API surface with HTTP Basic Auth.
 * Public form submissions (POST /api/inquiries) remain open.
 *
 * Credentials are configured via environment variables:
 *   ADMIN_USERNAME  (default: admin)
 *   ADMIN_PASSWORD  (default: vantage-admin-2026 — CHANGE IN PRODUCTION)
 */

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'vantage-admin-2026';
const REALM = 'Sahaba Vantage Admin';

function secureCompare(a: string, b: string): boolean {
  const bufA = Buffer.from(a, 'utf-8');
  const bufB = Buffer.from(b, 'utf-8');
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

function isAuthorized(request: NextRequest): boolean {
  const header = request.headers.get('authorization');
  if (!header || !header.startsWith('Basic ')) return false;

  let decoded: string;
  try {
    decoded = Buffer.from(header.slice(6), 'base64').toString('utf-8');
  } catch {
    return false;
  }

  const separatorIndex = decoded.indexOf(':');
  if (separatorIndex === -1) return false;

  const username = decoded.slice(0, separatorIndex);
  const password = decoded.slice(separatorIndex + 1);

  return secureCompare(username, ADMIN_USERNAME) && secureCompare(password, ADMIN_PASSWORD);
}

function unauthorized(body: string): NextResponse {
  return new NextResponse(body, {
    status: 401,
    headers: {
      'WWW-Authenticate': `Basic realm="${REALM}", charset="UTF-8"`,
      'Content-Type': 'text/plain; charset=utf-8'
    }
  });
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Public endpoint: private visit form submissions from the website.
  if (pathname === '/api/inquiries' && request.method === 'POST') {
    return NextResponse.next();
  }

  if (isAuthorized(request)) {
    return NextResponse.next();
  }

  if (pathname.startsWith('/api/')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return unauthorized('Unauthorized — Sahaba Vantage Admin Console');
}

export const config = {
  matcher: ['/admin', '/admin/:path*', '/api/inquiries']
};
