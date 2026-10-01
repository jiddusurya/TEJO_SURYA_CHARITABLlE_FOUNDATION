import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';

// GET all partners for the admin panel
export async function GET() {
    try {
        const partners = await prisma.partner.findMany({ orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }] });
        return NextResponse.json(partners);
    } catch (error) {
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

// CREATE a new partner
export async function POST(request) {
  try {
    const data = await request.json();
    const newPartner = await prisma.partner.create({ data });
    return NextResponse.json(newPartner, { status: 201 });
  } catch (error) {
    return new NextResponse("Error creating partner", { status: 500 });
  }
}
