import { type CSSProperties } from 'react';

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
  colSpan?: boolean;
  rowSpan?: boolean;
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  alignment: 'left' | 'center' | 'right';
  elements: TemplateSectorElement[];
  className?: string;
  styles?: CSSProperties;
}

export interface TemplateSectorElement {
  tag: BlockElement;
  className?: string;
  styles?: CSSProperties;
}

export type BlockElement = 'h1' | 'h2' | 'h3' | 'paragraph' | 'image' | 'bullet_list' | 'ordered_list';
