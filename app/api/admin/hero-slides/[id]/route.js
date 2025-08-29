import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Use the singleton instance


// UPDATE a hero slide
export async function PUT(request, context) {
  try {
    const { id } = await context.params;
    const data = await request.json();
    if ('id' in data) {
      delete data.id;
    }
    const updatedSlide = await prisma.heroSlide.update({
      where: { id },
      data,
    });
    return NextResponse.json(updatedSlide);
  } catch (error) {
    return new NextResponse("Error updating slide", { status: 500 });
  }
}

export async function DELETE(request, context) {
  try {
    const { id } = await context.params;
    await prisma.heroSlide.delete({ where: { id } });
    return new NextResponse(null, { status: 204 }); // No content
  } catch (error) {
    return new NextResponse("Error deleting slide", { status: 500 });
  }
}