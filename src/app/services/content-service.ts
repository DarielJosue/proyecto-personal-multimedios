import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SiteContent } from '../models/content.model';

/**
 * Servicio responsable de cargar el contenido de la infografía desde el JSON.
 *
 * providedIn: 'root' lo registra como singleton para toda la app: Angular crea
 * una sola instancia y la comparte mediante inyección de dependencias.
 */
@Injectable({ providedIn: 'root' })
export class ContentService {
  private readonly http = inject(HttpClient);

  /**
   * Ruta del JSON. Vive en `public/assets/data/content.json` y el builder de
   * Angular lo publica en `/assets/data/content.json` (URL relativa = funciona
   * sin importar el dominio donde se despliegue).
   */
  private readonly contentUrl = 'assets/data/content.json';

  /**
   * Devuelve un Observable con todo el contenido tipado.
   * HttpClient hace la petición de forma perezosa: solo se ejecuta cuando algo
   * se suscribe (por ejemplo, el pipe `async` en la plantilla).
   */
  getContent(): Observable<SiteContent> {
    return this.http.get<SiteContent>(this.contentUrl);
  }
}
