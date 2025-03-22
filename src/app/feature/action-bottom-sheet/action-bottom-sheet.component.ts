import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { GoogleAiService } from '../../data-access/google-ai.service';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-action-bottom-sheet',
  imports: [MatListModule, MatIcon, MatProgressSpinner, AsyncPipe],
  templateUrl: './action-bottom-sheet.component.html',
  styleUrl: './action-bottom-sheet.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionBottomSheetComponent {
  private _text: string = inject(MAT_BOTTOM_SHEET_DATA);
  private _googleAiService = inject(GoogleAiService);
  protected rephrasedText$ = this._googleAiService.rephraseText(this._text);

  play(text: string) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = window.navigator.language;
    speechSynthesis.speak(utterance);
  }

  async share(text: string) {
    await navigator.share({ text });
  }
}
