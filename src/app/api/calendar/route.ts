import { NextRequest, NextResponse } from 'next/server';

interface TimeSlot {
  time: string;
  available: boolean;
  bookingUrl?: string;
}

interface DaySchedule {
  dayName: string;
  date: string;
  slots: TimeSlot[];
}

interface CalendarData {
  specialistName: string;
  location: string;
  address: string;
  phone: string;
  days: DaySchedule[];
  prevWeekStart?: string;
  nextWeekStart?: string;
  sessionId?: string; // Store PHPSESSID for reservation
}

// Specialist URLs mapping
const SPECIALIST_URLS: Record<string, string> = {
  'kapela': 'https://salonoptyczny.asysto.pl/wizyta/krok4/4195/9160/5815',
  'grochal': 'https://salonoptyczny.asysto.pl/wizyta/krok4/4196/9166/5816',
  'ponichtera': 'https://salonoptyczny.asysto.pl/wizyta/krok4/4198/9168/5819',
  'szynkiewicz': 'https://salonoptyczny.asysto.pl/wizyta/krok4/8705/19279/12448',
};

function parseCalendarHTML(html: string): Omit<CalendarData, 'sessionId'> {
  // Extract specialist info from header
  const nameMatch = html.match(/<div class="details-row">([^<]+)<\/div>/);
  const locationMatch = html.match(/<div class="details-row">[^<]*<\/div>\s*<div class="details-row">([^<]+)<\/div>/);
  const addressMatch = html.match(/<div class="details-row">\s*([^<,]+),\s*[\d-]+\s+[^<]+<span[^>]*>,?\s*tel\.\s*([\d\s]+)<\/span>/);
  
  const specialistName = nameMatch ? nameMatch[1].trim() : '';
  const location = locationMatch ? locationMatch[1].trim() : '';
  let address = '';
  let phone = '';
  
  if (addressMatch) {
    address = addressMatch[1].trim();
    phone = addressMatch[2].trim();
  }

  // Extract navigation dates
  const prevWeekMatch = html.match(/show-prev-week[\s\S]*?data-week-start="([^"]+)"/);
  const nextWeekMatch = html.match(/show-next-week[\s\S]*?data-week-start="([^"]+)"/);
  
  const prevWeekStart = prevWeekMatch ? prevWeekMatch[1] : undefined;
  const nextWeekStart = nextWeekMatch ? nextWeekMatch[1] : undefined;

  // Parse days from table headers
  const dayHeaders: { dayName: string; date: string }[] = [];
  const headerRegex = /<th class="text-center">\s*<span>([^<]+)<\/span>\s*<br>\s*<span class="text-color3">(\d{4}-\d{2}-\d{2})<\/span>\s*<\/th>/g;
  let headerMatch;
  
  while ((headerMatch = headerRegex.exec(html)) !== null) {
    dayHeaders.push({
      dayName: headerMatch[1].trim(),
      date: headerMatch[2].trim(),
    });
  }

  // Parse time slots from table cells
  const days: DaySchedule[] = [];
  
  // Match all td cells containing reservation times
  const tdRegex = /<td class="text-center text-bold">([\s\S]*?)<\/td>/g;
  let tdMatch;
  let dayIndex = 0;

  while ((tdMatch = tdRegex.exec(html)) !== null) {
    const tdContent = tdMatch[1];
    const slots: TimeSlot[] = [];

    // Match available time slots (format: "12:00 - 12:30" or just "12:00")
    const availableRegex = /<a\s+href="([^"]+)"[^>]*class="reservation-color-time-available"[^>]*>\s*(\d{1,2}:\d{2})\s*(?:-\s*\d{1,2}:\d{2})?\s*<\/a>/g;
    let slotMatch;
    
    while ((slotMatch = availableRegex.exec(tdContent)) !== null) {
      slots.push({
        time: slotMatch[2].trim(),
        available: true,
        bookingUrl: slotMatch[1],
      });
    }

    // Match taken/unavailable time slots (format: "13:00 - 13:30" or just "13:00")
    const takenRegex = /<div class="reservation-time[^"]*text-line-through[^"]*reservation-color-time-taken[^"]*">\s*(\d{1,2}:\d{2})\s*(?:-\s*\d{1,2}:\d{2})?\s*<\/div>/g;
    let takenMatch;
    
    while ((takenMatch = takenRegex.exec(tdContent)) !== null) {
      slots.push({
        time: takenMatch[1].trim(),
        available: false,
      });
    }

    // Sort slots by time
    slots.sort((a, b) => {
      const [aHour, aMin] = a.time.split(':').map(Number);
      const [bHour, bMin] = b.time.split(':').map(Number);
      return aHour * 60 + aMin - (bHour * 60 + bMin);
    });

    if (dayIndex < dayHeaders.length) {
      days.push({
        dayName: dayHeaders[dayIndex].dayName,
        date: dayHeaders[dayIndex].date,
        slots,
      });
    }
    
    dayIndex++;
  }

  return {
    specialistName,
    location,
    address,
    phone,
    days,
    prevWeekStart,
    nextWeekStart,
  };
}

// Extract PHPSESSID from Set-Cookie headers
function extractPHPSESSID(response: Response): string | null {
  const setCookieHeaders = response.headers.getSetCookie();
  
  for (const cookie of setCookieHeaders) {
    const match = cookie.match(/PHPSESSID=([^;]+)/);
    if (match) {
      return match[1];
    }
  }
  
  return null;
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const specialistId = searchParams.get('specialist');
  const weekStart = searchParams.get('weekStart');
  const direction = searchParams.get('direction'); // 'next' or 'prev'

  if (!specialistId || !SPECIALIST_URLS[specialistId]) {
    return NextResponse.json(
      { error: 'Invalid specialist ID' },
      { status: 400 }
    );
  }

  try {
    const baseUrl = SPECIALIST_URLS[specialistId];
    
    // Build URL - if weekStart and direction are provided, use AJAX format
    let url = baseUrl;
    if (weekStart && direction) {
      url = `${baseUrl}?ajax=1&date=${weekStart}&d=${direction}`;
    }

    // First request - to get PHPSESSID (always use base URL for this)
    const firstResponse = await fetch(baseUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'Accept-Language': 'pl-PL,pl;q=0.9,en-US;q=0.8,en;q=0.7',
      },
      cache: 'no-store',
      redirect: 'manual', // Don't follow redirects, we just want the cookie
    });

    // Extract PHPSESSID from first response
    const phpSessionId = extractPHPSESSID(firstResponse);
    
    if (!phpSessionId) {
      throw new Error('Failed to get PHPSESSID from first request');
    }

    console.log('Got PHPSESSID:', phpSessionId);
    console.log('Fetching URL:', url);

    // Second request - with PHPSESSID and required cookies/headers
    const secondResponse = await fetch(url, {
      headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'Accept-Language': 'pl-PL,pl;q=0.9,en-US;q=0.8,en;q=0.7',
        'Cookie': `uasysto-ca=1; asysto-ca=1; PHPSESSID=${phpSessionId}`,
        'DNT': '1',
        'Priority': 'u=0, i',
        'Referer': 'https://salonoptyczny.asysto.pl/wizyta/krok1',
        'Sec-CH-UA': '"Not_A Brand";v="99", "Chromium";v="142"',
        'Sec-CH-UA-Mobile': '?0',
        'Sec-CH-UA-Platform': '"macOS"',
        'Sec-Fetch-Dest': 'iframe',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'same-origin',
        'Sec-Fetch-Storage-Access': 'active',
        'Sec-Fetch-User': '?1',
        'Upgrade-Insecure-Requests': '1',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36',
      },
      cache: 'no-store',
      redirect: 'follow',
    });

    if (!secondResponse.ok) {
      throw new Error(`Second request failed: ${secondResponse.status}`);
    }

    const html = await secondResponse.text();
    
    // Debug: Log info about what we got
    console.log('Calendar HTML length:', html.length);
    console.log('Contains table-reservations:', html.includes('table-reservations'));
    console.log('Contains reservation-dates:', html.includes('reservation-dates'));
    
    const calendarData = parseCalendarHTML(html);
    
    // Debug: Log parsed data
    console.log('Parsed days count:', calendarData.days.length);
    console.log('Next week start:', calendarData.nextWeekStart);
    console.log('Prev week start:', calendarData.prevWeekStart);

    // Determine if this is the current week (to hide prev button)
    const today = new Date();
    const currentWeekStart = getWeekStart(today);
    const isCurrentWeek = calendarData.days.length > 0 && 
      calendarData.days[0].date <= currentWeekStart;

    // Include sessionId and week info in response
    return NextResponse.json({
      ...calendarData,
      sessionId: phpSessionId,
      isCurrentWeek,
      currentWeekStart,
    });
  } catch (error) {
    console.error('Calendar fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch calendar data' },
      { status: 500 }
    );
  }
}

// Helper function to get the Monday of the current week
function getWeekStart(date: Date): string {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
  d.setDate(diff);
  return d.toISOString().split('T')[0];
}
