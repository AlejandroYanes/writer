'use client';

import { useState } from 'react';

import { TooltipProvider } from '@/ui';
import Folders from './_components/folders';
import Articles from './_components/articles';
import Content from './_components/content';

export default function MailPage() {
  const [selectedFolder, setSelectedFolder] = useState<number>(-1);
  const [selectedArticle, setSelectedFArticle] = useState<number | null>(null);

  return (
    <TooltipProvider delayDuration={0}>
      <div className="h-screen flex items-stretch">
        <Folders selected={selectedFolder} onFolderSelected={setSelectedFolder} />
        <Articles folder={selectedFolder} selected={selectedArticle} onSelected={setSelectedFArticle} />
        <Content />
      </div>
    </TooltipProvider>
  )
}
