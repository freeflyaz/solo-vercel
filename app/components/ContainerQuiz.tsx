'use client';

import React from 'react';
import { useState, useEffect } from 'react';

interface Question {
  id: number;
  name: string;
  answerA: string;
  answerB: string;
  answerC: string;
  answerD: string;
  correct: string;
}

const ContainerQuiz = () => {
  const [eventList, setEventList] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('de');
  const [currentQuestionId, setCurrentQuestionId] = useState(1); // Starting with question 1
  const [ready, setReady] = useState(true);
  const [resetQuizKey, setResetQuizKey] = useState(0); // Step 1

  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);

  async function getQuestions() {
    const response = await fetch(
      `http://localhost:3000/api/${currentQuestionId}?lang=${selectedLanguage}`
      );
      const questions = await response.json();
      console.log('questionsaaa', questions);
      setEventList(questions);
    }
    useEffect(() => {
      console.log('questionsaaa333');
      getQuestions();
      console.log(selectedLanguage);
  }, []);

  return (
    <div>
      gabe
      {console.log('eventList', eventList)}

      {/* {eventList.map((question: Question) => (
        <div key={question.id}>
          <h2>{question.name}</h2>
          <ul>
            <li>{question.answerA}</li>
            <li>{question.answerB}</li>
            <li>{question.answerC}</li>
            <li>{question.answerD}</li>
          </ul>
          <p>Correct answer: {question.correct}</p>
        </div>
      ))} */}
    </div>
  );
};

export default ContainerQuiz;
