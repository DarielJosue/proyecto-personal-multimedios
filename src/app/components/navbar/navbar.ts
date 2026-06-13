import { Component, signal } from '@angular/core';

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

  protected readonly isMenuOpen = signal(false);

  protected readonly navLinks: NavLink[] = [
    { label: 'Inicio', fragment: 'inicio' },
    { label: 'Propiedad Intelectual', fragment: 'propiedad-intelectual' },
    { label: 'Importancia', fragment: 'importancia-emprendedores' },
    { label: 'Tipos de Protección', fragment: 'tipos-proteccion' },
    { label: 'Marco Nacional', fragment: 'marco-nacional' },
    { label: 'Marco Internacional', fragment: 'marco-internacional' },
    { label: 'Caso Práctico', fragment: 'caso-practico' },
    { label: 'Emprendimiento', fragment: 'emprendimiento' },
    { label: 'SVG Interactivo', fragment: 'svg-interactivo' },
    { label: 'Conclusiones', fragment: 'conclusiones' },
  ];

  protected toggleMenu(): void {
    this.isMenuOpen.update((open) => !open);
  }

  protected closeMenu(): void {
    this.isMenuOpen.set(false);
  }
}