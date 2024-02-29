import ListQuiz from './ListQuiz';
import LanguageSelector from './LanguageSelector';
import { Flex, Box, Button, useColorModeValue  } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { PiArrowBendUpLeft, PiArrowBendDownRight  } from "react-icons/pi";
import  ScoreDisplay  from './ScoreDisplay';
import styles from './Container.module.css';

import '../App.css';


const Container = () => {
  const [eventList, setEventList] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('de');
  const [currentQuestionId, setCurrentQuestionId] = useState(1); // Starting with question 1
  const [ready, setReady] = useState(true);
  const [resetQuizKey, setResetQuizKey] = useState(0); // Step 1

  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0)
  

  // const [isFlipped, setIsFlipped] = useState(false);
  const [lastSelectedLanguage, setLastSelectedLanguage] = useState(''); // Track the last selected non-German language
  const [selectedFlag, setSelectedFlag] = useState('de');

  async function getQuestions() {
    const response = await fetch(
      `http://localhost:3000/api/${currentQuestionId}?lang=${selectedLanguage}`
    );
    const questions = await response.json();
    setEventList(questions);
  }

  useEffect(() => {
    getQuestions();
    console.log(selectedLanguage);
   
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
      setLastSelectedLanguage(lang); // Update the last selected non-German language for flipping
      setSelectedFlag('de');
    }
    setSelectedLanguage(lang);
    // setIsFlipped(false); // Reset flip state when language is changed manually
  };

  function nextQuestion() {
    
    setCurrentQuestionId((prevId) => prevId + 1);
    setReady(true);
    setResetQuizKey((prevKey) => prevKey + 1); // Step 3
  }

  // function prevQuestion() {
  //   setCurrentQuestionId((prevId) => prevId - 1);
  //   setReady(true);
  //   setResetQuizKey((prevKey) => prevKey - 1); // Step 3
  // }

  const flip = () => {
    //setIsFlipped(!isFlipped);
    // if (isFlipped === false) {
    if (selectedLanguage !== 'de') {
      // also set the flag inside the flip btn to s

      // If not already flipped, flip to German and save the last selected language lastSelectedLanguage country flag

      setLastSelectedLanguage(selectedLanguage);
      setSelectedLanguage('de');
      setSelectedFlag(selectedLanguage);
    } else {
      // If flipped, revert to the last selected language

      //set language flag to 'de'
      setSelectedLanguage(lastSelectedLanguage);
      setSelectedFlag('de');
    }
  };

  const languageFlags: { [key: string]: string; } = {
    ar: 'sy', // Assuming Arabic for Syria
    fa: 'ir', // Persian for Iran
    ps: 'af', // Pashto for Afghanistan, also fa (Dari) is spoken here
    tr: 'tr', // Turkish for Turkey
    en: 'us', // English, using United States as the reference for the English language flag
    so: 'so', // Somali for Somalia
    ti: 'er', // Tigrinya for Eritrea
    ur: 'pk', // Urdu for Pakistan
    am: 'et', // Amharic for Ethiopia
    bn: 'bd', // Bengali for Bangladesh
    ru: 'ru', // Russian for Russia
    sq: 'al', // Albanian for Albania
    uk: 'ua', // Ukrainian for Ukraine
    sr: 'rs', // Serbian for Serbia
    de: 'de'
    // Kosovo uses 'xk', a user-assigned code not officially ISO 3166-1
  };
  
  

  return (
    <div className={styles.Container}>
      <Flex justifyContent="center" alignItems="center">
        <Box p="4" >
      <span className={`flag-icon flag-icon-${languageFlags[selectedLanguage]} mr-2`}></span>
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
      <ListQuiz key={resetQuizKey} resetQuizKey={resetQuizKey}  eventList={eventList} setReady={setReady} handleAnswerSubmission={handleAnswerSubmission} />
      <div className={styles.navBottom}>
      {/* <Button colorScheme="green" onClick={() => prevQuestion()} isDisabled={ready}>Prev</Button> */}
      



<button 
className={`${styles.roundButton} ${selectedLanguage === 'de' && selectedFlag === 'de' ? styles.roundButtonDisabled : ''}`}
 onClick={() => flip()}
 disabled={selectedLanguage === 'de' && selectedFlag === 'de' ? true : false} 
>
    <PiArrowBendUpLeft className={styles.arrowLeft}/>
    <div className={`flag-icon flag-icon-${languageFlags[selectedLanguage]} ${styles.flagRight}`}></div>
    <div className={`flag-icon flag-icon-${languageFlags[selectedFlag]} ${styles.flagLeft}`}></div>
    <PiArrowBendDownRight className={styles.arrowRight}/>
  </button>
  <ScoreDisplay correctCount={correctCount} incorrectCount={incorrectCount} />
  <Button colorScheme="green" onClick={() => nextQuestion()} isDisabled={ready}>Next</Button>
      </div>

     
      </Box>


      

      <div className="text-center p-6">
        
      <span>{currentQuestionId} of 301</span>

        {/* <Button colorScheme="green" onClick={() => flip()}>
          show me in: 
          <span
            className={`flag-icon flag-icon-${languageFlags[selectedFlag]} mr-2`}
          ></span>
        </Button> */}
       
      </div>
    </div>
  );
};
export default Container;
