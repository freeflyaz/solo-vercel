'use client';
// pages/[question].js
import Container from '../Container'
import { useSearchParams } from 'next/navigation'

import { type NextRequest } from 'next/server'

// interface QuestionPageProps {
//   question: string;
//   lang?: string; // lang is optional because it may not be provided in the URL
// }
 
// export function GET(request: NextRequest) {
//   const searchParams = request.nextUrl.searchParams
//   const query = searchParams.get('lang')
//   // query is "hello" for /api/search?query=hello
//   console.log('query', query);
// }

export default function QuestionPage({ params }: { params: string }) {
  const searchParams = useSearchParams();
  const lang = searchParams.get('lang');
  
  return (
    <div>
      <h1>{params.question}</h1>
      <Container questionNumber={params.question} lang={lang} />
      {/* Render additional content based on the question */}
    </div>
  );
}

