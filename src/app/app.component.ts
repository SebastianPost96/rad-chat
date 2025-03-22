import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RecordingComponent } from './feature/recording/recording.component';

@Component({
  selector: 'app-root',
  imports: [RecordingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  hasWindow = typeof window !== 'undefined';
}
