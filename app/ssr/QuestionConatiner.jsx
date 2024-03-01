import React from 'react'
import Link from 'next/link';

function QuestionConatiner({data}) {
  return (
    <>
    <div>{data.name}</div>
    <div>{data.answerA}</div>
    <div>{data.answerB}</div>
    <div>{data.answerC}</div>
    <div>{data.answerD}</div>
    <div>{data.answerE}</div>

    </>
      
  )
}

export default QuestionConatiner
