'use client';
import React, { useState, useEffect } from 'react'; // Import useState directly from 'react'
import { useRouter } from 'next/navigation'; // Ensure this is the correct import path for useRouter
import { PiArrowBendUpLeft, PiArrowBendDownRight } from 'react-icons/pi';
import styles from './SwitchLang.module.css';
import 'flag-icon-css/css/flag-icons.min.css'; // For flag icons
import { getData } from './service';
import { cleanUrl, countryToLanguage, languageFlags } from './util';
import internal from 'stream';

interface SwitchLangProps {
  selectedLanguage: string;
  selectedFlag: string;
  questionNumber: number;
  searchParamOldLang: string;
}

function SwitchLang({
  selectedLanguage,
  selectedFlag,
  questionNumber,
  searchParamOldLang
}: SwitchLangProps) {
  const router = useRouter();

  let topFlag = languageFlags[searchParamOldLang];
  let bottomFlag = selectedFlag;

  if (!topFlag) {
    topFlag = 'de';
  }

  const flip = async () => {
    if (!topFlag) {
      topFlag = 'de';
      if (bottomFlag === 'de') {
        bottomFlag = 'en';
      }
    }
    const languageCode = countryToLanguage[topFlag];
    console.log('languageCode: ', languageCode);

    const data = await getData(questionNumber, languageCode);

    const pushUrl = `/ssr/${questionNumber}-${cleanUrl(
      data.name
    )}?lang=${languageCode}&oldLang=${selectedLanguage}`;

    router.push(pushUrl);
  };
  console.log(topFlag, bottomFlag);

  return (
    <>
      <button
        className={`${styles.roundButton} ${selectedFlag}${
          //gabe
          topFlag === 'de' && bottomFlag === 'de'
            ? styles.roundButtonDisabled
            : ''
        }`}
        onClick={flip}
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
    </>
  );
}

export default SwitchLang;
