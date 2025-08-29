import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Use the singleton instance

export async function GET() {
  try {
    const videos = await prisma.videoTestimonial.findMany({ orderBy: { createdAt: 'desc' } });
    return NextResponse.json(videos);
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500, message: error.message });
  }
}