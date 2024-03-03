'use client';
import React, { useState } from 'react'; // Import useState directly from 'react'
import { useRouter } from 'next/navigation'; // Ensure this is the correct import path for useRouter
import { PiArrowBendUpLeft, PiArrowBendDownRight } from 'react-icons/pi';
import styles from './SwitchLang.module.css';
import 'flag-icon-css/css/flag-icons.min.css'; // For flag icons
import { getData } from './service';
import { cleanUrl } from './util';

function SwitchLang({ selectedLanguage, selectedFlag }) {
  // Initialize the flags with German as the top flag and the selected flag as the bottom flag
  const [topFlag, setTopFlag] = useState('de');
  const [bottomFlag, setBottomFlag] = useState(selectedFlag);

  const router = useRouter();

  const flip = async () => {
    // Determine the new language based on the current bottom flag.
    // If the current bottom flag is the selected language, we flip to German,
    // otherwise, we flip to the selected language.
    const newLang = bottomFlag === selectedFlag ? 'de' : selectedLanguage;
  
    // Swap the flags
    setTopFlag(bottomFlag);
    setBottomFlag(topFlag);
  
    // Fetch data for the new language if necessary
    // Assuming getData is needed for something like updating the UI
    const data = await getData(1, newLang);
  
    // Assuming you need to do something with the data, like clean the URL
    const pushUrl = `/ssr/1-${cleanUrl(data.name)}?lang=${newLang}`;
  
    // Navigate to the new URL
    router.push(pushUrl);
  };
  

  return (
    <button
      className={`${styles.roundButton} ${
        selectedLanguage === 'de' && selectedFlag === 'de' ? styles.roundButtonDisabled : ''
      }`}
      onClick={flip}
      disabled={selectedLanguage === 'de' && selectedFlag === 'de'}
    >
      <PiArrowBendUpLeft className={styles.arrowLeft} />
      <div className={`flag-icon flag-icon-${topFlag} ${styles.flagRight}`}></div>
      <div className={`flag-icon flag-icon-${bottomFlag} ${styles.flagLeft}`}></div>
      <PiArrowBendDownRight className={styles.arrowRight} />
    </button>
  );
}

export default SwitchLang;
