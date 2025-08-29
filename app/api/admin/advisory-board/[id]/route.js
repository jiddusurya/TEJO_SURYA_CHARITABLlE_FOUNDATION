import { NextResponse } from 'next/server';
import prisma from '../../../../../lib/prisma';

// UPDATE a member
export async function PUT(request, context) {
  try {
    const { id } = await context.params;
    const data = await request.json();
    if ('id' in data) {
      delete data.id;
    }
    const updatedMember = await prisma.advisoryBoardMember.update({ where: { id }, data });
    return NextResponse.json(updatedMember);
  } catch (error) {
    return new NextResponse("Error updating member", { status: 500 });
  }
}

// DELETE a member
export async function DELETE(request, context) {
  try {
    const { id } = await context.params;
    await prisma.advisoryBoardMember.delete({ where: { id } });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return new NextResponse("Error deleting member", { status: 500 });
  }
}
