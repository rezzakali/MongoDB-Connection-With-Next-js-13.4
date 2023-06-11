import dbConnect from '@/app/config/dbConnect';
import { NextResponse } from 'next/server';
import User from '../../model/userModel';

export async function POST(req) {
  try {
    const body = await req.json();

    const { name, email } = body;

    if (!name) {
      return NextResponse.json({
        success: 'false',
        message: 'Name is required!',
      });
    }

    if (!email) {
      return NextResponse.json({
        success: 'false',
        message: 'Email is required!',
      });
    }

    const newUser = new User({
      name,
      email,
    });

    await dbConnect();

    await newUser.save();

    return NextResponse.json({
      message: 'Success',
      staus: 200,
    });
  } catch (err) {
    console.log(err);
  }
}
