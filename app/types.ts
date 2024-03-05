// export interface ListProps {
//     resetQuizKey: number;
//     eventList: {
//         correct: string;
//         name: string;
//         answerA: string;
//         answerB: string;
//         answerC: string;
//         answerD: string;
//       };
//     setReady: (ready: boolean) => void;
//     handleAnswerSubmission: (isCorrect: boolean) => void;
//   }

  export interface EventList {
    name: string;
    correct: string;
    answerA: string;
    answerB: string;
    answerC: string;
    answerD: string;
  }

  export interface ScoreDisplayProps {
    correctCount: number;
    incorrectCount: number;
}

  export interface QuizModeProps {
    resetQuizKey: number;
    eventList: EventList;
    setReady: (ready: boolean) => void;
    handleAnswerSubmission: (isCorrect: boolean) => void;
  }

  export  interface  LanguageFlags { 
    [key: string]: string; 
}

export interface  OnLanguageChange {
    onLanguageChange: (lang: string) => void;
}