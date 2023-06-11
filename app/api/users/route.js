import dbConnect from '@/app/config/dbConnect';
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    await dbConnect();
    return NextResponse.json({
      message: 'Success',
    });
  } catch (err) {
    console.log(err);
  }
}
