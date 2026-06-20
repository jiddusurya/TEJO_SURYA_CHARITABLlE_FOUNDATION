import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export async function GET() {
  try {
    const impacts = await prisma.donationImpact.findMany({
      where: { isVisible: true },
      orderBy: { amount: 'asc' }
    });
    return NextResponse.json(impacts);
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
