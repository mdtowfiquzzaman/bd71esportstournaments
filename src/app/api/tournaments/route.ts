import clientPromise from '@/lib/mongodb';
import { NextResponse } from 'next/server';



export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('bd71'); // your database name
    const tournaments = await db.collection('tournaments').find().toArray();

    return NextResponse.json({ tournaments });
  } catch (error) {
    console.error('MongoDB GET Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}