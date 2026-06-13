import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';

import { Navbar } from '../../components/navbar/navbar';
import { Hero } from '../../components/hero/hero';
import { InfoSection } from '../../components/info-section/info-section';
import { Footer } from '../../components/footer/footer';
import { ContentService } from '../../services/content-service';

@Component({
  selector: 'app-home',
  imports: [AsyncPipe, Navbar, Hero, InfoSection, Footer],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private readonly contentService = inject(ContentService);
  protected readonly content$ = this.contentService.getContent();
}
