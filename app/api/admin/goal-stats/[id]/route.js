import { NextResponse } from 'next/server';
import prisma from '../../../../../lib/prisma';

export async function PUT(request, context) {
  try {
    const { id } = await context.params;
    const data = await request.json();
    if ('id' in data) {
      delete data.id;
    }
    const updatedGoal = await prisma.goalStat.update({
      where: { id },
      data: {
        ...data,
        count: parseInt(data.count, 10),
        formatAsLakh: Boolean(data.formatAsLakh)
      },
    });
    return NextResponse.json(updatedGoal);
  } catch (error) {
    return new NextResponse("Error updating goal stat", { status: 500 });
  }
}

export async function DELETE(request, context) {
  try {
    const { id } = await context.params;
    await prisma.goalStat.delete({ where: { id } });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return new NextResponse("Error deleting goal stat", { status: 500 });
  }
}