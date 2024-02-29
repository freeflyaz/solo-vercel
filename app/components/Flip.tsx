import React from 'react';
import { PiArrowBendUpLeft, PiArrowBendDownRight  } from "react-icons/pi";
import styles from './Container.module.css';

function Flip() {
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
        className={`flag-icon flag-icon-${languageFlags[selectedLanguage]} ${styles.flagRight}`}
      ></div>
      <div
        className={`flag-icon flag-icon-${languageFlags[selectedFlag]} ${styles.flagLeft}`}
      ></div>
      <PiArrowBendDownRight className={styles.arrowRight} />
    </button>
  );
}

export default Flip;
