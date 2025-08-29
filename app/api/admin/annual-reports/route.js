import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request) {
  try {
    const data = await request.json();
    const newReport = await prisma.annualReport.create({ data });
    return NextResponse.json(newReport, { status: 201 });
  } catch (error) {
    return new NextResponse("Error creating report", { status: 500 });
  }
}