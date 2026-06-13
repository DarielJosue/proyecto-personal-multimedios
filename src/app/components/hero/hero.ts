import { Component, input } from '@angular/core';

@Component({
  selector: 'app-hero',
  imports: [],
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
}
