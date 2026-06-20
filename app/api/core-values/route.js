import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export async function GET() {
  try {
    const values = await prisma.coreValue.findMany({
      where: { isVisible: true },
      orderBy: { createdAt: 'asc' }
    });
    return NextResponse.json(values);
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
