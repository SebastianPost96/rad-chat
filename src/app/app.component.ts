import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
} from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { AppStateService } from './app.state.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ActionBottomSheetComponent } from './action-bottom-sheet/action-bottom-sheet.component';

@Component({
  selector: 'app-root',
  imports: [MatIcon],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  protected state = inject(AppStateService);
  private _bottomSheet = inject(MatBottomSheet);

  constructor() {
    effect(() => {
      if (!this.state.isRecording() && this.state.text()) {
        this._bottomSheet.open(ActionBottomSheetComponent);
      }
    });
  }
}
