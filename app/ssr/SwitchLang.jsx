'use client';
import React from 'react';
import { PiArrowBendUpLeft, PiArrowBendDownRight } from 'react-icons/pi';
import styles from './SwitchLang.module.css';
import 'flag-icon-css/css/flag-icons.min.css';
import { useRouter } from 'next/navigation';
// import { useState } from 'react';
import { getData } from './service';
import { cleanUrl } from './util';

function SwitchLang({ selectedLanguage, selectedFlag, languageFlags, currentUrl }) {
  // const [initialUrl, setInitialUrl] = useState(selectedFlag);
  const router = useRouter();   
  const flip = async () => {
    const lang = 'de';
    const data = await getData(1, lang);
    const push = `${data.order}-${cleanUrl(data.name)}?lang=${lang}`;
    console.log('push', push);
    router.push(push);
   
    // router.push(currentUrl);

  };

  return (
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
        className={`flag-icon flag-icon-${'de'} ${styles.flagRight}`}
      ></div>
      <div
        className={`flag-icon flag-icon-${selectedFlag} ${styles.flagLeft}`}
      ></div>
      <PiArrowBendDownRight className={styles.arrowRight} />
    </button>
  );
}

export default SwitchLang;
