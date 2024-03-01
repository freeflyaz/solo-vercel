'use client'
import List from './List';
import LanguageSelector from '../components/LanguageSelector';
import { Flex, Box, Button, useColorModeValue } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { PiArrowBendUpLeft, PiArrowBendDownRight  } from "react-icons/pi";
import styles from '../components/Container.module.css';
import Link from 'next/link';

import '../App.css';





const Container = ({questionNumber,lang}) => {
  console.log('lang', lang);
  const firstLanguage = lang ? lang : 'de';
  console.log('firstLanguage', firstLanguage);

  const [eventList, setEventList] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState(firstLanguage);
  const [currentQuestionId, setCurrentQuestionId] = useState(questionNumber); // Starting with question 1

  // const [isFlipped, setIsFlipped] = useState(false);
  const [lastSelectedLanguage, setLastSelectedLanguage] = useState(null); // Track the last selected non-German language
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
  }, [selectedLanguage, currentQuestionId]);

  const handleLanguageChange = (lang) => {
    if (lang !== 'de') {
      setLastSelectedLanguage(lang); // Update the last selected non-German language for flipping
      setSelectedFlag('de');
    }
    setSelectedLanguage(lang);
    // setIsFlipped(false); // Reset flip state when language is changed manually
  };

  function nextQuestion() {
    setCurrentQuestionId((prevId) => Number(prevId) + 1);
  }

  function prevQuestion() {
    setCurrentQuestionId((prevId) => prevId - 1);
  }

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

  const languageFlags = {
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
      <List eventList={eventList} />
      <div className={styles.navBottom}>
     
      <Button colorScheme="green" onClick={() => prevQuestion()}>Prev</Button>
      {/* <button className="round-button" >
  +
</button> */}



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
  <Button colorScheme="green" onClick={() => nextQuestion()}>Next</Button>


      </div>
      </Box>
      

      <div className="text-center p-6">
      <Link href={`/learning/${Number(currentQuestionId)-1}?lang=${selectedLanguage}`}>
      &lt;  &nbsp; 
  </Link>

      <span>{currentQuestionId} of 301</span>
      
      <Link href={`/learning/${Number(currentQuestionId)+1}?lang=${selectedLanguage}`}>
      &nbsp; &gt;
  </Link>

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
