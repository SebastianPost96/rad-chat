import { Injectable } from '@angular/core';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable({
  providedIn: 'root',
})
export class GoogleAiService {
  constructor() {}

  async rephraseText(text: string) {
    const genAI = new GoogleGenerativeAI(
      'AIzaSyDeMaHseioJaONQUgpCG6tL9C6b0QSPrUk', // free public key
    );
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const result = await model.generateContent([
      'The next prompt part will contain text was recorded by a person with Aphasia and may contain stuttering. If you detect any problems in the text, rephrase it to make more sense. Please respond in the language ' +
        window.navigator.language +
        ' and ONLY respond with the rephrased sentence',
      text,
    ]);
    return result.response.text();
  }
}
