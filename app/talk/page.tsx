'use client';
import React, { useState } from 'react';

// Fetches the audio blob from the server
export async function getDataPost(text, { languageCode = 'es-ES', ssmlGender = 'FEMALE' }) {

  try {
    const response = await fetch('http://localhost:3000/api/talk', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      // body: JSON.stringify({ text: 'Julia is super hot!' })
      body: JSON.stringify({ text,languageCode,ssmlGender })
      
    });

    if (response.ok) {
      const blob = await response.blob();

      console.log(`Blob type: ${blob.type}`);
      console.log(`Blob size: ${blob.size} bytes`);

      if (blob.type === 'audio/mp3') {
        console.log('Received an MP3 audio blob.');
      } else {
        console.log('Received blob is not MP3 type.');
      }

      return blob;
    } else {
      throw new Error('Error generating speech');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// The component that renders the page and includes the button to trigger audio playback
export default function Page() {
  const [languageCode, setLanguageCode] = useState('es-ES');
  const [ssmlGender, setSsmlGender] = useState('FEMALE');

  const [audioUrl, setAudioUrl] = useState('');

  const handleButtonClick = async () => {
    const text = 'I love, Julia the pretty'; // Example text, adjust as needed
    console.log('gabe1', text, languageCode, ssmlGender);
    const dataBlob = await getDataPost(text, { languageCode, ssmlGender });
    if (dataBlob) {
      // Create a URL from the blob
      const url = URL.createObjectURL(dataBlob);
      // Update state with the new audio URL
      setAudioUrl(url);

      // Optional: Revoke the previous blob URL if it exists to release memory
      // This is useful if handleButtonClick is called multiple times
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    }
  };

  return (
    <>
   <select value={languageCode} onChange={(e) => setLanguageCode(e.target.value)}>
        <option value="es-ES">Spanish - Spain</option>
        <option value="en-US">English - US</option>
        {/* Add more options as needed */}
      </select>

      <select value={ssmlGender} onChange={(e) => setSsmlGender(e.target.value)}>
        <option value="FEMALE">Female</option>
        <option value="MALE">Male</option>
        {/* Add more options as needed */}
      </select>

      <button type="button" onClick={handleButtonClick}>
        Talk
      </button>
    {audioUrl && (
      <audio controls src={audioUrl}>
        Your browser does not support the audio element.
      </audio>
    )}
  </>
  );
}
