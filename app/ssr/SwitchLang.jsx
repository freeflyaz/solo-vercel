'use client';
import React from 'react';
import { PiArrowBendUpLeft, PiArrowBendDownRight } from 'react-icons/pi';
import styles from './SwitchLang.module.css';
import 'flag-icon-css/css/flag-icons.min.css';

function SwitchLang({ selectedLanguage, selectedFlag, languageFlags }) {
  const flip = () => {};

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
