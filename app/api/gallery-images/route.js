import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Use the singleton instance

export async function GET() {
  try {
    const images = await prisma.galleryImage.findMany({ orderBy: { createdAt: 'desc' } });
    return NextResponse.json(images);
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 ,message:error.message});
  }
}
