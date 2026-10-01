import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export async function GET() {
  try {
    const partners = await prisma.partner.findMany({
      where: { isVisible: true },
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }]
    });
    return NextResponse.json(partners);
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
