import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const fileId = searchParams.get('fileId');
    if (!fileId) {
      return new NextResponse('Missing fileId parameter', { status: 400 });
    }
    const driveUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
    const response = await fetch(driveUrl, { redirect: 'manual' });

    if (response.status === 302) {
      const location = response.headers.get('location');
      if (location) {
        const finalResponse = await fetch(location);
        const pdfBuffer = await finalResponse.arrayBuffer();
        return new NextResponse(pdfBuffer, { status: 200, headers: { 'Content-Type': 'application/pdf' }});
      }
    }
    
    if (!response.ok) {
        throw new Error(`Failed to fetch PDF: ${response.statusText}`);
    }

    const pdfBuffer = await response.arrayBuffer();
    return new NextResponse(pdfBuffer, { status: 200, headers: { 'Content-Type': 'application/pdf' }});
  } catch (error) {
    console.error('PDF Proxy Error:', error);
    return new NextResponse('Error fetching PDF file.', { status: 500 });
  }
}