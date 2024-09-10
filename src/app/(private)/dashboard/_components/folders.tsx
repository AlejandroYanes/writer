import { ArchiveIcon, FolderIcon, PlusIcon, StarIcon, Trash2Icon } from 'lucide-react';
import * as React from 'react';

import { Button, Separator } from '@/ui';
import { AccountSwitcher } from './account-switcher';
import { Nav } from './nav';

interface Props {
  accounts: {
    label: string;
    email: string;
    icon: React.ReactNode;
  }[];
}

export default function Folders(props: Props) {
  const { accounts } = props;
  return (
    <div className="border-r w-1/6 shrink-0 h-[100vh] overflow-y-auto">
      <div className="flex h-[56px] items-center justify-center px-2 sticky top-0 bg-white">
        <AccountSwitcher accounts={accounts}/>
      </div>
      <Separator/>
      <Nav
        links={[
          {
            title: 'Starred',
            label: '',
            icon: StarIcon,
            variant: 'default',
          },
          {
            title: 'Archive',
            label: '',
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
      <div className="sticky bottom-0 bg-white pt-2 border-t">
        <Button variant="link">
          <PlusIcon className="mr-2 h-4 w-4"/>
          Add folder
        </Button>
      </div>
    </div>
  );
}
