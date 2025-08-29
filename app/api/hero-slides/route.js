import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Use the singleton instance


export async function GET() {
  try {
    const slides = await prisma.heroSlide.findMany({
      orderBy: { createdAt: 'asc' }
    });
    return NextResponse.json(slides);
  } catch (error) {
    console.error("Error fetching hero slides:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}