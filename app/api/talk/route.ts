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
        
        voice: { languageCode: requestBody.languageCode, ssmlGender: requestBody.ssmlGender },
        //voice: { languageCode: 'de-DE', ssmlGender: 'FEMALE' },
        //voice: { languageCode: 'es-ES', ssmlGender: 'FEMALE' },
        
        audioConfig: { audioEncoding: 'MP3' },


      };
      console.log('gabe3', request.input.text);

      const [response]: any = await client.synthesizeSpeech({
        ...request,
        audioConfig: { audioEncoding: 'MP3' as const },
      });

      console.log('Audio Content Length:', response.audioContent.length);
      return new Response(response.audioContent, {headers: {'Content-Type': 'audio/mp3'}});

    } catch (error) {
      console.error('Error:', error);
      // res.status(500).json({ error: 'Error generating speech' });
      return new Response(JSON.stringify({ error: 'Error generating speech' }), { status: 500 });
    }
  
}
