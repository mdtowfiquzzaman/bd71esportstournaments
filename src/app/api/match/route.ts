


import { NextResponse } from 'next/server';
import { fetchPubgMatchInfo } from '@/lib/match'; // Adjust path if needed

export async function GET() {
  console.log('Received request for match data...');
  const matchId = '93f1819e-45f6-4227-b2ea-7e6d1f7be6a9'; // Default or from query
  const platform =  'steam'; // Default or from query

  if (typeof matchId !== 'string') {
    return NextResponse.json({ error: 'Invalid matchId' }, { status: 400 });
  }

  try {
    const data = await fetchPubgMatchInfo(platform, matchId);
    return NextResponse.json(data, { status: 200 });
  } catch {
    return NextResponse.json(
      { error:  'Internal Server Error' },
      { status: 500 }
    );
  }
}
