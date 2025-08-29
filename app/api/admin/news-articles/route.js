import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Use the singleton instance

export async function POST(request) {
  try {
    const data = await request.json();
    const newArticle = await prisma.newsArticle.create({ data });
    return NextResponse.json(newArticle, { status: 201 });
  } catch (error) { return new NextResponse("Error creating article", { status: 500 }); }
}