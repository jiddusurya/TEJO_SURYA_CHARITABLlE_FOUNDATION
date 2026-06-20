import { NextResponse } from 'next/server';
import prisma from '../../../../../lib/prisma';

export async function PUT(request, context) {
  try {
    const { id } = await context.params;
    const data = await request.json();

    if ('id' in data) {
      delete data.id;
    }

    const updatedImpact = await prisma.donationImpact.update({
      where: { id },
      data: {
        ...data,
        amount: parseInt(data.amount, 10),
      },
    });
    return NextResponse.json(updatedImpact);
  } catch (error) {
    return new NextResponse('Error updating donation impact', { status: 500 });
  }
}

export async function DELETE(request, context) {
  try {
    const { id } = await context.params;
    await prisma.donationImpact.delete({ where: { id } });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return new NextResponse('Error deleting donation impact', { status: 500 });
  }
}
