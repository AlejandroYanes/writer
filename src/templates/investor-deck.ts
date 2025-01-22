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
          position: 'top-right',
          alignment: 'right',
          elements: [
            { tag: 'h1', className: 'text-7xl text-orange-600' },
            { tag: 'h2', className: 'text-muted-foreground' },
            { tag: 'h3', className: 'text-muted-foreground' },
          ],
        },
        {
          position: 'bottom-left',
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
          position: 'top-left',
          alignment: 'left',
          elements: [
            { tag: 'image' },
          ],
        },
        {
          rowSpan: true,
          position: 'top-right',
          alignment: 'left',
          className: 'px-6 py-10 gap-24',
          elements: [
            { tag: 'h1' },
            { tag: 'h2' },
            { tag: 'h3' },
            { tag: 'paragraph' },
          ],
        },
      ],
    },
  ],
};
