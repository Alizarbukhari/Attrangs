import { NextResponse } from 'next/server';

interface Product {
  id: number;
  name: string;
  slug: string;
  description?: string;
  price: number;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const query = url.searchParams.get('query');

  if (!query) {
    return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
  }

  try {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';
    const response = await fetch(`${backendUrl}/search?query=${encodeURIComponent(query)}&limit=10`);

    if (!response.ok) {
      throw new Error('Failed to fetch from backend');
    }

    const data: Product[] = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Search API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 


