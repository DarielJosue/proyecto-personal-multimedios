import { Component, computed, input, signal } from '@angular/core';

import { ProtectionTree } from '../protection-tree/protection-tree';
import { AudioPlayer } from '../audio-player/audio-player';
import { DiagramContent } from '../../models/content.model';
import { fadeIn, slideIn } from '../../animations';

@Component({
  selector: 'app-interactive-diagram',
  imports: [ProtectionTree, AudioPlayer],
  templateUrl: './interactive-diagram.html',
  styleUrl: './interactive-diagram.css',
  animations: [fadeIn, slideIn],
})
export class InteractiveDiagram {
  readonly diagram = input.required<DiagramContent>();

  protected readonly selectedId = signal<string | null>(null);

  protected readonly selectedNode = computed(
    () => this.diagram().nodes.find((node) => node.id === this.selectedId()) ?? null,
  );

  protected onSelect(id: string): void {
    this.selectedId.update((current) => (current === id ? null : id));
  }
}
