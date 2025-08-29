import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const reports = await prisma.annualReport.findMany({ orderBy: { year: 'desc' } });
    return NextResponse.json(reports);
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}