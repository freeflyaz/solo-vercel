// type definitions not pretty
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/client';

interface GoogleTrans {
  text: string[];
  targetLanguage: string | null;
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  try {
    const question = await prisma.question.findUnique({
      where: { order: Number(params.id) }
    });

    if (!question)
      return NextResponse.json(
        { error: 'question not found' },
        { status: 404 }
      );
    const lang = request.nextUrl.searchParams.get('lang');
    const userLanguage = lang;
    let textsToTranslate: string[] = [];

    if (question) {
      textsToTranslate = [
        question.name,
        question.answerA,
        question.answerB,
        question.answerC,
        question.answerD,
        question.correct
      ];
    }

    const translations = await translateText(textsToTranslate, userLanguage);

    if (translations.error) {
      return NextResponse.json(
        {
          error: translations.message
        },
        { status: 500 }
      );
    }

    if (question) {
      question.name = translations[0];
      question.answerA = translations[1];
      question.answerB = translations[2];
      question.answerC = translations[3];
      question.answerD = translations[4];
    }

    return NextResponse.json(question);
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      {
        error:
          error.message || 'An error occurred while processing your request.'
      },
      { status: 500 }
    );
  }
}

async function translateText(
  text: GoogleTrans['text'],
  targetLanguage: GoogleTrans['targetLanguage']
) {
  const apiKey = process.env.API_KEY;
  const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}&format=text`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({
        q: text,
        target: targetLanguage
      })
    });
    const data = await response.json();
    return data.data.translations.map((t: any) => t.translatedText);
  } catch (error) {
    console.error('Translation error:', error);
    return { error: true, message: 'Translation service failed!' };
  }
}
