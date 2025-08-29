import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export async function GET() {
  try {
    const goals = await prisma.goalStat.findMany({ orderBy: { createdAt: 'asc' } });
    return NextResponse.json(goals);
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}