import { Box, useColorModeValue, Heading } from '@chakra-ui/react';

const Learning = ({ eventList }) => {
  const correctAnswer = `answer${eventList.correct}`;
  // Function to return the style based on whether the answer is correct or not
  const answerButtonStyle = (answerKey) => {
    return answerKey === correctAnswer
      ? 'mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full text-left'
      : 'mt-4 bg-gray-100 hover:bg-gray-200 text-black font-bold py-2 px-4 rounded w-full text-left';
  };

  return (
    <>

      {eventList.name}
      <button className={answerButtonStyle('answerA')}>
        {eventList.answerA}
      </button>
      <button className={answerButtonStyle('answerB')}>
        {eventList.answerB}
      </button>
      <button className={answerButtonStyle('answerC')}>
        {eventList.answerC}
      </button>
      <button className={answerButtonStyle('answerD')}>
        {eventList.answerD}
      </button>
      </> 
  );
};
export default Learning;
