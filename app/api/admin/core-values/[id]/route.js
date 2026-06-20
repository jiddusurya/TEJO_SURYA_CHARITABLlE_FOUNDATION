import { NextResponse } from 'next/server';
import prisma from '../../../../../lib/prisma';

export async function PUT(request, context) {
  try {
    const { id } = await context.params;
    const data = await request.json();

    if ('id' in data) {
      delete data.id;
    }

    const updatedValue = await prisma.coreValue.update({
      where: { id },
      data,
    });
    return NextResponse.json(updatedValue);
  } catch (error) {
    return new NextResponse('Error updating core value', { status: 500 });
  }
}

export async function DELETE(request, context) {
  try {
    const { id } = await context.params;
    await prisma.coreValue.delete({ where: { id } });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return new NextResponse('Error deleting core value', { status: 500 });
  }
}
