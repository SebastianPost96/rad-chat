import {
  ChangeDetectionStrategy,
  Component,
  effect,
  signal,
} from '@angular/core';
import { MatIcon } from '@angular/material/icon';

let recognition: SpeechRecognition;
if ('webkitSpeechRecognition' in window) {
  recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.lang = window.navigator.language;
}

@Component({
  selector: 'app-root',
  imports: [MatIcon],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  isRecording = signal(false);
  text = signal('');
  isListening = signal(false);

  constructor() {
    effect(() => {
      if (this.text()) {
        alert(this.text());
      }
    });

    effect(() => {
      const isRecording = this.isRecording();

      if (isRecording) {
        this.text.set('');
        this.isListening.set(false);
        recognition.start();
        return;
      }

      recognition.onresult = (evt: SpeechRecognitionEvent) => {
        this.text.set(evt.results[0][0].transcript);
        this.isListening.set(true);
        recognition.stop();
      };
    });
  }

  startRecording() {
    this.isRecording.set(true);
  }

  stopRecording() {
    this.isRecording.set(false);
  }
}
