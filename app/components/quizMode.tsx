import { Button } from '@chakra-ui/react';
import { useState, useEffect } from 'react';

const QuizMode = ({ eventList, setReady, handleAnswerSubmission }) => {
  // State to manage the styles of each button individually
  const [buttonAStyle, setButtonAStyle] = useState('basic');
  const [buttonBStyle, setButtonBStyle] = useState('basic');
  const [buttonCStyle, setButtonCStyle] = useState('basic');
  const [buttonDStyle, setButtonDStyle] = useState('basic');
  const [correct, setCorrect] = useState(null);
  const [areButtonsDisabled, setAreButtonsDisabled] = useState(false);
 

  // Style classes
  const basic = 'mt-4 bg-gray-100 hover:bg-gray-200 text-black  py-2 px-4 rounded w-full text-left';
  const correctStyle = 'mt-4 border-4 border-green-500 bg-gray-100  text-black font-bold py-2 px-4 rounded w-full text-left disabled';
 const wrongStyle = 'mt-4 border-4 border-red-100 bg-gray-100  text-black  py-2 px-4 rounded w-full text-left';
 const selectedWrongStyle = 'mt-4 border-4 border-red-200 bg-gray-200  font-semibold  text-black  py-2 px-4 rounded w-full text-left';
 
//   useEffect(() => {
//     setAreButtonsDisabled(false); // Re-enable buttons on mount
//   }, []); // Empty dependency array means this runs once on mount

// This function might be called when an answer is checked



  function checkAnswerHandler(selectedId) {
    setReady(false);
    setAreButtonsDisabled(true); 
    // Determine the style for each button based on the selected answer
    const isCorrect = selectedId === eventList.correct;

    setButtonAStyle(eventList.correct === 'A' ? correctStyle : wrongStyle);
    setButtonBStyle(eventList.correct === 'B' ? correctStyle : wrongStyle);
    setButtonCStyle(eventList.correct === 'C' ? correctStyle : wrongStyle);
    setButtonDStyle(eventList.correct === 'D' ? correctStyle : wrongStyle);
    // setCorrect('Correct Answer');
    handleAnswerSubmission(isCorrect)
    // If the selected answer is incorrect, ensure the selected button has the wrongStyle
    // and the correct button has the correctStyle.
    if (!isCorrect) {
        // setCorrect(selectedId);
      switch (selectedId) {
        case 'A': setButtonAStyle(selectedWrongStyle); break;
        case 'B': setButtonBStyle(selectedWrongStyle); break;
        case 'C': setButtonCStyle(selectedWrongStyle); break;
        case 'D': setButtonDStyle(selectedWrongStyle); break;
        default: break; // Do nothing if none of these cases match
      }
    }
  }

  return (
    <>
      
      <div className='p-4' >{eventList.name}</div>
      <button
        id="A"
        className={buttonAStyle === 'basic' ? basic : buttonAStyle}
        onClick={() => checkAnswerHandler('A')}
        disabled={areButtonsDisabled}
      >
        {eventList.answerA}
      </button>
      <button
        id="B"
        className={buttonBStyle === 'basic' ? basic : buttonBStyle}
        onClick={() => checkAnswerHandler('B')}
        disabled={areButtonsDisabled}
      >
        
        {eventList.answerB}
      </button>
      <button
        id="C"
        className={buttonCStyle === 'basic' ? basic : buttonCStyle}
        onClick={() => checkAnswerHandler('C')}
        disabled={areButtonsDisabled}
      >
        {eventList.answerC} 
      </button>
      <button
        id="D"
        className={buttonDStyle === 'basic' ? basic : buttonDStyle}
        onClick={() => checkAnswerHandler('D')}
        disabled={areButtonsDisabled}
      >
        {eventList.answerD}
      </button>
    </>
  );
};

export default QuizMode;
