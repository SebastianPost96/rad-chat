import { signal } from '@angular/core';
import { firstValueFrom, Subject, switchMap } from 'rxjs';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';

export class ContinuousSpeechRecognition {
  private _recognition = new webkitSpeechRecognition();
  private _onEnd$ = new Subject<void>();
  private _text = '';
  private _isRecording = signal(false);

  public isRecording = this._isRecording.asReadonly();

  constructor() {
    this.configureSpeechRecognition();
    this.registerWakeLock();
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

  private registerWakeLock() {
    let wakeLock: WakeLockSentinel | null = null;
    toObservable(this._isRecording)
      .pipe(
        switchMap(async (isRecording) => {
          if (isRecording) {
            wakeLock = await window.navigator.wakeLock.request('screen');
          } else {
            await wakeLock?.release();
            wakeLock = null;
          }
        }),
        takeUntilDestroyed(),
      )
      .subscribe();
  }
}
