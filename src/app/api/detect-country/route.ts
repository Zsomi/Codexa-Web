import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Get client IP from headers
    const forwarded = request.headers.get('x-forwarded-for');
    const realIp = request.headers.get('x-real-ip');
    const clientIp = forwarded?.split(',')[0] || realIp || '127.0.0.1';

    // Skip IP detection for localhost
    if (clientIp === '127.0.0.1' || clientIp === '::1' || clientIp.startsWith('192.168.')) {
      return NextResponse.json({ 
        country: 'HU', // Default to Hungary for development
        ip: clientIp 
      });
    }

    // Use a free IP geolocation service
    const geoResponse = await fetch(`http://ip-api.com/json/${clientIp}?fields=status,country,countryCode`);
    
    if (!geoResponse.ok) {
      throw new Error('Geolocation API failed');
    }

    const geoData = await geoResponse.json();
    
    if (geoData.status === 'success') {
      return NextResponse.json({
        country: geoData.countryCode,
        ip: clientIp
      });
    } else {
      throw new Error('Geolocation failed');
    }
  } catch (error) {
    console.error('Country detection error:', error);
    
    // Fallback to Hungary
    return NextResponse.json({ 
      country: 'HU',
      ip: 'unknown'
    });
  }
}
