import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export async function GET() {
  try {
    // Only fetch mentors that are marked as visible
    const mentors = await prisma.mentor.findMany({
      where: { isVisible: true },
      orderBy: { createdAt: 'asc' }
    });
    return NextResponse.json(mentors);
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}