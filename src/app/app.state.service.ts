import { effect, Injectable, signal } from '@angular/core';

let recognition: SpeechRecognition;
if ('webkitSpeechRecognition' in window) {
  recognition = new webkitSpeechRecognition();
  recognition.lang = window.navigator.language;
}

@Injectable({ providedIn: 'root' })
export class AppStateService {
  isRecording = signal(false);
  text = signal('');

  constructor() {
    this.listenToStart();
    this.listenToEnd();
    this.handleRecognitionEvents();
  }

  private listenToStart() {
    effect(() => {
      if (this.isRecording()) {
        this.text.set('');
        recognition.start();
      }
    });
  }

  private listenToEnd() {
    effect(() => {
      if (!this.isRecording()) {
        recognition.stop();
      }
    });
  }

  private handleRecognitionEvents() {
    recognition.onresult = (evt) => {
      const result = evt.results[0][0].transcript;
      this.text.update((text) => (text ? `${text}. ${result}` : result));
    };
    recognition.onend = () => {
      if (this.isRecording()) {
        recognition.start();
      }
    };
  }
}
