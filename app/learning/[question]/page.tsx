// 'use client';
import Container from '../Container';
import { useSearchParams } from 'next/navigation';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Welcome to Next.js'
};

export default function Page({
  params,
  searchParams
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
  <>
    <h1>Param: {params.question}</h1>
    <h1>query: {searchParams.lang}</h1>
    <Container questionNumber={params.question} lang={searchParams.lang} />
  </>
  );
}

// export default function QuestionPage({ params }: { params: string }) {
//   const searchParams = useSearchParams();
//   const lang = searchParams.get('lang');

//   return (
//     <div>
//       <h1>{params.question}</h1>
//       <Container questionNumber={params.question} lang={lang} />
//       {/* Render additional content based on the question */}
//     </div>
//   );
// }
