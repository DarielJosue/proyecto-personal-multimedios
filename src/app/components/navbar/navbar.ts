import { Component, DestroyRef, afterNextRender, inject, signal } from '@angular/core';

interface NavLink {
  label: string;
  fragment: string;
}

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  private readonly destroyRef = inject(DestroyRef);

  protected readonly isMenuOpen = signal(false);

  /** Fragmento de la sección actualmente visible (para resaltar su enlace). */
  protected readonly activeFragment = signal('inicio');

  // Menú simplificado siguiendo el wireframe (6 anclas principales).
  protected readonly navLinks: NavLink[] = [
    { label: 'Inicio', fragment: 'inicio' },
    { label: 'Protección', fragment: 'tipos-proteccion' },
    { label: 'Costa Rica', fragment: 'marco-nacional' },
    { label: 'Internacional', fragment: 'marco-internacional' },
    { label: 'Caso Práctico', fragment: 'caso-practico' },
    { label: 'Conclusiones', fragment: 'conclusiones' },
  ];

  constructor() {
    afterNextRender(() => this.setupScrollSpy());
  }

  protected toggleMenu(): void {
    this.isMenuOpen.update((open) => !open);
  }

  protected closeMenu(): void {
    this.isMenuOpen.set(false);
  }


  private setupScrollSpy(attempt = 0): void {
    const targets = this.navLinks
      .map((link) => document.getElementById(link.fragment))
      .filter((el): el is HTMLElement => el !== null);

    if (targets.length < this.navLinks.length && attempt < 10) {
      requestAnimationFrame(() => this.setupScrollSpy(attempt + 1));
      return;
    }
    if (targets.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.activeFragment.set(entry.target.id);
          }
        }
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    );

    targets.forEach((target) => observer.observe(target));
    this.destroyRef.onDestroy(() => observer.disconnect());
  }
}
