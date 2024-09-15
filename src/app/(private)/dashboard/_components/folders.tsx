'use client';

import { useState } from 'react';
import { signOut } from 'next-auth/react';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ArchiveIcon,
  FolderIcon,
  FolderPlusIcon,
  FoldersIcon,
  LogOutIcon,
  SettingsIcon,
  StarIcon,
  Trash2Icon,
} from 'lucide-react';

import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
  InputWithLabel,
  Loader,
  Separator,
  Skeleton,
} from '@/ui';
import { api } from '@/trpc/react';
import { Nav, NavLink } from './nav';

interface Props {
  selected: number | null;
  onFolderSelected: (folder: number) => void;
}

export default function Folders(props: Props) {
  const { selected, onFolderSelected } = props;

  const { data: folders = [], isLoading } = api.folders.list.useQuery();

  return (
    <div className="border-r w-1/6 shrink-0 h-[100vh] overflow-y-auto flex flex-col">
      <div className="flex h-[56px] min-h-[56px] items-center justify-between pl-5 pr-2 sticky top-0 bg-white border-b">
        <span>John Doe</span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <SettingsIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => signOut()}>
              <LogOutIcon className="h-4 w-4 mr-2" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {isLoading ? <SkeletonFolders /> : null}

      {!isLoading ? (
        <>
          <Nav>
            <NavLink title="Starred" icon={StarIcon} variant={selected === -1 ? 'default' : 'ghost'} onClick={() => onFolderSelected(-1)} />
            <NavLink title="Archive" icon={ArchiveIcon} variant={selected === -2 ? 'default' : 'ghost'} onClick={() => onFolderSelected(-2)} />
            <NavLink title="Deleted" icon={Trash2Icon} variant={selected === -3 ? 'default' : 'ghost'} onClick={() => onFolderSelected(-3)} />
          </Nav>
          <Separator/>
        </>
      ) : null}

      {!isLoading && folders.length > 0 ? (
        <Nav>
          {folders.map((folder) => (
            <NavLink
              variant={selected === folder.id ? 'default' : 'ghost'}
              key={folder.id}
              icon={FolderIcon}
              title={folder.name}
              onClick={() => onFolderSelected(folder.id)}
            />
          ))}
        </Nav>
      ) : null}

      {!isLoading && folders.length === 0 ? (
        <div className="flex flex-col items-center justify-center flex-1 p-2 gap-4">
          <FoldersIcon className="h-10 w-10 stroke-neutral-500" />
          <span className="text-neutral-500 text-sm">No folders...</span>
        </div>
      ) : null}
      <div className="sticky bottom-0 bg-white mt-auto py-2 border-t px-2 h-[56px] min-h-[56px]">
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
      <Button variant="ghost" size="sm" className="w-full justify-start" onClick={() => setShowModal(true)}>
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
