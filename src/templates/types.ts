export interface Template {
  name: string;
  brandColor: string;
  slides: SlideTemplate[];
}

export interface SlideTemplate {
  name: string;
  sectors: Sector[];
}

export interface Sector {
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  alignment: 'left' | 'center' | 'right';
  elements: string[];
  className?: string;
  styles?: CSSStyleDeclaration;
}
