import { Component, computed, input } from '@angular/core';

import { SectionCard } from '../../models/content.model';
import { AudioPlayer } from '../audio-player/audio-player';

@Component({
  selector: 'app-info-section',
  imports: [AudioPlayer],
  templateUrl: './info-section.html',
  styleUrl: './info-section.css',
})
export class InfoSection {

  readonly sectionId = input.required<string>();

  readonly title = input.required<string>();
  readonly paragraphs = input<string[]>([]);

  readonly imageSrc = input<string | null>(null);
  readonly imageAlt = input('');
  readonly imageCredits = input<{ author?: string; source?: string } | null>(null);

  /** Narración opcional de la sección (botón "Escuchar"). */
  readonly audioSrc = input<string | null>(null);
  readonly audioTitle = input('');

  /** Tarjetas internas (p. ej. los tipos de protección). */
  readonly cards = input<SectionCard[]>([]);

  /** Fuerza el ancho completo (no alterna lado). */
  readonly wide = input(false);

  readonly tinted = input(false);

  /** Número que se muestra dentro del nodo del árbol (paso de la infografía). */
  readonly step = input<number | null>(null);

  /** Una sección es "ancha" si lo pide o si tiene tarjetas internas. */
  protected readonly isWide = computed(() => this.wide() || this.cards().length > 0);

  /** Lado de la rama: pasos pares a la derecha, impares a la izquierda. */
  protected readonly isRight = computed(() => ((this.step() ?? 1) % 2) === 0);
}
