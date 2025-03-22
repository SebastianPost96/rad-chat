import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ActionBottomSheetComponent } from './action-bottom-sheet/action-bottom-sheet.component';
import { ContinuousSpeechRecognition } from './continuous-speech-recognition';

@Component({
  selector: 'app-root',
  imports: [MatIcon],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  protected speechRecognition = new ContinuousSpeechRecognition();
  private _bottomSheet = inject(MatBottomSheet);

  async stopRecording() {
    const recordedText = await this.speechRecognition.stop();
    this._bottomSheet.open(ActionBottomSheetComponent, { data: recordedText });
  }
}
