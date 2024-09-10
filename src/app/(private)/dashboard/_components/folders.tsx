import * as React from 'react';
import { ArchiveIcon, FolderIcon, FolderPlusIcon, FoldersIcon, StarIcon, Trash2Icon } from 'lucide-react';

import { Button, Separator, Skeleton } from '@/ui';
import { AccountSwitcher } from './account-switcher';
import { Nav } from './nav';
import { api } from '@/trpc/react';

interface Props {
  accounts: {
    label: string;
    email: string;
    icon: React.ReactNode;
  }[];
}

export default function Folders(props: Props) {
  const { accounts } = props;

  const { data: folders = [], isLoading } = api.folders.list.useQuery();

  const folderLinks = folders.map((folder) => ({
    title: folder.name,
    label: '',
    icon: FolderIcon,
    variant: 'ghost' as const,
  }));

  return (
    <div className="border-r w-1/6 shrink-0 h-[100vh] overflow-y-auto flex flex-col">
      <div className="flex h-[56px] items-center justify-center px-2 sticky top-0 bg-white">
        <AccountSwitcher accounts={accounts}/>
      </div>
      <Separator/>
      {isLoading ? <SkeletonFolders /> : null}

      {!isLoading ? (
        <>
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
        </>
      ) : null}

      {!isLoading && folderLinks.length > 0 ? (
        <Nav links={folderLinks} />
      ) : (
        <div className="flex flex-col items-center justify-center flex-1 p-2 gap-4">
          <FoldersIcon className="h-10 w-10 stroke-neutral-500" />
          <span className="text-neutral-500 text-sm">No folders...</span>
        </div>
      )}
      <div className="sticky bottom-0 bg-white mt-auto py-2 border-t px-2">
        <Button variant="ghost" className="w-full justify-start">
          <FolderPlusIcon className="mr-2 h-4 w-4"/>
          Add folder
        </Button>
      </div>
    </div>
  );
}

function SkeletonFolders() {
  return (
    <div className="flex flex-col p-2 gap-4">
      <Skeleton className="h-8" />
      <Skeleton className="h-8" />
      <Skeleton className="h-8" />
      <Skeleton className="h-8" />
      <Skeleton className="h-8" />
    </div>
  );
}
