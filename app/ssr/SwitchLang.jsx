'use client';
import React, { useState, useEffect } from 'react'; // Import useState directly from 'react'
import { useRouter } from 'next/navigation'; // Ensure this is the correct import path for useRouter
import { PiArrowBendUpLeft, PiArrowBendDownRight } from 'react-icons/pi';
import styles from './SwitchLang.module.css';
import 'flag-icon-css/css/flag-icons.min.css'; // For flag icons
import { getData } from './service';
import { cleanUrl, countryToLanguage, languageFlags } from './util';

function SwitchLang({
  selectedLanguage,
  selectedFlag,
  questionNumber,
  searchParamOldLang
}) {
  // Initialize the flags with German as the top flag and the selected flag as the bottom flag
  const [topFlag, setTopFlag] = useState(languageFlags[searchParamOldLang]);
  const [bottomFlag, setBottomFlag] = useState(selectedFlag);
  const [switchLanguage, setSwitchLanguage] = useState('de');
  //const [mysearchParamOldLang, setSearchParamOldLang] = useState(searchParamOldLang)

  const router = useRouter();
  //console.log('before click: ', topFlag, bottomFlag);

  useEffect(() => {
    console.log('topFlag Changed: ', topFlag);

  }, [topFlag]);

  const flip = async () => {
 
    setTopFlag(bottomFlag);
    setBottomFlag(topFlag);
    setSwitchLanguage(topFlag);
    

    const languageCode = countryToLanguage[switchLanguage];
    console.log('languageCode: ', languageCode);

    const data = await getData(questionNumber, languageCode);

    
    const pushUrl = `/ssr/${questionNumber}-${cleanUrl(
      data.name
    )}?lang=${languageCode}&oldLang=${selectedLanguage}`;

    
    router.push(pushUrl);
  };

  return (
    <button
      className={`${styles.roundButton} ${selectedFlag}`}
      onClick={flip}
      // disabled={selectedLanguage === 'de' && selectedFlag === 'de'}
    >
      <PiArrowBendUpLeft className={styles.arrowLeft} />
      <div
        className={`flag-icon flag-icon-${topFlag} ${styles.flagRight}`}
      ></div>
      <div
        className={`flag-icon flag-icon-${bottomFlag} ${styles.flagLeft}`}
      ></div>
      <PiArrowBendDownRight className={styles.arrowRight} />
    </button>
  );
}

export default SwitchLang;
