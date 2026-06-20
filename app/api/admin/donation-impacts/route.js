import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';

export async function GET() {
  try {
    const impacts = await prisma.donationImpact.findMany({ orderBy: [{ sortOrder: 'asc' }, { amount: 'asc' }] });
    return NextResponse.json(impacts);
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const newImpact = await prisma.donationImpact.create({
      data: {
        ...data,
        amount: parseInt(data.amount, 10),
        isVisible: data.isVisible ?? true,
      },
    });
    return NextResponse.json(newImpact, { status: 201 });
  } catch (error) {
    return new NextResponse('Error creating donation impact', { status: 500 });
  }
}
