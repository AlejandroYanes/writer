import {
  AlertCircle,
  Archive, ArchiveIcon,
  ArchiveX,
  File, FolderIcon,
  Inbox,
  MessagesSquare,
  Send,
  ShoppingCart, StarIcon,
  Trash2, Trash2Icon,
  Users2,
} from 'lucide-react';
import * as React from 'react';

import { Separator } from '@/ui';
import { AccountSwitcher } from './account-switcher';
import { Nav } from './nav';

interface Props {
  accounts: {
    label: string;
    email: string;
    icon: React.ReactNode;
  }[];
}

export default function MailFolders(props: Props) {
  const { accounts } = props;
  return (
    <div className="border-r w-1/6 shrink-0">
      <div className="flex h-[56px] items-center justify-center px-2">
        <AccountSwitcher accounts={accounts}/>
      </div>
      <Separator/>
      <Nav
        links={[
          {
            title: 'Starred',
            label: '128',
            icon: StarIcon,
            variant: 'default',
          },
          {
            title: 'Archive',
            label: '9',
            icon: ArchiveIcon,
            variant: 'ghost',
          },
          {
            title: 'Deleted',
            label: '',
            icon: Trash2Icon,
            variant: 'ghost',
          },
        ]}
      />
      <Separator/>
      <Nav
        links={[
          {
            title: 'All Notes',
            label: '972',
            icon: FolderIcon,
            variant: 'ghost',
          },
          {
            title: 'Articles',
            label: '342',
            icon: FolderIcon,
            variant: 'ghost',
          },
          {
            title: 'Recipes',
            label: '128',
            icon: FolderIcon,
            variant: 'ghost',
          },
          {
            title: 'Inspiration',
            label: '8',
            icon: FolderIcon,
            variant: 'ghost',
          },
          {
            title: 'Workouts',
            label: '21',
            icon: FolderIcon,
            variant: 'ghost',
          },
          {
            title: 'Content ideas',
            label: '5',
            icon: FolderIcon,
            variant: 'ghost',
          },
        ]}
      />
    </div>
  );
}
