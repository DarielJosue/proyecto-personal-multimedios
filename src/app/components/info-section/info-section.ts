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

  /** Estado local para imágenes que fallan al cargar. */
  protected _mainImageFailed = false;

  onMainImgError() {
    this._mainImageFailed = true;
  }

  onCardImgError(card: SectionCard) {
    // Marca la tarjeta para mostrar el placeholder en lugar de la imagen rota.
    card._imageFailed = true;
  }

  /** Parallax / tilt handlers for pointer movement */
  onCardPointerMove(event: PointerEvent) {
    const el = event.currentTarget as HTMLElement | null;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5; // -0.5..0.5
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    const rotateX = (y * 6).toFixed(2);
    const rotateY = (-x * 6).toFixed(2);
    const translateX = (-x * 6).toFixed(2);
    const translateY = (-y * 6).toFixed(2);
    const img = el.querySelector('img') as HTMLElement | null;
    if (img) {
      img.style.transform = `perspective(800px) translate3d(${translateX}px, ${translateY}px, 0px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
      el.setAttribute('data-tilt', '1');
    }
  }

  onCardPointerLeave(event: PointerEvent) {
    const el = event.currentTarget as HTMLElement | null;
    if (!el) return;
    const img = el.querySelector('img') as HTMLElement | null;
    if (img) {
      img.style.transform = '';
      el.removeAttribute('data-tilt');
    }
  }
}
