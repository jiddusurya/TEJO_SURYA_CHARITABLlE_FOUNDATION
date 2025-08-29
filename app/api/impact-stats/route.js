import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Use the singleton instance


export async function GET() {
  try {
    const stats = await prisma.impactStat.findMany();
    return NextResponse.json(stats);
  } catch (error) {
    console.error("Error fetching impact stats:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}