'use client';

import * as React from 'react';

import { type Mail } from '../data';
import { useMail } from '../use-mail';
import { MailDisplay } from './mail-display';
import { TooltipProvider } from '@/ui';
import MailLists from '@/app/(private)/dashboard/_components/mail-lists';
import MailFolders from '@/app/(private)/dashboard/_components/mail-folders';

interface MailProps {
  accounts: {
    label: string;
    email: string;
    icon: React.ReactNode;
  }[];
  mails: Mail[];
}

export function Mail(props: MailProps) {
  const { accounts, mails } = props;
  const [mail] = useMail()

  return (
    <TooltipProvider delayDuration={0}>
      <div className="h-screen flex items-stretch">
        <MailFolders accounts={accounts} />
        <MailLists mails={mails} />
        <MailDisplay mail={mails.find((item) => item.id === mail.selected) ?? null} />
      </div>
    </TooltipProvider>
  )
}
