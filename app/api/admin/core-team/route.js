import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';

// GET all members for the admin panel
export async function GET() {
    try {
        const members = await prisma.coreTeamMember.findMany({ orderBy: { createdAt: 'asc' } });
        return NextResponse.json(members);
    } catch (error) {
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

// CREATE a new member
export async function POST(request) {
  try {
    const data = await request.json();
    const newMember = await prisma.coreTeamMember.create({ data });
    return NextResponse.json(newMember, { status: 201 });
  } catch (error) {
    return new NextResponse("Error creating member", { status: 500 });
  }
}
