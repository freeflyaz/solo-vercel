import { useState} from 'react';
import { QuizModeProps } from '../types';

const QuizMode: React.FC<QuizModeProps> = ({
  eventList,
  setReady,
  handleAnswerSubmission
}) => {
  const [buttonAStyle, setButtonAStyle] = useState('basic');
  const [buttonBStyle, setButtonBStyle] = useState('basic');
  const [buttonCStyle, setButtonCStyle] = useState('basic');
  const [buttonDStyle, setButtonDStyle] = useState('basic');
  const [areButtonsDisabled, setAreButtonsDisabled] = useState(false);

  const basic =
    'mt-4 bg-gray-100 hover:bg-gray-200 text-black  py-2 px-4 rounded w-full text-left';
  const correctStyle =
    'mt-4 border-4 border-green-500 bg-gray-100  text-black font-bold py-2 px-4 rounded w-full text-left disabled';
  const wrongStyle =
    'mt-4 border-4 border-red-100 bg-gray-100  text-black  py-2 px-4 rounded w-full text-left';
  const selectedWrongStyle =
    'mt-4 border-4 border-red-200 bg-gray-200  font-semibold  text-black  py-2 px-4 rounded w-full text-left';


  function checkAnswerHandler(selectedId: string) {
    setReady(false);
    setAreButtonsDisabled(true);
    const isCorrect = selectedId === eventList.correct;

    setButtonAStyle(eventList.correct === 'A' ? correctStyle : wrongStyle);
    setButtonBStyle(eventList.correct === 'B' ? correctStyle : wrongStyle);
    setButtonCStyle(eventList.correct === 'C' ? correctStyle : wrongStyle);
    setButtonDStyle(eventList.correct === 'D' ? correctStyle : wrongStyle);

    handleAnswerSubmission(isCorrect);

    if (!isCorrect) {
      switch (selectedId) {
        case 'A':
          setButtonAStyle(selectedWrongStyle);
          break;
        case 'B':
          setButtonBStyle(selectedWrongStyle);
          break;
        case 'C':
          setButtonCStyle(selectedWrongStyle);
          break;
        case 'D':
          setButtonDStyle(selectedWrongStyle);
          break;
        default:
          break; // Do nothing if none of these cases match
      }
    }
  }

  return (
    <>
      <div className="p-4">
        {eventList.name}

        {eventList.image == 'y' && (
          <img
            src={`../images/${eventList.order}.png`}
            alt={eventList.name}
            className="object-scale-down h-48 w-96"
          />
        )}
      </div>
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
