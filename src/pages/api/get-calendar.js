export async function GET({ url }) {
  // Get the 'source' param from the request (e.g., /api/get-calendar?source=work)
  const source = url.searchParams.get('source');

  const CALENDARS = {
    pretix: 'https://tickets.munichmakerlab.de/mumalab/events/ical/?locale=en',
    events: 'https://calendar.google.com/calendar/ical/lbd0aa2rlahecp7juvp35hd0k0%40group.calendar.google.com/public/basic.ics'
  };

  const targetUrl = CALENDARS[source];

  if (!targetUrl) {
    return new Response(JSON.stringify({ error: 'Invalid source' }), { status: 400 });
  }

  try {
    const response = await fetch(targetUrl);
    const data = await response.text();
    return new Response(data, {
      status: 200,
      headers: { "Content-Type": "text/calendar" },
    });
  } catch (e) {
    return new Response(null, { status: 500 });
  }
}