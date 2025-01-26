import { type CSSProperties } from 'react';

export interface Template {
  name: string;
  brandColor: string;
  slides: SlideTemplate[];
}

export interface SlideTemplate {
  name: string;
  className?: string;
  style?: CSSProperties;
  sectors: Sector[];
}

export interface Sector {
  colSpan?: boolean;
  rowSpan?: boolean;
  alignment: 'left' | 'center' | 'right';
  elements: TemplateSectorElement[];
  className?: string;
  style?: CSSProperties;
}

export interface TemplateSectorElement {
  tag: BlockElement;
  offset?: number;
  count?: number;
  className?: string;
  style?: CSSProperties;
}

export type BlockElement = 'h1' | 'h2' | 'h3' | 'paragraph' | 'image' | 'bullet_list' | 'ordered_list';
