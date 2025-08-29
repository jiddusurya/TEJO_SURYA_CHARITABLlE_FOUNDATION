import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Use the singleton instance

export async function PUT(request, context) {
  try {
    const { id } = await context.params;
    const data = await request.json();
    if ('id' in data) {
      delete data.id;
    }
    const updatedVideo = await prisma.videoTestimonial.update({ where: { id }, data });
    return NextResponse.json(updatedVideo);
  } catch (error) { return new NextResponse("Error updating video", { status: 500 }); }
}
export async function DELETE(request, context) {
  try {
    const { id } = await context.params;
    await prisma.videoTestimonial.delete({ where: { id } });
    return new NextResponse(null, { status: 204 });
  } catch (error) { return new NextResponse("Error deleting video", { status: 500 }); }
}
