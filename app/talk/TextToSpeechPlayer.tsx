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

  const api_url = process.env.NEXT_PUBLIC_API_URL;
  const buildUrl = `${api_url}/api/talk`;

  useEffect(() => {
    const getDataPost = async (text: string, { languageCode, ssmlGender }: { languageCode: string, ssmlGender: string }) => {
      try {
        const response = await fetch(buildUrl, {
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
        <audio controls autoPlay src={audioUrl} onEnded={handleAudioEnd}>
          Your browser does not support the audio element.
        </audio>
      )}
    </>
  );
};

export default TextToSpeechPlayer;
