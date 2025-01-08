// app/api/image_proxy/route.ts

import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const url = new URL(request.url);
  let path = url.searchParams.get('path');

  // Debugging Logs
  console.log('Image Proxy Path:', path);

  if (!path) {
    console.error('Error: Path parameter is required');
    return NextResponse.json({ error: 'Path parameter is required' }, { status: 400 });
  }

  // Agar path array me aa raha hai, to usko string me convert karo
  if (Array.isArray(path)) {
    path = path.join('');
  }

  try {
    // Construct the Supabase URL
    const supabaseUrl = `https://ewrtlcqucjbafojeyjem.supabase.co/storage/v1/object/public/NewImage/${path}`;
    console.log('Proxying to URL:', supabaseUrl);

    // Fetch the image from Supabase
    const response = await fetch(supabaseUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }

    // Get the image data as a buffer
    const imageBuffer = await response.arrayBuffer();

    // Get content type from Supabase response
    const contentType = response.headers.get('content-type') || 'image/jpeg';

    // Return the image as a response
    return new Response(imageBuffer, {
      headers: { 'Content-Type': contentType },
    });
  } catch (error) {
    console.error('Image Proxy API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
