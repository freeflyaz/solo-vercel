// type definitions not pretty
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/client';

interface googleTrans {
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

    // console.log(params.id);
    const lang = request.nextUrl.searchParams.get('lang');
    // console.log(lang);
    const userLanguage = lang;

    const textsToTranslate =[
      
      question?.name,
      question?.answerA,    
      question?.answerB,
      question?.answerC,
      question?.answerD,
      question?.correct
    ]
    // console.log(textsToTranslate);

    const filteredTextsToTranslate = textsToTranslate.filter((text) => text !== undefined) as string[];

    const translations = await translateText(filteredTextsToTranslate, userLanguage);

    // console.log(translations);

    if (question) {
      question.name = translations[0];
      question.answerA = translations[1];
      question.answerB = translations[2];
      question.answerC = translations[3];
      question.answerD = translations[4];
    }

    if (!question)
      return NextResponse.json(
        { error: 'question not found' },
        { status: 404 }
      );

    return NextResponse.json(question);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: error.message || 'An error occurred while processing your request.'},
      { status: 500 }
    );
  }
}

async function translateText(
  text: googleTrans['text'],
  targetLanguage: googleTrans['targetLanguage']
) {
  const apiKey = 'AIzaSyBUg9CltTctTUz4RORlR7ZMdAmLUb6QKiw'; // Ensure your API key is stored securely
  const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;

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
    console.log(data.data.translations[0].translatedText);
    return data.data.translations.map((t: any) => t.translatedText);
  } catch (error) {
    console.error('Translation error:', error);
    throw new Error('Translation service failed');
  }
}


