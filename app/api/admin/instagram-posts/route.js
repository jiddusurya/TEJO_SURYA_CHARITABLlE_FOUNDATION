import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Use the singleton instance


export async function POST(request) {
  try {
    const data = await request.json();
    const newPost = await prisma.instagramPost.create({ data });
    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    return new NextResponse("Error creating post", { status: 500 });
  }
}
