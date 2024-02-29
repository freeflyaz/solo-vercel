import QuizMode from './quizMode';

 import { QuizModeProps } from '../typescript';

const List: React.FC<QuizModeProps> = ({ resetQuizKey, eventList, setReady, handleAnswerSubmission }) => {
// const List = ({resetQuizKey, eventList, setReady, handleAnswerSubmission}) => {
  return (
    <QuizMode key={resetQuizKey} eventList={eventList} setReady={setReady} handleAnswerSubmission={handleAnswerSubmission} resetQuizKey={resetQuizKey} />
)
  };
export default List;
  