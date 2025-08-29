import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export async function GET() {
  try {
    // Only fetch members that are marked as visible
    const members = await prisma.coreTeamMember.findMany({
      where: { isVisible: true },
      orderBy: { createdAt: 'asc' }
    });
    return NextResponse.json(members);
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
