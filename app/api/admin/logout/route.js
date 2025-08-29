import { serialize } from 'cookie';
import { NextResponse } from 'next/server';

export async function POST() {
  // Clear the session cookie by setting its maxAge to 0
  const serializedCookie = serialize('admin_session', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 0, // Expire the cookie immediately
    path: '/',
  });

  return new NextResponse(JSON.stringify({ message: 'Logged out' }), {
    status: 200,
    headers: { 'Set-Cookie': serializedCookie },
  });
}