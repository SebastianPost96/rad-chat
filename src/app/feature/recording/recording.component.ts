import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ContinuousSpeechRecognition } from '../../util/continuous-speech-recognition';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ActionBottomSheetComponent } from '../action-bottom-sheet/action-bottom-sheet.component';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';

@Component({
  selector: 'app-recording',
  imports: [MatIcon, MatIconButton],
  templateUrl: './recording.component.html',
  styleUrl: './recording.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecordingComponent {
  protected speechRecognition = new ContinuousSpeechRecognition();
  private _bottomSheet = inject(MatBottomSheet);

  async stopRecording() {
    const recordedText = await this.speechRecognition.stop();

    if (recordedText) {
      this._bottomSheet.open(ActionBottomSheetComponent, {
        data: recordedText,
      });
    }
  }
}
