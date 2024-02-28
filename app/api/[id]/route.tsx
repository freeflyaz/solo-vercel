import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/client';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  try {
    const question = await prisma.question.findUnique({
      where: { order: Number(params.id) }
    });

    console.log(params.id);

    if (!question)
      return NextResponse.json(
        { error: 'question not found' },
        { status: 404 }
      );

    return NextResponse.json(question);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'internal server error' },
      { status: 500 }
    );
  }
}
