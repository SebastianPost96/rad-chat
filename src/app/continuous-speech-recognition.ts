import { signal } from '@angular/core';

export class ContinuousSpeechRecognition {
  private _text = signal('');
  private _isRecording = signal(false);
  private _recognition: SpeechRecognition;

  public text = this._text.asReadonly();
  public isRecording = this._isRecording.asReadonly();

  constructor() {
    this._recognition = new webkitSpeechRecognition();
    this._recognition.lang = window.navigator.language;

    this._recognition.onresult = (evt) => {
      const result = evt.results[0][0].transcript;
      this._text.update((text) => (text ? `${text}. ${result}` : result));
    };
    this._recognition.onend = () => {
      if (this._isRecording()) {
        this._recognition.start();
      }
    };
  }

  public start() {
    this._text.set('');
    this._isRecording.set(true);
    this._recognition.start();
  }

  public stop() {
    this._isRecording.set(false);
    this._recognition.stop();
  }
}
