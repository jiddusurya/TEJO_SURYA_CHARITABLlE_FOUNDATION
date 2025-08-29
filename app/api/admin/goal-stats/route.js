import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';

export async function POST(request) {
  try {
    const data = await request.json();
    const newGoal = await prisma.goalStat.create({
      data: {
        ...data,
        count: parseInt(data.count, 10),
        formatAsLakh: Boolean(data.formatAsLakh)
      },
    });
    return NextResponse.json(newGoal, { status: 201 });
  } catch (error) {
    return new NextResponse("Error creating goal stat", { status: 500 });
  }
}
