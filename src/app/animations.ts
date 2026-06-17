import { animate, style, transition, trigger } from '@angular/animations';

/**
 * Animaciones reutilizables con @angular/animations.
 *
 * Nota: el "scaleOnHover" del diagrama se hace con CSS (:hover), porque las
 * animaciones de Angular se disparan por CAMBIOS DE ESTADO/datos, no por hover.
 * Estas dos (fadeIn, slideIn) sí dependen del estado, por eso van aquí.
 */

/** Aparición con fundido al entrar al DOM. */
export const fadeIn = trigger('fadeIn', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('300ms ease', style({ opacity: 1 })),
  ]),
]);

/**
 * Entra deslizando desde la izquierda con fundido.
 * Incluye `* => *` para que TAMBIÉN se reanime cuando cambia el valor enlazado
 * (al seleccionar otra rama del diagrama sin pasar por un estado vacío).
 */
export const slideIn = trigger('slideIn', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateX(-18px)' }),
    animate('320ms ease', style({ opacity: 1, transform: 'translateX(0)' })),
  ]),
  transition('* => *', [
    style({ opacity: 0, transform: 'translateX(-18px)' }),
    animate('320ms ease', style({ opacity: 1, transform: 'translateX(0)' })),
  ]),
]);
