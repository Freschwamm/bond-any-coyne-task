import { NextResponse, NextRequest } from 'next/server';

const API_BASE_URL = 'https://rickandmortyapi.com/api';

export async function GET(request: NextRequest, context: { params: { id: string } }) {
  try {
    const { id } = await context.params;
    if (!id) {
      return NextResponse.json(
        { error: 'Episode ID is required' },
        { status: 400 }
      );
    }
    
    const response = await fetch(`${API_BASE_URL}/episode/${id}`);

    if (!response.ok) {
      throw new Error('Failed to fetch Episode/s');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Episode/s' },
      { status: 500 }
    );
  }
}
