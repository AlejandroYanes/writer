'use client';

import Link from 'next/link';
import { FolderIcon } from 'lucide-react';

import { api } from '@/trpc/react';
import { Skeleton, Table, TableBody, TableCell, TableRow } from '@/ui';
import AddFolderModal from './add-folder-modal';

interface Props {
  folders: { id: number; name: string }[];
}

export default function FoldersList(props: Props) {
  const { data: folders = [], isLoading } = api.folders.list.useQuery(undefined, { initialData: props.folders });

  return (
    <div className="h-screen flex flex-col gap-10 max-w-2xl mx-auto pt-10">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl">Folders</h1>
        <AddFolderModal />
      </div>
      <Table>
        <TableBody>
          {folders.map((folder) => (
            <TableRow key={folder.id}>
              <TableCell>
                <Link href={`/folders/${folder.id}/articles`}>
                  <div className="flex items-center gap-4">
                    <FolderIcon className="h-5 w-5"/>
                    {folder.name}
                  </div>
                </Link>
              </TableCell>
            </TableRow>
          ))}
          {isLoading ? (
            <>
              <TableRow>
                <TableCell>
                  <Skeleton className="w-full h-10"/>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Skeleton className="w-full h-10"/>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Skeleton className="w-full h-10"/>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Skeleton className="w-full h-10"/>
                </TableCell>
              </TableRow>
            </>
          ) : null}
        </TableBody>
      </Table>
    </div>
  );
}
