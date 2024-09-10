'use client'

import { useState } from 'react';

import { TooltipProvider } from '@/ui';
import Folders from './_components/folders';
import DocLists from './_components/doc-lists';
import DocumentDisplay from './_components/doc-display';
import { accounts, mails } from './data';

export default function MailPage() {
  const [mail, setMail] = useState<string | null>(mails[0]!.id);

  const handleEmailSelected = (id: string) => {
    setMail(id);
  };
  
  return (
    <TooltipProvider delayDuration={0}>
      <div className="h-screen flex items-stretch">
        <Folders accounts={accounts} />
        <DocLists mails={mails} selected={mail} onSelected={handleEmailSelected} />
        <DocumentDisplay />
      </div>
    </TooltipProvider>
  )
}
