import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';
import { AppStateService } from '../app.state.service';

@Component({
  selector: 'app-action-bottom-sheet',
  imports: [MatListModule, MatIcon],
  templateUrl: './action-bottom-sheet.component.html',
  styleUrl: './action-bottom-sheet.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionBottomSheetComponent {
  protected state = inject(AppStateService);

  play() {
    const utterance = new SpeechSynthesisUtterance(
      this.state.speechRecognition.text(),
    );
    utterance.lang = window.navigator.language;
    speechSynthesis.speak(utterance);
  }

  async share() {
    await navigator.share({ text: this.state.speechRecognition.text() });
  }
}
