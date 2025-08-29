import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Use the singleton instance


export async function POST(request) {
  try {
    const data = await request.json();
    const newImage = await prisma.galleryImage.create({ data });
    return NextResponse.json(newImage, { status: 201 });
  } catch (error) {
    return new NextResponse("Error creating image", { status: 500 });
  }
}
