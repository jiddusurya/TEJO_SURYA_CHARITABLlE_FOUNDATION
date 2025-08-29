import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Use the singleton instance


export async function GET() {
  try {
    const posts = await prisma.instagramPost.findMany({ orderBy: { createdAt: 'desc' } });
    return NextResponse.json(posts);
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}


