import QuizMode from './QuizMode';

import { QuizModeProps } from '../types';

const List: React.FC<QuizModeProps> = ({
  resetQuizKey,
  eventList,
  setReady,
  handleAnswerSubmission
}) => {
  return (
    <QuizMode
      key={resetQuizKey}
      eventList={eventList}
      setReady={setReady}
      handleAnswerSubmission={handleAnswerSubmission}
      resetQuizKey={resetQuizKey}
    />
  );
};
export default List;
