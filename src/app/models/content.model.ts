/**
 *
 * Estas interfaces describen la forma exacta del archivo
 * `public/assets/data/content.json`. Al tipar el JSON conseguimos:
 *  - Autocompletado en plantillas y servicios.
 *  - Errores en tiempo de compilación si el JSON y el código se desincronizan.
 */

/** Tarjeta destacada del Hero (los pilares del tema). */
export interface HeroHighlight {
  title: string;
  description: string;
}

/** Bloque principal (encabezado) de la página. */
export interface HeroContent {
  title: string;
  subtitle: string;
  /** Texto del botón de llamada a la acción. */
  ctaLabel: string;
  /** Id de la sección hacia la que se desplaza el botón (sin el #). */
  ctaFragment: string;
  /** Tarjetas destacadas que se muestran bajo el subtítulo. */
  highlights: HeroHighlight[];
}

/** Tarjeta interna de una sección (p. ej. los tipos de protección). */
export interface SectionCard {
  title: string;
  text: string;
  imageSrc?: string | null;
  imageAlt?: string;
}

/** Cada una de las secciones de contenido que renderiza <app-info-section>. */
export interface SectionContent {
  /** Ancla usada por la navegación (debe coincidir con un href="#..." del navbar). */
  sectionId: string;
  title: string;
  paragraphs: string[];

  /** Opcionales: controlan la presentación. Si se omiten, usan los valores por defecto del componente. */
  tinted?: boolean;
  imageSrc?: string | null;
  imageAlt?: string;

  cards?: SectionCard[];
  wide?: boolean;
}

/** Documento raíz: todo el contenido de la infografía. */
export interface SiteContent {
  hero: HeroContent;
  sections: SectionContent[];
}
