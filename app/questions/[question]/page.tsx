// pages/[question].js

export default function QuestionPage({ params }: { params: { question: string } }) {
  return (
    <div>
      <h1>{params.question}</h1>
      {/* Render additional content based on the question */}
    </div>
  );
}

