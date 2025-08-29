import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PUT(request, context) {
  try {
    const { id } = await context.params;
    const data = await request.json();
    if ('id' in data) {
      delete data.id;
    }
    const updatedStory = await prisma.impactStory.update({
      where: { id },
      data,
    });
    return NextResponse.json(updatedStory);
  } catch (error) {
    return new NextResponse("Error updating story", { status: 500 });
  }
}

export async function DELETE(request, context) {
  try {
    const { id } = context.params;
    await prisma.impactStory.delete({ where: { id } });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return new NextResponse("Error deleting story", { status: 500 });
  }
}