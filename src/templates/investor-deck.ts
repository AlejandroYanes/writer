import type { Template } from '@/templates/types';

export const investorDeck: Template = {
  name: 'Investor Deck',
  brandColor: 'orange',
  slides: [
    {
      name: 'presentation',
      sectors: [
        {
          position: 'top-right',
          alignment: 'right',
          elements: ['h1', 'h2'],
        },
        {
          position: 'bottom-left',
          alignment: 'left',
          elements: ['h3', 'p'],
        },
      ],
    },
  ],
};
