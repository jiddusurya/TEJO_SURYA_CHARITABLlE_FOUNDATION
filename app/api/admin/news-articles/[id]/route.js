import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Use the singleton instance

export async function PUT(request, context) {
  try {
    const { id } = await context.params;
    const data = await request.json();
    if ('id' in data) {
      delete data.id;
    }
    const updatedArticle = await prisma.newsArticle.update({ where: { id }, data });
    return NextResponse.json(updatedArticle);
  } catch (error) { return new NextResponse("Error updating article", { status: 500 }); }
}
export async function DELETE(request, context) {
  try {
    const { id } = await context.params;
    await prisma.newsArticle.delete({ where: { id } });
    return new NextResponse(null, { status: 204 });
  } catch (error) { return new NextResponse("Error deleting article", { status: 500 }); }
}