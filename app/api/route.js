import { NextResponse } from 'next/server';
import dbConnect from '../config/dbConnect';
import User from '../model/userModel';

export async function POST(req) {
  await dbConnect();
  try {
    await User.create({ name: 'Rezzak', email: 'test@gmail.com' });
    return NextResponse.json({
      message: 'Success',
    });
  } catch (err) {
    console.log(err);
  }
}
