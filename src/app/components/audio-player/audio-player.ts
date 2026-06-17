import { Component, ElementRef, effect, input, signal, viewChild } from '@angular/core';

/**
 * Reproductor de audio reutilizable: un botón "Escuchar / Pausar" sobre un
 * elemento <audio> nativo.
 *
 * - `playing` refleja el estado real del <audio> (eventos play/pause/ended).
 * - `unavailable` se activa si el archivo no existe todavía (evento `error` o
 *   promesa de play() rechazada). Así, mientras la persona usuaria no suba los
 *   .mp3, el botón no se rompe: muestra "audio pendiente".
 */
@Component({
  selector: 'app-audio-player',
  imports: [],
  templateUrl: './audio-player.html',
  styleUrl: './audio-player.css',
})
export class AudioPlayer {
  /** Ruta del audio, p. ej. "assets/audio/introduccion.mp3". */
  readonly src = input.required<string>();
  /** Etiqueta opcional que acompaña al botón. */
  readonly title = input('');

  private readonly audioRef = viewChild<ElementRef<HTMLAudioElement>>('audio');

  protected readonly playing = signal(false);
  protected readonly unavailable = signal(false);

  constructor() {
    // Si cambia la fuente (p. ej. otra rama del diagrama), reinicia el estado.
    effect(() => {
      this.src();
      this.playing.set(false);
      this.unavailable.set(false);
    });
  }

  protected toggle(): void {
    const audio = this.audioRef()?.nativeElement;
    if (!audio) {
      return;
    }

    if (audio.paused) {
      audio.play().catch(() => this.unavailable.set(true));
    } else {
      audio.pause();
    }
  }
}
