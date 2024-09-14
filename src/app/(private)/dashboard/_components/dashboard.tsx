'use client'

import { useState } from 'react';

import { TooltipProvider } from '@/ui';
import Folders from './folders';
import Articles from './articles';
import Content from './content';

interface Props {
  folder: number | null;
  article: number | null;
}

export default function Dashboard(props: Props) {
  const [selectedFolder, setSelectedFolder] = useState<number>(props.folder ?? -1);
  const [selectedArticle, setSelectedArticle] = useState<number | null>(props.article);

  const handleFolderChange = (nextFolder: number) => {
    setSelectedFolder(nextFolder);
    setSelectedArticle(null);
  }

  return (
    <TooltipProvider delayDuration={0}>
      <div className="h-screen flex items-stretch">
        <Folders selected={selectedFolder} onFolderSelected={handleFolderChange} />
        <Articles folder={selectedFolder} selected={selectedArticle} onSelected={setSelectedArticle} />
        <Content key={selectedArticle} article={selectedArticle} />
      </div>
    </TooltipProvider>
  );
}
