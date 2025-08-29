import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Use the singleton instance


// CREATE a new hero slide
export async function POST(request) {
  try {
    const data = await request.json();
    const newSlide = await prisma.heroSlide.create({ data });
    return NextResponse.json(newSlide, { status: 201 });
  } catch (error) {
    return new NextResponse("Error creating slide", { status: 500 });
  }
}