import { NextRequest, NextResponse } from 'next/server';
import { TextToSpeechClient } from '@google-cloud/text-to-speech';

export async function POST (req : NextRequest, res: NextResponse) {
 
    console.log('gabe2');
    try {
      const client = new TextToSpeechClient();
      // Simplified request with minimal options
      const requestBody = await req.json();
      const request = {
        input: { text: requestBody.text }, // Static text for testing
        // Using defaults for voice and audioConfig where possible
        
        voice: { languageCode: 'en-US', ssmlGender: 'NEUTRAL' },
        audioConfig: { audioEncoding: 'MP3' },
      };
      console.log('gabe3', request.input.text);
      

      const [response] = await client.synthesizeSpeech(request);
      // res.setHeader('Content-Type', 'audio/mp3');
      // res.send(response.audioContent);
      console.log('Audio Content Length:', response.audioContent.length);
      return new Response(response.audioContent, {headers: {'Content-Type': 'audio/mp3'}});

    } catch (error) {
      console.error('Error:', error);
      // res.status(500).json({ error: 'Error generating speech' });
      return new Response(JSON.stringify({ error: 'Error generating speech' }), { status: 500 });
    }
  
}
