import { Injectable } from '@angular/core';
import { ContinuousSpeechRecognition } from './continuous-speech-recognition';

@Injectable({ providedIn: 'root' })
export class AppStateService {
  speechRecognition = new ContinuousSpeechRecognition();
}
