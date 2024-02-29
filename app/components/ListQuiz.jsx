import QuizMode from './quizMode';

const List = ({resetQuizKey, eventList, setReady, handleAnswerSubmission}) => {
  return (
    <QuizMode key={resetQuizKey} eventList={eventList} setReady={setReady} handleAnswerSubmission={handleAnswerSubmission} />
)
  };
export default List;
  