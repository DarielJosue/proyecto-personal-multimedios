import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-protection-tree',
  imports: [],
  templateUrl: './protection-tree.html',
  styleUrl: './protection-tree.css',
})
export class ProtectionTree {
  readonly activeId = input<string | null>(null);

  readonly select = output<string>();

  protected choose(id: string): void {
    this.select.emit(id);
  }
}
