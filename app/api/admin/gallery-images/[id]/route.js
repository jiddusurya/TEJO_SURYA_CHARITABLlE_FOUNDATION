import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Use the singleton instance


export async function PUT(request, context) {
  try {
    const { id } = await context.params;
    const data = await request.json();
    if ('id' in data) {
      delete data.id;
    }
    const updatedImage = await prisma.galleryImage.update({ where: { id }, data });
    return NextResponse.json(updatedImage);
  } catch (error) {
    return new NextResponse("Error updating image", { status: 500 });
  }
}

export async function DELETE(request, context) {
  try {
    const { id } = await context.params;
    await prisma.galleryImage.delete({ where: { id } });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return new NextResponse("Error deleting image", { status: 500 });
  }
}
