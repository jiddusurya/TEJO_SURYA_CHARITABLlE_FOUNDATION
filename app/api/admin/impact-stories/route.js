import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';

export async function GET() {
    try {
        const stories = await prisma.impactStory.findMany({ orderBy: { createdAt: 'desc' } });
        return NextResponse.json(stories);
    } catch (error) {
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const newStory = await prisma.impactStory.create({ data });
    return NextResponse.json(newStory, { status: 201 });
  } catch (error) {
    return new NextResponse("Error creating story", { status: 500 });
  }
}