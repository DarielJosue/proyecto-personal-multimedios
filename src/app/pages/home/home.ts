import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Observable, catchError, map, of } from 'rxjs';

import { Navbar } from '../../components/navbar/navbar';
import { Hero } from '../../components/hero/hero';
import { InfoSection } from '../../components/info-section/info-section';
import { InteractiveDiagram } from '../../components/interactive-diagram/interactive-diagram';
import { Footer } from '../../components/footer/footer';
import { Reveal } from '../../directives/reveal';
import { ContentService } from '../../services/content-service';
import { SiteContent } from '../../models/content.model';

/**
 * Estado de la vista. Lo envolvemos en un objeto (no en `SiteContent | null`
 * pelado) para poder distinguir tres situaciones en la plantilla:
 *  - sin emitir aún  → el `async` da `null` → "Cargando…"
 *  - { content }     → datos cargados
 *  - { content:null }→ hubo un error
 */
interface ContentState {
  content: SiteContent | null;
}

@Component({
  selector: 'app-home',
  imports: [AsyncPipe, Navbar, Hero, InfoSection, InteractiveDiagram, Footer, Reveal],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private readonly contentService = inject(ContentService);

  /**
   * Convertimos el Observable de DATOS en un Observable de ESTADO:
   *  - map: éxito → { content }
   *  - catchError: error → { content: null } (no rompe el stream)
   * Así la plantilla nunca se queda colgada en "Cargando…" si la carga falla.
   */
  protected readonly state$: Observable<ContentState> = this.contentService.getContent().pipe(
    map((content): ContentState => ({ content })),
    catchError(() => of<ContentState>({ content: null })),
  );
}
