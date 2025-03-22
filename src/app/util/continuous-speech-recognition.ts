import { signal } from '@angular/core';
import { firstValueFrom, Subject } from 'rxjs';

export class ContinuousSpeechRecognition {
  private _recognition = new webkitSpeechRecognition();
  private _onEnd$ = new Subject<void>();
  private _text = '';
  private _isRecording = signal(false);

  public isRecording = this._isRecording.asReadonly();

  constructor() {
    this.configureSpeechRecognition();
  }

  /** Starts the speech recognition */
  public start() {
    this._text = '';
    this._isRecording.set(true);
    this._recognition.start();
  }

  /** Stops the speech recognitions and returns the detected text */
  public async stop(): Promise<string> {
    this._isRecording.set(false);
    this._recognition.stop();
    await firstValueFrom(this._onEnd$); // wait for recognition to finalize
    return this._text;
  }

  private configureSpeechRecognition() {
    this._recognition.lang = window.navigator.language;
    this._recognition.onresult = (evt) => {
      const result = evt.results[0][0].transcript;
      this._text = this._text ? `${this._text}. ${result}` : result;
    };
    this._recognition.onend = () => {
      this._onEnd$.next();
      if (this._isRecording()) {
        this._recognition.start();
      }
    };
  }
}
