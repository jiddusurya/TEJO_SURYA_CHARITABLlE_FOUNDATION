import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';

export async function GET() {
  try {
    const values = await prisma.coreValue.findMany({ orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }] });
    return NextResponse.json(values);
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const newValue = await prisma.coreValue.create({
      data: {
        ...data,
        isVisible: data.isVisible ?? true,
      },
    });
    return NextResponse.json(newValue, { status: 201 });
  } catch (error) {
    return new NextResponse('Error creating core value', { status: 500 });
  }
}
