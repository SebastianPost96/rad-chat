import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GoogleAiService {
  private _http = inject(HttpClient);

  rephraseText(text: string) {
    const params = new HttpParams()
      .append('text', text)
      .append('lang', window.navigator.language);

    return this._http.get<string>(`${window.location.href}api/rephrase`, {
      params,
    });
  }
}
