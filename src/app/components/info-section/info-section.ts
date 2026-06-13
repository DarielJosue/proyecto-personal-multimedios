import { Component, input } from '@angular/core';

@Component({
  selector: 'app-info-section',
  imports: [],
  templateUrl: './info-section.html',
  styleUrl: './info-section.css',
})
export class InfoSection {

  readonly sectionId = input.required<string>();

  readonly title = input.required<string>();
  readonly paragraphs = input<string[]>([]);

  readonly imageSrc = input<string | null>(null);
  readonly imageAlt = input('');

  readonly reverse = input(false);

  readonly tinted = input(false);
}
