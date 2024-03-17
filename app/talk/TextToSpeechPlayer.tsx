// TextToSpeechPlayer.jsx
'use client';
import React, { useEffect, useState } from 'react';

const TextToSpeechPlayer = ({ text, languageCode, ssmlGender }) => {
  const [audioUrl, setAudioUrl] = useState('');

  useEffect(() => {
    const getDataPost = async (text, { languageCode, ssmlGender }) => {
      try {
        const response = await fetch('http://localhost:3000/api/talk', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ text, languageCode, ssmlGender })
        });

        if (response.ok) {
          const blob = await response.blob();
          const url = URL.createObjectURL(blob);
          setAudioUrl(url);
        } else {
          throw new Error('Error generating speech');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    if (text) {
      getDataPost(text, { languageCode, ssmlGender });
    }
  }, [text, languageCode, ssmlGender]);

  return (
    <>
      {audioUrl && (
        <audio controls autoPlay src={audioUrl}>
          Your browser does not support the audio element.
        </audio>
      )}
    </>
  );
};

export default TextToSpeechPlayer;
