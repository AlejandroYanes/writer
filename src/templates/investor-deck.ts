import type { Template } from '@/templates/types';

export const investorDeck: Template = {
  name: 'Investor Deck',
  brandColor: 'orange',
  slides: [
    {
      name: 'presentation',
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
          elements: [{ tag: 'paragraph' }],
        },
      ],
    },
  ],
};
