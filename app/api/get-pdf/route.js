// In your Next.js project, create this file at:
// app/api/get-pdf/route.js

import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    // 1. Get the Google Drive file ID from the request's query parameters.
    const { searchParams } = new URL(request.url);
    const fileId = searchParams.get('fileId');

    // Return an error if the fileId is missing.
    if (!fileId) {
      return new NextResponse('Missing fileId parameter', { status: 400 });
    }

    // 2. Construct the direct download URL for Google Drive.
    const driveUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;

    // 3. Fetch the PDF from Google Drive on the server.
    // This server-to-server request is not blocked by CORS.
    const response = await fetch(driveUrl);

    // Check if the fetch was successful.
    if (!response.ok) {
      throw new Error(`Failed to fetch PDF from Google Drive: ${response.statusText}`);
    }

    // 4. Get the PDF content as a buffer.
    const pdfBuffer = await response.arrayBuffer();

    // 5. Send the PDF content back to your frontend component.
    // We set the correct 'Content-Type' header so the browser knows it's a PDF.
    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Length': pdfBuffer.byteLength,
      },
    });

  } catch (error) {
    console.error('PDF Proxy Error:', error);
    return new NextResponse('Error fetching the PDF file.', { status: 500 });
  }
}
