import { NextResponse } from 'next/server';

interface LeadPayload {
  name: string;
  phone?: string;
  email?: string;
  source?: string;
  message?: string;
  participantType?: string;
  tccExperience?: string;
  mentoringInterest?: string;
  availability?: unknown;
  acceptTerms?: boolean;
  timestamp?: string;
}

type LeadResult = { success: true } | { success: false; error: string };

const N8N_URL = process.env.N8N_WEBHOOK_URL;
const LEAD_SECRET = process.env.LEAD_SECRET;
const REQUEST_TIMEOUT_MS = 10_000;

function isValidString(value: unknown, max = 300): value is string {
  return (
    typeof value === 'string' && value.trim().length > 0 && value.length <= max
  );
}

function sanitizePayload(data: unknown): LeadPayload | null {
  const record =
    typeof data === 'object' && data !== null
      ? (data as Record<string, unknown>)
      : {};

  const payload: LeadPayload = {
    name: isValidString(record.name, 150) ? String(record.name).trim() : '',
    phone: isValidString(record.phone, 50)
      ? String(record.phone).trim()
      : undefined,
    email: isValidString(record.email, 200)
      ? String(record.email).trim()
      : undefined,
    source: isValidString(record.source, 120)
      ? String(record.source).trim()
      : undefined,
    message: isValidString(record.message, 500)
      ? String(record.message).trim()
      : undefined,
    participantType: isValidString(record.participantType, 120)
      ? String(record.participantType).trim()
      : undefined,
    tccExperience: isValidString(record.tccExperience, 1000)
      ? String(record.tccExperience).trim()
      : undefined,
    mentoringInterest: isValidString(record.mentoringInterest, 1000)
      ? String(record.mentoringInterest).trim()
      : undefined,
    availability: record.availability,
    acceptTerms:
      typeof record.acceptTerms === 'boolean'
        ? record.acceptTerms
        : record.acceptTerms === 'true'
        ? true
        : record.acceptTerms === 'false'
        ? false
        : undefined,
    timestamp: new Date().toISOString(),
  };

  if (!isValidString(payload.name)) return null;
  return payload;
}

async function fetchWithTimeout(
  url: string,
  init: RequestInit,
  timeoutMs: number
) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timeout);
  }
}

async function postLead(payload: LeadPayload): Promise<LeadResult> {
  if (!N8N_URL || !LEAD_SECRET) {
    return { success: false, error: 'Server not configured' };
  }

  const init: RequestInit = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-lead-secret': LEAD_SECRET,
    },
    body: JSON.stringify(payload),
  };

  // simple retry once on 5xx/network errors
  const attempts = 2;
  for (let i = 0; i < attempts; i++) {
    try {
      const res = await fetchWithTimeout(N8N_URL, init, REQUEST_TIMEOUT_MS);
      if (res.status === 401) return { success: false, error: 'Unauthorized' };
      if (res.status === 429) return { success: false, error: 'Rate limited' };
      if (res.ok) return { success: true };
      if (res.status >= 500 && i < attempts - 1) continue;
      return { success: false, error: `Upstream error ${res.status}` };
    } catch (err: unknown) {
      const isAbort = err instanceof Error && err.name === 'AbortError';
      if (i < attempts - 1 && !isAbort) continue;
      return { success: false, error: isAbort ? 'Timeout' : 'Network error' };
    }
  }
  return { success: false, error: 'Unknown error' };
}

export async function POST(req: Request) {
  let data: unknown;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json(
      { success: false, error: 'Invalid JSON' },
      { status: 400 }
    );
  }

  const payload = sanitizePayload(data);
  if (!payload) {
    return NextResponse.json(
      { success: false, error: 'Invalid payload' },
      { status: 400 }
    );
  }

  const result = await postLead(payload);

  if (result.success) {
    return NextResponse.json({ success: true });
  }

  const statusMap: Record<string, number> = {
    Unauthorized: 401,
    'Rate limited': 429,
    Timeout: 504,
  };
  const status = statusMap[result.error] ?? 502;
  return NextResponse.json({ success: false, error: result.error }, { status });
}

// Example client-side call (use server actions or fetch from client hitting /api/lead):
// await fetch('/api/lead', {
//   method: 'POST',
//   headers: { 'content-type': 'application/json' },
//   body: JSON.stringify({ name, phone, email, source, message }),
// });
