import { Component, input } from '@angular/core';

import { HeroHighlight } from '../../models/content.model';
import { Background3d } from '../background-3d/background-3d';

@Component({
  selector: 'app-hero',
  imports: [Background3d],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero {
  readonly title = input('Propiedad Intelectual, Marcas y Emprendimiento');
  readonly subtitle = input(
    'Una infografía interactiva sobre cómo proteger las ideas, las marcas y las invenciones de las personas emprendedoras en Costa Rica.',
  );
  readonly ctaLabel = input('Explorar la infografía');
  readonly ctaFragment = input('propiedad-intelectual');

  /** Tarjetas destacadas (pilares del tema) que vienen del JSON. */
  readonly highlights = input<HeroHighlight[]>([]);
}
