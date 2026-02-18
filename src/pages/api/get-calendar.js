/** Opt into server rendering for this endpoint only */
export const prerender = false;

const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes

/** In-memory cache for calendar responses. Key: source, value: { data, fetchedAt }. */
const calendarCache = new Map();

function getCached(source) {
  const entry = calendarCache.get(source);
  if (!entry) return null;
  if (Date.now() - entry.fetchedAt >= CACHE_TTL_MS) {
    calendarCache.delete(source);
    return null;
  }
  return entry.data;
}

function setCached(source, data) {
  calendarCache.set(source, { data, fetchedAt: Date.now() });
}

export async function GET({ url }) {
  // Get the 'source' param from the request (e.g., /api/get-calendar?source=work)
  const source = url.searchParams.get('source');

  const CALENDARS = {
    pretix: 'https://tickets.munichmakerlab.de/mumalab/events/ical/?locale=en',
    events:
      'https://calendar.google.com/calendar/ical/lbd0aa2rlahecp7juvp35hd0k0%40group.calendar.google.com/public/basic.ics',
  };

  const targetUrl = CALENDARS[source];

  if (!targetUrl) {
    return new Response(JSON.stringify({ error: 'Invalid source' }), { status: 400 });
  }

  const cached = getCached(source);
  if (cached !== null) {
    return new Response(cached, {
      status: 200,
      headers: { 'Content-Type': 'text/calendar', 'X-Cache': 'HIT' },
    });
  }

  try {
    const response = await fetch(targetUrl);
    const data = await response.text();
    setCached(source, data);
    return new Response(data, {
      status: 200,
      headers: { 'Content-Type': 'text/calendar', 'X-Cache': 'MISS' },
    });
  } catch (e) {
    console.error('Error fetching calendar:', e);
    return new Response(null, { status: 500 });
  }
}
