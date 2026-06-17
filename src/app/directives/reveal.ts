import { Directive, ElementRef, DestroyRef, afterNextRender, inject } from '@angular/core';

/**
reveal.ts: para revelar elementos con una animación al hacer scroll.  
 */
@Directive({
  selector: '[appReveal]',
})
export class Reveal {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      const el = this.host.nativeElement;

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
      }

      el.classList.add('reveal');

      const observer = new IntersectionObserver(
        (entries, obs) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add('reveal--visible');
              obs.unobserve(entry.target);
            }
          }
        },
        { threshold: 0.12, rootMargin: '0px 0px -10% 0px' },
      );

      observer.observe(el);
      this.destroyRef.onDestroy(() => observer.disconnect());
    });
  }
}
