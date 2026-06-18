/**
 *
 * Estas interfaces describen la forma exacta del archivo
 * `public/assets/data/content.json`. Al tipar el JSON conseguimos:
 *  - Autocompletado en plantillas y servicios.
 *  - Errores en tiempo de compilación si el JSON y el código se desincronizan.
 */

export interface HeroHighlight {
  title: string;
  description: string;
}

export interface HeroContent {
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaFragment: string;
  highlights: HeroHighlight[];
}

export interface SectionCard {
  title: string;
  text: string;
  imageSrc?: string | null;
  imageAlt?: string;
  imageCredits?: {
    author?: string;
    source?: string;
  };
}

export interface SectionContent {
  sectionId: string;
  title: string;
  paragraphs: string[];

  tinted?: boolean;
  imageSrc?: string | null;
  imageAlt?: string;
  imageCredits?: {
    author?: string;
    source?: string;
  };

  audioSrc?: string;
  audioTitle?: string;

  cards?: SectionCard[];
  wide?: boolean;
}

export interface DiagramNode {
  id: string;
  label: string;
  description: string;
  audioSrc?: string;
  audioTitle?: string;
}


export interface DiagramContent {
  rootLabel: string;
  intro: string;
  nodes: DiagramNode[];
}


export interface SiteContent {
  hero: HeroContent;
  sections: SectionContent[];
  diagram: DiagramContent;
}
