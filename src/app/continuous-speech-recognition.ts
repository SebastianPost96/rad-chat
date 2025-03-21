import { signal } from '@angular/core';

export class ContinuousSpeechRecognition {
  public text = signal('');
  public isRecording = signal(false);
  private _recognition: SpeechRecognition;

  constructor() {
    this._recognition = new webkitSpeechRecognition();
    this._recognition.lang = window.navigator.language;

    this._recognition.onresult = (evt) => {
      const result = evt.results[0][0].transcript;
      this.text.update((text) => (text ? `${text}. ${result}` : result));
    };
    this._recognition.onend = () => {
      if (this.isRecording()) {
        this._recognition.start();
      }
    };
  }

  public start() {
    this.text.set('');
    this.isRecording.set(true);
    this._recognition.start();
  }

  public stop() {
    this.isRecording.set(false);
    this._recognition.stop();
  }
}
