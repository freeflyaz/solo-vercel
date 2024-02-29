import QuizMode from './quizMode';

interface ListProps {
  resetQuizKey: number; // Assuming resetQuizKey is a string <> wrong!!! 
  eventList: any[]; // Replace any[] with a more specific type if possible
  setReady: (ready: boolean) => void; // Assuming setReady is a function that takes a boolean
  handleAnswerSubmission: (event: boolean) => void; // Adjust the event type as needed
}

const List: React.FC<ListProps> = ({ resetQuizKey, eventList, setReady, handleAnswerSubmission }) => {
// const List = ({resetQuizKey, eventList, setReady, handleAnswerSubmission}) => {
  return (
    <QuizMode key={resetQuizKey} eventList={eventList} setReady={setReady} handleAnswerSubmission={handleAnswerSubmission} />
)
  };
export default List;
  