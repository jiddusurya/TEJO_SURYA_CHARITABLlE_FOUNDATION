import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Use the singleton instance
;
export async function GET() {
  try {
    const articles = await prisma.newsArticle.findMany({ orderBy: { createdAt: 'desc' } });
    return NextResponse.json(articles);
  } catch (error) { return new NextResponse("Internal Server Error", { status: 500 }); }
}