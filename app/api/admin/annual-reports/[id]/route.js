import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PUT(request, context) {
  try {
    const { id } = await context.params;
    const data = await request.json();
    if ('id' in data) {
      delete data.id;
    }
    const updatedReport = await prisma.annualReport.update({ where: { id }, data });
    return NextResponse.json(updatedReport);
  } catch (error) {
    console.log(error);
    return new NextResponse("Error updating report", { status: 500 });
  }
}

export async function DELETE(request, context) {
  try {
    const { id } = await context.params;
    await prisma.annualReport.delete({ where: { id } });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return new NextResponse("Error deleting report", { status: 500 });
  }
}
