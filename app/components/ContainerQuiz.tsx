import ListQuiz from './ListQuiz';
import LanguageSelector from './LanguageSelector';
import { Flex, Box, Button, useColorModeValue } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { PiArrowBendUpLeft, PiArrowBendDownRight } from 'react-icons/pi';
import ScoreDisplay from './ScoreDisplay';
import styles from './Container.module.css';
import { EventList } from '../types';
import { languageFlags } from '../ssr/util';
import { getData } from '../ssr/service';

import '../App.css';

const Container = () => {
  const [eventList, setEventList] = useState<EventList>({
    name: 'Was steht nicht im Grundgesetz von Deutschland?"',
    correct: 'D',
    answerA: 'hier Religionsfreiheit gilt.',
    answerB: 'die Menschen Steuern zahlen.',
    answerC: 'die Menschen das Wahlrecht haben.',
    answerD: 'hier Meinungsfreiheit gilt.'
  });
  const [selectedLanguage, setSelectedLanguage] = useState('de');
  const [currentQuestionId, setCurrentQuestionId] = useState(1); 
  const [ready, setReady] = useState(true);
  const [resetQuizKey, setResetQuizKey] = useState(0); 
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);

  const [lastSelectedLanguage, setLastSelectedLanguage] = useState(''); 
  const [selectedFlag, setSelectedFlag] = useState('de');

  async function getQuestions() {
    const baseUrl =
      process.env.NODE_ENV === 'production'
        ? 'https://solo-vercel-prisma-generate.vercel.app' // Use your production base URL here
        : 'http://localhost:3000';
    const response = await fetch(
      `${baseUrl}/api/${currentQuestionId}?lang=${selectedLanguage}`
    );
    const questions = await response.json();
    setEventList(questions);
    console.log('eventList: ', questions);
  }

  useEffect(() => {
   // getQuestions();
   const fetchQuestions = async () => {
    const questions = await getData(currentQuestionId, selectedLanguage);
    setEventList(questions);
  };
  fetchQuestions();
  }, [selectedLanguage, currentQuestionId]);

  const handleAnswerSubmission = (isCorrect: boolean) => {
    if (isCorrect) {
      setCorrectCount((prev) => prev + 1);
    } else {
      setIncorrectCount((prev) => prev + 1);
    }
  };

  const handleLanguageChange = (lang: string) => {
    if (lang !== 'de') {
      setLastSelectedLanguage(lang);
      setSelectedFlag('de');
    }
    setSelectedLanguage(lang);
  };

  function nextQuestion() {
    setCurrentQuestionId((prevId) => prevId + 1);
    setReady(true);
    setResetQuizKey((prevKey) => prevKey + 1); // Step 3
  }

  const flip = () => {
    if (selectedLanguage !== 'de') {
      setLastSelectedLanguage(selectedLanguage);
      setSelectedLanguage('de');
      setSelectedFlag(selectedLanguage);
    } else {
      setSelectedLanguage(lastSelectedLanguage);
      setSelectedFlag('de');
    }
  };

  return (
    <div className={styles.Container}>
      <Flex justifyContent="center" alignItems="center">
        <Box p="4">
          <span
            className={`flag-icon flag-icon-${languageFlags[selectedLanguage]} mr-2`}
          ></span>
          <LanguageSelector onLanguageChange={handleLanguageChange} />
        </Box>
      </Flex>

      <Box
        bg={useColorModeValue('white', 'gray.700')}
        p={8}
        maxW="md"
        borderWidth={1}
        borderRadius={8}
        boxShadow="lg"
        mx="auto"
      >
        {eventList && (
          <ListQuiz
            key={resetQuizKey}
            resetQuizKey={resetQuizKey}
            eventList={eventList}
            setReady={setReady}
            handleAnswerSubmission={handleAnswerSubmission}
          />
        )}
        <div className={styles.navBottom}>
          {/* <Button colorScheme="green" onClick={() => prevQuestion()} isDisabled={ready}>Prev</Button> */}

          <button
            className={`${styles.roundButton} ${
              selectedLanguage === 'de' && selectedFlag === 'de'
                ? styles.roundButtonDisabled
                : ''
            }`}
            onClick={() => flip()}
            disabled={
              selectedLanguage === 'de' && selectedFlag === 'de' ? true : false
            }
          >
            <PiArrowBendUpLeft className={styles.arrowLeft} />
            <div
              className={`flag-icon flag-icon-${languageFlags[selectedLanguage]} ${styles.flagRight}`}
            ></div>
            <div
              className={`flag-icon flag-icon-${languageFlags[selectedFlag]} ${styles.flagLeft}`}
            ></div>
            <PiArrowBendDownRight className={styles.arrowRight} />
          </button>

          <ScoreDisplay
            correctCount={correctCount}
            incorrectCount={incorrectCount}
          />
          <Button
            colorScheme="green"
            onClick={() => nextQuestion()}
            isDisabled={ready}
          >
            Next
          </Button>
        </div>
      </Box>

      <div className="text-center p-6">
        <span>{currentQuestionId} of 301</span>
      </div>
    </div>
  );
};
export default Container;
