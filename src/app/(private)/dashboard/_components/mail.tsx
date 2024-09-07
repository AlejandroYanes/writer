'use client';

import { type ReactNode, useState } from 'react';

import { TooltipProvider } from '@/ui';
import { type Mail } from '../data';
import { MailDisplay } from './mail-display';
import MailLists from './mail-lists';
import MailFolders from './mail-folders';

interface MailProps {
  accounts: {
    label: string;
    email: string;
    icon: ReactNode;
  }[];
  mails: Mail[];
}

export function Mail(props: MailProps) {
  const { accounts, mails } = props;
  const [mail, setMail] = useState<string | null>(mails[0]!.id);

  const handleEmailSelected = (id: string) => {
    setMail(id);
  };

  return (
    <TooltipProvider delayDuration={0}>
      <div className="h-screen flex items-stretch">
        <MailFolders accounts={accounts} />
        <MailLists mails={mails} selected={mail} onSelected={handleEmailSelected} />
        <MailDisplay mail={mails.find((item) => item.id === mail) ?? null} />
      </div>
    </TooltipProvider>
  )
}
