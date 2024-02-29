// pages/[question].js
import Container from '../Container'


export default function QuestionPage({ params }: { params: { question: string } }) {
  return (
    <div>
      <h1>{params.question}</h1>
      <Container questionNumber={params.question} />
      {/* Render additional content based on the question */}
    </div>
  );
}

