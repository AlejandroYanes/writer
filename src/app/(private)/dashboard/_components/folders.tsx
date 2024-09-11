'use client';

import { type ReactNode, useState } from 'react';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArchiveIcon, FolderIcon, FolderPlusIcon, FoldersIcon, StarIcon, Trash2Icon } from 'lucide-react';

import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  InputWithLabel,
  Loader,
  Separator,
  Skeleton,
} from '@/ui';
import { api } from '@/trpc/react';
import { AccountSwitcher } from './account-switcher';
import { Nav, NavLink } from './nav';

interface Props {
  accounts: {
    label: string;
    email: string;
    icon: ReactNode;
  }[];
}

export default function Folders(props: Props) {
  const { accounts } = props;

  const { data: folders = [], isLoading } = api.folders.list.useQuery();

  return (
    <div className="border-r w-1/6 shrink-0 h-[100vh] overflow-y-auto flex flex-col">
      <div className="flex h-[56px] items-center justify-center px-2 sticky top-0 bg-white">
        <AccountSwitcher accounts={accounts}/>
      </div>
      <Separator/>
      {isLoading ? <SkeletonFolders /> : null}

      {!isLoading ? (
        <>
          <Nav>
            <NavLink title="Starred" icon={StarIcon} variant="default" />
            <NavLink title="Archive" icon={ArchiveIcon} variant="ghost" />
            <NavLink title="Deleted" icon={Trash2Icon} variant="ghost" />
          </Nav>
          <Separator/>
        </>
      ) : null}

      {!isLoading && folders.length > 0 ? (
        <Nav>
          {folders.map((folder) => (
            <NavLink key={folder.id} title={folder.name} icon={FolderIcon} variant="ghost" />
          ))}
        </Nav>
      ) : null}

      {!isLoading && folders.length === 0 ? (
        <div className="flex flex-col items-center justify-center flex-1 p-2 gap-4">
          <FoldersIcon className="h-10 w-10 stroke-neutral-500" />
          <span className="text-neutral-500 text-sm">No folders...</span>
        </div>
      ) : null}
      <div className="sticky bottom-0 bg-white mt-auto py-2 border-t px-2">
        <AddFolder />
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

function AddFolder() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button variant="ghost" className="w-full justify-start" onClick={() => setShowModal(true)}>
        <FolderPlusIcon className="mr-2 h-4 w-4"/>
        Add folder
      </Button>
      {showModal && <AddFolderModal onClose={() => setShowModal(false)} />}
    </>
  );
}

const schema = z.object({
  name: z.string().min(1, 'Please provide a name'),
});

type Input = z.infer<typeof schema>;

function AddFolderModal(props: { onClose: () => void }) {
  const { onClose } = props;

  const form = useForm<Input>({
    defaultValues: {
      name: '',
    },
    resolver: zodResolver(schema),
  });

  const utils = api.useUtils();

  const { mutate: createFolder, isPending, error } = api.folders.create.useMutation({
    onSuccess: () => {
      void utils.folders.list.invalidate();
      onClose();
    },
  });
  const errorMessage = error?.message;

  const handleSubmit = form.handleSubmit((data) => {
    createFolder(data);
  })

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Add folder</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6 mb-6">
            <Controller
              name="name"
              control={form.control}
              render={({ field }) => (
                <InputWithLabel
                  required
                  label="Name"
                  error={form.formState.errors.name?.message}
                  {...field}
                />
              )}
            />
            {errorMessage ? (
              <span className="text-sm text-red-500">{errorMessage}</span>
            ) : null}
          </div>
          <DialogFooter>
            <Button className="px-6" disabled={isPending}>
              {isPending && (
                <Loader color="white" size="xs" className="mr-2"/>
              )}
              Create
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
