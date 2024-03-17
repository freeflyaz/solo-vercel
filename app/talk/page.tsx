'use client';
import React from 'react';

// Fetches the audio blob from the server
export async function getDataPost() {
  try {
    const response = await fetch('http://localhost:3000/api/talk', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text: 'Julia is super hot!' })
    });

    if (response.ok) {
      const blob = await response.blob();

      console.log(`Blob type: ${blob.type}`);
      console.log(`Blob size: ${blob.size} bytes`);

      if (blob.type === 'audio/mpeg') {
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
  const handleButtonClick = async () => {
    const dataBlob = await getDataPost();
    if (dataBlob) {
      // Create a URL from the blob
      const url = URL.createObjectURL(dataBlob);
      // Use the Audio API to play the audio
      const audio = new Audio(url);
      audio.play()
        .then(() => console.log('Audio playback started'))
        .catch(error => console.error('Error playing the audio:', error));

      // Optional: Revoke the blob URL once the audio is no longer needed to release memory
      audio.onended = () => {
        URL.revokeObjectURL(url);
      };

      console.log('Data fetched successfully');
    }
  };

  return (
    <>
      <button type="button" onClick={handleButtonClick}>
        Talk
      </button>
    </>
  );
}
