import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';

// GET all mentors for the admin panel
export async function GET() {
    try {
        const mentors = await prisma.mentor.findMany({ orderBy: { createdAt: 'asc' } });
        return NextResponse.json(mentors);
    } catch (error) {
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

// CREATE a new mentor
export async function POST(request) {
  try {
    const data = await request.json();
    // Convert comma-separated tags string to an array
    if (typeof data.tags === 'string') {
        data.tags = data.tags.split(',').map(tag => tag.trim());
    }
    const newMentor = await prisma.mentor.create({ data });
    return NextResponse.json(newMentor, { status: 201 });
  } catch (error) {
    return new NextResponse("Error creating mentor", { status: 500 });
  }
}
