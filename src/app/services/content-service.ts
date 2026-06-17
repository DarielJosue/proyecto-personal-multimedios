import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

import { SiteContent } from '../models/content.model';

/**
 * Servicio responsable de cargar el contenido de la infografía desde el JSON.
 */
@Injectable({ providedIn: 'root' })
export class ContentService {
  private readonly http = inject(HttpClient);

  private readonly contentUrl = 'assets/data/content.json';

  getContent(): Observable<SiteContent> {
    return this.http.get<SiteContent>(this.contentUrl).pipe(
      catchError((error) => {
        console.error('ContentService: no se pudo cargar', this.contentUrl, error);
        return throwError(() => error);
      }),
    );
  }
}
