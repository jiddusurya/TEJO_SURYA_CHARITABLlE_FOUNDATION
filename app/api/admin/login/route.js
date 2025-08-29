import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

const MAX_AGE = 60 * 60 * 24 * 30; // 30 days in seconds

export async function POST(request) {
  const body = await request.json();
  const { email, password } = body;

  // Securely check credentials against environment variables
  if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
    // If credentials are valid, create a JWT
    const token = jwt.sign(
      { email },
      process.env.JWT_SECRET,
      { expiresIn: MAX_AGE }
    );

    // Set the JWT in a secure, HTTP-only cookie
    const serializedCookie = serialize('admin_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: MAX_AGE,
      path: '/',
    });

    return new NextResponse(JSON.stringify({ message: 'Authenticated!' }), {
      status: 200,
      headers: { 'Set-Cookie': serializedCookie },
    });
  }

  // If credentials are not valid, return an error
  return new NextResponse('Unauthorized', { status: 401 });
}
