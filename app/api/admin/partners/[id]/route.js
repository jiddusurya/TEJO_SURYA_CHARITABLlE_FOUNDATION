import { NextResponse } from 'next/server';
import prisma from '../../../../../lib/prisma';

// UPDATE a partner
export async function PUT(request, context) {
  try {
    const { id } = await context.params;
    const data = await request.json();
    if ('id' in data) {
      delete data.id;
    }
    const updatedPartner = await prisma.partner.update({ where: { id }, data });
    return NextResponse.json(updatedPartner);
  } catch (error) {
    return new NextResponse("Error updating partner", { status: 500 });
  }
}

// DELETE a partner
export async function DELETE(request, context) {
  try {
    const { id } = await context.params;
    await prisma.partner.delete({ where: { id } });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return new NextResponse("Error deleting partner", { status: 500 });
  }
}
