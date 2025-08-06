import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('bd71');

    // Find the most recent live stream where isEnded is false
    const live = await db
      .collection('lives')
      .findOne({ isEnded: false }, { sort: { createdAt: -1 } });

    if (!live) {
      // No live stream found or all ended
      return NextResponse.json({ url: null }, { status: 200 });
    }

    return NextResponse.json({ url: live.liveUrl }, { status: 200 });
  } catch (error) {
    console.error('Error fetching live stream:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
