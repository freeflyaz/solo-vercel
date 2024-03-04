// type definitions not pretty
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/client';
import { env } from 'process';

interface googleTrans {
  text: string[];
  targetLanguage: string | null;
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  //console.log('From API. passed to api: ' + params.id + ' - ' + request.nextUrl.searchParams.get('lang')); //You can change this and just pass a string and not an object//gabe
  try {
    const question = await prisma.question.findUnique({
      where: { order: Number(params.id) }
    });

    if (!question)
      return NextResponse.json(
        { error: 'question not found' },
        { status: 404 }
      );
    // console.log(params.id);
    const lang = request.nextUrl.searchParams.get('lang');
    //   console.log(lang);
    const userLanguage = lang;
    //console.log(question);
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
    // console.log('textsToTranslate array: ', textsToTranslate);

    //const filteredTextsToTranslate = textsToTranslate.filter((text) => text !== undefined) as string[];

    const translations = await translateText(textsToTranslate, userLanguage);
   
    if (translations.error) {
      return NextResponse.json(
        {
          error: translations.message
        },
        { status: 500 }
      );
    }
    //console.log('translations:', translations);

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
  text: googleTrans['text'],
  targetLanguage: googleTrans['targetLanguage']
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
        // Assuming targetLanguage is never null as the API is currently only used by me
        // and the workflow ensures targetLanguage is always set.
      })
    });
    const data = await response.json();
    //console.log(data.data.translations[1].translatedText);
    return data.data.translations.map((t: any) => t.translatedText);
  } catch (error) {
    console.error('Translation error:', error);
   // throw new Error('Translation service failed');
    return {error: true, message: 'Translation service failed!'};
  }
}
