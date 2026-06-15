import { Component } from '@angular/core';

/**
 * Diagrama SVG en forma de árbol: del tronco común se ramifican los tres
 * tipos de protección de la propiedad intelectual.
 *
 * El SVG está escrito en línea (no es un archivo .svg) para que más adelante
 * sea fácil añadirle interactividad (clic/hover + audio) en el Día 4.
 *
 * 👉 Si prefieres tu propio dibujo, reemplaza el <svg> de `protection-tree.html`
 *    por el tuyo y conserva las clases `ptree__leaf` / `data-id` para no perder
 *    los estilos ni los puntos de interacción.
 */
@Component({
  selector: 'app-protection-tree',
  imports: [],
  templateUrl: './protection-tree.html',
  styleUrl: './protection-tree.css',
})
export class ProtectionTree {}
