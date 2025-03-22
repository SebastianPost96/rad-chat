import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-action-bottom-sheet',
  imports: [MatListModule, MatIcon],
  templateUrl: './action-bottom-sheet.component.html',
  styleUrl: './action-bottom-sheet.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionBottomSheetComponent {
  protected text: string = inject(MAT_BOTTOM_SHEET_DATA);

  play() {
    const utterance = new SpeechSynthesisUtterance(this.text);
    utterance.lang = window.navigator.language;
    speechSynthesis.speak(utterance);
  }

  async share() {
    await navigator.share({ text: this.text });
  }
}
