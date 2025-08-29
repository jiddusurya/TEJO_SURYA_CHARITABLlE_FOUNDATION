import { NextResponse } from 'next/server';
import prisma from '../../../../../lib/prisma';

// UPDATE a mentor
export async function PUT(request, context) {
  try {
    const { id } = await context.params;
    const data = await request.json();
    if ('id' in data) {
      delete data.id;
    }
    // Convert comma-separated tags string to an array
    if (typeof data.tags === 'string') {
        data.tags = data.tags.split(',').map(tag => tag.trim());
    }
    const updatedMentor = await prisma.mentor.update({ where: { id }, data });
    return NextResponse.json(updatedMentor);
  } catch (error) {
    return new NextResponse("Error updating mentor", { status: 500 });
  }
}

// DELETE a mentor
export async function DELETE(request, context) {
  try {
    const { id } = await context.params;
    await prisma.mentor.delete({ where: { id } });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return new NextResponse("Error deleting mentor", { status: 500 });
  }
}
