/**
 * Contrato de datos de la infografía.
 *
 * Estas interfaces describen la forma exacta del archivo
 * `public/assets/data/content.json`. Al tipar el JSON conseguimos:
 *  - Autocompletado en plantillas y servicios.
 *  - Errores en tiempo de compilación si el JSON y el código se desincronizan.
 */

/** Bloque principal (encabezado) de la página. */
export interface HeroContent {
  title: string;
  subtitle: string;
  /** Texto del botón de llamada a la acción. */
  ctaLabel: string;
  /** Id de la sección hacia la que se desplaza el botón (sin el #). */
  ctaFragment: string;
}

/** Cada una de las secciones de contenido que renderiza <app-info-section>. */
export interface SectionContent {
  /** Ancla usada por la navegación (debe coincidir con un href="#..." del navbar). */
  sectionId: string;
  title: string;
  paragraphs: string[];

  /** Opcionales: controlan la presentación. Si se omiten, usan los valores por defecto del componente. */
  tinted?: boolean;
  reverse?: boolean;
  imageSrc?: string | null;
  imageAlt?: string;
}

/** Documento raíz: todo el contenido de la infografía. */
export interface SiteContent {
  hero: HeroContent;
  sections: SectionContent[];
}
