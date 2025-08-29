import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Use the singleton instance

export async function POST(request) {
  try {
    const data = await request.json();
    const newVideo = await prisma.videoTestimonial.create({ data });
    return NextResponse.json(newVideo, { status: 201 });
  } catch (error) { return new NextResponse("Error creating video", { status: 500 }); }
}