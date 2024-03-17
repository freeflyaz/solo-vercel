// TextToSpeechPlayer.jsx
'use client';
import React, { useEffect, useState } from 'react';

const TextToSpeechPlayer = ({ text, languageCode, ssmlGender, onAudioEnd }: { text: string, languageCode: string, ssmlGender: string, onAudioEnd: () => void }) => {
  const [audioUrl, setAudioUrl] = useState('');

  const handleAudioEnd = () => {
    if(onAudioEnd) {
      onAudioEnd();
    }
  }

  useEffect(() => {
    const getDataPost = async (text: string, { languageCode, ssmlGender }: { languageCode: string, ssmlGender: string }) => {
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

  // useEffect(() => {
  //   let audioElement = null; // Initialize outside so it can be accessed in cleanup
  
  //   if (audioUrl) {
  //     const timer = setTimeout(() => {
  //       audioElement = new Audio(audioUrl);
  //       audioElement.play();
  //       audioElement.onended = onAudioEnd;
  //     }, 200);
  
  //     return () => {
  //       clearTimeout(timer);
  //       if (audioElement) {
  //         audioElement.pause(); // Pause the audio if the component unmounts
  //         audioElement.src = ''; // Help with cleanup
  //       }
  //     };
  //   }
  // }, [audioUrl, onAudioEnd, 200]);

  return (
    <>
      {audioUrl && (
        <audio controls autoPlay src={audioUrl} onEnded={handleAudioEnd}>
          Your browser does not support the audio element.
        </audio>
      )}
    </>
  );
};

export default TextToSpeechPlayer;
