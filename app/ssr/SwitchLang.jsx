'use client';
import React, { useState } from 'react'; // Import useState directly from 'react'
import { useRouter } from 'next/navigation'; // Ensure this is the correct import path for useRouter
import { PiArrowBendUpLeft, PiArrowBendDownRight } from 'react-icons/pi';
import styles from './SwitchLang.module.css';
import 'flag-icon-css/css/flag-icons.min.css'; // For flag icons
import { getData } from './service';
import { cleanUrl, countryToLanguage } from './util';

function SwitchLang({ selectedLanguage, selectedFlag }) {
  // Initialize the flags with German as the top flag and the selected flag as the bottom flag
  const [topFlag, setTopFlag] = useState('de');
  const [bottomFlag, setBottomFlag] = useState(selectedFlag);
  const [switchLanguage, setSwitchLanguage] = useState('de');

  const router = useRouter();
  //console.log('before click: ', topFlag, bottomFlag);

  const flip = async () => {
    // Swap the flags

    //console.log('after click: ', topFlag, bottomFlag);
    //console.log('after click bottom flag: ', bottomFlag);

    // let newLang = '';
    // console.log(bottomFlag);
    // if (bottomFlag === 'de') setBottomFlag('us');
    // else setBottomFlag('de');
    // console.log(bottomFlag);

    setTopFlag(bottomFlag);
    setBottomFlag(topFlag);
    setSwitchLanguage(bottomFlag);
    //console.log('switchLanguage: ', switchLanguage);

    // alert('selectedLanguage: ' + selectedLanguage);
    // alert('selectedFlag: ' + selectedFlag);
    // alert('topFlag: ' + topFlag);
    // alert('bottomFlag: ' + bottomFlag);

    const languageCode = countryToLanguage[switchLanguage];
    console.log('languageCode: ', languageCode);
    // Fetch data for the new language if necessary
    // Assuming getData is needed for something like updating the UI
    const data = await getData(1, languageCode);

    // Assuming you need to do something with the data, like clean the URL
    const pushUrl = `/ssr/1-${cleanUrl(data.name)}?lang=${languageCode}`;

    // Navigate to the new URL
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
