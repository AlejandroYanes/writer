import type { Template } from '@/templates/types';

export const investorDeck: Template = {
  name: 'Investor Deck',
  brandColor: 'orange',
  slides: [
    {
      name: 'presentation',
      className: 'px-6 py-10',
      sectors: [
        {
          colSpan: true,
          alignment: 'right',
          elements: [
            { tag: 'h1', className: 'text-7xl text-orange-600' },
            { tag: 'h2', className: 'text-muted-foreground' },
            { tag: 'h3', className: 'text-muted-foreground' },
          ],
        },
        {
          alignment: 'left',
          className: 'justify-center',
          elements: [{ tag: 'paragraph' }],
        },
      ],
    },
    {
      name: 'about-us',
      sectors: [
        {
          rowSpan: true,
          alignment: 'left',
          elements: [
            { tag: 'image', count: 2, className: 'grid grid-cols-1 pt-6 pl-6 pb-6 gap-6' },
          ],
        },
        {
          alignment: 'left',
          className: 'px-6 pt-10 gap-16',
          elements: [
            { tag: 'h1' },
            { tag: 'h2' },
            { tag: 'h3' },
            { tag: 'paragraph' },
          ],
        },
        {
          alignment: 'left',
          elements: [
            { tag: 'image', count: 2, offset: 2, className: 'grid grid-cols-2 pr-6 pb-6 gap-6' },
          ],
        },
      ],
    },
  ],
};
