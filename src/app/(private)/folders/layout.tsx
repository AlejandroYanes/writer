'use client';

import { TooltipProvider } from '@/ui';

interface Props {
  children: React.ReactNode;
}

export default function FoldersLayout(props: Props) {
  return (
    <TooltipProvider delayDuration={0}>
      {props.children}
    </TooltipProvider>
  );
}
