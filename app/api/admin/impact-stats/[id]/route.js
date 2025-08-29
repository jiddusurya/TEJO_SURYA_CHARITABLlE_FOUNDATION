import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Use the singleton instance


// UPDATE an impact stat
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const { count, label, icon } = await request.json();
    const updatedStat = await prisma.impactStat.update({
      where: { id },
      data: { 
        count: parseInt(count, 10),
        label,
        icon
      },
    });
    return NextResponse.json(updatedStat);
  } catch (error) {
    console.error("Error updating stat:", error);
    return new NextResponse("Error updating stat", { status: 500 });
  }
}

// DELETE an impact stat
export async function DELETE(request, { params }) {
    try {
        const { id } = params;
        await prisma.impactStat.delete({ where: { id } });
        return new NextResponse(null, { status: 204 });
    } catch (error) {
        console.error("Error deleting stat:", error);
        return new NextResponse("Error deleting stat", { status: 500 });
    }
}