import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export async function GET() {
  try {
    const stories = await prisma.impactStory.findMany({
      where: { isVisible: true },
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }]
    });
    return NextResponse.json(stories);
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}