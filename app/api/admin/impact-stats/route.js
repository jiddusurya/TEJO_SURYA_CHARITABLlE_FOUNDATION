import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Use the singleton instance


// CREATE a new impact stat
export async function POST(request) {
  try {
    const { label, count, icon } = await request.json();
    const newStat = await prisma.impactStat.create({
      data: {
        label,
        count: parseInt(count, 10),
        icon,
      },
    });
    return NextResponse.json(newStat, { status: 201 });
  } catch (error) {
    console.error("Error creating stat:", error);
    return new NextResponse("Error creating stat", { status: 500 });
  }
}