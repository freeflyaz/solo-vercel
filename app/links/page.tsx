import React from 'react'
import Link from 'next/link';


// const questionText = "In Deutschland dürfen Menschen offen etwas gegen die Regierung sagen, weil";
const questionText = "gabe";
const encodedQuestion = encodeURIComponent(questionText);
function page() {
  return (
    <Link href={`/questions/${encodedQuestion}`}>
    Go to question
  </Link>
  )
}

export default page



