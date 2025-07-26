import { NextResponse } from 'next/server'; // Adjust path if needed
import { GetLast3MatchIds } from '@/lib/matchIds';

export async function GET() {

  try {
    const data = await GetLast3MatchIds();

    console.log(data);
    
    return NextResponse.json({ids: data}, { status: 200 });
  } catch {
    return NextResponse.json(
      { error:  'Internal Server Error' },
      { status: 500 }
    );
  }
}
